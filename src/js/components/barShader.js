import React from 'react';

export default ({type, icon, size='sm', height})=>{
    let className='fa fa-'+icon+(type ? ' '+type: '')
    const style={
        sm:{
            background: "#5402aa",
            height: height+'px'
        },
        md:{
            background: "#993366",
            height: height+'px'
        }
    }
    return(
        <div className="barChart">
            <div className="barHandle" style={style[size]}></div>
        </div>
    )
}
