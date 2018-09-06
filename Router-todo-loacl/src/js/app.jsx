import Item from './components/ietm';
import Footer from './components/footer';

import React, { Component } from 'react'


export default class App extends Component {
    constructor(){
        super();
        this.todos=localStorage; //定义一个localStorage
        if(!this.todos.getItem('react-todos')){ //判断有没有localStorage
          this.todos.setItem("react-todos","[]"); 
      }  
        this.state={
            todos:[] || this.todos.getItem('react-todos'),//通过todos，来获取localStorage容器中的值
            inputValue:'',
            view:'all'  //显示视图
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
    //修改totosData的方法，设置一个方法;给Item的属性
    itemEditDone(todo,value){
        let {todos}=this.state;
        todos=JSON.parse(this.todos.getItem('react-todos'));// 取localStorage
        todos=todos.map(elt=>{ //遍历这个数组
            if(todo.id===elt.id){ //如果数组的id相同 说明就是编辑的这个todo
                elt.value=value   //todosDate的值就是编辑的值
            }
            return elt;  //返回值；
        })
        if(todo.value==""){  //如果值为空。 清除这个todo
            todos=todos.filter(elt=>{
                return elt.id!==todo.id
            })
        }
      this.setState({todos})
      this.todos.setItem('react-todos',JSON.stringify(todos)) //存localStorage

    }
    changeView(view){  //改变视图触发
        this.setState({view })
    }
    toggleAll(ev){  //是input 改变事件 全选勾
       
    let {checked}=ev.target;   //勾选和未勾选的状态

    let {todos}=this.state; 
    todos=JSON.parse(this.todos.getItem('react-todos'));// 取localStorage

    todos=todos.map(elt=>{
        elt.has=checked; //全选后checked会变成true 反之false
        return elt
    })
    this.todos.setItem('react-todos',JSON.stringify(todos));//存localStorage
    this.setState({todos})  //更新状态；
   }
   onToggle(todo){  //改变的是哪一个todo  识别
       let {todos}=this.state;
       todos= JSON.parse(this.todos.getItem('react-todos'));// 取localStorage
       todos=todos.map(elt=>{  //elt 代表每一个todo
         if(elt.id===todo.id){  //如果id相等 说明操作的就是这个todo
             elt.has=!elt.has //勾选上就是反向的状态
         }
         return elt
    })
    this.todos.setItem('react-todos',JSON.stringify(todos));//存localStorage
    this.setState({todos})
   } 
    inputChange(ev){ //改变事件,让value受控制
      this.setState({
          inputValue:ev.target.value  //让input受到控制
      })
    }
    keyDownPost(ev){  

        if(ev.keyCode!==13)return;//回车事件
        
        let {inputValue}=this.state;

       let   value=inputValue.trim(); //前后面的空格切掉

        if(value===""){return}  //如果值是空的就不让添加

        let todo={};  //声明一个数据 (添加的动作)，是一个对象。

        todo.id=new Date().getTime();   //给一个ID说明其身份

        todo.value=value;  // 内容

        todo.has=false;  //他的初始状态。

        let {todos}=this.state;  
        todos=JSON.parse(this.todos.getItem('react-todos'));// 取localStorage

        todos.push(todo);//新添加的对象todo添加到数组里

        this.setState({ // 更新状态
        local:this.todos,
           inputValue:'' //回车后清空
        })
        this.todos.setItem('react-todos',JSON.stringify(todos))//存localStorage
    }
    onDestroy(todo){ //删除的是那一个参数 设置一个todo
        let {todos}=this.state;  //先把所有的todo拿出来
        todos= JSON.parse(this.todos.getItem('react-todos'));// 取localStorage
        todos=todos.filter(elt=>{ //过滤这个todo 
            return elt.id!==todo.id // id不相匹配删除掉 
        })
        this.setState({todos}) //更新状态
        this.todos.setItem('react-todos',JSON.stringify(todos));//存localStorage
    }
    onClearCompleted(){  // 删除
        let {todos}=this.state;  // 拿出所有的todo
        todos=JSON.parse(this.todos.getItem('react-todos'));// 取localStorage
        todos=todos.filter(elt=>{ //过滤
            return !elt.has //true 的时候删除 ，false的时候保留下来  所以取反
        })
        this.setState({todos}) //更新状态   
        this.todos.setItem('react-todos',JSON.stringify(todos))//存localStorage
    }
 
    render() {
                let {keyDownPost,onDestroy,onClearCompleted,inputChange,toggleAll,onToggle,changeView,itemEditDone}=this;
                
                let {todos,inputValue,view}=this.state;
                todos=JSON.parse(this.todos.getItem('react-todos')); // 取localStorage
                 
                let {location:{pathname}}=this.props


                let items=null,footer=null,itemsBox=null;

                let leftCount=todos.length; //数组的长度;

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

                items=items.map((elt,i)=>{  //改变这个数组
                    return (//接收一些props
                        <Item
                         {...{ 
                             onDestroy,//每个todo都有小xx
                             todo:elt, // 内容
                             onToggle, //事件绑定 
                             itemEditDone
                             
                         }}
                          key={i}
                        />
                    )
                })

                if(todos.length){ //如果数组的长度
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
                       //footer 组件的 this.props
                    />)
                }
                
        return (
            <div>
                <header className="header">
                <h1>待办事项</h1>
                <input 
                type="text" 
                value={inputValue}//受控制
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