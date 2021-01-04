import React from 'react';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css';
import Menu from '../menu/menu.js';


class Home extends React.Component{

  state={
    incomes:[],
    expenses:[]
  }

  async componentDidMount(){


//----------------------------------------------------------------------------------------//
//                                fetch Incomes                                           //
//----------------------------------------------------------------------------------------//
    const incomesurl = "http://localhost:8000/api/incomes";
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
    this.setState({incomes:incomesRes.income})
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

    const expensesurl = "http://localhost:8000/api/expenses";
   
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
    this.setState({expenses:expensesRes.expense})
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

const TotalIncome=()=>{
  var t=0;
  this.state.incomes.map((income)=>(
    t=income.amount+t
  ))
  return t;
}

const TotalExpense=()=>{
  var t=0;
  this.state.expenses.map((expense)=>(
    t=expense.amount+t
  ))
  return t;
}
 const TotalGrowth=()=>{
  var t=0;
  t= TotalIncome()-TotalExpense();
  return t;
 }
        return (
            <>
           
{/* <div>
  {this.state.incomes.map((income) => (
    <div key={income.id}>
    <ul >
      <li>{income.name}</li>
      <li>{income.description}</li>
      <li>{income.amount}</li>
    </ul>
    </div>
  ))}
</div> */}
<div className="cbp-spmenu-push">

	<div className="main-content">
  
  
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
        </div>
            </>
        )
    }
}
export default Home;