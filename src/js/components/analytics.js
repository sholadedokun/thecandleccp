import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading';
import CategoryList from  './categoryList'
import Charts from 'chart.js'
class Analytics extends(React.Component){
    constructor(){
        super();
        this.myChart={}
    }
    shouldComponentUpdate(){
        return false
    }
    componentDidMount(){
        console.log(this.props)
        let ctx= document.getElementById(this.props.name).getContext("2d");
        this.myChart = new Charts(ctx, {
            type: this.props.type,
            data: this.props.dataSet,
            options:this.props.options
        });

    }
    componentWillReceiveProps(nextProps){
        this.myChart.data.labels=nextProps.dataSet.labels;
        this.myChart.data.datasets.forEach((dataset) => {
            dataset.data.push(nextProps.dataSet.datasets);
        });
        this.myChart.update();
    }
    render(){
        return(
            <Col xs={this.props.xs} sm={this.props.sm} md={this.props.md} className={this.props.classN}>

                <canvas id={this.props.name} width="100" height={this.props.height}></canvas>
            </Col>
        )

    }

}

export default Analytics
