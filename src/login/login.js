  import React from "react";
import './login.css'
//import { Redirect } from 'react-router-dom';

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

    const res = await response.json();
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
    // if(this.state.autho===200){
    //     return(
    //         <Redirect to= './home'/>
    //     )
    // }
    return (

        <>


<div id="page-wrapper">
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
								<a className="" href="signup.html">
									Create an account
								</a>
							</div>
						</form>
					</div>
				</div>
				
			</div>
		</div>
 </>
    );
  }
}
export default Login;
