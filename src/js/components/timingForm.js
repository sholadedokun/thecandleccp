import React, { Component } from 'react';
class advanceTiming extends Component {
  constructor(props){
    super(props)
    this.state={
      hh:'',
      mm:'',
      ap:''
    }
    this.hourOptions=['HH']
    for (let i=0; i<=12; i++){
      this.hourOptions.push(i)
    }
    this.minOptions=['MM']
    for (let i=0; i<=60; i++){
      this.minOptions.push(i)
    }

  }
  setTimeValues(state, e){
      console.log(state, e.target.value)

      this.setState({[state]:e.target.value}, ()=>{
          const {hh,mm,ap}=this.state
          this.props.setNewTime(`${hh}:${mm} ${ap}`)
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
                <span className="inlineSelect timeSelect">
                    <select onChange={this.setTimeValues.bind(this, 'mm')} value={this.state.mm}>
                    {
                        this.minOptions.map((item, index)=>{
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
