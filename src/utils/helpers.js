export const getEventNameValue = (event = {}) => {
	let value =
		event.target.type === "checkbox"
			? event.target.checked
			: event.target.value;
	let name = event.target.name;

	return ({ name, value })
}
