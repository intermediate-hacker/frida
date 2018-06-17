const contributeBoilerplate = `
<div class="container-fluid">
    <div class="alert alert-info alert-dismissible fade show" role="alert">
    	<button type="button" class="close" data-dismiss="alert">&times;</button>
    	<button class="btn btn-sm btn-outline-primary" onclick="generateContributePage();">Add Paper</button>
  		<button class="btn btn-sm btn-outline-primary" onclick="generateAddAuthorPage();">Add Author</button>
  		<button class="btn btn-sm btn-outline-primary" onclick="generateAddInstitutionPage();">Add Institution</button>
	</div>
	<div class="card">
		<div class="card-header text-primary" style="background-color: #e3f2fd;"">
			Add Paper to Database
		</div>
		<form>
			<div class="form-group">
				<label for="formUsername">Your Credentials:</label>
				<input type="text" class="form-control" id="formUsername" placeholder="username">
				<input type="password" class="form-control" id="formPassword" placeholder="password">
			</div>
			<div class="form-group">
				<label for="formPaperTitle">Paper Title:</label>
				<input type="text" class="form-control" id="formPaperTitle" placeholder="A Treatise On Important Things">
			</div>

			<div class="form-group">
				<label>File attachment method:</label>
				<div class="form-check form-check-inline">
					<input class="form-check-input" type="radio" name="formAttachFileRadios" id="formAttachFileRadio1" value="uploadFile">
					<label class="form-check-label" for="formAttachFileRadio1">Upload a file</label>
				</div>

				<div class="form-check form-check-inline">
					<input class="form-check-input" type="radio" name="formAttachFileRadios" id="formAttachFileRadio2" value="addURL">
					<label class="form-check-label" for="formAttachFileRadio2">Add a URL</label>
				</div>
			</div>

			<div class="form-group">
				<label for="formFileToUpload">Upload File:</label>
				<input type="file" class="form-control-file" id="formFileToUpload">
			</div>

			<div class="form-group">
				<label for="formFileURL">Enter Paper URL:</label>
				<input type="url" class="form-control" id="formFileURL" placeholder="http://">
			</div>
		</form>
	</div>
</div>`;

const generateContributePage = () => {
	document.body.innerHTML = menuBoilerplate + contributeBoilerplate;
};