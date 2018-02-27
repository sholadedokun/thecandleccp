export function errorHandler(nextProps){
        if(nextProps.error){
            this.setState({errorMessages:[...this.state.errorMessages, ...nextProps.error]})
            this.setState({loading:false})
        }
}
