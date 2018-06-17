const addAuthorBoilerplate = `
<div class="container-fluid">
    <div class="alert alert-info alert-dismissible fade show" role="alert">
    	<button type="button" class="close" data-dismiss="alert">&times;</button>
    	<button class="btn btn-sm btn-outline-primary" onclick="generateContributePage();">Add Paper</button>
  		<button class="btn btn-sm btn-outline-primary" onclick="generateAddAuthorPage();">Add Author</button>
  		<button class="btn btn-sm btn-outline-primary" onclick="generateAddInstitutionPage();">Add Institution</button>
	</div>

	<div class="card">
		<div class="card-header">
			Add Author to Database
		</div>
		<form>
			<div class="form-group">
				<label for="formUsername">Your Credentials:</label>
				<input type="text" class="form-control" id="formUsername" placeholder="username">
				<input type="password" class="form-control" id="formPassword" placeholder="password">
			</div>
			<div class="form-group form-group-inline">
				<label for="formPaperTitle">First Name of Author:</label>
				<input type="text" class="form-control" id="formAuthorFirstName" placeholder="Frida">
			</div>

			<div class="form-group">
				<label for="formPaperTitle">Last Name of Author:</label>
				<input type="text" class="form-control" id="formAuthorFirstName" placeholder="Kahlo">
			</div>			
		</form>
	</div>
</div>`;

const generateAddAuthorPage = () => {
	document.body.innerHTML = menuBoilerplate + addAuthorBoilerplate;
};