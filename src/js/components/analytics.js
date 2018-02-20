import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading';
import CategoryList from  './categoryList'
import Charts from 'chart.js'
import BarShaders from './barShader'
import NumberEffect from './numberEffect'
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
        if(name=='doughExample' || name== 'lineChart'){
            this.createCanvas(this.props)
        }

    }
    createCanvas(props){
        const{name,type, dataSet,options} =props
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
        if((name=='doughExample' || name== 'lineChart') && this.myChart.data ){
            if(nextProps.name=='doughExample' || nextProps.name== 'lineChart'){
                this.myChart.data.labels=nextProps.dataSet[0].labels;
                this.myChart.data.datasets.forEach((dataset) => {
                    dataset.data.push(nextProps.dataSet[0].datasets);
                });
                this.myChart.update();
            }
        }
        else if(nextProps.name=='doughExample' || nextProps.name== 'lineChart'){
            this.createCanvas(nextProps)
        }


    }
    renderKey(data){
        return data.map( item=>
            <span className={item.class}>{item.title}</span>
        )
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
                        name== 'lineChart'?
                            <canvas id={name} width="100" height={height}></canvas>:
                                name=="barExample"?
                                    <div>
                                        <BarShaders size="sm" height={45} color="eliteClass" />
                                        <BarShaders size="md" height={89} color="upperMidClass" />
                                        <BarShaders size="sm" height={65} color="lowerMidClass"  />
                                        <BarShaders size="md" height={111} color="lowerClass"  />
                                        <BarShaders size="sm" height={124} color="lowestClass"  />
                                        <div className="barLegends">
                                            {
                                                this.renderKey([
                                                    {class:'elite', title:'Elite'},
                                                    {class:'upperMid', title:'Upper Mid.'},
                                                    {class:'lowerMid', title:'Lower Mid.'}
                                                ])
                                            }
                                        </div>
                                    </div>:
                                    name=="doughExample"?
                                    <Row>
                                        <Col xs="12">
                                            <div className="doughnutContainer">
                                                <canvas id={name} width="100" height={height}></canvas>
                                            </div>
                                            <div className="genderMap">
                                                <span><i className="icon-male"></i>65%</span>
                                                <span><i className="icon-female"></i>35%</span>
                                            </div>
                                            <div className="barLegends">
                                            {
                                                this.renderKey([
                                                    {class:'elite', title:'A1'},
                                                    {class:'upperMid', title:'A2'},
                                                    {class:'lowerMid', title:'A3'},
                                                    {class:'lower', title:'A4'}
                                                ])
                                            }
                                            </div>
                                        </Col>
                                    </Row>:
                                    <Row>
                                        <div className="numberStat">
                                            <div className="numberDisplay">
                                                <h1><NumberEffect maxNumber={2534345} interval={1}  /></h1>
                                                <span>Vehicles</span>
                                            </div>
                                        </div>
                                        <Col xs="12">
                                            <Col xs="4" className="vehicleTypes"><span className="icon-car"></span><NumberEffect maxNumber={765923} interval={1}  /></Col>
                                            <Col xs="4" className="vehicleTypes"><span className="icon-bus"></span><NumberEffect maxNumber={344345} interval={1}  /></Col>
                                            <Col xs="4" className="vehicleTypes"><span className="icon-bike"></span><NumberEffect maxNumber={123456} interval={1}  /></Col>
                                        </Col>
                                    </Row>
                    }

                </span>
            </Col>
        )

    }

}

export default Analytics
