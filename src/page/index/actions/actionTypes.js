/* 
   Action 本质上是 JavaScript 普通对象。
   {
       type:ADD_TODO
       text:'Build my first redux app'
   }
*/

// action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作
// 多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。
export const CHANGE_TAB = 'CHANGE_TAB';

export const HEAD_DATA = 'HEAD_DATA';

export const LIST_DATA = 'LIST_DATA';

export const ORDER_DATA = 'ORDER_DATA';