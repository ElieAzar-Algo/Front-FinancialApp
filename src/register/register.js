import React from "react";
import { Redirect } from 'react-router-dom';

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
    if(this.state.autho===200){
        return(
            <Redirect to= './login'/>
        )
    }
    return (
      <div className="register">
        <img src="" />
        <form onSubmit={this.registerCheck} className="registerForm">
          <br></br>

          <input
            type="text"
            name="adminName"
            placeholder="Username"
            className="field"
          />
          <input
            type="text"
            name="adminEmail"
            placeholder="Email"
            className="field"
          />
          <input
            type="password"
            name="adminPassword"
            className="field"
            placeholder="Password"
          />
          <button type="submit" className="submitButton" className="subButton">
            <span>Register</span>
          </button>
        </form>
        <div></div>
      </div>
    );
  }
}
export default Register;
