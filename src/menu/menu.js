import React from 'react';
import { Link } from 'react-router-dom';
//import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/css/styles.css';
import Logo from  '../assests/Upper.png';
import Redirect from 'react-router-dom';
import Classes from './menu.module.css';


class Smenu extends React.Component{


    render(){
     
        return (
            <>
            <div className={Classes.SideMenu} >
              <header className={Classes.Header} >
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
                  <Link to="/addIncome"><span className="fa fa-cash fa-sm"></span>Create New Income</Link>
                    </li>
                    <li>
                  <Link to="/addExpense"><span className="fa fa-coin fa-sm"></span>Create New Income</Link>
                    </li>
                    <li>
                  <Link to="/categories"><span className="fa fa-category fa-sm"></span>Categories</Link>
                    </li>
                    <li className={Classes.LogOut}>
                  <Link to="/logout">Logout</Link>
                    </li>
                  </ul>

              



            </div>






            {/* <div style={{height:"500px"}}>
<ProSidebar >
  <Menu iconShape="square" >
  <SidebarHeader >
    <MenuItem icon=" ">FINANCIAL APP</MenuItem>
  </SidebarHeader>
  <SidebarContent>
      <MenuItem icon="">Dashboard</MenuItem>
      <MenuItem>Login <Link to="/login" /></MenuItem>
      <MenuItem >Categories<Link to="/categories" /></MenuItem>
      <MenuItem >Expenses & Incomes<Link to="/exp-inc" /></MenuItem>
      <MenuItem >User Management<Link to="/users" /></MenuItem>
      <MenuItem >Generate Reports<Link to="/reports" /></MenuItem>
   
    </SidebarContent>
    <SidebarFooter>
    <MenuItem className="mb=0">Logout <Link to="/logout" /></MenuItem>
    
  </SidebarFooter>
  </Menu>
</ProSidebar>

</div> */}
            </>
        )
    }
}
export default Smenu;