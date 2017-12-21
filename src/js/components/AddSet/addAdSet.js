import React, { Component } from 'react';
import Nav from './navigation';
import {connect} from 'react-redux';
import {selectBoard} from '../../actions/boardActions';
import {createAdset, uploadCreative} from '../../actions/adSetActions';
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
      case 2: return <UploadCreative setCreatives={this.uploadCreatives.bind(this)} />
    }
  }
  uploadCreatives(data){
        let formData = new FormData();
        formData.append('file', data.creative[0].formEntity);
        formData.append('token', localStorage.getItem('TheCandleToken'));
        formData.append('type', data.creative[0].type);
        formData.append('position', data.creative[0].dimension.x.split('|')[0]);
        formData.append('adset_id', this.state.adSet_id);
        this.props.uploadCreative(formData)

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
          const {min_age, max_age, gender, weather, traffic} = details
          //using local config as dictionary to reformat to the required parameters by the API
          details.trigger={
              min_age,
              mobile:1,
              gender:ADSET_DICTIONARY.gender[gender],
              weather:ADSET_DICTIONARY.weather[weather],
              traffic:ADSET_DICTIONARY.traffic[traffic],
          }
          //send the details to the API, wait for response and continue to add creatives.
          this.props.createAdset(details).then((data)=>{
              console.log(data)
              this.setState({currentStep: 2, adSet_id:data.id})
          })
      }
      else{
          this.setState({currentStep: 2})
      }
  }
  render() {
    const {currentStep} = this.state
    return (
      <Col xs={10} xsOffset={1}  className="createAdset">
          <Nav currentStep={currentStep} closeModal={this.props.close} />
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
const mapDispatchToProps={selectBoard, createAdset, uploadCreative}
export default connect(mapStateToProps, mapDispatchToProps)(AddAdSet)
