import React from 'react';
import { Button} from 'react-bootstrap';
import Menu from '../menu/menu'



class AddExpense extends React.Component{
    constructor(props) {
        super(props);
        this.myFixed = React.createRef();
        this.myRecurring = React.createRef();
         }
         state={
             categories:[]
         }

      //-----------------------------------------------------------------------------------------------------------//
      //         fetching categories using api, set categories state and sending token from locale storage         //
      //-----------------------------------------------------------------------------------------------------------//
      async componentDidMount(){
          
        this.myRecurring.current.style.display="none";

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
        const repeated= e.target.repeated.value;

      //-----------------------------------------------------------------------------------------------------------//
      //                   calculate the end date for recurring expenses and reformat the date output              //
      //-----------------------------------------------------------------------------------------------------------//
        const end_date=()=>{
            var d=new Date(start_date);  //2020-01-01
            var val=e.target.type_id.value;
            var db_date_format="";
            var n="";
            
            if(val===2 && period==="weekly"){
               
                var newWeek= d.setDate(d.getDate(start_date)+(repeated*7));
                n = d.toISOString(newWeek);
                db_date_format=new Intl.DateTimeFormat('fr-ca', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(Date.parse(n)))
                
            }
            else if(val===2 && period==="monthly"){
                
                var newMonth= d.setMonth(d.getMonth(start_date)+(repeated*1));
                n = d.toISOString(newMonth);
                db_date_format=new Intl.DateTimeFormat('fr-ca', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(Date.parse(n)))
                
            }
            else if(val===2 && period==="yearly"){
                var newYear= d.setFullYear(d  .getFullYear(start_date)+(repeated*1));
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
            date:date,
            category_id:category_id,
            type_id:type_id(),
            start_date:start_date,
            end_date:end_date()
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
            <div style={{overFlowX:"hidden"}}>

              <div className="row row-content">
                <div className="col">
                  <Menu/>
                </div>

                  <div className="col-9">
                <div className="col-12">
                  <h2> <i className="fa fa-line-chart" aria-hidden="true" style={{paddingRight:"2%"}}></i> Add Expense </h2>
                </div>
              
              <form  method="POST" onSubmit={this.createExpense} >
              <h6>Expense Type</h6>
                  <div className="form-group row ">
                    
                    <div className="col-3">
                  <label htmlFor="fixed" className="col-form-label"> Fixed
                    <input type="radio" className="form-control" id="fixed" name="type_id" value="1" onChange={this.Switch} defaultChecked />
                    </label></div>

                    <div className="col-3"> 
                    <label htmlFor="recurring"  className="col-form-label">Recurring
                    <input type="radio" className="form-control" id="recurring" name="type_id" value="2" onChange={this.Switch}/>
                    </label></div>
                   </div>
              
                  
                      <div className="form-group row ">
                      <div className="col-10">
                         <label htmlFor="name" className="col-form-label"> Title: </label>
                           <input type="text" name="name" id="name"  placeholder="Enter a title" style={{paddingRight:"80%"}} />
                          </div>
                      </div>  

                      <div className="form-group row ">
                      <div className="col-10">
                         <label  htmlFor="description" className="col-form-label"> Description: </label>
                           <input type="text" name="description" id="description"  placeholder="Enter a description" style={{paddingRight:"80%"}} />
                          </div>
                      </div>

                       <div className="form-group row ">
                      <div className="col-10">
                         <label  htmlFor="amount" className="col-form-label"> Amount: </label>
                           <input type="number" name="amount" id="Amount"  placeholder="Enter an amount" style={{paddingRight:"80%"}} />
                          </div>
                      </div>  

                     <div className="row form-group" ref={this.myFixed}>
                        <div className="col-10">
                           <label  htmlFor="date" className="col-form-label"> Date: </label>
                           <input type="date" name="date" id="date"  style={{paddingRight:"85%"}} />
                          </div>
                      </div>

                      <div className="form-group row">
                         <div className="col-2">
                           <label htmlFor="category_id">Choose a category </label>
                           </div>
                           <div className="col-3"  >
                           <select id="category_id" name="category_id" style={{paddingRight:"50%"}}>
                               {this.state.categories.map(cat=>(
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                 ))}
                              </select>
                          </div></div>


                      <div  ref={this.myRecurring}>
                        <div className="form-group row">
                         <div className="col-10">
                           <label htmlFor="start_date"> Start Date </label>
                           <input type="date" name="start_date" id="start_date" style={{paddingRight:"85%"}}/>
                          </div>
                        </div>

                        <div className="form-group row">
                         <div className="col-2">
                           <label htmlFor="period">Choose a period </label>
                           </div>
                           <div className="col-3"  >
                              <select id="period" name="period" style={{paddingRight:"50%"}}>
                                <option value="yearly">Yearly</option>
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                              </select>
                          </div>
                        
                       
                         <div className="col-2">
                           <label htmlFor="repeated"> Repeated </label>
                           </div>
                           <div className="col-3">
                           <input type="number" name="repeated" id="repeated"  placeholder="Enter a number" style={{paddingRight:"30%"}}/>
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
          </>
        );
    }
}
export default AddExpense;