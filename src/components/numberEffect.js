import React, {Component} from 'react';
import numeral from 'numeral'
export default class numberEffect extends Component{
    constructor(props){
        super(props);
        this.state={
            value:0
        }
    }
    componentDidMount(){
        let that=this
        let value=this.props.maxNumber - 250;
        // (this.props.maxNumber*0.001)
        var interval = setInterval(function() {
            if (value >= that.props.maxNumber) clearInterval(interval);
            value++
            that.setState({value})
        }, that.props.interval);
    }
    render(){
        return(
            <span>{numeral(this.state.value).format('0,0')}</span>
        )
    }

}
