import React, { Component } from 'react'
import  PieChar  from "./pieChar/PieChar";

export default class PieChartContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            data:{
                datasets: [{
                    data: [50,82,7],
                    backgroundColor : ["rgba(200,107,70,0.6)","rgba(50,107,70,0.6)","rgba(30,200,200,0.6)","rgba(50,107,70,0.6)","rgba(50,107,70,0.6)","rgba(50,107,70,0.6)","rgba(50,107,70,0.6)","rgba(50,107,70,0.6)"]
                }],
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Red',
                    'Yellow',
                    'Blue'
                ],
                //options: "pass" //animation.animateRotate 
            }
        }

        this.data={
            datasets: [{
                data: [50,82,7],
                backgroundColor : ["rgba(200,107,70,0.6)","rgba(50,107,70,0.6)","rgba(30,200,200,0.6)","rgba(50,107,70,0.6)","rgba(50,107,70,0.6)","rgba(50,107,70,0.6)","rgba(50,107,70,0.6)","rgba(50,107,70,0.6)"]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Red',
                'Yellow',
                'Blue'
            ],
            options: {
                rotation: 120,
               
              }
    
            //options: "pass" //animation.animateRotate 
        }
        
    }

      PieGenerator=()=>{
         let labels = [];
         let values = [];
         for(const key in this.props.data) {
            labels.push(key+"");
            values.push(this.props.data[key]);
        }
        
            this.data.labels = labels;
            this.data.datasets[0].data = values;
      
console.log(this.data);

       return <PieChar data={ this.data} />
    }
    render() {
        return (
            <this.PieGenerator/>
        )
    }
}
