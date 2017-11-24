import React, {Component} from 'react';
import {signinUser} from '../../actions/userActions';
import {connect} from 'react-redux';
import {Row} from 'react-bootstrap';
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
                <Heading size="lg">Login User</Heading>
                <input type="text" value={username} onChange={(e)=>this.setState({username:e.target.value})} placeholder="email" />
                <input type ="password" value={password} onChange={(e)=>this.setState({password:e.target.value})}  placeholder="Passowrd"/>
                <button onClick={this.loginUser.bind(this)}>Login</button>
                {
                    this.props.error? 'Wrong Username or Password, Please try again.':''
                }
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
