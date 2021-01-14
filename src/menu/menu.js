import React from 'react';
import { Link } from 'react-router-dom';
//import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/css/styles.css';
import Logo from  '../assests/Upper.png';
import {Redirect} from 'react-router-dom';
import Classes from './menu.module.css';
//import Toggle from 'react-bootstrap-toggle'


class Smenu extends React.Component{
  

  logout = async (e)=>{
    e.preventDefault();
    const url="http://localhost:8000/api/logout";
    const token=window.localStorage.getItem("token")
    const body={

    }
   const respond= await fetch(url,{
     method:"POST",
     headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },body:JSON.stringify(body)
   })
   console.log(respond);
   const result= await respond.json()
   console.log(result);
  await localStorage.removeItem('token');
  
  }


    render(){
     
     
        return (
            <>
            <div className={Classes.SideMenu} >
              <header className={Classes.Header} >
              <button className="navbar-toggler" type="button" data-toggle="collapse"  data-target="#Navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
              <img  src={Logo}/>
                <h1>Financial Application</h1>
                </header>
                
                  <ul className={Classes.ButtonsContainer}>
                    <li>
                  <Link  to="/about">About</Link>
                    </li>
                    <li>
                  <Link to="/home"><span className="fa fa-home fa-sm"></span>Dashboard</Link>
                    </li>
                    <li>
                  <Link to="/Users"><span className="fa fa-user fa-sm"></span>User</Link>
                    </li>
                    <li>
                  <Link to="/AddIncome"><span className="fa fa-cash fa-sm"></span>Create New Income</Link>
                    </li>
                    <li>
                  <Link to="/AddExpense"><span className="fa fa-coin fa-sm"></span>Create New Income</Link>
                    </li>
                    <li>
                  <Link to="/categories"><span className="fa fa-category fa-sm"></span>Categories</Link>
                    </li>
                    
                    <li className={Classes.LogOut} onClick={this.logout}>
                  <Link to='/login'   >Logout</Link>
                
                    </li>
                  </ul>
                 </div>






      
            </>
        )
    }
}
export default Smenu;