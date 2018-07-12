import React from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
export default (props) =>{
    let tooltip = <Tooltip id={props.id}>{props.tooltip}</Tooltip>;
    return(
        <OverlayTrigger   overlay={tooltip}   placement="top"   delayShow={300}  delayHide={150}>
            {props.children}
        </OverlayTrigger>
    )
}
