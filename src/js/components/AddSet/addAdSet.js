import React, { Component } from 'react';
import Nav from './navigation';
import {connect} from 'react-redux';
import {selectBoard} from '../../actions/boardActions';
import {createAdset} from '../../actions/adSetActions';
import SelectBoard from './selectBoard';
import CampaignDescription from './campaignDescription';
import UploadCreative from './uploadAdCreative';
import {Col, Row, Grid} from 'react-bootstrap';
import {ADSET_DICTIONARY} from '../../config.js'
class AddAdSet extends Component {
  constructor(props){
    super(props)
    this.state={
      currentStep:0,
      currentBoardLocations:''
    }

  }
  displaySteps(){
    const {currentStep} = this.state
    const {allCampaigns, campaign} =this.props
    switch(currentStep){
      case 0: return <SelectBoard selectedBoard={this.selectedBoard.bind(this)} />
      case 1: return <CampaignDescription setCampaignDetails={this.setCampaignDetails.bind(this)} allCampaigns={allCampaigns} campaign={campaign} />
      case 2: return <UploadCreative />
    }
  }
  selectedBoard(Board){
    // console.log(Board)
      if(Board){
        this.props.selectBoard(Board)
        this.setState({currentStep: 1})
      }
  }
  setCampaignDetails(details){
      if(details){
          details.mode=0
      }
      const {min_age, max_age, gender, weather, traffic} = details
      details.trigger={
          min_age,
          mobile:1,
          gender:ADSET_DICTIONARY.gender[gender],
          weather:ADSET_DICTIONARY.weather[weather],
          traffic:ADSET_DICTIONARY.traffic[traffic],
      }
      this.props.createAdset(details).then((data)=>{
          this.setState({currentStep: 2})
      })
  }
  render() {
    const {currentStep} = this.state
    return (
      <Col xs={10} xsOffset={1}  className="createAdset">
          <Nav currentStep={currentStep} />
          {
            this.displaySteps()
          }
      </Col>
    );
  }
}
function mapStateToProps(state){
    return(
        {
            allBoards:state.boards.allBoards,
            allCampaigns:state.campaigns.allCampaigns,
            campaign:state.campaigns.campaignData

        }
    )
}
const mapDispatchToProps={selectBoard, createAdset}
export default connect(mapStateToProps, mapDispatchToProps)(AddAdSet)
