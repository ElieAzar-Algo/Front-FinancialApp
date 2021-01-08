import React from 'react';
import { Button} from 'react-bootstrap';




const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class AddIncome extends React.Component{
    constructor(props) {
        super(props);
        this.myFixed = React.createRef();
        this.myRecurring = React.createRef();
         }

       
    createIncome = async (e) => {
        e.preventDefault();

        const token = window.localStorage.getItem("token");

        const name = e.target.name.value;
        const description = e.target.description.value;
        const amount = e.target.amount.value;
        const date = e.target.date.value;
        const category_id = e.target.category_id.value;
        const start_date = e.target.start_date.value
        const period = e.target.period.value;
        const repeated= e.target.repeated.value;
       
        const end_date=()=>{
            var d=new Date(start_date);  //2020-01-01
            var db_date_format="";
            var n="";
           
            
            if(period==="weekly"){
               
                var newWeek= d.setDate(d.getDate(start_date)+(repeated*7));
                n = d.toISOString(newWeek);
                db_date_format=new Intl.DateTimeFormat('fr-ca', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(Date.parse(n)))
                
            }
            else if(period==="monthly"){
                
                var newMonth= d.setMonth(d.getMonth(start_date)+(repeated*1));
                n = d.toISOString(newMonth);
                db_date_format=new Intl.DateTimeFormat('fr-ca', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(Date.parse(n)))
                
            }
            else if(period==="yearly"){
                var newYear= d.setFullYear(d.getFullYear(start_date)+(repeated*1));
                n = d.toISOString(newYear);
                db_date_format=new Intl.DateTimeFormat('fr-ca', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(Date.parse(n)))
                
            }
            return db_date_format;
        }
        const type_id=()=>{
            let type=1;
            if(period==="weekly"){
                type=2;
            }
            else if(period==="monthly"){
                type=3;
            }
            else if(period==="yearly"){
                type=4;
            }
            return type;
        }
        
        console.log("End Date --> ",end_date()); 
        console.log("Type ID --> ",type_id());  
    
    
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
            date:date,
            category_id:category_id,
            type_id:type_id(),
            start_date:start_date,
            end_date:end_date()
          }),
        };
        
        const url = `http://localhost:8000/api/income`;
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        console.log(result);
        
      };
      //-----------------------------------------------------------------------------------------------------------//
      //                      the end of create income function and start switch inputs function                   //
      //-----------------------------------------------------------------------------------------------------------//

      Switch = async (e)=>{
        var val=e.target.value;
        console.log("my Recurring ", this.myRecurring.current.style.display)
        console.log("my Fixed ",this.myFixed.current)
        
        if (val==2){
            this.myRecurring.current.style.display="block";
            this.myFixed.current.style.display="none";
        }else if(val==1){
            this.myRecurring.current.style.display="none";
            this.myFixed.current.style.display="block";

        }
        else{
            this.myRecurring.current.style.display="none";
            this.myFixed.current.style.display="block";
        }

        
      }

    render(){


        return (
          <>
            <div className="container">
              <div className="row row-content">
                <div className="col-12">
                  <h3>Add Income</h3>
                </div>
              </div>
              <div className="row row-content">
                <div className="col-12">
                  <form onChange={this.Switch}>
                    <input type="radio"id="fixed" name="type_id" value="1"defaultChecked />
                    <label htmlFor="fixed"> Fixed</label>
                    <input type="radio" id="recurring" name="type_id" value="2"/>
                    <label htmlFor="recurring">Recurring</label>
                  </form>
                </div>
              </div>

              <div className="row row-content">
                <div className="col-12">
                  <div className="container">
                    <form method="POST" onSubmit={this.createIncome} action="#">

                      <div className="row row-content">
                        <div className="col-2">
                          <label htmlFor="name"> Title</label>
                        </div>
                        <div>
                          <input type="text" name="name" id="name" />
                        </div>
                      </div>

                      <div className="row row-content">
                        <div className="col-2">
                          <label htmlFor="description"> Description</label>
                        </div>
                        <div>
                          <input type="text" name="description" id="description"/>
                        </div>
                      </div>

                      <div className="row row-content">
                        <div className="col-2">
                          <label htmlFor="amount"> Amount</label>
                        </div>
                        <div>
                          <input type="number" name="amount" id="amount" />
                        </div>
                      </div>

                      <div className="row row-content" ref={this.myFixed}>
                        <div className="col-2">
                          <label htmlFor="date"> Date</label>
                        </div>
                        <div>
                          <input type="date" name="date" id="date" />
                        </div>
                      </div>

                      <div className="row row-content">
                        <div className="col-2">
                          <label htmlFor="category_id"> Category</label>
                        </div>
                        <div>
                          <input type="number" name="category_id" id="category"/>
                        </div>
                      </div>

                      <div className="row row-content" ref={this.myRecurring}>
                        <div className="col-4">
                          <div className="container">
                            <div className="row">
                              <div className="col-6">
                                <label htmlFor="start_date"> Start Date</label>
                              </div>
                              <div className="col-4 offset-1">
                                <input
                                  type="date"
                                  name="start_date"
                                  id="start_date"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-4 offset-1">
                          <div className="container">
                            <div className="row">
                              <div className="col-6">
                                <label htmlFor="period">Choose a period</label>
                              </div>
                              <div className="col-6">
                                <select id="period" name="period">
                                  <option value="yearly">Yearly</option>
                                  <option value="monthly">Monthly</option>
                                  <option value="weekly">Weekly</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-2">
                          <div className="container">
                            <div className="row">
                              <div className="col-6">
                                <label htmlFor="repeated"> Repeated</label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="number"
                                  name="repeated"
                                  id="repeated"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button color="primary" type="submit" name="submit">
                        Submit
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
}
export default AddIncome;