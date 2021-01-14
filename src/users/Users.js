import React from "react";
//import "./Users.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Confirm } from "react-st-modal";
//import ReactPaginate from "react-js-paginate";
import { Pagination } from "react-bootstrap";
class Users extends React.Component {
  state = {
    users: [],
    nextUsers:8,
    previousUsers:0,
    activePage:1
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
    //console.log(response);
    const result = await response.json();
   // console.log(result);
    this.setState({ users: result.user });
   // console.log("hi", this.state.users);
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
    let active = this.state.activePage;
let items = [];
for (let number = 1; number <= ((this.state.users.length)/8)+1  ; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}
 const switchPage=(e)=>{
  console.log(e.target.active)
   let y=this.state.nextUsers+8;
   let x=this.state.previousUsers+8
   //let a=this.state.activePage+1
   this.setState({previousUsers:x,nextUsers:y})
 }
    const paginationBasic = (
     
      <div>
        <Pagination onClick={switchPage}>{items}</Pagination>
      </div>
    );
    return ( 


      
      <div class="container">
        <div class="card">
          <div class="card-header" style={{ textAlign: "center" }}>
            All Admins
          </div>
          

          <div class="card-body">
            <div className="to">
              <div className="tb">
                <form onSubmit={this.createusers}>
                  <input
                    style={{ margin: "10px" }}
                    type="text"
                    name="name"
                    placeholder="insert name"
                  ></input>
                  <input
                    style={{ margin: "10px" }}
                    type="text"
                    name="email"
                    placeholder="insert email"
                  ></input>

                  <input
                    style={{ margin: "10px" }}
                    type="text"
                    name="password"
                    placeholder="insert password"
                  />
                  <input
                    type="submit"
                    name="add"
                    placeholder="add user"
                    class="btn btn-primary btn-sm"
                  />
                </form>
              </div>
              <div className="content-table">
                <table class="table table-hover">
                  <thead>
                    <tr>{/* <th>name</th> */}</tr>
                  </thead>

                  <tbody>
                    {this.state.users.slice(this.state.previousUsers,this.state.nextUsers).map((users, index) => (
                      <tr key={index}>
                        {/* <td> {users.id}</td> */}
                        <td>{users.name}</td>
                        <td>{users.email}</td>

                        <td>
                          <div>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={async () => {
                                const isConfirm = await Confirm(
                                  "You cannot undo this action",
                                  "Are you sure you want to delete the Category?"
                                );
                                if (isConfirm) {
                                  this.deleteusers(users.id);
                                }
                              }}
                            />
                          </div>
                        </td>
                        {/* <td>
                          <div>
                            <pageNumber
                              active
                              age={Current - page}
                              TotalItemsCount={total}
                              itemscount
                              per
                              Page={per - page}
                              onchange={(pageNumber) =>
                                this.componentDidMount(pageNumber)
                              }
                              item
                              class="page-link"
                              link
                              class="page-link"
                              first
                              Page
                              Text="first"
                              last
                              Page
                              Text="last"
                            ></pageNumber>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                  <div style={{marginLeft:"120%"}}>
                  {paginationBasic}
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
