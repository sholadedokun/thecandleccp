import React from 'react';
import {Col} from 'react-bootstrap';
import Heading from '../../../components/heading';
import Profile from '../../../components/profile';

const OurChef =(props)=>
    <Col xs={12} className="section">
        <Heading size="md" title="What People are saying">
            Sample text for clarification
        </Heading>
        <Col xs={12} className="commentContainer">
            <Col xs={12} sm={6} className="category " >
                <Col xs={12} className= "commentList">
                    <Profile name="olushola Adedokun" position="Manager, myonlinemeal" />
                    <span className="hrule"></span>
                    <p>
                        Some lovely comment about how the food has changed their lives,
                        how it help save money, how its an healthy choice and how good the meals tastes.
                    </p>
                </Col>

            </Col>
            <Col xs={12} sm={6}  className="category" >
                <Col xs={12} className= "commentList">
                    <Profile name="olushola Adedokun" position="Manager, myonlinemeal" />
                    <span className="hrule"></span>
                    <p>
                        Some lovely comment about how the food has changed their lives,
                        how it help save money, how its an healthy choice and how good the meals tastes.
                    </p>
                </Col>

            </Col>

        </Col>
    </Col>
export default OurChef
