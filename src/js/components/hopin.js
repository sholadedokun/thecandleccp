import React from 'react';
import Heading from './heading';
import {Row, Col} from 'react-bootstrap';
import Icon from './icon'
export default ()=>
    <Row>
        <Col xs={12} className="section footer" >
            <Heading size="lg" title="Excited! start Using the Candle">
                sign up today and get 50% discount
            </Heading>
            <div className="bigInput">
                <input type="text" name="email" placeholder="Your Email Address" />
                <button className="primaryButton">GET STARTED</button>
            </div>
        </Col>
    </Row>
