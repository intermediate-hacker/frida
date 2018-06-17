const searchBoilerplate = `
<div class="container-fluid">
    <div class="alert alert-info alert-dismissible fade show" role="alert">
    	<button type="button" class="close" data-dismiss="alert">&times;</button>
  		Want more detailed results? Try:    <button class="btn btn-sm btn-outline-primary">Refined Search</button>
	</div>

	<div class="card">
		<div class="card-header">
			Search Database
		</div>		
		<div class="card-body">
			<div class="row">
				<div class="col-sm-8">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
				</div>

				<div class="col-sm-2">
		    		<button class="btn btn-outline-primary my-2 my-sm-0"">Search</button>
		    	</div>
		    </div>
	    </div>
    </div>
</div>`;

const generateSearchPage = () => {
	document.body.innerHTML = menuBoilerplate + searchBoilerplate;
}