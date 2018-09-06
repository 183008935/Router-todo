import React, { Component } from 'react'
let propTypes={//数据验证
    todo:PT.object,//对象
     onDestroy:PT.func, //函数
     onToggle:PT.func,
     itemEditDone:PT.func
}
export default class Item extends Component {
    constructor(){
        super();
        this.state={ //是不是编辑状态。
            inEdit:false,//初始值是false
            val:''//让值可以控制
        }      
        this.onEdit=this.onEdit.bind(this);//改变状态的事件;
        this.onBlur=this.onBlur.bind(this);//失去焦点事件 会把编辑的内容保存
        this.onEter=this.onEter.bind(this);//修改后的事件;
        this.inputValue=this.inputValue.bind(this);//编辑value的值得方法
        this.onkeyUp=this.onkeyUp.bind(this);//ESC事件
    }
    
    onEdit(){ 
       let  {value}=this.props.todo //从他的属性提出内容
        this.setState({
            inEdit:true,
            val:value
        },()=>{this.refs.edit.focus()});//改变初始值可以编辑的状态 并获得焦点
        
    }
    onkeyUp(ev){
        if(ev.keyCode!==27)return ;
        let  {value}=this.props.todo;
        
        this.setState({
            inEdit:false,
            val:value
        });
        
    }
        
    
   //为了方便下面的内容   不嫌麻烦就不用写.
    // itemEditDone(){
    //   this.setState({
    //         inEdit:false
    //     })
    //     let {itemEditDone}=this.props;

    //   itemEditDone(todo,this.state.val)
    // }
    inputValue(ev){ //改变value的方法;
        this.setState({
            val:ev.target.value
        })
        
    }
    onBlur(){  //失去焦点的动作
        this.setState({
            inEdit:false
        })
    let {itemEditDone,todo}=this.props;

    itemEditDone(todo,this.state.val) //这些都是为了修改内容
    }
    onEter(ev){
      if(ev.keyCode!==13){return};

      this.setState({
        inEdit:false
      })

      let {itemEditDone,todo}=this.props;

      itemEditDone(todo,this.state.val)//这些都是为了修改内容
      
    }
  
    render() {
       let {onEdit,onBlur,onEter,inputValue,onkeyUp}=this

        let {onDestroy,todo,onToggle}=this.props;
        
        let {inEdit,val}=this.state;

        let itemClassName=todo.has?'completed':'';//用变量来控制什么时候编辑 

        if(inEdit){itemClassName+=' editing'} //通过状态来控制什么时候可以编辑

        
         
        return (
            <li className={itemClassName}> 
                <div className="view">
                  <input 
                  type="checkbox"
                   className="toggle"
                   onChange={ev=>onToggle(todo)} // 传参数todo
                   checked={todo.has} 
                   />
                    <label 
                    onDoubleClick={onEdit} //双击可以编辑
                    > 
                       {todo.value}
                    </label>
                    <button
                      className="destroy"
                      onClick={ev=>onDestroy(todo)}
                     ></button>
                </div>
                <input
                 type="text" 
                 className="edit"
                 value={val}  //让input的值可以控制，方便编辑
                 onBlur={onBlur}  //失去焦点的时候的事件
                 onKeyDown={onEter} //按下去的时候的事件
                 onChange={inputValue}
                 onKeyUp={onkeyUp}
                 ref="edit"
                 />
            </li>
        )
    }
}
Item.propTypes=propTypes