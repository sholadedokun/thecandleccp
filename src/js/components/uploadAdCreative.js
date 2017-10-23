import React, { Component } from 'react';
import Heading from './heading'
import Icon from './icon'
import SinglePost from './uploadSinglePost'
import MultiplePost from './uploadMultiplePost'
import {Col, Row} from 'react-bootstrap'

export default class uploadAdCreative extends Component{
  constructor(props){
    super(props)
    this.state={
      postType:'multiple',
    }
  }
  render(){
    const {postType} =this.state
    return(
      <Row className="campaignContainer">
        <Col xs={12} className="postTypeSelector">
          <Col xs={5} xsOffset={3}>
            <ul>
              <li className={(postType==='single')? 'active':''}  onClick={()=>this.setState({postType:'single'})}>Single Post</li>
              <li className={(postType==='multiple')? 'active':''} onClick={()=>this.setState({postType:'multiple'})}>Multiple Post</li>
            </ul>
          </Col>
        </Col>
        <Col xs={12} md={7} mdOffset={3} className="boardSelection">
          <Heading size="lg" title="Upload Campaign Visuals" />
          <Col xs={12}>
            <Row>
              {
                (postType==='single')?<SinglePost />:<MultiplePost boardWidth="2000" boardHeight="1000" />
              }
              <Col xs={12} className="creativeContainer imagePreview">
                <Heading size="sm" title="Image Preview" />
                <img src="images/displayBoard_1.png" className="displayBoard" width="100%"/>
              </Col>
              <Heading size="sm" title="Disclaimer" />
              <p>
                Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
                porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
                feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
              </p>
            </Row>
          </Col>
            <button className="primaryButton">Next</button>
            <button className="cancelButton">Cancel</button>
        </Col>
      </Row>
    )
  }
}
