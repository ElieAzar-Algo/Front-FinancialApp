import React from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


class Smenu extends React.Component{


    render(){
        return (
            <>
            <div style={{height:"500px"}}>
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

</div>
            </>
        )
    }
}
export default Smenu;