// 因为rem.js是放在dev文件夹，是webpack打包输出的文件，所以不经过webpack的构建转js格式，所以要用es5的写法
(function(){
    var docEl = document.documentElement; // 获取HTML元素<html>

    function setRemUint(){
        var rem = docEl.clientWidth / 10; // 获取视口的宽度/10
        docEl.style.fontSize = rem + 'px'; // 设置页面的font-size
    }

    setRemUint();

    // 监听页面窗口大小改变事件，执行setRemUint函数
    window.addEventListener('resize', setRemUint);
})();

// 常用的flexble.js做移动端的适配，涉及meta标签的设置，dpr问题