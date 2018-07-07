const addAuthorBoilerplate = `
<div class="container-fluid">
    <div class="alert alert-info alert-dismissible fade show" role="alert">
    	<button type="button" class="close" data-dismiss="alert">&times;</button>
    	<button class="btn btn-sm btn-outline-primary" onclick="generateContributePage();">Add Paper</button>
  		<button class="btn btn-sm btn-outline-primary" onclick="generateAddAuthorPage();">Add Author</button>
  		<button class="btn btn-sm btn-outline-primary" onclick="generateAddInstitutionPage();">Add Institution</button>
	</div>

	<div class="card">
		<div class="card-header text-primary" style="background-color: #e3f2fd;"">
			Add Author to Database
		</div>
		<form>
			<div class="form-group">
				<label for="formUsername">Your Credentials:</label>
				<input type="text" class="form-control" name="formUsername" placeholder="username">
				<input type="password" class="form-control" name="formPassword" placeholder="password">
			</div>
			<div class="form-group" id="firstNameFormGroup">
				<label for="formPaperTitle">First Name of Author:</label>
				<div class="row">
					<div class="col-8">
						<input type="text" class="form-control" name="formAuthorFirstName">
					</div>

					<div class="col-2">
						<button class="btn btn-info" id="firstNameFormGroupInfoBtn" onclick="addTooltipAfterElement('firstNameFormGroup', 'Enter your forename');">
							?
						</button>
					</div>
				</div>
			</div>

			<div class="form-group" id="lastNameFormGroup">
				<label for="formPaperTitle">Last Name of Author:</label>
				<div class="row">
					<div class="col-8">
						<input type="text" class="form-control" name="formAuthorLastName">
					</div>

					<div class="col-2">
						<button class="btn btn-info" id="firstNameFormGroupInfoBtn" onclick="addTooltipAfterElement('lastNameFormGroup', 'Enter your lastname');">
							?
						</button>					
					</div>
				</div>
			</div>			
		</form>
	</div>
</div>`;

const generateAddAuthorPage = () => {
	document.body.innerHTML = menuBoilerplate + addAuthorBoilerplate;
};