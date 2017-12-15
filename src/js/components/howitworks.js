import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import QuickRegister from './quickRegister';
import Howitworks from './howitworks';
import Heading from './heading'
import Category from './categoryList'
const home =()=>
<Col xs={12} className="section howitworks">
    <Row>
        <Heading size="lg" title="How it Works">
            Sample text of what this page should look like
        </Heading>
        <Col xs={12} className="categoryContainer">
            <Category xs={12} sm={4} title="Create Campaign"  number="1">
                Some sample text about how to create a campaign and Manage it.
            </Category>
            <Category xs={12} sm={4} title="Fund Account"  number="2">
                Some sample text about how to create a campaign and Manage it.
            </Category>
            <Category xs={12} sm={4} title="Push Advert"  number="3">
                Some sample text about how to create a campaign and Manage it.
            </Category>
        </Col>
    </Row>
</Col>;
export default home
