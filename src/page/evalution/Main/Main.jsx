import 'component/common.scss';
import React from 'react';
import './Main.scss';
import NavHeader from 'component/NavHeader/NavHeader';

class Main extends React.Component {
    constructor(props) {
        super(props);

        // 最多可输入的字符数
        this.maxCount = 140;

        this.state = {
            // 还剩多少字符数可输入
            count: this.maxCount,
            // 用户当前点击第几颗星
            starIndex: 0
        }
    }

    componentDidMount(){
        // compositionstart 事件触发于一段文字的输入之前（类似于 keydown 事件，但是该事件仅在若干可见字符的输入之前，而这些可见字符的输入可能需要一连串的键盘操作、语音识别或者点击输入法的备选词）。

        /* 
        ref回调函数的触发时机：
        1. 组件渲染后，即componentDidMount后
        2. 组件卸载后，即componentWillMount后，此时，入参为null
        3. ref改变后
         */
        console.log(this.commentInput); // this.commentInput就是挂载了ref回调函数的dom节点textarea
        this.commentInput.addEventListener('compositionstart',()=>{
            this.chineseInputing = true;
        });
        this.commentInput.addEventListener('compositionend',(e)=>{
            this.chineseInputing = false; // 中文正在输入标志位，没有正在输入中文候选时，才执行this.onInput
            this.onInput(e.target.value);
        })
    }

    /**
     * 点击评分
     */
    doEva(index) {
        console.log(index); // 星的index从0开始
        
        this.setState({
            starIndex: index+1 // 第几颗星是从1开始
        })
    }

    /**
     * 渲染评分用的星
     */
    renderStar() {
        let array = [];
        for (let i = 0; i < 5; i++) {
            let cls = i >= this.state.starIndex ? "star-item" : "star-item light";
            array.push(<div key={i} className={cls} onClick={() => this.doEva(i)}></div>);
        }
        return array;
    }

    /**
     * 用户输入回调
     */
    onInput(value){
        
        let num = value.toString().length;
        console.log(num);
        
        if(!this.chineseInputing){ // 中文正在输入标志位
            this.setState({
                count:this.maxCount - num
            })
        }
    }

    render() {
        return (
            <div className="content">
                <NavHeader title="评价"></NavHeader>
                <div className="eva-content">
                    <div className="star-area">
                        {this.renderStar()}
                    </div>
                    <div className="comment">
                        {/* ref回调函数：回调函数就是在dom节点或组件上挂载函数，函数的入参是dom节点或组件实例，获取其引用 */}
                        <textarea maxLength="140" 
                                  className="comment-input" 
                                  placeholder="亲，菜品的口味如何？商家的服务是否周到？" 
                                  onChange={(e)=>this.onInput(e.target.value)} 
                                  ref={(ref)=>{this.commentInput=ref}}>
                                  {/* 回调函数参数ref是textarea的dom节点，赋给this.commentInput */}
                        </textarea>
                        <span className="count">{this.state.count}</span>
                    </div>
                    <p className="one-line product-name">后切鸡排</p>
                </div>
                <div className="submit">提交评价</div>
            </div>
        )
    }
}

export default Main;