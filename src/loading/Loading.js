import React, { Component } from 'react'
import Classes from "./loading.module.css";
export default class Loading extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        const loading =()=>{
            if(this.props.loading) return <div className={Classes.LoaderContainer}><p className={Classes.Loader}>Loading</p></div>;
            return null;
        }
        return (
            
            <>
              {loading()}  
            </>
        )
    }
}
