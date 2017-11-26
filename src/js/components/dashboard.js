import React, {Component} from 'react';
import ReactModal from 'react-modal';
import CreateCampaign from './createCampaign';
import AddAdSet from './AddSet/addAdSet';
import {fetchCampaign} from '../actions/campaignActions';
import {connect} from 'react-redux';
import {Row, Grid, Col} from 'react-bootstrap';
import _ from 'lodash';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            modalOpen:false,
            modalLoad:'create Campaign'
        }
    }
    componentWillMount(){
        this.props.fetchCampaign()
    }
    createCampaign(){
        this.setState({modalOpen: true, modalLoad:'createCampaign'})
    }
    addAdSet(){
        this.setState({modalOpen: true, modalLoad:'addAdSet'})
    }
    handleCloseModal (route) {
        if(route) this.setState({modalLoad:route})
        // this.setState({ modalOpen: false });
    }
    render(){
        const {modalOpen, modalLoad}=this.state;
        const {allCampaigns} = this.props;
        return(
            <Row>
                <h2>Dashoard</h2>
                <Col md={3}>
                    <a href="#" onClick={this.createCampaign.bind(this)}>Create Campaign</a><br/>
                    <a href="#" onClick={this.addAdSet.bind(this)}>Add AdSet</a>
                </Col>
                <Col md={9}>
                    <ul>
                    {
                        _.map(allCampaigns, (item, index)=>{
                            return(
                                <li key={index}>{item.name}</li>
                            )

                        })
                    }
                    </ul>
                </Col>

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

function mapStateToProps(state){
    return(
        {allCampaigns:state.campaigns.allCampaigns}
    )
}
const mapDispatchToProps = {fetchCampaign}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
