import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Movies from './router/Movies';
import {Route,BrowserRouter as Router} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const container = document.createElement("div");
document.body.appendChild(container);

// Router to Handle Client Request 
ReactDOM.render(
  <MuiThemeProvider>
		<Router>
			<Route path="/" component={Movies}/>
		</Router>
  </MuiThemeProvider>,
container);

serviceWorker.unregister();
