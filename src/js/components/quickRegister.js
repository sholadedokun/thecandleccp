import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import Heading from './heading';
import {connect} from 'react-redux';
import {modalStatus} from '../actions/userActions'
class Register extends Component {
    render(){
        return(
            <Col xs={12}  className="register">
                <Heading size="lg" title="Running Ads. has never been easier." marginBottom="-0.2em">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Heading>
                <div className="bigInput">
                    <input type="text" name="email" placeholder="Your Email Address" />
                    <button className="primaryButton">GET STARTED</button>
                </div>

            </Col>
        )
    }
}
export default connect(null, {modalStatus})(Register)

// <p>
//     Already have an account? <a onClick={()=>this.props.modalStatus(true, 'login')} >Login Here</a><br/>
//     By continuing, you are agreeing to our <a>terms and condition</a>
// </p>
