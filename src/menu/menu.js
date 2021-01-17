import React from 'react';
import { Link } from 'react-router-dom';
//import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/css/styles.css';
import Logo from  '../assests/Logo-Group.png';
import {Redirect} from 'react-router-dom';
import Classes from './menu.module.css';
import '../login/login.css'
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
            <div className="menuContainer">
              
            <div className={Classes.SideMenu} >
            <div className="row" style={{height:"20%"}}>
              <header className={Classes.Header} >
                <img  src={Logo} style={{width:"60%",height:"100%", marginLeft:"20%"}} />
                <button className="navbar-toggler" type="button" data-toggle="collapse"  data-target="#Navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
                </header>
                </div>
                
                {/* <div className="row">
                  <div className="col-12">
                    <p style={{marginLeft:"20%"}} >Financial Tracker App</p>
                </div>
                </div> */}
                
                  <ul className={Classes.ButtonsContainer}>
                    <li>
                  <Link  to="/about">About</Link>
                    </li>
                    <li>
                  <Link to="/home"><span className="fa fa-home fa-sm"></span>Dashboard</Link>
                    </li>
                    <li>
                  <Link to="/AddIncome"><span className="fa fa-plus fa-sm"></span>Add New Income</Link>
                    </li>
                    <li>
                  <Link to="/AddExpense"><span className="fa fa-plus fa-sm"></span>Add New Expense</Link>
                    </li>
                    <li className=" menuLink">
                  <Link to="/categories"><span className="fa fa-list fa-sm"></span>Categories</Link>
                    </li>
                    <li>
                  <Link to="/Users"><span className="fa fa-user fa-sm"></span>User</Link>
                    </li>
                    
                    
                    <li className={Classes.LogOut} onClick={this.logout}>
                  <Link to='/login'   >Logout</Link>
                
                    </li>
                  </ul>
                 </div>
                 </div>






      
            </>
        )
    }
}
export default Smenu;