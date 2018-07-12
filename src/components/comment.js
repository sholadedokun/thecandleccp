import React from 'react';
import Heading from './heading';
import Rate from './rating';
import {Col} from 'react-bootstrap'
export default ({rate, title, comment, name})=>{
    return(
        <Col xs="12" sm="6" md="4" className="comment">
            <Rate ratings={rate} maxRatings="5" />
            <Heading title={title} size="sm" />
            <span>{comment}</span>
            <span className="commenter">{name}</span>
        </Col>
    )
}
