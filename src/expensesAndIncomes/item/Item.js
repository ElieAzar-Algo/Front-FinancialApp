import React from 'react'
import Classes from "./item.module.css";
export default function Item(props) {
    function element(){
        if(props.visible){
            return    <div className={Classes.Container} >

            <div onClick={()=>{props.onClick(props.index)}} className={Classes.Header+" row "}>
               
                <div className="col-md-2">
                <span className={Classes.Amount}>${props.data.amount}</span>
                </div>
                <div className={"col-md-2 "+Classes.TypeContainer}>
                        {props.incomeExpense}
                        <span className={Classes.Type} >{props.data.type}</span>                
                </div>

                <div className={"col-md-3 "+Classes.DateContainer}>
                    {props.data.date}
                </div>


                <div className="col-md-3">
                <span> {props.data.name}</span>
                </div>

                <div className="col-md-1">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>

            <div  className={Classes.Description+" "+((props.data.active)?Classes.Active:"")}>
                <b>Description:</b>
                <p>
                      {props.data.description}
                </p>
                <b>Category:</b>
                <p>
                      {props.data.category}
                </p>
                  
            </div>
        </div>
        }
        else{
            return <></>
        }
    }

    return (
        
        (props.visible)?<div className={Classes.Container} >

            <div onClick={()=>{props.onClick(props.index)}} className={Classes.Header+" row "}>
               
                <div className="col-md-2">
                <span className={Classes.Amount}>${props.data.amount}</span>
                </div>
                <div className={"col-md-2 "+Classes.TypeContainer}>
                        {props.incomeExpense}
                        <span className={Classes.Type} >{props.data.type}</span>                
                </div>

                <div className={"col-md-3 "+Classes.DateContainer}>
                    {props.data.date}
                </div>


                <div className="col-md-3">
                <span> {props.data.name}</span>
                </div>

                <div className="col-md-1">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>

            <div  className={Classes.Description+" "+((props.data.active)?Classes.Active:"")}>
                <b>Description:</b>
                <p>
                      {props.data.description}
                </p>
                <b>Category:</b>
                <p>
                      {props.data.category}
                </p>
                  
            </div>
        </div>:<></>
        
    
    )
}
