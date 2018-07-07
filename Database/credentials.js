
const validateCredentials = (username, password) => {
	if ((username === "frida") && (password === "kahlo123")) {
		return true;
	} else {
		return false;
	}
}

module.exports = { validateCredentials };