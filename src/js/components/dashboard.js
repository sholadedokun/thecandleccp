import React, {Component} from 'react';
import ReactModal from 'react-modal';
import CreateCampaign from './createCampaign';
import AddAdSet from './AddSet/addAdSet';
import {Row, Grid} from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            modalOpen:false,
            modalLoad:'create Campaign'
        }
    }
    createCampaign(){
        this.setState({modalOpen: true, modalLoad:'createCampaign'})
    }
    addAdSet(){
        this.setState({modalOpen: true, modalLoad:'addAdSet'})
    }
    handleCloseModal (route) {
        // if(route) this.props.history.push(route)
        // this.setState({ modalOpen: false });
    }
    render(){
        const {modalOpen, modalLoad}=this.state;
        return(
            <Row>
                <h2>Dashoard</h2>
                <a href="#" onClick={this.createCampaign.bind(this)}>Create Campaign</a><br/>
                <a href="#" onClick={this.addAdSet.bind(this)}>Add AdSet</a>
                <ReactModal
                    isOpen={modalOpen} shouldCloseOnOverlayClick={true}
                    onRequestClose={this.handleCloseModal.bind(this)}
                >
                    {
                        (modalLoad==='createCampaign')?
                        <CreateCampaign close={this.handleCloseModal.bind(this)} />:
                        <AddAdSet close={this.handleCloseModal.bind(this)} />
                    }
                </ReactModal>
            </Row>
        )
    }
}
export default Dashboard
