import React from 'react';
import { Button } from 'react-bootstrap';
import Menu from '../menu/menu'



class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.myFixed = React.createRef();
    this.myRecurring = React.createRef();
  }
  state = {
    categories: []
  }
  fixed = true;
  getTypes = async () => {
    const url = "http://localhost:8000/api/type";
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const result = await response.json();
    return result.types;
  }
  //-----------------------------------------------------------------------------------------------------------//
  //         fetching categories using api, set categories state and sending token from locale storage         //
  //-----------------------------------------------------------------------------------------------------------//
  async componentDidMount() {

    this.myRecurring.current.style.display = "none";

    const url = "http://localhost:8000/api/category";
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    //console.log(response);
    const result = await response.json();
    //console.log(result);
    this.setState({ categories: result.categories.data });
    console.log("hi", this.state.categories);
  }

  //-----------------------------------------------------------------------------------------------------------//
  //                    Create Expense function allows the user to add NEW income record                       //
  //-----------------------------------------------------------------------------------------------------------//

  createExpense = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");

    const name = e.target.name.value;
    const description = e.target.description.value;
    const amount = e.target.amount.value;
    const date = e.target.date.value;
    const category_id = e.target.category_id.value;
    const start_date = e.target.start_date.value
    const period = e.target.period.value;
    const repeated = e.target.repeated.value;

    //-----------------------------------------------------------------------------------------------------------//
    //                   calculate the end date for recurring expenses and reformat the date output              //
    //-----------------------------------------------------------------------------------------------------------//
    const end_date = () => {
      var d = new Date(start_date);  //2020-01-01
      var val = e.target.type_id.value;
      var db_date_format = "";
      var n = "";

      if (val === 2 && period === "weekly") {
        var newWeek = d.setDate(d.getDate(start_date) + (repeated * 7));
        n = d.toISOString(newWeek);
        db_date_format = new Intl.DateTimeFormat('fr-ca', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(Date.parse(n)))

      }
      else if (val === 2 && period === "monthly") {

        var newMonth = d.setMonth(d.getMonth(start_date) + (repeated * 1));
        n = d.toISOString(newMonth);
        db_date_format = new Intl.DateTimeFormat('fr-ca', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(Date.parse(n)))

      }
      else if (val === 2 && period === "yearly") {
        var newYear = d.setFullYear(d.getFullYear(start_date) + (repeated * 1));
        n = d.toISOString(newYear);
        db_date_format = new Intl.DateTimeFormat('fr-ca', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(Date.parse(n)))

      }
      return db_date_format;
    }


    const type_id = async () => {
      let types = await this.getTypes();
      if (this.fixed) return types.filter((e) => { return e.name === "fixed" })[0].id;
      let filterd = types.filter((e) => { return e.name === period });
      return filterd[0].id;
    }

    console.log("End Date --> ", end_date());
    console.log("Type ID --> ", type_id());

    //-----------------------------------------------------------------------------------------------------------//
    //                 fetching the expenses using api and sending token from locale storage                     //
    //-----------------------------------------------------------------------------------------------------------//
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        amount: amount,
        date: date,
        category_id: category_id,
        type_id: await type_id(),
        start_date: start_date,
        end_date: end_date()
      }),
    };

    const url = `http://localhost:8000/api/expense`;
    const response = await fetch(url, requestOptions);
    //const result = await response.json();
    console.log(response);
    await e.target.reset();


  };

  //-----------------------------------------------------------------------------------------------------------//
  //                      the end of create income function and start switch inputs function                   //
  //-----------------------------------------------------------------------------------------------------------//

  Switch = async (e) => {
    var val = e.target.value;
    console.log("my Recurring ", this.myRecurring.current.style.display)
    console.log("my Fixed ", this.myFixed.current)

    if (val == 2) {
      this.fixed = false;
      this.myRecurring.current.style.display = "block";
      this.myFixed.current.style.display = "none";
    } else if (val == 1) {
      this.fixed = true;
      this.myRecurring.current.style.display = "none";
      this.myFixed.current.style.display = "block";

    }
    else {
      this.myRecurring.current.style.display = "none";
      this.myFixed.current.style.display = "block";
    }


  }

  render() {
    return (
      <>
        <div className="card" style={{ marginTop: "25px" }}>
          <div className="card-body">
            <form method="POST" onSubmit={this.createExpense} action="#" >
              <h6>Expenses Type</h6>
              <div className="form-group row ">

                <div className="col-3">
                  <label htmlFor="fixed" className="col-form-label"> Fixed
          <input type="radio" className="form-control" id="fixed" name="type_id" value="1" onChange={this.Switch} defaultChecked />
                  </label></div>

                <div className="col-3">
                  <label htmlFor="recurring" className="col-form-label">Recurring
          <input type="radio" className="form-control" id="recurring" name="type_id" value="2" onChange={this.Switch} />
                  </label></div>
              </div>


              <div className="form-group">
                <label htmlFor="name" > Title: </label>
                <input className="form-control" type="text" name="name" id="name" placeholder="Enter a title" />

              </div>

              <div className="form-group">
                <label htmlFor="description"> Description: </label>
                <input className="form-control" type="text" name="description" id="description" placeholder="Enter a description" />

              </div>

              <div class="form-group">
                <label htmlFor="amount">Amount:</label>
                <div class="input-group">
                  <input type="number" name="amount" placeholder="Enter an amount" id="Amount" class="form-control" aria-label="Amount (to the nearest dollar)" />
                  <div class="input-group-append">
                    <span class="input-group-text">$</span>
                  </div>
                </div>
              </div>


              <div className="form-group" ref={this.myFixed}>
                <label htmlFor="date"> Date: </label>
                <input type="date" name="date" class="form-control" id="date" />
              </div>

              <div class="form-group">
                <label htmlFor="category_id">Choose a category:</label>
                <select class="custom-select" id="category_id" name="category_id">
                  {this.state.categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="date-section" style={{ padding: '15px' }} ref={this.myRecurring}>
                <h3>Select Date:</h3>
                <div className="form-inline ">
                  <label htmlFor="start_date">Start Date:</label>
                  <input className="form-control" type="date" name="start_date" id="start_date" />
                </div>

                <div className="form-inline">
                  <label htmlFor="period">Choose The Repeating Interval:</label>
                  <select id="period" name="period" >
                    <option value="yearly">Yearly</option>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div className="form-inline" >
                  <label htmlFor="repeated"> Recurrence:</label>
                  <input className="form-control" type="number" name="repeated" id="repeated" placeholder="Enter a number" />
                </div>
              </div>
              <Button color="primary" type="submit" name="submit">Submit</Button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default AddExpense;