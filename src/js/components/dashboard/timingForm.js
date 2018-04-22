import React, { Component } from 'react';
class advanceTiming extends Component {
  constructor(props){
    super(props)
    this.state={
      hh:'',
      ap:''
    }
    this.hourOptions=['HH']
    for (let i=0; i<=12; i++){
      this.hourOptions.push(i)
    }
  }
  setTimeValues(state, e){
      console.log(state, e.target.value)

      this.setState({[state]:e.target.value}, ()=>{
          const {hh,ap}=this.state
          this.props.setNewTime(`${hh}:00 ${ap}`)
      })
  }
  render() {
    const {steps}=this.state
    const {currentStep}=this.props
    return (

            <span className="inputContainer selectInput">

                <span className="inlineSelect timeSelect">
                    <select onChange={this.setTimeValues.bind(this, 'hh')} value={this.state.hh}>
                    {
                        this.hourOptions.map((item, index)=>{
                            return(
                                <option key={index} value={item}>{item}</option>
                            )
                        })
                    }
                    </select>
                </span>
                <span className="inlineSelect">
                  <select  onChange={this.setTimeValues.bind(this, 'ap')} value={this.state.ap}>
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>
                  </select>
                </span>
            </span>
    );
  }
}

export default advanceTiming;
