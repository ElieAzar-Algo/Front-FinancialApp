import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./login/login";
import Register from "./register/register";
// install bootstrap using this command in cmd :  npm install bootstrap --save
import "bootstrap/dist/css/bootstrap.min.css";
import Categories from "./categories/Categories";
import Usermanagement from "./users/Users";
import Users from "./users/Users";
import AddIncome from './addIncome/addIncome';
import AddExpense from './addExpense/addExpense'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/AddIncome">
          <AddIncome />
        </Route>
        <Route path="/AddExpense">
          <AddIncome />
        </Route>
        <Route path="/categories">
          <Categories />
        </Route>

        <Route path="/users">
          <Users />
        </Route>
        <Route path="/home">
          <App />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
