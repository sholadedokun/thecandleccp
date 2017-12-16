import React from 'react';
import Icon from './icon'
export default (props)=>{
    const style={
        xs:{
            fontSize: "0.95em",
            fontWeight: "bold",
            marginBottom: props.marginBottom
        },
        sm:{
            fontSize: "1.3em",
            marginBottom: props.marginBottom
        },
        md:{
            fontSize: "1.8em",
            marginBottom: props.marginBottom
        },
        lg:{
            fontSize: "2.5em",
            marginBottom: props.marginBottom
        }

    }
    return(
        <span className="headings">
            {props.size==='lg'?<h1 style={style[props.size]}><Icon icon={props.icon} />{props.title}</h1>:
                props.size==='md'?<h2 style={style[props.size]}><Icon icon={props.icon} />{props.title}</h2>:
                    props.size==='sm'?<h3 style={style[props.size]}><Icon icon={props.icon} />{props.title}</h3>:
                      props.size==='xs'?<h4 style={style[props.size]}><Icon icon={props.icon} />{props.title}</h4>:
                        <h1 style={style[props.size]}>props.title</h1>
            }
            {
                props.children?<p>{props.children}</p>:''

            }

        </span>
    )

}
