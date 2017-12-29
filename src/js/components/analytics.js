import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading';
import CategoryList from  './categoryList'
import Charts from 'chart.js'
class Analytics extends(React.Component){
    shouldComponentUpdate(){
        return false
    }
    componentDidMount(){
        console.log(this.props)
        let ctx= document.getElementById(this.props.name).getContext("2d");
        var myChart = new Charts(ctx, {
            type: this.props.type,
            data: this.props.dataSet,
            options:this.props.options
        });

    }
    render(){
        return(
            <Col xs={this.props.xs} sm={this.props.sm} md={this.props.md} className="analytics">
                <canvas id={this.props.name} width="100" height="100"></canvas>
            </Col>
        )

    }

}

export default Analytics
