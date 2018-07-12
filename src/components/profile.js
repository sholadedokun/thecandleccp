import React from 'react';
import Icon from './icon'
export default ({name, image, position})=>
        <div className="profile_details">
            <span className="profile_img">
                <img src={image} />
            </span>
            <div className="profile_desc">
                <span className="name">{name}</span><br/>
                <span className="">{position}</span>
            </div>

        </div>
