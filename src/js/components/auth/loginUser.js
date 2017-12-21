import React, {Component} from 'react';
import {signinUser} from '../../actions/userActions';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Heading from '../heading';
import Icon from '../icon'

class LoginUser extends Component {
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:"",
            loading:false
        }
    }
    loginUser(){
        this.setState({loading: true})
        this.props.signinUser(this.state.username, this.state.password).then((data)=>{
            this.setState({loading:false})
            this.props.close('/dashboard')
        })
        .catch((e)=>{
            this.setState({loading:false})
        })

    }
    render(){
        const {username, password, loading} = this.state;
        return(
            <Col xs={10} xsOffset="1" sm={4} smOffset="6" md={4} mdOffset="4"  className="login">
                <Row >
                    <Heading size="md" title="Sign in to account" />
                    <span className="facebookSignin"> Sign in using Facebook <Icon icon="facebook" /></span>
                    <Col xs="5">
                        <div  className="hrule"></div>
                    </Col>
                    <Col xs="2" className="or">or</Col>
                    <Col xs="5">
                        <div  className="hrule"></div>
                    </Col>
                    <Col xs="12"  className="inputField">
                        <span className="inputContainer lg">
                        <input
                            type="text"
                            value={username}
                            onChange={(e)=>this.setState({username:e.target.value})}
                            placeholder="Email"
                        />
                        </span>
                    </Col>
                    <Col xs="12"className="inputField">
                        <span className="inputContainer lg">
                            <input
                                type="password"
                                value={password}
                                onChange={(e)=>this.setState({password:e.target.value})}
                                placeholder="Passowrd"
                            />
                        </span>
                        {
                            loading?<Icon icon="circle-o-notch fa-spin loading"  />:
                            <button  className="primaryButton" onClick={this.loginUser.bind(this)}>Login</button>
                        }
                    </Col>


                        {
                            this.props.error ? <div className="errorNotification animate shake">{ this.props.error}</div>:''
                        }
                        <div> Forgot Password </div>
                        <span className="alternate"> {`Don't have an account`}? <a href="#">Sign Up</a> </span>
                </Row>
            </Col>
        )
    }
}
function mapStateToProps(state){
    return(
        {
            authenticated:state.user.authenticated,
            error:state.user.error
        }
    )
}
const mapDispatchToProps = {signinUser}
export default connect(mapStateToProps, mapDispatchToProps)(LoginUser)
