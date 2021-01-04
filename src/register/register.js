import React from "react";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  state = {
    autho: 0,
    err: "",
  };

  registerCheck = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/api/register";
    const body = {
      name: e.target.adminName.value,
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

    const result = await response.status;
    this.setState({ autho: result });
    console.log(result);

    if (result == 200) {
      alert("Successful Registration");
      console.log(response);
    } else {
      alert("Email or Password is Wrong");
    }
  };

  render() {
    if (this.state.autho === 200) {
      return <Redirect to="./login" />;
    }

    return (
      <>
        <div id="page-wrapper">
          <div className="main-page signup-page">
            <h2 className="title1">SignUp Here</h2>
            <div className="sign-up-row widget-shadow">
              <h5>Personal Information :</h5>
              <form onSubmit={this.registerCheck} method="post">
                <div className="sign-u">
                  <input
                    type="text"
                    name="adminName"
                    placeholder="Name"
                    required=""
                  />
                  <div className="clearfix"> </div>
                </div>

                <div className="sign-u">
                  <input
                    type="email"
                    name="adminEmail"
                    placeholder="Email Address"
                    required=""
                  />
                  <div className="clearfix"> </div>
                </div>

                <h6>Login Information :</h6>
                <div className="sign-u">
                  <input
                    type="password"
                    name="adminPassword"
                    placeholder="Password"
                    required=""
                  />
                  <div className="clearfix"> </div>
                </div>
                <div className="sign-u">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required=""
                  />
                </div>
                <div className="clearfix"> </div>
                <div className="sub_home">
                  <input type="submit" value="Submit" />
                  <div className="clearfix"> </div>
                </div>
                <div className="registration">
                  Already Registered.
                  <a className="" href="./login">
                    Login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Register;
