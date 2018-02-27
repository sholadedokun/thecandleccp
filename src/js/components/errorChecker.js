import _ from 'lodash'
export function empyFieldChecker(errors, objects ){

    let newErrors= _.reduce(objects, (errors, value, key )=>{
        if(value=='') errors[key]=true;
        return errors
    }, errors)
    if(!_.isEmpty(errors))
        this.setState({errors, loading:false, errorMessages:[...this.state.errorMessages, ['One of more Field(s) need your attention']]})
    return newErrors
}
