import Item from './components/ietm';
import Footer from './components/footer';

import React, { Component } from 'react'


export default class App extends Component {
    constructor(){
        super();
        this.todos=localStorage;
        if(!this.todos.getItem('react-todos')){
          this.todos.setItem("react-todos","[]");
      }  
        this.state={
            todos:[] || this.todos.getItem('react-todos'),
            inputValue:'',
            view:'all'
        }
        this.keyDownPost=this.keyDownPost.bind(this);
        this.onDestroy=this.onDestroy.bind(this);
        this.onClearCompleted=this.onClearCompleted.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.toggleAll=this.toggleAll.bind(this);
        this.onToggle=this.onToggle.bind(this);
        this.changeView=this.changeView.bind(this);
        this.itemEditDone=this.itemEditDone.bind(this)
    }
    itemEditDone(todo,value){
        let {todos}=this.state;
        todos=JSON.parse(this.todos.getItem('react-todos'));
        todos=todos.map(elt=>{
            if(todo.id===elt.id){
                elt.value=value
            }
            return elt;
        })
        if(todo.value==""){
            todos=todos.filter(elt=>{
                return elt.id!==todo.id
            })
        }
      this.setState({todos})
      this.todos.setItem('react-todos',JSON.stringify(todos))

    }
    changeView(view){
        this.setState({view })
    }
    toggleAll(ev){
       
    let {checked}=ev.target;

    let {todos}=this.state;
    todos=JSON.parse(this.todos.getItem('react-todos'));

    todos=todos.map(elt=>{
        elt.has=checked;
        return elt
    })
    this.todos.setItem('react-todos',JSON.stringify(todos));
    this.setState({todos})
   }
   onToggle(todo){
       let {todos}=this.state;
       todos= JSON.parse(this.todos.getItem('react-todos'));
       todos=todos.map(elt=>{
         if(elt.id===todo.id){
             elt.has=!elt.has
         }
         return elt
    })
    this.todos.setItem('react-todos',JSON.stringify(todos));
    this.setState({todos})
   }
    inputChange(ev){
      this.setState({
          inputValue:ev.target.value
      })
    }
    keyDownPost(ev){

        if(ev.keyCode!==13)return;
        
        let {inputValue}=this.state;

       let   value=inputValue.trim();

        if(value===""){return}

        let todo={};

        todo.id=new Date().getTime();

        todo.value=value;

        todo.has=false;

        let {todos}=this.state;
        todos=JSON.parse(this.todos.getItem('react-todos'));

        todos.push(todo);

        this.setState({
        local:this.todos,
           inputValue:''
        })
        this.todos.setItem('react-todos',JSON.stringify(todos))
    }
    onDestroy(todo){
        let {todos}=this.state;
        todos= JSON.parse(this.todos.getItem('react-todos'));
        todos=todos.filter(elt=>{
            return elt.id!==todo.id
        })
        this.setState({todos})
        this.todos.setItem('react-todos',JSON.stringify(todos));
    }
    onClearCompleted(){
        let {todos}=this.state;
        todos=JSON.parse(this.todos.getItem('react-todos'));
        todos=todos.filter(elt=>{
            return !elt.has
        })
        this.setState({todos})
        this.todos.setItem('react-todos',JSON.stringify(todos))
    }
 
    render() {
                let {keyDownPost,onDestroy,onClearCompleted,inputChange,toggleAll,onToggle,changeView,itemEditDone}=this;
                
                let {todos,inputValue,view}=this.state;
                todos=JSON.parse(this.todos.getItem('react-todos')); 
                 
                let {location:{pathname}}=this.props


                let items=null,footer=null,itemsBox=null;

                let leftCount=todos.length;

                items=todos.filter(elt=>{
                    if(elt.has)leftCount--;
                    switch(pathname){
                        case '/active':
                        return !elt.has;
                        case '/completed':
                        return elt.has;
                        default:
                        return true;
                       

                    }
                })

                items=items.map((elt,i)=>{
                    return (
                        <Item
                         {...{
                             onDestroy,
                             todo:elt,
                             onToggle,
                             itemEditDone
                             
                         }}
                          key={i}
                        />
                    )
                })

                if(todos.length){
                    itemsBox=(
                        <section className="main">
                        <input
                         type="checkbox"
                         className="toggle-all"
                         onChange={toggleAll}
                         checked={leftCount===0}
                         
                         />
                           <ul className="todo-list">
                              {items}
                           </ul>
                        </section> 
                    );
                    footer=(
                    <Footer
                      {...{
                          leftCount,
                          onClearCompleted,
                          showButton:leftCount<todos.length,
                        //   view,
                        //   changeView
                        pathname
                      }}
                    
                    />)
                }
                
        return (
            <div>
                <header className="header">
                <h1>待办事项</h1>
                <input 
                type="text" 
                value={inputValue}
                onChange={inputChange}
                className="new-todo"
                onKeyDown={keyDownPost}
                placeholder="吃饭 睡觉 打豆豆"
               
                />
                </header>
                {itemsBox}
                {footer}
                
            </div>
        )
    }
}