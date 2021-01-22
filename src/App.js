import './App.css';
import React, { useState } from 'react';
//import Register from './register/register.js';
import Menu from './menu/menu';
import AddIncome from './addIncome/addIncome';
<<<<<<< HEAD
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import Login from "./login/login";
import Categories from "./categories/Categories";
import Users from "./users/Users";
import AddExpense from './addExpense/addExpense'
import Report from "./report/Report";
import ExpensesAndIncome from "./expensesAndIncomes/ExpensesAndIncome";
import Home from "./home/Home";
import NameBar from './nameBar/NameBar';
=======
import Test from './home/Test'
import Report from './report/Report';
import ExpensesAndIncome from './expensesAndIncomes/ExpensesAndIncome';

>>>>>>> 7c53c4a4421f5156d9203644b696454d336ce276

function App() {
  const [pageName,setPageName] = useState("home");
  
  const changePageName = (name)=>{
    setPageName(name);
  }
  return (
<<<<<<< HEAD
    <>
      <BrowserRouter>
        <div className="row">
          <div className="col-md-2 col-sm-12">
            <Menu changePageName={changePageName}/>
          </div>
          <div className="col-md-10">
            <div className="container">
            <NameBar pageName={pageName} />
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>

                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/AddIncome">
                  <AddIncome />
                </Route>
                <Route path="/AddExpense">
                  <AddExpense />
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
                <Route path="/records">
                  <ExpensesAndIncome />
                </Route>
                <Route path="/reports">
                  <Report />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>

            </div>
          </div>

        </div>
      </BrowserRouter>
    </>
=======
    <div className="App">
      <header>
        <ExpensesAndIncome/>
      </header>
    </div>
>>>>>>> 7c53c4a4421f5156d9203644b696454d336ce276
  );
}

export default App;
