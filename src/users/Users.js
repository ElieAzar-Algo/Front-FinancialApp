import React from "react";
//import "./pages/users/Users";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Confirm } from "react-st-modal";
import Menu from '../menu/menu'
//import ReactPaginate from "react-js-paginate";
import { Pagination } from "react-bootstrap";
export default class Users extends React.Component {
  state = {
    users: [],
    nextUsers: 8,
    previousUsers: 0,
    activePage: 1,
  };

  async componentDidMount() {
    const url = "http://localhost:8000/api/users?page=1";
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
    this.setState({ users: result.user });
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
    //console.log(result);
    e.target.name.value = "";
    //this.setState({ role: "" });
    this.componentDidMount();
    //this.componentDidUpdate();
  };
  //};

  render() {
    const switchPage = (e) => {
      console.log(e.target.name);
      let action = e.target.name;
      if (action === "next" && this.state.nextUsers < this.state.users.length) {
        let y = this.state.nextUsers + 8;
        let x = this.state.previousUsers + 8;
        this.setState({ previousUsers: x, nextUsers: y });
      } else if (action === "previous" && this.state.previousUsers > 0) {
        let y = this.state.nextUsers - 8;
        let x = this.state.previousUsers - 8;
        this.setState({ previousUsers: x, nextUsers: y });
      }
    };

    return (



      <div className="usersContainer" style={{height:'100vh',width:'100vw'}}>
        <div className="row">
        <div className="col-3" style={{width:"20%",height:"100vh", display:"flex",position:"fixed"}}>
                <Menu  />
              </div>
              <div className="col-9 home-middle-container" style={{marginLeft:"20%"}}>
      <div style={{  height: "90vh", width: "90%" }}
      >
        <div className=" card">
          <div className="card-header" style={{ textAlign: "center" }}>
            <h2>Admins</h2>
          </div>

          <div className="card-body">
            <div className="to">
              <div className="tb">
                <form onSubmit={this.createusers}>
                  <input
                    style={{ margin: "10px" }}
                    type="text"
                    name="name"
                    placeholder=" Name"
                  ></input>
                  <input
                    style={{ margin: "10px" }}
                    type="text"
                    name="email"
                    placeholder=" Email"
                  ></input>

                  <input
                    style={{ margin: "10px" }}
                    type="text"
                    name="password"
                    placeholder=" Password"
                  />
                  <input
                    type="submit"
                    name="add"
                    placeholder="add user"
                    className="btn btn-primary btn-sm"
                    style={{ color: "white" }}
                  />
                </form>
              </div>
              <div className="content-table">
                <table className="table table-hover">
                  <thead>
                    <tr>{/* <th>name</th> */}</tr>
                  </thead>

                  <tbody>
                    {this.state.users
                      .slice(this.state.previousUsers, this.state.nextUsers)
                      .map((users, index) => (
                        <tr key={index}>
                          {/* <td> {users.id}</td> */}
                          <td>{users.name}</td>
                          <td>{users.email}</td>

                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={async () => {
                                const isConfirm = await Confirm(
                                  "Are you sure you want to delete the User?",
                                  "You cannot undo this action"
                                );
                                if (isConfirm) {
                                  this.deleteusers(users.id);
                                }
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <div style={{ marginLeft: "100%" }}>
                    <Pagination onClick={switchPage}>
                      <Pagination.Item name="previous" value="previous">
                        previous
                      </Pagination.Item>
                      <Pagination.Item name="next" value="next">
                        next
                      </Pagination.Item>
                    </Pagination>
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}
