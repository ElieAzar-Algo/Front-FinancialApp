import React from 'react';
import  './Home.css';
import 'font-awesome/css/font-awesome.min.css';
import Menu from '../menu/menu.js';
import {ProgressBar} from "react-bootstrap";
import {Redirect} from 'react-router-dom'


class Home extends React.Component{

  state={
    incomes:[],
    expenses:[]
  }

  async componentDidMount(){


//----------------------------------------------------------------------------------------//
//                                fetch Incomes                                           //
//----------------------------------------------------------------------------------------//
    const incomesurl = "http://localhost:8000/api/income";
   const token= window.localStorage.getItem("token")
   console.log(token)

    const incomesResponse = await fetch(incomesurl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+token
      }
    }).catch(function (error) {
      console.log(error);
    });
    
    const incomesRes = await incomesResponse.json();
    console.log(incomesRes);
    await this.setState({incomes:incomesRes.income})
    const incomesResult = await incomesResponse.status;
   // console.log(res);
   console.log(this.state.incomes);

    
    if (incomesResult === 200) {
          console.log("Loaded Successfully");
        
            
    } 
    else {
      alert("cannot fetch the incomes");
    }
//----------------------------------------------------------------------------------------//
//                                fetch the expenses                                      //
//----------------------------------------------------------------------------------------//

    const expensesurl = "http://localhost:8000/api/expense";
   
    const expensesResponse = await fetch(expensesurl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+token
      }
    }).catch(function (error) {
      console.log(error);
    });
    const expensesRes = await expensesResponse.json();
    await this.setState({expenses:expensesRes.expense})
    const expensesResult = await expensesResponse.status;
   // console.log(res);
   console.log(this.state.expenses);

    
    if (expensesResult === 200) {
          console.log("Loaded Successfully");
        } 
    else {
      alert("cannot fetch the expenses");
    }
  }
  

    
    render(){

const TotalIncome= ()=>{
  var t=0;
  this.state.incomes.map((income)=>(
    t=income.amount+t
  ))
  return t;
}

const TotalExpense= ()=>{
  var t=0;
  this.state.expenses.map((expense)=>(
    t=expense.amount+t
  ))
  return t;
}
 const TotalGrowth= ()=>{
  var t=0;
  t= TotalIncome()-TotalExpense();
  return t;
 }
        return (
          <>
            <div className="row home-content">
              <div className="col-3">
                <Menu />
              </div>
              <div className="col-9 home-middle-container" style={{}}>
                <div
                  className="row home-page-header"
                  style={{ marginTop: "10%" }}
                >
                  <div className="col-3">
                    <i className="fa fa-plus-circle fa-4x fa-center icon-rounded"></i>
                    <div className="stats">
                      <h5>Add New Income</h5>
                    </div>
                  </div>

                  <div className="col-3">
                    <i className="fa fa-plus-circle fa-4x icon-rounded"></i>
                    <div className="stats">
                      <h5>Add New Expense</h5>
                    </div>
                  </div>

                  <div className="col-3">
                    <i className="fa fa-plus-circle fa-4x icon-rounded"></i>
                    <div className="stats">
                      <h5>Add New Category</h5>
                    </div>
                  </div>

                  <div className="col-3">
                    <a className="btn btn-lg btn-success" href="#">
                      <i className="fa fa-gbp fa-2x pull-left"></i>
                      <h5>
                        <strong>
                          <TotalIncome />
                        </strong>
                      </h5>
                      <span>Total Income</span>
                    </a>
                  </div>
                </div>

                <div
                  className="row"
                  style={{ marginTop: "50px", marginLeft: "0%", width: "100%" }}
                >
                  <div className="col-12 test">
                    <div className="row">
                      <div className="col-3 testt">
                        <div className="card l-bg-green-dark testtt">
                          <div className="card-statistic-3 p-4">
                            <div className="card-icon card-icon-large">
                              <i className="fas fa-shopping-cart"></i>
                            </div>
                            <div className="mb-4">
                              <h5 className="card-title mb-0">New Orders</h5>
                            </div>
                            <div className="row align-items-center mb-2 d-flex">
                              <div className="col-8">
                                <h2 className="d-flex align-items-center mb-0">
                                  10,243
                                </h2>
                              </div>
                              <div className="col-4 text-right">
                                <span>
                                  12.5% <i className="fa fa-arrow-up"></i>
                                </span>
                              </div>
                            </div>
                            <div
                              className="progress mt-1 "
                              data-height="8"
                              style={{ height: "8px" }}
                            >
                              <div
                                className="progress-bar l-bg-cyan"
                                role="progressbar"
                                data-width="25%"
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "25%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 testt">
                        <div className="card l-bg-blue-dark testtt">
                          <div className="card-statistic-3 p-4">
                            <div className="card-icon card-icon-large">
                              <i className="fas fa-shopping-cart"></i>
                            </div>
                            <div className="mb-4">
                              <h5 className="card-title mb-0">New Orders</h5>
                            </div>
                            <div className="row align-items-center mb-2 d-flex">
                              <div className="col-8">
                                <h2 className="d-flex align-items-center mb-0">
                                  10,243
                                </h2>
                              </div>
                              <div className="col-4 text-right">
                                <span>
                                  12.5% <i className="fa fa-arrow-up"></i>
                                </span>
                              </div>
                            </div>
                            <div
                              className="progress mt-1 "
                              data-height="8"
                              style={{ height: "8px" }}
                            >
                              <div
                                className="progress-bar l-bg-cyan"
                                role="progressbar"
                                data-width="25%"
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "25%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 testt">
                        <div className="card l-bg-cherry testtt">
                          <div className="card-statistic-3 p-4">
                            <div className="card-icon card-icon-large">
                              <i className="fas fa-shopping-cart"></i>
                            </div>
                            <div className="mb-4">
                              <h5 className="card-title mb-0">New Orders</h5>
                            </div>
                            <div className="row align-items-center mb-2 d-flex">
                              <div className="col-8">
                                <h2 className="d-flex align-items-center mb-0">
                                  10,243
                                </h2>
                              </div>
                              <div className="col-4 text-right">
                                <span>
                                  12.5% <i className="fa fa-arrow-up"></i>
                                </span>
                              </div>
                            </div>
                            <div
                              className="progress mt-1 "
                              data-height="8"
                              style={{ height: "8px" }}
                            >
                              <div
                                className="progress-bar l-bg-cyan"
                                role="progressbar"
                                data-width="25%"
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "25%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <a className="btn btn-lg btn-warning"  style={{marginTop:"10%"}} href="#">
                          <i className="fa fa-shopping-cart fa-2x pull-left"></i>
                          <h5>
                            <strong>
                              <TotalExpense />
                            </strong>
                          </h5>
                          <span>Total Expense</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-9">
                    <div className="row" style={{ marginTop: "5%" }}>
                      <div className="col-7">
                        <h5>
                          <strong>Monthly Goal</strong>
                        </h5>
                      </div>
                      <div className="col-5">
                        <h5> 10000$ </h5>
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-12">
                        <i></i>
                        <ProgressBar>
                          <ProgressBar
                            animated
                            striped
                            variant="success"
                            now={35}
                            key={1}
                          />
                          <ProgressBar variant="warning" now={20} key={2} />
                          <ProgressBar
                            animated
                            striped
                            variant="danger"
                            now={10}
                            key={3}
                          />
                        </ProgressBar>
                      </div>
                    </div>
                  </div>

                  <div className="col-3">
                    <a className="btn btn-lg btn-primary" href="#" style={{}}>
                      <i className="fa fa-flag fa-2x pull-left"></i>
                      <h5>
                        <strong>
                          <TotalGrowth />
                        </strong>
                      </h5>
                      <span>Total Growth</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="cbp-spmenu-push">

	<div className="main_content">
  
  
<div id="page-wrapper">
			<div className="main-page">
     
       

<div className="col_3">
        	<div className="col-md-3 widget widget1">
        		<div className="r3_counter_box">
                    <i className="pull-left fa fa-dollar icon-rounded"></i>
                    <div className="stats">
                      <h5><strong><TotalIncome/></strong></h5>
                      <span>Total Income</span>
                    </div>
                </div>
        	</div>
        	<div className="col-md-3 widget widget1">
        		<div className="r3_counter_box">
                    <i className="pull-left fa fa-laptop user1 icon-rounded"></i>
                    <div className="stats">
                      <h5><strong><TotalExpense/></strong></h5>
                      <span>Total Expenses</span>
                    </div>
                </div>
        	</div>
        	<div className="col-md-3 widget widget1">
        		<div className="r3_counter_box">
                    <i className="pull-left fa fa-money user2 icon-rounded"></i>
                    <div className="stats">
                      <h5><strong><TotalGrowth/></strong></h5>
                      <span>Net Growth</span>
                    </div>
                </div>
        	</div>
        
        	<div className="clearfix"> </div>
		</div>
        </div>
        </div>
        </div>
        </div> */}
          </>
        );
    }
}
export default Home;