import React, {Component} from 'react';
import {signinUser} from '../../actions/userActions';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Heading from '../heading';

class LoginUser extends Component {
    constructor(props){
        super(props)
        this.state={
            username:"",
            password:""
        }
    }
    loginUser(){
        this.props.signinUser(this.state.username, this.state.password).then((data)=>{
            this.props.close('/dashboard')
        })

    }
    render(){
        const {username, password} = this.state;
        return(
            <Row>
                <Col xs={12}>
                    <Heading size="md" title="Sign in to account" />
                        <span className="inputContainer">
                        <input
                            type="text"
                            value={username}
                            onChange={(e)=>this.setState({username:e.target.value})}
                            placeholder="Email"
                        />
                        </span>
                        <span className="inputContainer">
                            <input
                                type="password"
                                value={password}
                                onChange={(e)=>this.setState({password:e.target.value})}
                                placeholder="Passowrd"
                            />
                        </span>
                        <button onClick={this.loginUser.bind(this)}>Login</button>
                        {
                            this.props.error? 'Wrong Username or Password, Please try again.':''
                        }
                </Col>
            </Row>
        )
    }
}
function mapStateToProps(state){
    return(
        {authenticated:state.user.authenticated}
    )
}
const mapDispatchToProps = {signinUser}
export default connect(mapStateToProps, mapDispatchToProps)(LoginUser)
