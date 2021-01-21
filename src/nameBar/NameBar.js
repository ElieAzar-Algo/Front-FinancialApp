import React, { useState, useEffect } from 'react';
import classes from "./namebar.module.css";
function NameBar(props) {
    let userName= window.localStorage.getItem("user_id");

    return (
        <div className={classes.nameBar}>
          <b><h1>{props.pageName}</h1></b>
        <div className={classes.nameAndIconWrapper}>
        <h3 className="float-right"> {userName} </h3>
        <i className="fa fa-user-circle fa-3x"></i>
        </div>
      </div>
    )
}

export default NameBar
