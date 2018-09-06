import React, { Component } from 'react';
import {Link} from 'react-router-dom';
let propTypes={
    leftCount:PT.number,
    onClearCompleted:PT.func,
    showButton:PT.bool,
    pathname:PT.string
    // changeView:PT.func,
    // view:PT.oneOf(['all','active','completed'])
}
export default class Footer extends Component {
    constructor(){
        super();
    }
    render() {
         let {leftCount,onClearCompleted,
            showButton,
            pathname
            // view,changeView
        }=this.props;

        let clearBt=null;

        if(showButton){
             clearBt=(<button className="clear-completed" 
            onClick={onClearCompleted}>
            清除完成项目
            </button>)
        }

        return (
            <footer className="footer">
               <span className="todo-count">
                 <strong>{leftCount}  </strong>
                 <span>事件 项目</span>
               </span>
               <ul className="filters">
                 <li>
                        <Link
                        to="/"
                        className={pathname==='/'?'selected':''}
                        >所有</Link>
                     {/* <a 
                     href="#/all"
                     className={view==='all'?'selected':''}
                     onClick={ev=>{changeView('all')}}
                     >all</a> */}
                 </li>
                 <li>
                 <Link
                        to="/active"
                        className={pathname==='/active'?'selected':''}
                        >未完成</Link>
                     {/* <a 
                     href="#/active"
                     className={view==='active'?'selected':''}
                     onClick={ev=>{changeView('active')}}
                     >Active</a> */}
                 </li>
                 <li>
                 <Link
                        to="/completed"
                        className={pathname==='/completed'?'selected':''}
                        >已完成</Link>
                     {/* <a
                      href="#/Completed"
                      className={view==='completed'?'selected':''}
                      onClick={ev=>{changeView('completed')}}
                      >Completed</a> */}
                 </li>
               </ul>
              {clearBt}
            </footer>
        )
    }
}
Footer.propTypes=propTypes