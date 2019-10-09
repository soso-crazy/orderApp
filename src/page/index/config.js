// module.exports / exports: 只有 node 支持的导出
// Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。var exports = module.exports;
// 用 module.exports 导出，然后用require导入。
module.exports={
    TABKEY:{
        home:'home',
        order:'order',
        my:'my'
    }
};