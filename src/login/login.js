  import React from "react";
import { Redirect } from 'react-router-dom';
import './login.css';

class Login extends React.Component {
  state = {
    autho: 0,
    err: ""
  };

  loginCheck = async (e) => {
      e.preventDefault();
   

    const url = "http://localhost:8000/api/login";
    const body = {
      email: e.target.adminEmail.value,
      password: e.target.adminPassword.value,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).catch(function (error) {
      console.log(error);
    });
    console.log(response)
    const res = await response.json();
    console.log(res);
    const result = await response.status;
    
    if (result == 200) {
          alert("Login Successfully");
          var accessToken = res.access_token;
          this.setState({ autho: result });
        window.localStorage.setItem("token",accessToken)
          
            console.log(res);
            
    } 
    else {
      alert("Login Failed");
    }
  }

  render() {
    if(this.state.autho===200){
        return(
            <Redirect to= './home'/>
        )
    }
   
    return (

        <>


<div className=" loginRoot">
  <div className="container ">
    <div className="row ">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto ">
        <div className="card card-signin my-5 ">
          <div className="card-body">
            <h5 className="card-title text-center">Sign In</h5>
            <form className="form-signin" onSubmit={this.loginCheck} method="post">
              <div className="form-label-group">
                <input type="email" name="adminEmail" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                <label htmlFor="inputEmail">Email address</label>
              </div>

              <div className="form-label-group">
                <input type="password" name="adminPassword" id="inputPassword" className="form-control" placeholder="Password" required/>
                <label htmlFor="inputPassword">Password</label>
              </div>

              <div className="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
              </div>
              <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
              <hr className="my-4"/>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* <div id="page-wrapper">
			<div className="main-page login-page ">

				   <h2 className="title1">Login</h2>
				<div className="widget-shadow">
					<div className="login-body">

						<form onSubmit={this.loginCheck} method="post">
							<input type="email" className="user" name="adminEmail" placeholder="Enter Your Email" required=""/>
							<input type="password" name="adminPassword" className="lock" placeholder="Password" required=""/>
							<div className="forgot-grid">
								<label className="checkbox"><input type="checkbox" name="checkbox" /><i></i>Remember me</label>
								<div className="forgot">
									<a href="#">forgot password?</a>
								</div>
								<div className="clearfix"> </div>
							</div>
							<input type="submit" name="Sign In" value="Sign In"/>
							<div className="registration">
								Don't have an account ?
								<a className="" href="./register">
									Create an account
								</a>
							</div>
						</form>
					</div>
				</div>
				
			</div>
		</div> */}
 </>
    );
  }
}
export default Login;
