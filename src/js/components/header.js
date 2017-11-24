import React, {Component} from 'react'
import { Row, Col, Navbar, Nav, NavItem} from 'react-bootstrap'
import Login from './auth/loginUser';
import Register from './auth/register';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser} from '../actions/userActions';
import ReactModal from 'react-modal';
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
    authenticated(){
        let resolvedLinks = (this.props.user)?
            [

                <li role="presentation" key="1a"><Link to="/dashboard">dashboard</Link></li>,
                <li role="presentation" key="1b" onClick={this.signoutUser.bind(this)}><a href="#">logout</a></li>,
            ]:
            [
                <li role="presentation" key="2a"  onClick={()=>this.setState({modalLoad:'login', modalOpen:true})}><a href="#">login</a></li>,
                <li role="presentation" key="2b"  onClick={()=>this.setState({modalLoad:'register', modalOpen:true})}><a href="#">register</a></li>
            ]
            return resolvedLinks
    }
    handleCloseModal (route) {
        if(route) this.props.history.push(route)
        this.setState({ modalOpen: false });
    }
    render(){
        const {modalOpen, modalLoad}=this.state;
        return(
            <Row className="header">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">TheCandle</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <li role="presentation" className="active"><Link to="/">Home</Link></li>
                            <li role="presentation"><Link to="/howitworks">How it works</Link></li>
                            <li role="presentation"><Link to="/help">Help</Link></li>
                            {
                                this.authenticated()
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <ReactModal
                    isOpen={modalOpen} shouldCloseOnOverlayClick={true}
                    onRequestClose={this.handleCloseModal.bind(this)}
                >
                    {
                        (modalLoad==='login')?
                        <Login close={this.handleCloseModal.bind(this)} />:
                        <Register close={this.handleCloseModal.bind(this)} />
                    }
                </ReactModal>
            </Row>
        )
    }
}
function mapStateToProps(state) {
  return { user: state.user.authenticated };
}
const mapDispatchToProps= {signoutUser}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
