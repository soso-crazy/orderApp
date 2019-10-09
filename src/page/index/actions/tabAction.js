// 引入 被定义成字符串常量的type
import {CHANGE_TAB} from './actionTypes';

// Action 创建函数 就是生成 action 的方法。
export const changeTab = (obj) => {
    // 在 Redux 中的 action 创建函数只是简单的返回一个 action
    return {
        type:CHANGE_TAB,
        // 除了type的其他的字段就是按照需要定义携带的载荷，自行定义即可。
        obj:obj
    }
}