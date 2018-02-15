import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading';
import CategoryList from  './categoryList'
import Charts from 'chart.js'
import BarShaders from './barShader'
class Analytics extends(React.Component){
    constructor(){
        super();
        this.myChart={}
    }
    shouldComponentUpdate(){
        return false
    }
    componentDidMount(){
        const {name}= this.props
        if(name=='polarExample' || name== 'lineChart'){
            this.createCanvas(this.props)
        }

    }
    createCanvas(props){
        const{name,type, dataSet,options} =props
        console.log(options)
        let ctx= document.getElementById(name).getContext("2d");
        this.myChart = new Charts(ctx, {
            type,
            data: dataSet[0],
            options
        })
    }
    componentWillReceiveProps(nextProps){
        const {name}=this.props;
        console.log(this.props, this.myChart, nextProps)
        if((name=='polarExample' || name== 'lineChart') && this.myChart.data ){
            if(nextProps.name=='polarExample' || nextProps.name== 'lineChart'){
                this.myChart.data.labels=nextProps.dataSet[0].labels;
                this.myChart.data.datasets.forEach((dataset) => {
                    dataset.data.push(nextProps.dataSet[0].datasets);
                });
                this.myChart.update();
            }
        }
        else if(nextProps.name=='polarExample' || nextProps.name== 'lineChart'){
            this.createCanvas(nextProps)
        }


    }
    render(){
        const {name, xs, sm, md, classN, dataSet, height}= this.props
        return(
            <Col xs={xs} sm={sm} md={md} className={classN}>
                <span className="analyticsView">
                    <div className="titleContainer">
                    {
                        dataSet.length>1?
                            dataSet.map((item, index)=>
                                <div key={index} className="title">{item.title}</div>
                            )
                            :''
                    }
                    </div>
                    {
                        name=='polarExample' || name== 'lineChart'?
                            <canvas id={name} width="100" height={height}></canvas>:
                            name=="barExample"?
                                <div>
                                    <BarShaders size="sm" height={45} />
                                    <BarShaders size="md" height={89} />
                                    <BarShaders size="sm" height={65} />
                                    <BarShaders size="md" height={111} />
                                    <BarShaders size="sm" height={124} />
                                    <div className="barLegends">
                                        <span className="elite">Elite</span>
                                        <span className="midUpper">Upper Mid.</span>
                                        <span className="midLower">Lower Mid.</span>
                                    </div>
                                </div>
                                :
                                <Row>
                                    <div className="numberStat">
                                        <div className="numberDisplay">
                                            <h1>2,534,345</h1>
                                            <span>Vehicles</span>
                                        </div>
                                    </div>
                                    <Col xs="12">
                                        <Col xs="4" className="vehicleTypes">765,923</Col>
                                        <Col xs="4" className="vehicleTypes">344,345</Col>
                                        <Col xs="4" className="vehicleTypes">123,456</Col>
                                    </Col>
                                </Row>
                    }

                </span>
            </Col>
        )

    }

}

export default Analytics
