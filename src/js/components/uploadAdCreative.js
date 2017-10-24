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
      creative:[
        {
          type:'',
          dimension:{x:'0|1', y:'0|2'},
          data:''
        },
        {
          type:'',
          dimension:{x:'1|1', y:'0|2'},
          data:''
        }
      ]
    }
  }
  componentDidMount(){
    let boardDimension = document.querySelector('#displayBoard').getBoundingClientRect();
    console.log(boardDimension)
    console.log(document.querySelector('#previewContainer').getBoundingClientRect())
    this.setState({
      displayBoardWidth:boardDimension.width
    })

  }
  setCreativeCollage(creativeDimensions){
    let currentCollage=this.state.creative;
    let newCreativeCollages= creativeDimensions.map((item, index)=>{
        let newCreative={}
        newCreative.dimension=item;
        if(currentCollage[index]){
          newCreative.type=currentCollage[index].type || '';
          newCreative.data=currentCollage[index].type || '';
          return newCreative;
        }
        newCreative.type='';
        newCreative.data='';
        return newCreative;
    })
    this.setState({creative:newCreativeCollages})
    console.log(newCreativeCollages)
  }
  mapAdCreativeToBoard(){
    const {creative, displayBoardWidth}= this.state
    const actualWidth= displayBoardWidth*0.885
    const actualHeight= actualWidth*0.425
    const style={
      position:'absolute',
      width:actualWidth,
      height:actualHeight,
      border: '2px solid #595',
      top: '17%',
      left: '5.8%',
    }
    const totalCreative=creative.length;
    const unitWidth = actualWidth/totalCreative;
    const unitHeight = actualHeight/2;
    return(
      <div className="boardGuide" style={style}>
        {

           creative.map((item,index)=>{
            const creativeStyle={
              display:'inline-block',
              width: unitWidth*(parseFloat(item.dimension.x.split('|')[1])),
              height: unitHeight*(parseFloat(item.dimension.y.split('|')[1])),
              left:unitWidth*(parseFloat(item.dimension.x.split('|')[0])),
              top:unitHeight*(parseFloat(item.dimension.y.split('|')[0])),
              border:'1px solid #555',
              position:'absolute',
            }
            return(
              <div style={creativeStyle}>
              </div>
            )


          })
        }
      </div>
    )
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
                (postType==='single')?<SinglePost />:
                <MultiplePost boardWidth="2000" boardHeight="1000" changeCollage={this.setCreativeCollage.bind(this)} />
              }
              <Col xs={12} className="creativeContainer imagePreview">
                <Heading size="sm" title="Image Preview" />
                <div className="displayBoardPreview" id="previewContainer">
                  <img src="images/displayBoard_1.png" id="displayBoard" className="displayBoard" width="100%" height="100%"/>
                  {
                    this.mapAdCreativeToBoard()
                  }
                </div>
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
