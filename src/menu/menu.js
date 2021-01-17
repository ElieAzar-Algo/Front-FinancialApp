import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Logo from  '../assests/Logo-Group.png';
import BackgroundMenu from "../assests/mountain.jpeg"
import { Link } from 'react-router-dom';




class Testmenu extends React.Component{
    state={
        collapsed:false
    }

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
      collapse=async(e)=>{
          e.preventDefault();
          if (this.state.collapsed===false){
          this.setState({collapsed:true})}
          else{
            this.setState({collapsed:false})
          }
      }
    
    render(){
        return(
            <div>
            <ProSidebar image={BackgroundMenu} collapsed={this.state.collapsed} >
            <SidebarHeader style={{height:"20%", }}>
            <Menu iconShape="square" >
                
            <MenuItem onClick={this.collapse} icon={<i className="fa fa-bars fa-sm"></i>} className="" >FINANCIAL APP MENU</MenuItem>
            {/* <img  src={Logo} style={{width:"55%",height:"60%", marginLeft:"20%"}} /> */}
            {/* this style for was for Menu style={{  marginLeft:"19%",width:"60%",backgroundColor:"white",border:"solid 20px #1d1d1d",borderRadius:"50%"}} popperArrow={this.state.collapsed} */}
            </Menu>
   
  </SidebarHeader>
  <SidebarContent>
  <Menu iconShape="square">
  <MenuItem icon={<i className="fa fa-home fa-sm"></i>}>Dashboard
  <Link to="/home" /></MenuItem>
  <MenuItem icon={<i className="fa fa-user fa-sm"></i>}>Users <Link to="/users" /></MenuItem>
    
    <SubMenu title="Add New Record" icon={<i className="fa fa-list fa-sm"></i>}>
    
      <MenuItem>Add New Income<Link to="/addIncome" /></MenuItem>
      <MenuItem>Add New Expense <Link to="/addExpense" /></MenuItem>
      <MenuItem>Add New Category <Link to="/categories" /></MenuItem>
      <MenuItem>Add New Goal <Link to="/Goals" /></MenuItem>
      
    </SubMenu>
    <SubMenu title="Reports" icon={<i className="fa fa-pie-chart fa-sm"></i>}>
    
      <MenuItem>Chart Report<Link to="" /></MenuItem>
      <MenuItem>Records Table <Link to="" /></MenuItem>
      
      
    </SubMenu>
  </Menu>
  </SidebarContent>
  <SidebarFooter>
  <Menu iconShape="square">
      
  <MenuItem onClick={this.logout} icon={<i className="fa fa-sign-out fa-sm"></i>}>LOGOUT <Link to="" /></MenuItem>
  
  </Menu>
  </SidebarFooter>
  
</ProSidebar>;
            </div>
        )
    }
}
export default Testmenu;