import React from "react";
//import "./Categories.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import Pagination from "react-pagination";
//import ReactPaginate from "react-paginate";
import Menu from '../menu/menu'
import { Link } from "react-router-dom";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Confirm } from "react-st-modal";

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    ///this.myUpdate = React.createRef();
  }
  state = {
    categories: [],
    updateinput: "",
  };

  async componentDidMount() {
    // console.log(this.myUpdate.current.style);
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
    const result = await response.json();
    console.log(result);
    this.setState({ categories: result.categories.data });
    console.log("hi", this.state.categories);
  }
  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  deletecategories = async (id) => {
    const token = window.localStorage.getItem("token");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = `http://localhost:8000/api/category/${id}`;

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      const refrechCategories = this.state.categories.filter(
        (categories) => categories.id !== id
      );
      this.setState({ categories: refrechCategories });
    } catch (error) {
      console.log(error);
    }
  };
  createcategories = async (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");

    const name = e.target.name.value;

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
      }),
    };
    console.log(name);
    const url = `http://localhost:8000/api/category`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log(result);
    e.target.name.value = "";
    //this.setState({ role: "" });
    this.componentDidMount();
    //this.componentDidUpdate();
  };

  updatecategories = async (id) => {
    const token = window.localStorage.getItem("token");
    const name = this.state.updateinput;
    console.log(name);
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
      }),
    };
    console.log(name);
    const url = `http://localhost:8000/api/category/${id}`;
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log(result);

    //this.setState({ role: "" });
    this.componentDidMount();
    //this.componentDidUpdate();
  };
  // Switch = async (e) => {
  //   const val = e.target.value;
  //   console.log(val);
  //   console.log(this.myUpdate.current.style);
  //   this.myUpdate.current.style.display = "block";
  // };

  render() {
    // this.myUpdate.current.value;
    return (

      <div className="usersContainer">
        <div className="row"> 
        <div className="col-3">
<Menu/>
        </div> 
      <div className="col-9">
      <div style={{ width: "90%",marginTop:"5%"}}>
        <div className="card">
          <div className="card-header" style={{ textAlign: "center" }}>
            <h2> Categories</h2>
          </div>
          <div className="card-body"></div>
          <div className="tb">
            <form onSubmit={this.createcategories}>
              <input
                style={{ margin: "10px" }}
                type="text"
                name="name"
                placeholder=" Name"
                // onChange={this.handleInputChange}
                // defaultValue={this.state.categories.name}
              ></input>
              <input
                style={{ margin: "10px" }}
                type="submit"
                name="add"
                placeholder="add categories"
                className="te"
              ></input>
            </form>
          </div>
          <div className="content-table">
            {/* <div className="tbl-header"> */}
            <table className="table table-hover">
              <thead>
                <tr>
                  {/* <th>ID</th>
                <th>Name</th>
                <th>controller</th> */}
                </tr>
              </thead>
              <tbody></tbody>
              <tbody>
                {this.state.categories.map((category, index) => (
                  <tr key={index}>
                    {/* <td> {category.id}</td> */}
                    <td>{category.name}</td>

                    <td>
                      <div>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={async () => {
                            const isConfirm = await Confirm(
                              "Are you sure you want to delete the Category?",
                              "You cannot undo this action"
                            );
                            if (isConfirm) {
                              this.deletecategories(category.id);
                            }
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <FontAwesomeIcon
                          // onClick={this.Switch}
                          // value="1"
                          icon={faEdit}
                          onClick={async () => {
                            const isConfirm = await Confirm(
                              <input
                                id="title"
                                type="text"
                                placeholder="New Title"
                                name="updateinput"
                                onChange={this.handleInputChange}
                                value={this.state.iupdateinput}
                              />
                            );
                            if (isConfirm) {
                              this.updatecategories(category.id);
                            }
                          }}
                        />
                        {/* <div
                          className="inputx"
                          //style={{ display: "none" }}
                          //ref={this.myUpdate}
                        > */}

                        {/* <button
                            onClick={() => this.updatecategories(category.id)}
                          >
                            Update
                          </button> */}
                      </div>
                      {/* </div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* </div> */}
          </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
}
