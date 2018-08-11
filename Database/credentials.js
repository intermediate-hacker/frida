/** @file Code to store and handle form 
  * user authentication. Used for web-facing forms
  * including add new paper, register author etc.
  * @author Muhammad Tirmazi
  */


/**
  * Check if the credentials submitted in a form are accurate
  * @param {string} username The username submitted in the form
  * @param {string} password The password submitted in the form
  * @returns {bool} True if credentials are correct, false otherwise.
  */
const validateCredentials = (username, password) => {
	if ((username === "frida") && (password === "kahlo123")) {
		return true;
	} else {
		return false;
	}
}

module.exports = { validateCredentials };