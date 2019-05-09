import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Movies from './router/Movies';
import {Route,BrowserRouter as Router} from "react-router-dom";

const container = document.createElement("div");
document.body.appendChild(container);

// Router to Handle Client Request 
ReactDOM.render(
			<Router>
				<Route path="/movies/" component={Movies}/>
				<Route path="/" component={Movies}/>
  			</Router>, container);

serviceWorker.unregister();
