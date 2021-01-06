import React from 'react';



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
        //const type_id = e.target.type_id.value;
        const start_date = e.target.start_date.value
        const end_date = e.target.end_date.value
    
    
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
           // type_id:type_id,
            start_date:start_date,
            end_date:end_date
          }),
        };
        
        const url = `http://localhost:8000/api/income`;
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        console.log(result);
        
      };

      Switch = async (e)=>{
        var val=e.target.value;
        console.log("my Recurring ", this.myRecurring.current.style.display)
        console.log("my Fixed ",this.myFixed.current)
        
        if (val==1){
            this.myRecurring.current.style.display="block";
            this.myFixed.current.style.display="none";
        }else if(val==2){
            this.myRecurring.current.style.display="none";
            this.myFixed.current.style.display="block";

        }
        else{
            this.myRecurring.current.style.display="none";
            this.myFixed.current.style.display="block";
        }

        
      }

    render(){


        return(
            <>



{/* <div className="row row-content">
                   <div className="col-12">
                      <h3>Send us your Feedback</h3>
                   </div>
                    <div className="col-12 col-md-9">
                    <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input"
                                                 /> {' '}
                                                <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div> */}
            <div className="container">
                <div className="row row-content">
                    <form onChange={this.Switch}>
                    <input type="radio" id="fixed" name="type_id" value="2" defaultChecked />
                    <label htmlFor="fixed" > Fixed</label>
                    <input type="radio" id="recurring" name="type_id" value="1"/>
                    <label htmlFor="recurring">Recurring</label>
                    </form>
                    
                 <form method="POST" onSubmit={this.createIncome}  action="#">
                <label > Title
                <input type="text" name="name" id="name" />
                </label>
                <label > Description
                <input type="text" name="description" id="description" />
                </label>
                <label > Amount
                <input type="number" name="amount" id="amount" />
                </label>

            <div ref={this.myFixed} >
                <label > date
                <input type="date" name="date" id="date" />
                </label>
            </div>    


                <label > Category
                <input type="number" name="category_id" id="category" />
                </label>


            <div ref={this.myRecurring} >   
                <label > Start Date
                <input type="date" name="start_date" id="start_date" />
                </label>
                <label htmlFor="period" >Choose a period
                <select id="period" name="period">
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Weekly</option>
                </select>
                </label>
                <label htmlFor="repeated" >Repeated Time
                <input type="number" id="repeated" name="repeated"/>
                </label>
            </div>    


                <input type="submit" name='submit' />
            </form>
                   
        </div>
  </div>
              
               
            </>
        )
    }
}
export default AddIncome;