import React from 'react';
import Icon from './icon'
import {Col} from 'react-bootstrap'
import Heading from './heading'
export default (props)=>{
  return(
        <Col xs={12} className="creativeContainer">
          <div class="inputField">
            <label>Select Media Type</label>
            <span className="inputContainer radio">
              <span className="radioLabel active">Image</span>
            </span>
            <span className="inputContainer radio">
              <span className="radioLabel">Video</span>
            </span>
            <span className="inputContainer radio">
              <span className="radioLabel">Web URL</span>
            </span>
          </div>
          <Heading size="sm" title="Add Image" />
          <input type="file" name="pic" accept="image/*" />
          <Heading size="xs" title="Upload Instructions" />
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
          </p>
        </Col>
  )
}
