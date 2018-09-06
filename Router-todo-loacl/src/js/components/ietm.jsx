import React, { Component } from 'react'
let propTypes={
    todo:PT.object,
     onDestroy:PT.func,
     onToggle:PT.func,
     itemEditDone:PT.func
}
export default class Item extends Component {
    constructor(){
        super();
        this.state={
            inEdit:false,
            val:''
        }      
        this.onEdit=this.onEdit.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.onEter=this.onEter.bind(this);
        this.inputValue=this.inputValue.bind(this);
        this.onkeyUp=this.onkeyUp.bind(this);
    }
    
    onEdit(){
       let  {value}=this.props.todo
        this.setState({
            inEdit:true,
            val:value
        },()=>{this.refs.edit.focus()});
        
    }
    onkeyUp(ev){
        if(ev.keyCode!==27)return ;
        let  {value}=this.props.todo;
        
        this.setState({
            inEdit:false,
            val:value
        });
        
    }
        
    

    // itemEditDone(){
    //   this.setState({
    //         inEdit:false
    //     })
    //     let {itemEditDone}=this.props;

    //   itemEditDone(todo,this.state.val)
    // }
    inputValue(ev){
        this.setState({
            val:ev.target.value
        })
        
    }
    onBlur(){
        this.setState({
            inEdit:false
        })
    let {itemEditDone,todo}=this.props;

    itemEditDone(todo,this.state.val)
    }
    onEter(ev){
      if(ev.keyCode!==13){return};

      this.setState({
        inEdit:false
      })

      let {itemEditDone,todo}=this.props;

      itemEditDone(todo,this.state.val)
      
    }
  
    render() {
       let {onEdit,onBlur,onEter,inputValue,onkeyUp}=this

        let {onDestroy,todo,onToggle}=this.props;
        
        let {inEdit,val}=this.state;

        let itemClassName=todo.has?'completed':'';

        if(inEdit){itemClassName+=' editing'}

        
         
        return (
            <li className={itemClassName}> 
                <div className="view">
                  <input 
                  type="checkbox"
                   className="toggle"
                   onChange={ev=>onToggle(todo)}
                   checked={todo.has} 
                   />
                    <label onDoubleClick={onEdit}>
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
                 value={val}
                 onBlur={onBlur}
                 onKeyDown={onEter}
                 onChange={inputValue}
                 onKeyUp={onkeyUp}
                 ref="edit"
                 />
            </li>
        )
    }
}
Item.propTypes=propTypes