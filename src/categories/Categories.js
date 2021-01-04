import React from "react";
import "./Categories.css";
//import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
// * as AiIcons from "react-icons/ai";
//import * as IoIcons from "react-icons/io";
//import Editcategories from "./Editcategories";
//import Axios from "./";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Categories extends React.Component {
  state = {
    categories: [],
    role: "",
  };

  async componentDidMount() {
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
    console.log(result);
    this.setState({ categories: result.categories.data });
    console.log("hi", this.state.categories);
  }
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
  //};

  render() {
    return (
      <div className="tbl">
        <FontAwesomeIcon icon={faTrash} />
        <form onSubmit={this.createcategories}>
          <input type="text" name="name" placeholder="insert name"></input>
          <input type="submit" name="add" placeholder="add categories"></input>
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
              {this.state.categories.map((category, index) => (
                <tr key={index}>
                  <td> {category.id}</td>
                  <td>{category.name}</td>

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
                        onClick={() => this.deletecategories(category.id)}
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

{
  /* <FaIcons.FaEdit />
                      </Link> */
}
{
  /* <Link className="icon"> */
}
{
  /* <FaIcons.FaMinusCircle
                          onClick={() => this.deletecategories(categories.id)}
                        /> */
}
