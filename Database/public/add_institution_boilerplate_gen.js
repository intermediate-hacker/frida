const addInstitutionBoilerplate = `
<div class="container-fluid">
    <div class="alert alert-info alert-dismissible fade show" role="alert">
    	<button type="button" class="close" data-dismiss="alert">&times;</button>
    	<button class="btn btn-sm btn-outline-primary" onclick="generateContributePage();">Add Paper</button>
  		<button class="btn btn-sm btn-outline-primary" onclick="generateAddAuthorPage();">Add Author</button>
  		<button class="btn btn-sm btn-outline-primary" onclick="generateAddInstitutionPage();">Add Institution</button>
	</div>

	<div class="card">
		<div class="card-header text-primary" style="background-color: #e3f2fd;"">
			Add Institution to Database
		</div>
		<form action="/add_institution" method="post">
			<div class="form-group">
				<label for="formUsername">Your Credentials:</label>
				<input type="text" class="form-control" name="formUsername" placeholder="username" required>
				<input type="password" class="form-control" name="formPassword" placeholder="password" required>
			</div>
			<div class="form-group form-group-inline">
				<label for="formPaperTitle">Name of Institution:</label>
				<input type="text" class="form-control" name="formInstitutionName" required>
				<small class="form-text text-muted">Check list of institutions already in our database <a href="/list_institutions" target="_blank">here</a></small>.				
			</div>

			<div class="form-group" id="institutionCampusFormGroup">
				<label for="formPaperTitle">Campus of Institution:</label><br>

				<div class="row">
					<div class="col-8">
						<input type="text" class="form-control" name="formInstitutionCampus" placeholder="Main" required>
					</div>
					<div class="col-2">
						<button class="btn btn-info" onclick="addTooltipAfterElement('institutionCampusFormGroup', 'Put in <i>Main</i> if only one campus');">
							?
						</button>
					</div>
				</div>
			</div>

			<div class="form-group">
			 	<button type="submit" class="btn btn-primary">Submit</button>
			</div>
		</form>
	</div>
</div>`;

const generateAddInstitutionPage = () => {
	document.body.innerHTML = menuBoilerplate + addInstitutionBoilerplate;
};