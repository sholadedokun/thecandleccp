import React from 'react';

export default ({type, icon, color, size='sm', height})=>{
    let className='fa fa-'+icon+(type ? ' '+type: '')
    const style={
        parent:{
            sm:{height: height+'px'},
            md:{height: height+'px'}
        },
        child:{
            sm:{background: "#5402aa"},
            md:{background: "#993366"}
        }
    }
    return(
        <div className="barChart">
            <div className="barContainer" style={style.parent[size]}>
                <div className={`barHandle ${color}`} ></div>
            </div>
        </div>
    )
}
