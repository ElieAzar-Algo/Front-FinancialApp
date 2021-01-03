import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import  {BrowserRouter, Switch, Route, Router}from 'react-router-dom';
import './index.css';
import App from './App';
import  Login from './login/login';
import Register from './register/register';
// install bootstrap using this command in cmd :  npm install bootstrap --save 
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Switch>
       
          <Route path="/login">
          
            <Login />
          </Route>
          
         
          <Route path="/home">
            <App />
          </Route>
          <Route path="/">
          
            <Register />
          </Route>
          
        </Switch>
        </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
