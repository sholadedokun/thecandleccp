import React, {Component} from 'react'
import { Row, Col, Navbar, Nav, NavItem} from 'react-bootstrap'
import { Link } from 'react-router-dom';
export default class Header extends Component {
    render(){
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
                            <NavItem class="active">
                                <Link to="/">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/howitworks">How it Works</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/help">Help</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/login">login</Link>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Row>
        )
    }
}
