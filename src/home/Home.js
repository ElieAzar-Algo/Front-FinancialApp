import React from 'react';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css';
import Menu from '../menu/menu.js';
import { ProgressBar } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom'

const token = window.localStorage.getItem("token");
class Home extends React.Component {

  state = {
    allIncomes: [],
    allExpenses: [],
    highestIncome: [],
    highestExpense: [],
    incomes: [],
    expenses: [],
    goals: [],
    yearlyGoal: [],
    monthlyGoal: [],
    incomesCategories: [],
    expensesCategories: [],
  }

  async componentDidMount() {

    const token = await window.localStorage.getItem("token");
    //----------------------------------------------------------------------------------------//
    //                                fetch Incomes                                           //
    //----------------------------------------------------------------------------------------//
    const incomesurl = "http://localhost:8000/api/report/income?startdate=2000-2-14&enddate=2100-2-20";

    //console.log(token)

    const incomesResponse = await fetch(incomesurl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }).catch(function (error) {
      console.log(error);
    });
    //console.log(incomesResponse);
    const incomesRes = await incomesResponse.json();
    //console.log(incomesRes);
    await this.setState({ incomes: incomesRes.total_sum, incomesCategories: incomesRes.categories_percentage, allIncomes: incomesRes.fixed_incomes })
    const incomesResult = await incomesResponse.status;
    //console.log(this.state.allIncomes);
    //console.log(this.state.incomesCategories);


    if (incomesResult === 200) {
      console.log("Loaded Successfully");


    }
    else {
      return (<Redirect to="/login" />)
    }
    //
    let highestInc = Math.max.apply(Math, this.state.allIncomes.map((h) => { return h.amount; }));
    this.setState({ highestIncome: highestInc.toLocaleString() })
    //console.log(highestInc)


    //----------------------------------------------------------------------------------------//
    //                                fetch the expenses                                      //
    //----------------------------------------------------------------------------------------//

    const expensesurl = "http://localhost:8000/api/report/expense?startdate=2000-2-14&enddate=2100-2-20";

    const expensesResponse = await fetch(expensesurl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }).catch(function (error) {
      console.log(error);
    });
    const expensesRes = await expensesResponse.json();
    //console.log(expensesRes)
    await this.setState({ expenses: expensesRes.total_sum, expensesCategories: expensesRes.categories_percentage, allExpenses: expensesRes.fixed_expenses })
    const expensesResult = await expensesResponse.status;
    // console.log(res);
    //console.log(this.state.expensesCategories);


    if (expensesResult === 200) {
      console.log("Loaded Successfully");
    }
    else {
      //alert("cannot fetch the expenses");
      return (<Redirect to="/login" />)
    }
    let highestExp = Math.max.apply(Math, this.state.allExpenses.map((j) => { return j.amount; }));
    this.setState({ highestExpense: highestExp.toLocaleString() })


    const goalsurl = "http://localhost:8000/api/goal";

    const goalsResponse = await fetch(goalsurl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }).catch(function (error) {
      console.log(error);
    });
    const goalsRes = await goalsResponse.json();
    //console.log(goalsRes)
    await this.setState({ goals: goalsRes.ProfitGoals.data })
    const goalsResult = await goalsResponse.status;
    // console.log(res);
    //console.log(this.state.goals);


    if (goalsResult === 200) {
      console.log("goals are Loaded Successfully");
    }
    else {
      return (<Redirect to="/login" />)
    }
    const Goal = await this.state.goals.filter((goal) => (goal.status == "Yearly"));
    this.setState({ yearlyGoal: Goal[0].target })
    //console.log(this.state.yearlyGoal)
    const Goalm = await this.state.goals.filter((goal) => (goal.status == "Monthly"));
    this.setState({ monthlyGoal: Goalm[0].target.toLocaleString() })

  }



  render() {
    if (!this.state.incomesCategories || !this.state.expensesCategories || !this.state.allIncomes) {
      return (<Redirect to="/login" />)
    }
    const userName = window.localStorage.getItem("user_id")
    const incObj = this.state.incomesCategories
    //console.log(incObj);
    let maxCategoryInc = "";
    let maxValInc = 0;

    Object.keys(incObj).map(k => {
      if (incObj[k] > maxValInc) {
        maxCategoryInc = k;
        maxValInc = incObj[k].toFixed(2);
      }
    });

    const expObj = this.state.expensesCategories
    // console.log(expObj);
    let maxCategoryExp = "";
    let maxValExp = 0;

    Object.keys(expObj).map(L => {
      if (expObj[L] > maxValExp) {
        maxCategoryExp = L;
        maxValExp = expObj[L].toFixed(2);
      }
    });


    return (
      <>
      <div className="card" style={{marginTop:"25px"}}>
        <div className="card-body">
        <div className="row">
          <div className="col-md-9">
            <div className="row add-records">
              <div className="col-4">
                <Link to='/AddIncome' > <i className="d-flex justify-content-center fa fa-plus-circle fa-4x fa-center icon-rounded"></i></Link>
                <div className="d-flex justify-content-center">
                  <h5>Add New Income</h5>
                </div>
              </div>

              <div className="col-4">
                <Link to="/AddExpense" ><i className="d-flex justify-content-center fa fa-plus-circle fa-4x icon-rounded"></i></Link>
                <div className="d-flex justify-content-center">
                  <h5>Add New Expense</h5>
                </div>
              </div>

              <div className="col-4">
                <Link to="/categories" > <i className="d-flex justify-content-center fa fa-plus-circle fa-4x icon-rounded"></i></Link>
                <div className="d-flex justify-content-center">
                  <h5>Add New Category</h5>
                </div>
              </div>
            </div>
        

          <div className="row summary">
            <div className="col-12">
              <div className="row">
                <div className="col-md-4">
                  <div className="card l-bg-green-dark">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-shopping-cart"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">Total Income</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-7">
                          <h2 className="d-flex align-items-center mb-0">
                            {this.state.incomes.toLocaleString()}$
                                </h2>
                        </div>
                        <div className="col-5 text-right">
                          <div className="row">
                            <div className="col-12">
                              <h4>  {maxCategoryInc}</h4>
                            </div>
                          </div>
                          <span>
                            {maxValInc} %
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
                          data-width="50%"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: `${maxValInc}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card l-bg-blue-dark">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-shopping-cart"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">Total Expenses</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-7">
                          <h2 className="d-flex align-items-center mb-0">
                            {this.state.expenses.toLocaleString()}$
                                </h2>
                        </div>
                        <div className="col-5 text-right">
                          <div className="row">
                            <div className="col-12">
                              <h4>  {maxCategoryExp}</h4>
                            </div>
                          </div>
                          <span> {maxValExp} % </span>
                        </div>
                      </div>
                      <div
                        className="progress mt-1 "
                        data-height="8"
                        style={{ height: "8px" }}>
                        <div
                          className="progress-bar l-bg-cyan"
                          role="progressbar"
                          data-width="25%"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: `${maxValExp}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card l-bg-cherry ">
                    <div className="card-statistic-3 p-4">
                      <div className="card-icon card-icon-large">
                        <i className="fas fa-shopping-cart"></i>
                      </div>
                      <div className="mb-4">
                        <h5 className="card-title mb-0">Growth</h5>
                      </div>
                      <div className="row align-items-center mb-2 d-flex">
                        <div className="col-7">
                          <h2 className="d-flex align-items-center mb-0">
                          {(this.state.incomes - this.state.expenses).toLocaleString()}$
                                </h2>
                        </div>
                        <div className="col-5 text-right">
                          <div className="row">
                            <div className="col-12">
                              <h4>  {maxCategoryExp}</h4>
                            </div>
                          </div>
                          

                          <span> {((this.state.incomes - this.state.expenses) / this.state.yearlyGoal * 100).toFixed(2)}% </span>
                        </div>
                      </div>
                      <div
                        className="progress mt-1 "
                        data-height="8"
                        style={{ height: "8px" }}>
                        <div
                          className="progress-bar l-bg-cyan"
                          role="progressbar"
                          data-width="25%"
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: `${maxValExp}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
        

              </div>
            </div>
          </div>

          </div>

          <div className="col-md-3 ">
            <div className="row highest">
            <a className="btn btn-lg btn-success highest-item col-sm-4 col-md-12" href="#">
              <i className="fa fa-trophy fa-2x pull-left"></i>
              <h5>
                <strong> Highest Income </strong>
              </h5>
              <h3 style={{fontWeight:"lighter", fontSize: "25px" }} > {this.state.highestIncome}$</h3>
            </a>
            <a className="btn btn-lg btn-warning highest-item col-sm-4 col-md-12" href="#">
              <i className="fa fa-shopping-cart fa-2x pull-left"></i>
              <h5>
                <strong>Highest Expense</strong>
              </h5>
              <h3 style={{fontWeight:"lighter", fontSize: "25px" }} > {this.state.highestExpense}$</h3>
            </a>
            <a className="btn btn-lg btn-primary highest-item col-sm-4 col-md-12" href="#" >
              <i className="fa fa-flag fa-2x pull-left"></i>
              <h5>
                <strong>Monthly Target</strong>
              </h5>
              <h3 style={{fontWeight:"lighter", fontSize: "25px" }} > {this.state.monthlyGoal}$</h3>
            </a>
            </div>
          </div>
        </div>


        </div>
      </div>



<div className="card">
  <div className="card-body">
  <div className="row">

<div className="col-12 goal-target">
      <div className="col-6">
      <i className="fa fa-flag fa-2x pull-left"></i>
      <h3 className="ml-4">
      <strong>Yearly Goal</strong>
      </h3>
      </div>

      <div className="col-6">

      </div>
      <ProgressBar style={{ height: '35px' }}>
          <ProgressBar
            style={{ height: '35px', fontSize: "20px", fontWeight: "900" }}
            animated
            striped
            variant="success"
            now={`${(this.state.incomes - this.state.expenses) / this.state.yearlyGoal * 100}`}
            key={1}
            label={` ${(this.state.incomes - this.state.expenses).toLocaleString()}$`}
          />
        </ProgressBar>
</div>

</div>
  </div>
</div>
        

      </>
    );
  }
}
export default Home;