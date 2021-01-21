import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import BarChart from './barchart/BarChart';
import Classes from "./report.module.css";
import PieChar from './pieCharContainer/pieChar/PieChar';
import Menu from "../menu/menu";
import PieChartContainer from './pieCharContainer/PieChartContainer';
export default class Report extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      incomeCategoriesPercentage: [],
      expenseCategoriesPercentage: [],

      chartdata: {
        labels: [],
        datasets: [
          {
            label: "income",
            data: [

            ],
            backgroundColor:
              "rgba(259,0,0,0.6)"
          },
          {
            label: "expenses",
            data: [

            ],
            backgroundColor: "rgba(52,147,54,0.6)"
          },
          {
            label: "profit",
            data: [

            ],
            backgroundColor: "rgba(85,47,200,0.6)"
          }
        ],
        options: {
          plugins: {
            datalabels: {
              display: false
            },
            labels: {
              display: false
            }
          }
        }

      },
      focusedPeriod: "ALL",
      loading: true,
      dateNavigationTracker: []
    }
    this.populateDataYears();
  }


  //Vars
  periodStackIndex = 0;
  //displayedDates = []; // will be used to track know what date the user want us to displayed
  year = 0; // this will be used while listing the weeks and days
  month = 0; // this will be used to list days 
  week = {}; // {start:x , end:y}

  componentDidMount() {
    //this.setState({ dateNavigationTracker: this.state.dateNavigationTracker.push(this.state.chartdata) });
    let arr = [...this.state.dateNavigationTracker];
    arr.push(this.state.chartdata);
    this.setState({dateNavigationTracker:arr}); 
  }

  async getIncomeData(from, to) {
    this.setState({ loading: true });
    //TODO the token should be provided by a context
    let token = localStorage.getItem("token");
    try {
      let response = await fetch(`http://127.0.0.1:8000/api/report/income?startdate=${from}&enddate=${to}`, {
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
      });

      let data = await response.json();
      return await data;
    }
    catch (e) {
      alert("there's an error")
      console.log(e);
    }
  }

  async getExpenseData(from, to) {
    this.setState({ loading: true });
    //TODO the token should be provided by a context
    let token = localStorage.getItem("token");
    try {
      let response = await fetch(`http://127.0.0.1:8000/api/report/expense?startdate=${from}&enddate=${to}`, {
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
      });

      let data = await response.json();

      return await data;
    }
    catch (e) {
      alert("there's an error")
      console.log(e);
    }
  }

  async populateDataYears() {
    let firstYear = 2010;
    const date = new Date();
    let lastYear = date.getFullYear();

    let labels = [];
    let chartIncomeData = [];
    let chartExpenseData = [];
    let chartProfitData = [];

    let incomeData = null;
    let expenseData = null;

    for (let year = firstYear; year <= lastYear; year++) {

      incomeData = await this.getIncomeData(
        year + "-1-1",
        year + "-12-31"
      );

      expenseData = await this.getExpenseData(
        year + "-1-1",
        year + "-12-31"
      );

      labels.push(year)
      chartIncomeData.push(await incomeData.total_sum);
      chartExpenseData.push(await expenseData.total_sum);
      chartProfitData.push(await incomeData.total_sum - await +expenseData.total_sum);
      // this.displayedDates.push = { from: year + "1-1", to: year + "-12-31" }
    }

    this.setState(state => {
      state.chartdata.labels = labels;
      state.chartdata.datasets[0].data = chartIncomeData;
      state.chartdata.datasets[1].data = chartExpenseData;
      state.chartdata.datasets[2].data = chartProfitData;
      state.incomeCategoriesPercentage = incomeData.amount_per_category;
      state.expenseCategoriesPercentage = expenseData.amount_per_category;

      state.loading = false;
      return state;
    })

      
  }

  async populateDataMonths(year) {

    let labels = [];
    let chartIncomeData = [];
    let chartExpenseData = [];
    let chartProfitData = [];

    let incomeData = null;
    let expenseData = null;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    this.year = year; //save the current year

    for (let month = 1; month <= 12; month++) {
      let lastDay = new Date(year, month + 1, 0);

      incomeData = await this.getIncomeData(
        `${year}-${month}-1`,
        `${year}-12-${lastDay.getDate()}`
      );

      expenseData = await this.getExpenseData(
        `${year}-${month}-1`,
        `${year}-12-${lastDay.getDate()}`
      );

      labels.push(monthNames[month - 1]);
      chartIncomeData.push(await incomeData.total_sum);
      chartExpenseData.push(await expenseData.total_sum);
      chartProfitData.push(await incomeData.total_sum - await expenseData.total_sum);

      // this.displayedDates.push = { from: year+"-"+month+"-"+1, to: year + "-12-"+lastDay.getDate()}
    }

    this.setState(state => {
      state.chartdata.labels = labels;
      state.chartdata.datasets[0].data = chartIncomeData;
      state.chartdata.datasets[1].data = chartExpenseData;
      state.chartdata.datasets[2].data = chartProfitData;
      state.loading = false;

      state.incomeCategoriesPercentage = incomeData.amount_per_category;
      state.expenseCategoriesPercentage = expenseData.amount_per_category;
      return state;
    })

  }

  async populateDataWeeks(month) {

    let labels = [];
    let chartIncomeData = [];
    let chartExpenseData = [];
    let chartProfitData = [];

    let incomeData = null;
    let expenseData = null;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthNumber = monthNames.indexOf(month);
    const weeks = this.getWeeksInMonth(monthNumber, this.year);

    this.month = monthNumber; // save the current

    for (let i = 0; i < weeks.length; i++) {

      incomeData = await this.getIncomeData(
        `${this.year}-${monthNumber + 1}-${weeks[i].start}`,
        `${this.year}-${monthNumber + 1}-${weeks[i].end}`
      );

      expenseData = await this.getExpenseData(
        `${this.year}-${monthNumber + 1}-${weeks[i].start}`,
        `${this.year}-${monthNumber + 1}-${weeks[i].end}`
      );

      labels.push(`${weeks[i].start} > ${weeks[i].end}`);
      chartIncomeData.push(await incomeData.total_sum);
      chartExpenseData.push(await expenseData.total_sum);
      chartProfitData.push(await incomeData.total_sum - await expenseData.total_sum);

      // this.displayedDates.push = { from : `${this.year}-${monthNumber+1}-${weeks[i].start}` , to : `${this.year}-${monthNumber+1}-${weeks[i].end}`}
    }

    this.setState(state => {
      state.chartdata.labels = labels;
      state.chartdata.datasets[0].data = chartIncomeData;
      state.chartdata.datasets[1].data = chartExpenseData;
      state.chartdata.datasets[2].data = chartProfitData;

      state.incomeCategoriesPercentage = incomeData.amount_per_category;
      state.expenseCategoriesPercentage = expenseData.amount_per_category;
      state.loading = false;
      return state;
    })
  }

  getWeeksInMonth(month, year) {
    var weeks = [],
      firstDate = new Date(year, month, 1),
      lastDate = new Date(year, month + 1, 0),
      numDays = lastDate.getDate();

    var start = 1;
    var end = 8 - firstDate.getDay();
    while (start <= numDays) {
      weeks.push({ start: start, end: end });
      start = end + 1;
      end = end + 7;
      if (end > numDays)
        end = numDays;
    }
    return weeks;
  }

  /**
   * @param string ex: 1 > 7
   */
  async populateDataDays(week) {
    let [start, end] = week.split(" > ");

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    let labels = [];
    let chartIncomeData = [];
    let chartExpenseData = [];
    let chartProfitData = [];

    let incomeData = null;
    let expenseData = null;

    for (let i = start; i <= end; i++) {

      incomeData = await this.getIncomeData(
        `${this.year}-${this.month + 1}-${i}`,
        `${this.year}-${this.month + 1}-${i}`
      );

      expenseData = await this.getExpenseData(
        `${this.year}-${this.month + 1}-${i}`,
        `${this.year}-${this.month + 1}-${i}`
      );

      var d = new Date(`${this.year}-${this.month + 1}-${i}`);
      var dayName = days[d.getDay()];
      labels.push(`${dayName} ${i}`);
      chartIncomeData.push(await incomeData.total_sum);
      chartExpenseData.push(await expenseData.total_sum);
      chartProfitData.push(await incomeData.total_sum - await expenseData.total_sum);

      // this.displayedDates.push = { from: `${this.year}-${this.month+1}-${i}`, to: `${this.year}-${this.month+1}-${i}`}
    }

    this.setState(state => {
      state.chartdata.labels = labels;
      state.chartdata.datasets[0].data = chartIncomeData;
      state.chartdata.datasets[1].data = chartExpenseData;
      state.chartdata.datasets[2].data = chartProfitData;
      state.loading = false;
      state.incomeCategoriesPercentage = incomeData.amount_per_category;
      state.expenseCategoriesPercentage = expenseData.amount_per_category;
      return state;
    })
  }

  async changePeriodFocus(elems) {
    if (!elems || !elems.length || await this.state.loading || this.periodStackIndex === 3) return;

    const periodStack = ["ALL", "YEAR", "MONTH", "WEEK"];
    this.periodStackIndex = (this.periodStackIndex + 1) % periodStack.length;

    if (periodStack[this.periodStackIndex] === "ALL") {
      this.populateDataYears();
    }
    if (periodStack[this.periodStackIndex] === "YEAR") {
      this.populateDataMonths(
        this.state.chartdata.labels[elems[0]._index]
      );
    }
    if (periodStack[this.periodStackIndex] === "MONTH") {
      this.populateDataWeeks(
        this.state.chartdata.labels[elems[0]._index]
      );
    }
    if (periodStack[this.periodStackIndex] === "WEEK") {
      this.populateDataDays(
        this.state.chartdata.labels[elems[0]._index]
      );
    }
  }

  async goBack() {
    console.log("Navigation Tracker",this.state.dateNavigationTracker);
    if (!this.state.dateNavigationTracker.length) return;
    let dateArr = [...this.state.dateNavigationTracker];
    dateArr.pop();

    this.setState({
      dateNavigationTracker: dateArr,
      chartdata: dateArr[dateArr.length - 1]
    });

    console.log(await this.state);
  }

  render() {
    console.log(this.dateNavigationTracker);
    return <>
      <div className="card" style={{ marginTop: "25px" }}>
        <button className="btn btn-primary" onClick={()=>{this.goBack()}}>Back</button>
        <div className="card-body">
          <BarChart data={this.state.chartdata} changePeriodFocus={this.changePeriodFocus.bind(this)} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <div className="card ">
            <div className="card-body">
              <div className="d-flex flex-column">
                <h2>Income Per Category</h2>
                <PieChartContainer data={this.state.incomeCategoriesPercentage} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xs-12">
          <div className="card ">
            <div className="card-body">
              <div className="d-flex flex-column">
                <h2>Expense Per Category</h2>
                <PieChartContainer data={this.state.expenseCategoriesPercentage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  }
}