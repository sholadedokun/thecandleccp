import React, {Component} from 'react'
import { Row, Col, Navbar, Nav, NavItem} from 'react-bootstrap'
import Login from './auth/loginUser';
import Register from './auth/register';
import AddAdSet from './AddSet/addAdSet';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser, fetchUser} from '../actions/userActions';
import ReactModal from 'react-modal';
import Icon from './icon'
class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            modalOpen:false,
            modalLoad:'login',
        }
    }
    signoutUser(){
        this.props.signoutUser()

    }
    userLogin(e){
        (e.target.value=='signOut')?
            this.signoutUser():
            ''
    }
    authenticated(user){

        let resolvedLinks = (user.authenticated)?
            [

                <li role="presentation" key="1a">
                    <div className="formField rangeSelect profile_display">
                        <span className="display_pic">
                            <Icon icon="user" />
                        </span>
                        <select onChange={this.userLogin.bind(this)} >
                            <option className="">
                            {
                                (()=>(user.data)?user.data.name:'')()
                            }</option>
                            <option value="signOut">Sign out</option>
                        </select>
                    </div>

                </li>,
                <li role="presentation" key="1b"onClick={()=>this.setState({modalLoad:'addAdset', modalOpen:true})}><a className="actionButton post_campaign_ads"  href="#">Post Ads</a></li>,
            ]:
            [
                <li role="presentation" className="active"><Link to="/">Feature</Link></li>,
                <li role="presentation"><Link to="/howitworks">How it works</Link></li>,
                <li role="presentation"><Link to="/help">Spaces</Link></li>,
                <li role="presentation" key="2a"  onClick={()=>this.setState({modalLoad:'login', modalOpen:true})}><a className="buttonLink"  href="#">login</a></li>,
                <li role="presentation" key="2b"  onClick={()=>this.setState({modalLoad:'register', modalOpen:true})}><a className="buttonLink"  href="#">register</a></li>
            ]
            return resolvedLinks
    }
    handleCloseModal (route) {
        if(route) this.props.history.push(route)
        this.setState({ modalOpen: false });
    }
    render(){
        const {modalOpen, modalLoad}=this.state;
        const {user}=this.props;
        console.log(user)
        return(
            <Row  className={user.authenticated?'nav_dashboard header':'header'} >
                <Navbar inverse collapseOnSelect >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">TheCandle</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>

                            {
                                this.authenticated(user)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {
                    user.authenticated?
                    <Row>
                        <Col xs="12">
                            <div className="hrule"></div>
                            <div className="dashboard_menu">
                                <ul>
                                    <li>Dashboard</li>
                                    <li>Billings</li>
                                    <li>Account</li>
                                </ul>
                            </div>
                            <div className="hrule"></div>
                        </Col>
                    </Row>:''

                }
                <ReactModal
                    isOpen={modalOpen} shouldCloseOnOverlayClick={true}
                    onRequestClose={this.handleCloseModal.bind(this)}
                    className={
                        {
                            base: 'modalClass',
                            afterOpen: 'modalClass_after-open',
                            beforeClose: 'modalClass_before-close'
                        }
                    }
                >
                    {
                        (modalLoad==='login')?
                        <Login close={this.handleCloseModal.bind(this)} />:
                            (modalLoad=='register')?
                            <Register close={this.handleCloseModal.bind(this)} />:
                            <AddAdSet close={this.handleCloseModal.bind(this)} />
                    }
                </ReactModal>
            </Row>
        )
    }
}
function mapStateToProps(state) {
  return {
       user: state.user
   };
}
const mapDispatchToProps= {signoutUser}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
