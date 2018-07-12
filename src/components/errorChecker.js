import _ from "lodash";
export function emptyFieldChecker(errors, objects) {
	let newErrors = _.reduce(
		objects,
		(errors, value, key) => {
			if (value == "") errors[key] = true;
			return errors;
		},
		errors
	);
	if (!_.isEmpty(errors) && this) this.setState({ errors, loading: false, errorMessages: [...this.state.errorMessages, ["One of more Field(s) need your attention"]] });
	return newErrors;
}
export function arrObjectFieldChecker(errors, arrObjects, fieldName) {
	for (let x = 0; x < arrObjects.length; x++) {
		let error = {};
		let allEmptyField = emptyFieldChecker(error, arrObjects[x]);
		if (error[fieldName]) {
			errors.push(true);
		}
	}
	if (!_.isEmpty(errors) && this.setState) {
        console.log(this.state)
		this.setState({
			errors,
			loading: false,
			errorMessages: [...this.state.errorMessages, ["One of more Field(s) need your attention"]]
		});
	}

	return errors;
}
