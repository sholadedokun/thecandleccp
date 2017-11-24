import React, {Component} from 'react';
import Icon from '../icon'
import {Col} from 'react-bootstrap'
import Heading from '../heading'
export default class singlePost extends(Component){
    constructor(props){
        super(props);
        this.state={
            selectedMediaIndex:0,
            mediaTypes:['image', 'video', 'url'],
            collages:{1:[{x:'0|1', y:'0|2'}]}
        }
    }
    componentDidMount(){
        this.props.changeCollage(this.state.collages[1])
    }
    render(){
        const {selectedMediaIndex}= this.state;
        return(
              <Col xs={12} className="creativeContainer">
                <div class="inputField">
                  <label>Select Media Type</label>
                  <span className="inputContainer radio" onClick={(e)=>this.setState({selectedMediaIndex:0})}>
                    <span className={`radioLabel ${selectedMediaIndex===0?'active':''}`}>Image</span>
                  </span>
                  <span className="inputContainer radio" onClick={(e)=>this.setState({selectedMediaIndex:1})}>
                    <span className={`radioLabel ${selectedMediaIndex===1?'active':''}`}>Video</span>
                  </span>
                  <span className="inputContainer radio" onClick={(e)=>this.setState({selectedMediaIndex:2})}>
                    <span  className={`radioLabel ${selectedMediaIndex===2?'active':''}`}>Web URL</span>
                  </span>
                </div>
                <Heading size="sm" title="Add Image" />
                {
                  (()=>{
                    switch(this.state.mediaTypes[selectedMediaIndex]){
                      case 'image': return <input type="file" accept="image/*" onChange={this.props.renderPreview.bind(this, 0, this.state.mediaTypes[selectedMediaIndex] )} />
                      case 'video': return <input type="file"  accept="video/*" onChange={this.props.renderPreview.bind(this, 0, this.state.mediaTypes[selectedMediaIndex] )} />
                      case 'url': return <input type="text" onBlur={this.props.renderPreview.bind(this, 0, this.state.mediaTypes[selectedMediaIndex])} placeholder="Please type Web URL" />
                      default: return <input type="file" onChange={this.props.renderPreview.bind(this, 0, this.state.mediaTypes[selectedMediaIndex] )} />
                    }

                  })()
                }

                <Heading size="xs" title="Upload Instructions" />
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                </p>
              </Col>
        )
    }

}
