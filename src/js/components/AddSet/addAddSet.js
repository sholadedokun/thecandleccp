import React, { Component } from 'react';
import Nav from './components/navigation';
import SelectBoard from './components/selectBoard';
import CampaignDescription from './components/campaignDescription';
import UploadCreative from './components/uploadAdCreative';
import {Col, Row, Grid} from 'react-bootstrap';
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      currentStep:0,
      currentBoardLocations:''
    }

  }
  displaySteps(){
    const {currentStep} = this.state
    switch(currentStep){
      case 0: return <SelectBoard selectedBoard={this.selectedBoard.bind(this)} />
      case 1: return <CampaignDescription setCampaignDetails={this.setCampaignDetails.bind(this)} />
      case 2: return <UploadCreative />
    }
  }
  selectedBoard(Board){
    // console.log(Board)
      if(Board){
        this.setState({currentStep: 1})
      }
  }
  setCampaignDetails(details){
      this.setState({currentStep: 2})
  }
  render() {
    const {currentStep} = this.state
    return (
      <Grid fluid className="App">
        <Row>
          <Nav currentStep={currentStep} />
          {
            this.displaySteps()
          }
        </Row>
      </Grid>
    );
  }
}

export default App;
