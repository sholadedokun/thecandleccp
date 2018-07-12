export function errorHandler(nextProps) {
	console.log(nextProps);
	if (nextProps.error || nextProps.error[0]) {
		this.setState({ errorMessages: [...this.state.errorMessages, ...nextProps.error] });
		this.setState({ loading: false });
	}
}
