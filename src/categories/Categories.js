import React from "react";
import "./Categories.css";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import Editcategories from "./Editcategories";
//import Axios from "./";

export default class Categories extends React.Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const url = "http://localhost:8000/category";
    const token = window.localStorage.getItem("token");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }).catch(function (error) {
      console.log(error);
    });
    const result = await response.json();
    this.setState({ categories: result.category });
    console.log("hi", this.state.categories);
  }
  //   deletecategories = async (id) => {
  //     const requestOptions = {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json"
  //       },
  //     };
  //     const url = `http://localhost:8000/category${id}`;
  //     try {
  //       const response = await fetch(url, requestOptions);
  //       const result = await response.json();
  //       const refrechCategories = this.state.categories.filter(
  //         (categories) => categories.id !== id
  //       );
  //       this.setState({ categories: refrechCategories });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     createcategories = async (e) => {
  //       e.preventDefault();
  //       const name = e.target.name.value;

  //       const requestOptions = {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: name,
  //         }),
  //       };
  //       console.log(name);
  //       const url = `http://localhost:8000/category`;
  //       const response = await fetch(url, requestOptions);
  //       const result = await response.json();
  //       console.log(result);
  //       e.target.name.value = "";
  //     };
  //   };

  render() {
    return (
      <div class="tbl">
        <from onsubmit={this.createcategories}>
          <input type="text" name="name" placeholder="insert name"></input>
          <input type="submit" name="add" placeholder="add categories"></input>
        </from>

        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>name</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              {this.state.categories.map((categories) => (
                <tr>
                  <td> {categories.name}</td>
                  <td>
                    <div>
                      <Link
                        to={{
                          pathname: `/categories/edit/${categories.id} `,
                          state: { categories },
                        }}
                      >
                        <FaIcons.FaEdit />
                      </Link>
                      <Link class="icon">
                        <FaIcons.FaMinusCircle
                          onClick={() => this.deletecategories(categories.id)}
                        />
                      </Link>
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
