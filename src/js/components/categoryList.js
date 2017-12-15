import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading';
import CategoryList from  './categoryList'
import Icon from './icon'
class Category extends(React.Component){
    render(){
        return(
            <Col xs={this.props.xs} sm={this.props.sm} className="category">
                {
                    this.props.icon?<Icon icon={this.props.icon} />:
                        this.props.image?<img src={this.props.image} width="100%" />:
                            this.props.number? <span className="icon_number">{this.props.number}</span>:''
                }
                <Heading title={this.props.title} size="sm" />
                {this.props.children}
            </Col>
        )

    }

}

export default Category
