import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import "./promenuoverrider.css";
import Logo from '../assests/Logo-Group.png';
import BackgroundMenu from "../assests/mountain.jpeg"
import { Link } from 'react-router-dom';
import classes from './menu.module.css';
import 'font-awesome/css/font-awesome.min.css';

class Testmenu extends React.Component {
  state = {
    collapsed: false,
    mobileView: false,
    showMenu: false
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  handleResize() {
    if (window.innerWidth < 1000 && window.innerWidth >= 767 && this.state.collapsed === false) {
      console.log("collapsed", window.innerWidth);
      this.setState({ collapsed: true })
    }

    if (window.innerWidth >= 1000 && this.state.collapsed === true) {
      console.log("expanded", window.innerWidth);
      this.setState({ collapsed: false })
    }
    if (window.innerWidth > 767 && this.state.mobileView) {
      this.setState({ mobileView: false, showMenu: true });
    }


    if (window.innerWidth < 767 && !this.state.mobileView) {
      this.setState({ mobileView: true });
    }
  }

  logout = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/logout";
    const token = window.localStorage.getItem("token")
    const body = {

    }
    const respond = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }, body: JSON.stringify(body)
    })
    console.log(respond);
    const result = await respond.json()
    console.log(result);
    await localStorage.removeItem('token');

  }
  collapse = async (e) => {
    e.preventDefault();
    if (this.state.collapsed === false) {
      this.setState({ collapsed: true })
    }
    else {
      this.setState({ collapsed: false })
    }
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    /*
      <Menu iconShape="square" >

              <MenuItem onClick={this.collapse} icon={<i className="fa fa-bars fa-sm"></i>} className="" >FINANCIAL APP MENU</MenuItem>
              {/* <img  src={Logo} style={{width:"55%",height:"60%", marginLeft:"20%"}} /> */
    /* this style for was for Menu style={{  marginLeft:"19%",width:"60%",backgroundColor:"white",border:"solid 20px #1d1d1d",borderRadius:"50%"}} popperArrow={this.state.collapsed} */
    //   </Menu>



    return (
      <div className={classes.Wrapper}>
        <ProSidebar image={BackgroundMenu} collapsed={this.state.collapsed} >
          <SidebarHeader className={classes.Header}>
            {(this.state.mobileView) ?
              <button style={{ width: "35px", height: "35px" }} onClick={this.toggleMenu.bind(this)} className={classes.MobileMenuButton}>
                {(this.state.showMenu) ?
                  <i className="d-flex justify-content-center fa fa-times fa-2x fa-center icon-rounded"></i>
                  : <i className="d-flex justify-content-center fa fa-bars fa-2x fa-center icon-rounded"></i>
                }
              </button>

              : ""}
            <h1 className={classes.Logo}>FINANCIAL TRACKER</h1>
          </SidebarHeader>

          <div style={(this.state.mobileView) ? (this.state.showMenu) ? { display: "block" } : { display: "none" } : { display: "block" }}>
            <SidebarContent >
              <Menu iconShape="square">
                <Link to="/home"><MenuItem icon={<i className="fa fa-home fa-sm"></i>} onClick={()=>{this.props.changePageName("Home")}}>Home</MenuItem></Link>
                <MenuItem icon={<Link to="/users" ><i className="fa fa-user fa-sm"></i></Link>} onClick={()=>{this.props.changePageName("Users")}}>Users <Link to="/users" /></MenuItem>
                <MenuItem icon={<Link to="/records" ><i className="fa fa-money fa-sm"></i></Link>} onClick={()=>{this.props.changePageName("Incomes And Expenses")}}>Incomes And Expenses <Link to="/records" /></MenuItem>
                <MenuItem icon={<Link to="/categories" ><i className="fa fa-tags fa-sm"></i></Link>} onClick={()=>{this.props.changePageName("Categories")}}>Categories<Link to="/categories" /></MenuItem>
                <MenuItem icon={<Link to="/reports"><i className="fa fa-bar-chart fa-sm"></i></Link>} onClick={()=>{this.props.changePageName("Reports")}}>Reports<Link to="/reports" /></MenuItem>
                
                <SubMenu title="Add New Record" icon={<i className="fa fa-list  fa-sm"></i>}>
                 
                <MenuItem icon={<i className="fa fa-plus-circle  fa-sm"></i>} onClick={()=>{this.props.changePageName("New Expense")}}>New Expense<Link to="/addexpense" /></MenuItem>
                <MenuItem icon={<i className="fa fa-plus-circle  fa-sm"></i>} onClick={()=>{this.props.changePageName("New Income")}}>New Income<Link to="/AddIncome" /></MenuItem>


                </SubMenu>
              </Menu>
            </SidebarContent>
            <SidebarFooter>
              <Menu iconShape="square">

                <MenuItem onClick={this.logout} icon={<i className="fa fa-sign-out fa-sm"></i>}>LOGOUT <Link to="" /></MenuItem>

              </Menu>
            </SidebarFooter>

          </div>

        </ProSidebar>
      </div>
    )
  }
}
export default Testmenu;