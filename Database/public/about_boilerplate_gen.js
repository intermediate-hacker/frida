const aboutBoilerplate = `
	<div class="container">
		<h1> About Us </h1>
	</div>`;

const generateAboutPage = () => {
	document.body.innerHTML = menuBoilerplate + aboutBoilerplate;
}