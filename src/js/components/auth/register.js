import React, {Component} from 'react';
import {signUpUser, signinUser} from '../../actions/userActions';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Icon from '../icon'
import Heading from '../heading';
import _ from 'lodash'

class RegisterUser extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            firstName:"",
            lastName:"",
            phone:"",
            password_confirmation:"",
            password:"",
            role:0,
        }
    }
    registerUser(){
        let params= _.omit(this.state, ['firstName', 'lastName'])
        params.name=`${this.state.firstName} ${this.state.lastName}`;
        this.props.signUpUser(params).then((data)=>{
            if(data.id){
                this.props.signinUser(data.email, this.state.password).then((data)=>{
                    this.props.close('/dashboard')
                })
            }
        })
    }
    render(){
        const {email, firstName, lastName, phone,password_confirmation, password} = this.state;
        return(
            <Col xs={10} xsOffset="1" sm={8} smOffset="2" md={4} mdOffset="4"  className="login">
                <Row >
                <Heading size="lg" title="Create an account"></Heading>
                <span className="facebookSignin"> Sign Up using Facebook <Icon icon="facebook" /></span>
                <Col xs="5">
                    <div  className="hrule"></div>
                </Col>
                <Col xs="2" className="or">or</Col>
                <Col xs="5">
                    <div  className="hrule"></div>
                </Col>
                <Col xs="12"  className="inputField">
                    <span className="inputContainer sm">
                        <input type="text" value={firstName} onChange={(e)=>this.setState({firstName:e.target.value})} placeholder="Firstname" />
                    </span>
                    <span className="inputContainer sm">
                        <input type="text" value={lastName} onChange={(e)=>this.setState({lastName:e.target.value})} placeholder="Lastname" />
                    </span>
                </Col>
                <Col xs="12"  className="inputField">
                    <span className="inputContainer sm">
                        <input type="text" value={email} onChange={(e)=>this.setState({email:e.target.value})} placeholder="Email" />
                    </span>
                    <span className="inputContainer sm">
                        <input type="text" value={phone} onChange={(e)=>this.setState({phone:e.target.value})} placeholder="Phone" />
                    </span>
                </Col>
                <Col xs="12"  className="inputField">
                    <span className="inputContainer sm">
                        <input type ="password" value={password} onChange={(e)=>this.setState({password:e.target.value})} placeholder="Password" />
                    </span>
                    <span className="inputContainer sm">
                        <input type ="password" value={password_confirmation} onChange={(e)=>this.setState({password_confirmation:e.target.value})} placeholder="Confirm Password"  />
                    </span>
                </Col>
                <Col xs="12"  className="inputField">
                    <button  className="primaryButton" onClick={this.registerUser.bind(this)}>Register</button>
                </Col>
                {
                    this.props.error? 'Wrong email or Password, Please try again.':''
                }
                <span className="alternate"> {`Already have an account`}? <a href="#">Sign In</a> </span>
                </Row>
            </Col>
        )
    }
}
function mapStateToProps(state){
    return(
        {authenticated:state.user.authenticated}
    )
}
const mapDispatchToProps = {signUpUser, signinUser}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser)
