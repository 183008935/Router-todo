import App from './app';
require('./../css/index.css');
import {BrowserRouter as Router,Route} from 'react-router-dom';
ReactDOM.render(
    <Router >
         <Route pach="/" component={App}/>
     </Router>,
   document.getElementById("div1")

);