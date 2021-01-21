import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2';

export default class BarChart extends Component {

    constructor (props){
        super(props);
        this.state={
            data : props.data
        }
    }
    render() {
        return (
            <Bar
            data={this.state.data}
            width={100}
            height={50}
            onElementsClick={this.props.changePeriodFocus}
         
            options={{ maintainAspectRatio: true }}
          />
        )
    }
}
