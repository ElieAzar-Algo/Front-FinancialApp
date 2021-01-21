import React from 'react'
import Classes from "./item.module.css";
import { Confirm } from "react-st-modal";

export default function Item(props) {
    function element() {
        if (props.visible) {
            return <div className={Classes.Container} >

                <div onClick={() => { props.onClick(props.index) }} className={Classes.Header + " row "}>

                    <div className="col-md-2">
                        <span className={Classes.Amount}>${props.data.amount}</span>
                    </div>
                    <div className={"col-md-2 " + Classes.TypeContainer}>
                        {props.incomeExpense}
                        <span className={Classes.Type} >{props.data.type}</span>
                    </div>

                    <div className={"col-md-3 " + Classes.DateContainer}>
                        {props.data.date}
                    </div>


                    <div className="col-md-3">
                        <span> {props.data.name}</span>
                    </div>

                    <div className="col-md-1">

                    </div>
                </div>

                <div className={Classes.Description + " " + ((props.data.active) ? Classes.Active : "")}>
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
        else {
            return <></>
        }
    }

    return (

        (props.visible) ? <div className={Classes.Container} >

            <div onClick={() => { props.onClick(props.index) }} className={Classes.Header + " row "}>

                <div className="col-md-4">
                    <span className={Classes.Amount}>${props.data.amount}</span>
                    <span className={Classes.Type} >{props.data.type}</span>
                </div>

                <div className={"col-md-3 " + Classes.DateContainer}>
                    {props.data.date}
                </div>


                <div className="col-md-3">
                    <span> {props.data.name}</span>
                </div>

                <div className="col-md-1">
                    <div className={Classes.ActionDelete} onClick={async () => {
                        const isConfirm = await Confirm(
                            "Are you sure you want to delete?",
                            "You cannot undo this action"
                        );
                        if (isConfirm) {

                        }
                    }}>
                        <i class="fa fa-trash-o" aria-hidden="true"></i>

                    </div>
                    <div className={Classes.EditAction}>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </div>
                </div>
            </div>

            <div className={Classes.Description + " " + ((props.data.active) ? Classes.Active : "")}>
                <b>Description:</b>
                <p>
                    {props.data.description}
                </p>
                <b>Category:</b>
                <p>
                    {props.data.category}
                </p>

            </div>
        </div> : <></>


    )
}
