import React from "react";
import "./Users.css";

import { Link } from "react-router-dom";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Users extends React.Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    const url = "http://localhost:8000/api/users";
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
    console.log(result);
    this.setState({ users: result.user });
    console.log("hi", this.state.users);
  }
  deleteusers = async (id) => {
    const token = window.localStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = `http://localhost:8000/api/user/${id}`;

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      const refrechusers = this.state.users.filter((users) => users.id !== id);
      this.setState({ users: refrechusers });
    } catch (error) {
      console.log(error);
    }
  };
  createusers = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };
    console.log(name);
    const url = `http://localhost:8000/api/users`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log(result);
    e.target.name.value = "";
    //this.setState({ role: "" });
    this.componentDidMount();
    //this.componentDidUpdate();
  };
  //};

  render() {
    return (
      <div className="tbl">
        <form onSubmit={this.createusers}>
          <input type="text" name="name" placeholder="insert name"></input>
          <input type="text" name="email" placeholder="insert email"></input>

          <input type="text" name="password" placeholder="insert password" />
          <input type="submit" name="add" placeholder="add user" />
        </form>

        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>name</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {this.state.users.map((users, index) => (
                <tr key={index}>
                  <td> {users.id}</td>
                  <td>{users.name}</td>

                  <td>
                    <div>
                      {/* {/* <Link
                        to={{
                          pathname: `/category/edit/${category.id} `,
                          state: { category },
                        }}
                      >
                        {/* <FaIcons.FaEdit />
                      </Link> */}

                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => this.deleteusers(users.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Users;
