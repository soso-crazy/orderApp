// 引入模块热替换
const webpack = require('webpack');

// path 模块提供用于处理文件路径和目录路径的实用工具。path.resolve() 方法将路径或路径片段的序列解析为绝对路径。
const path = require('path');

// 引入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入清除上一次打包文件插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// css-loader删除了minimize：true压缩选项，所以需要使用压缩css插件
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 引入抽离css成为link方式引入的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 引入fs模块，使用node.js中的fs.readdirSync(path)  同步得到路径
const fs = require('fs');

// __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
// 当前webpack配置文件目录ORDERAPP下的src文件，得到src的绝对路径
const srcRoot = path.resolve(__dirname, 'src');

// 打包输出的文件路径
const distPath = path.resolve(__dirname, 'dist');
// src文件夹下的page文件,得到page的绝对路径
const pageDir = path.resolve(srcRoot, 'page');

const mainFile = 'index.js';

// 为page文件夹下的各个文件夹中如果有文件夹名.html就打包dev文件夹下文件夹名.html
function getHtmlArray(entryMap) {
    let htmlArray = [];
    // 遍历page文件夹下的各个文件夹
    Object.keys(entryMap).forEach((key) => {
        // page文件夹下各文件夹路径
        let fullPathName = path.resolve(pageDir, key);
        // 找到page文件夹下的各文件夹名字.html文件
        let fileName = path.resolve(fullPathName, key + '.html');
        // 如果存在文件名.html的话
        if (fs.existsSync(fileName)) {
            // 生成文件名.html文件，模板路径是page文件夹下的各个文件夹的文件名.html
            htmlArray.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                chunks: ["common", key]
            }))
        }
    });
    return htmlArray;
}

//该方法把page文件夹下每个路径进行遍历，如果这个路径是个文件夹并且文件夹里有index.js文件，则把文件夹名字作为key，文件夹绝对路径作为value返回一个对象,webpack多入口写法为对象形式，名字+路径
function getEntry() {
    let entryMap = {};

    fs.readdirSync(pageDir).forEach((pathname) => {
        // 遍历page文件夹下的每一个文件夹，得到page文件夹下的所有文件的绝对路径
        let fullPathName = path.resolve(pageDir, pathname);
        // fs.statSync返回一个stat对象
        let stat = fs.statSync(fullPathName);
        // 得到page目录下的文件夹下的index.js文件的绝对路径
        let fileName = path.resolve(fullPathName, mainFile);

        // fs.Stats 对象描述文件系统目录，则stat.isDirectory返回 true。
        // fs.existsSync如果路径存在，则返回 true，否则返回 false
        if (stat.isDirectory() && fs.existsSync(fileName)) {
            // 将page文件下的各文件路径是文件夹而且里面有index.js文件就填充entryMap对象
            entryMap[pathname] = fileName;
        }
    });
    return entryMap;
}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
    mode: 'production', // 为生成环境打包

    entry: entryMap, // 页面入口文件配置

    resolve: {
        extensions: ['.js', '.jsx'], // 省略文件后缀名配置
        alias: {
            component: path.resolve(srcRoot, 'component') // 绝对路径的别名
        }
    },
    output: { // 对应输出项配置
        path: distPath,
        filename: 'js/[name].[hash].min.js'
    },

    // Loaders需要单独安装并且需要在webpack.config.js中的modules关键字下进行配置：
    // test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
    // loader：loader的名称（必须）
    // include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
    // query：为loaders提供额外的设置选项（可选）
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: [{loader: "babel-loader"}, {loader: "eslint-loader"}], include: srcRoot}, //将es6和jsx转成浏览器识别的js
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: srcRoot + '/component/rem_function.scss'
                        }
                    }
                ],
                include: srcRoot
            }, //解析sass, 把sass解析成浏览器可以识别的css语言,使用sass-resources-loader全局引入scss文件
            {
                test: /\.(png|jpg|jpeg)$/,
                use: 'url-loader?limit=8192&name=./images/[name].[hash].[ext]',
                include: srcRoot
            } //解析图片,limit表示超过多少就使用base64来代替，单位是byte
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/, // 限制范围
                    chunks: "all", // 全部chunk
                    name: "common" // 生成文件名
                }
            }
        }
    },

    plugins: [
        new CleanWebpackPlugin({
            root: distPath, // 打包文件路径
            dry: false // 启用删除文件
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css"
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,  // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
            cssProcessorPluginOptions: {
                preset: ['default',
                    {
                        discardComments: {removeAll: true}, //对注释的处理
                        normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                    }
                ],
            },
            canPrint: true // 是否打印编译过程中的日志
        })
    ].concat(htmlArray)
};
