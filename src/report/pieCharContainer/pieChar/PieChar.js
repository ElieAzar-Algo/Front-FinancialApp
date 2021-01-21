import React, { Component } from 'react'
import {Doughnut} from 'react-chartjs-2';
import chart from 'chartjs-plugin-labels';

export default class PieChar extends Component {
    constructor(props){
        super(props);

        
    }
    render() {
        return (
            <>
                <Doughnut data={this.props.data}/>
            </>
        )
    }
}
