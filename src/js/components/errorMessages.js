import React from 'react'
import _ from 'lodash';
export default function ({errorMessage}){
    return(
        <div className="col-md-12">
            {  errorMessage.length>0?
                <div className="col-md-12 alert alert-danger">
                    {
                        _.map(errorMessage[0], (item, index)=>{return <div className="col-md-12" key={index}>{item}</div>})
                    }
                </div>:''
            }
        </div>
    )
}
