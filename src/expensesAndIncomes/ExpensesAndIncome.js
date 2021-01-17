import React, { Component } from 'react'
import Item from './item/Item'
import classes from './expensesAndIncomes.module.css';
import ReactPaginate from 'react-paginate';

export default class ExpensesAndIncome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      incomes: [],
      expenses: [],
      expenseSum: 0,
      incomeSum: 0,
      lastIncomeSelected: 0,
      lastExpenseSelected: 0,
      typesVisibility:{}
    }
    this.transectionReccuringType={};
    this.fromDate = React.createRef();
    this.toDate = React.createRef();
    this.fromDateString=null;
    this.toDateString = null;
    this.sortDateAsc = true;
    this.sortAmountAsc = true;
    this.sortFixedTop = true;
  }

  componentDidMount() {
   this.setPeriod(this.fromDateString,this.toDateString); 
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("old",this.state,"new",nextState);
    if ((nextState.incomes !== this.state.incomes) || (nextState.expenses !== this.state.expenses) || (nextState.typesVisibility !== this.state.typesVisibility)) return true;
    return false;
  }

  async setPeriod(from,to){
    this.transectionReccuringType = {};
    let incomesData = await this.getIncomeData(from,to);
    let expensesData = await this.getExpenseData(from,to);
     
    incomesData.list.sort(
      (a,b)=>{
        return (a.date+"" > b.date+"")?1:-1;
      }
    );
           
    expensesData.list.sort(
      (a,b)=>{
        return (a.date+"" > b.date+"")?1:-1;
      }
    );
    
    let types = {};

    Object.keys(this.transectionReccuringType).map(e=>{
      types[e] = true
    });

    this.setState({ typesVisibility:types, incomes: incomesData.list, pageCount: incomesData.list.length, expenses: expensesData.list, expenseSum: expensesData.sum, incomeSum: incomesData.sum });
  }

  sortDate(){
    this.sortDateAsc = !this.sortDateAsc;

    let incomesData = [...this.state.incomes];
    let expensesData = [...this.state.expenses];
    incomesData.sort(
      (a,b)=>{
        //console.log();
        if(this.sortDateAsc)  return (a.date+"" > b.date+"")?1:-1;
        if(!this.sortDateAsc)  return (a.date+"" > b.date+"")?-1:1;
      }
    ); 
    expensesData.sort(
      (a,b)=>{
        //console.log();
        if(this.sortDateAsc)  return (a.date+"" > b.date+"")?1:-1;
        if(!this.sortDateAsc)  return (a.date+"" > b.date+"")?-1:1;
      }
    ); 
    this.setState({ incomes: incomesData, expenses: expensesData});
  }

  sortAmount(){
    this.sortAmountAsc = !this.sortAmountAsc;

    let incomesData = [...this.state.incomes];
    let expensesData = [...this.state.expenses];
    incomesData.sort(
      (a,b)=>{
        //console.log();
        if(this.sortAmountAsc)  return (a.amount > b.amount)?1:-1;
        if(!this.sortAmountAsc)  return (a.amount > b.amount)?-1:1;
      }
    ); 
    expensesData.sort(
      (a,b)=>{
        //console.log();
        if(this.sortAmountAsc)  return (a.amount > b.amount)?1:-1;
        if(!this.sortAmountAsc)  return (a.amount > b.amount)?-1:1;
      }
    ); 
    this.setState({ incomes: incomesData, expenses: expensesData});
  }

  sortTransectionType(){
    this.sortFixedTop = !this.sortFixedTop;

    let incomesData = [...this.state.incomes];
    let expensesData = [...this.state.expenses];
    incomesData.sort(
      (a,b)=>{
        //console.log();
        if(this.sortAmountAsc)  return (a.type == "fixed")?1:-1;
        if(!this.sortAmountAsc) return (a.type == "fixed")?-1:1;
      }
    ); 
    expensesData.sort(
      (a,b)=>{
        //console.log();
        if(this.sortAmountAsc)  return (a.type == "fixed")?1:-1;
        if(!this.sortAmountAsc) return (a.type == "fixed")?-1:1;
      }
    ); 
    this.setState({ incomes: incomesData, expenses: expensesData});
  }

  async getIncomeData(_from,_to) {
    let firstYear;
    let lastYear;
    let from = _from;
    let to = _to;

    if(_from === null || _to == null){
      firstYear = 2010;
      const date = new Date();
      lastYear = date.getFullYear();
  
      from = `${firstYear}-1-1`;
      to = `${lastYear}-12-31`;
    }

    //TODO the token should be provided by a context
    let token = localStorage.getItem("token");
    console.log("toke", token);

    const config = {
      "headers": {
        "Authorization": "Bearer " + token,
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0"
      },
      "method": "GET",
      "mode": "cors"
    };


    let myData = await fetch(`http://127.0.0.1:8000/api/report/income?startdate=${from}&enddate=${to}`, config)
      .then(res => res.json())
      .then(
        data => {
          let recurringData = [];
          data.recurring_incomes.forEach(element => {
            this.transectionReccuringType[element.type] = true;
            element.due_dates.forEach(dates => {
              recurringData.push(
                {
                  name: element.name,
                  description: element.description,
                  type: element.type,
                  category: element.category,
                  amount: element.amount,
                  date: dates,
                  start_date: element.start_date,
                  end_date: element.end_date,
                  active: false
                }
              )
            });
          });

          data.fixed_incomes.forEach(e=>{
            this.transectionReccuringType[e.type] = true;
          });

          return {
            list: [...recurringData, ...data.fixed_incomes],
            sum: data.total_sum
          }
        }
      ).catch(e => {
        alert("there's an error")
        console.log(e);
      });
    return myData;
  }


  async getExpenseData(_from,_to) {

    let firstYear;
    let lastYear;
    let from = _from;
    let to = _to;

    if(_from === null || _to == null){
      firstYear = 2010;
      const date = new Date();
      lastYear = date.getFullYear();
  
      from = `${firstYear}-1-1`;
      to = `${lastYear}-12-31`;
    }


    //TODO the token should be provided by a context
    let token = localStorage.getItem("token");

    const config = {
      "headers": {
        "Authorization": "Bearer " + token,
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "max-age=0"
      },
      "method": "GET",
      "mode": "cors"
    };


    let myData = await fetch(`http://127.0.0.1:8000/api/report/expense?startdate=${from}&enddate=${to}`, config)
      .then(res => res.json())
      .then(
        data => {
          let recurringData = [];

          data.recurring_expenses.forEach(element => {
            this.transectionReccuringType[element.type] = true;

            element.due_dates.forEach(dates => {
              recurringData.push(
                {
                  name: element.name,
                  description: element.description,
                  type: element.type,
                  category: element.category,
                  amount: element.amount,
                  date: dates,
                  start_date: element.start_date,
                  end_date: element.end_date,
                  active: false
                }
              )
            });
          });

          data.fixed_expenses.forEach(e=>{
            this.transectionReccuringType[e.type] = true;
          });

          return {
            list: [...recurringData, ...data.fixed_expenses],
            sum: data.total_sum
          }
        }
      ).catch(e => {
        alert("there's an error")
        console.log(e);
      });
    return myData;
  }

  handleIncomeClick(index) {
    let newList = [...this.state.incomes];
    newList[index].active = !newList[index].active;
    if (index != this.state.lastIncomeSelected)
      newList[this.state.lastIncomeSelected].active = false;
    this.setState({ incomes: newList, lastIncomeSelected: index });
  }
  
  setVisibility(e){
    let visible = !this.state.typesVisibility[e];
    let obj = {...this.state.typesVisibility};
    obj[e] = visible;
console.log(obj);
    this.setState({typesVisibility:obj});

  }

  handleExpenseClick(index) {
    let newList = [...this.state.expenses];
    newList[index].active = !newList[index].active;
    if (index != this.state.lastExpenseSelected)
      newList[this.state.lastExpenseSelected].active = false;
    this.setState({ expenses: newList, lastExpenseSelected: index });
  }

  updatePeriod(e){
    let dateFrom = new Date(this.fromDate.current.value);
    let dateTo = new Date(this.toDate.current.value);
    if(dateFrom.getTime()>dateTo.getTime()) {
      alert("Please select a valid period");
      return;
    }

    this.setPeriod(this.fromDate.current.value,this.toDate.current.value);
    }

  render() {
    return (
      <>
      <div className={"row "+classes.FilterBar}>
        <div className="col-md-3">
          <h2>Period</h2>
        </div>
        <div className="col-md-3">
          <label htmlFor="from">From:  </label>
          <input ref={this.fromDate} id="from" type="date"/>
        </div>
        <div className="col-md-3">
          <label htmlFor="to">To:</label>
          <input ref={this.toDate}  id="to" type="date"/>
        </div>
        <div className="col-md-3">
          <button onClick={(e)=>{this.updatePeriod(e)}} className="btn btn-primary ">Filter</button>
        </div>
        <button onClick={()=>{this.sortDate()}}>Date</button>
        <button onClick={()=>{this.sortAmount()}}>Amount</button>
    
    <div> 
      {Object.keys(this.state.typesVisibility).map(
        e =>{
          return <><label htmlFor={e}>{e}</label> <input checked={this.state.typesVisibility[e]} id={e} type="checkbox" onChange={()=>{this.setVisibility(e)}}/></>
        }
      )}
    </div>
      </div>
        <div className="row">
          <div className="col-md-6">
            <h1>Incomes:</h1> 
            <ul className={classes.List}>
              {
                this.state.incomes.map((e, index) =>
                  <li key={index} >
                    <Item
                      index={index}
                      data={e}
                      visible={this.state.typesVisibility[e.type]}
                      onClick={this.handleIncomeClick.bind(this)}
                      incomeExpense="Income"
                    />
                  </li>
                )
              }
            </ul>
            <div className={classes.Total}>
              <b>Total:</b>
              <span>{this.state.incomeSum}</span>
            </div>
          </div>
          <div className="col-md-6">
            <h1>Expeses:</h1>
            <ul className={classes.List}>
              {
                this.state.expenses.map((e, index) =>
                
               <li key={index} >
                <Item
                  index={index}
                  visible={this.state.typesVisibility[e.type]}
                  data={e}
                  onClick={this.handleExpenseClick.bind(this)}
                  incomeExpense="Expense"
                />
              </li>
                )
              }
            </ul>
            <div className={classes.Total}>
              <b>Total:</b>
              <span>{this.state.expenseSum}</span>
            </div>
          </div>
        </div>
        
      </>
    )
  }
}