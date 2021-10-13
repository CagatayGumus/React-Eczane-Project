import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import Home from './Home';

const router = 
<Router>
  <Switch>
  <Route path="/" exact component={Home}></Route>
  </Switch>
</Router>



ReactDOM.render(router,document.getElementById('root'));


reportWebVitals();
