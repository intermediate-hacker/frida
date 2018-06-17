const addInstitutionBoilerplate = `
<div class="container-fluid">
    <div class="alert alert-info alert-dismissible fade show" role="alert">
    	<button type="button" class="close" data-dismiss="alert">&times;</button>
    	<button class="btn btn-sm btn-outline-primary" onclick="generateContributePage();">Add Paper</button>
  		<button class="btn btn-sm btn-outline-primary" onclick="generateAddAuthorPage();">Add Author</button>
  		<button class="btn btn-sm btn-outline-primary" onclick="generateAddInstitutionPage();">Add Institution</button>
	</div>

	<div class="card">
		<div class="card-header">
			Add Institution to Database
		</div>
		<form>
			<div class="form-group">
				<label for="formUsername">Your Credentials:</label>
				<input type="text" class="form-control" id="formUsername" placeholder="username">
				<input type="password" class="form-control" id="formPassword" placeholder="password">
			</div>
			<div class="form-group form-group-inline">
				<label for="formPaperTitle">Name of Institution:</label>
				<input type="text" class="form-control" id="formInstitutionName" placeholder="University of California">
			</div>

			<div class="form-group">
				<label for="formPaperTitle">Campus of Institution:</label><br>
				<label>(put in "Main" if only one campus)</label>
				<input type="text" class="form-control" id="formInstitutionCampus" placeholder="Berkeley">
			</div>			
		</form>
	</div>
</div>`;

const generateAddInstitutionPage = () => {
	document.body.innerHTML = menuBoilerplate + addInstitutionBoilerplate;
};