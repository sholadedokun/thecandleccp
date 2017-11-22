import React, {Component} from 'react';
import Icon from './icon'
import {Col, Row} from 'react-bootstrap'
import Heading from './heading'
import _ from 'lodash'
export default class multiplePost extends(Component){
  constructor(props){
    super(props)
    this.state={
      postNo:2,
      selectedIndex:0,
      mediaTypes:['image', 'video', 'url'],
      collages:{
        2:[
            [
              {x:'0|1', y:'0|2'},
              {x:'1|1', y:'0|2'}
            ],
            [
              {x:'0|2', y:'0|1'},
              {x:'0|2', y:'1|1'}
            ],
            [
              {x:'0|1.5', y:'0|2'},
              {x:'1.5|0.5', y:'0|2'}
            ],
            [
              {x:'0|0.5', y:'0|2'},
              {x:'0.5|1.5', y:'0|2'}
            ],

          ],
        3:[
            [
              {x:'0|1', y:'0|2'},
              {x:'1|1', y:'0|2'},
              {x:'2|1', y:'0|2'}
            ],
            [
              {x:'0|3', y:'0|1'},
              {x:'0|1.5',y:'1|1'},
              {x:'1.5|1.5', y:'1|1'}
            ],
            [
              {x:'0|1.5', y:'0|1'},
              {x:'1.5|1.5', y:'0|1'},
              {x:'0|3', y:'1|1'}
            ],
            [
              {x:'0|2', y:'0|2'},
              {x:'2|1', y:'0|1'},
              {x:'2|1', y:'1|1'}
            ],
            [
              {x:'0|1', y:'0|1'},
              {x:'0|1', y:'1|1'},
              {x:'1|2', y:'0|2'}
            ],
        ]
      }
    }
  }
  componentDidMount(){
      const {collages, postNo, selectedIndex}=this.state
      this.props.changeCollage(collages[postNo][selectedIndex])
  }
  displayCollages(){
    const {postNo, collages, selectedIndex} =this.state
    const {boardWidth, boardHeight} = this.props
    const divisor=25;
    const scaledBoardWidth= boardWidth/divisor;
    const scaledBoardHeight= boardHeight/divisor;
    const unitWidth = scaledBoardWidth/postNo;
    const unitHeight = scaledBoardHeight/2;

    let currentCollage = collages[postNo];
    const containerStyle = {
      width:scaledBoardWidth+'px',
      height:scaledBoardHeight+'px'
    }
    return currentCollage.map((container, index)=>{

      return(
        <div className={selectedIndex===index?"collageContainer activeCollage":"collageContainer"} onClick={this.setCollage.bind(this, index)} key={index} style={containerStyle}>
          {
              container.map((item, spIndex)=>{
                let xPosition = item.x.split('|')[0]*unitWidth
                let collageWidth = unitWidth * parseFloat(item.x.split('|')[1])
                let yPosition = item.y.split('|')[0]*unitHeight
                let collageHeight = unitHeight*parseFloat(item.y.split('|')[1])
                const collageStyle={
                  width:collageWidth+'px',
                  height:collageHeight+'px',
                  top:yPosition+'px',
                  left:xPosition+'px'
                }
                return(
                  <span key={spIndex} style={collageStyle}></span>
                )
              })
          }
        </div>
      )
    })

  }
  setCollage(index){
    const {collages, postNo}=this.state
    this.setState({selectedIndex:index})
    this.props.changeCollage(collages[postNo][index])
  }
  changeMediaNum(index){
    const {collages, postNo}=this.state
    this.setState({postNo:index, selectedIndex:0 })
    this.props.changeCollage(collages[index][0])

  }
  renderPostNo(){
    const {collages, postNo}=this.state
    return _.map(collages, (item, index)=>{
      return <li key={index} className={postNo==index? 'active':''} onClick={this.changeMediaNum.bind(this, index)}>{index}</li>
    })
  }
  changeMediaType(index, e ){
    let newMediaType= this.state.mediaTypes
    newMediaType[index]= e.target.value
    this.setState({mediaTypes:newMediaType})
  }

  uploadMedia(){
    const {postNo, collages,selectedIndex} =this.state
    return collages[postNo][selectedIndex].map( (item, index)=>{
      return(
        <Col md={3} key={index} sm={4} xs={12} className="multipleFileItem">
          <span className="indexNum">{index+1}</span>
          <p>
            Media Type
            <select onChange={this.changeMediaType.bind(this,index)} value={this.state.mediaTypes[index]}>
              <option value='image'>Image</option>
              <option value='video'>Video</option>
              <option value='url'>Web Url</option>
            </select>
            {
              (()=>{
                switch(this.state.mediaTypes[index]){
                  case 'image': return <input type="file" accept="image/*" onChange={this.props.renderPreview.bind(this, index, this.state.mediaTypes[index] )} />
                  case 'video': return <input type="file"  accept="video/*" onChange={this.props.renderPreview.bind(this, index, this.state.mediaTypes[index] )} />
                  case 'url': return <input type="text" onBlur={this.props.renderPreview.bind(this, index, this.state.mediaTypes[index])} placeholder="Please type Web URL" />
                  default: return <input type="file" onChange={this.props.renderPreview.bind(this, index, this.state.mediaTypes[index] )} />
                }

              })()
            }

            <Heading size="xs" title="Upload Instruction" />
            <span>
              some Instruction about what to upload
            </span>
          </p>
        </Col>
      )
    }
    )
  }
  render(){
    const {postNo}=this.state
    return(
        <Col xs={12}>
          <Row>
            <Heading size="md" title="Number of Media" />
            <Heading size="sm" title="Chose how many media you want to display at once" />
            <ul className="mediaSelector">
              {this.renderPostNo()}
            </ul>
            <Heading size="sm" title="Choose a media collage" />
            {
              this.displayCollages()
            }
            <Heading size="md" title="Upload Media" />
            <Col xs="12">
              <Row>
                {
                  this.uploadMedia()
                }
              </Row>
            </Col>

          </Row>
        </Col>
    )

  }

}
