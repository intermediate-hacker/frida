const frontPageBoilerplate = 
`<div class="container-fluid">
  <div class="row">
    <div class="col-sm-5">
        <div class="card">
          <div class="card-header">
            Recent Publications
          </div>
          <div class="card-body">
          </div>
        </div>
    </div>

    <div class="col-sm-4">
        <div class="card">
          <div class="card-header">
            Popular Publications
          </div>
          <div class="card-body">
          </div>
        </div>
    </div>

    <div class="col-sm-3">
        <div class="card">
          <div class="card-header">
            Upcoming
          </div>
          <div class="card-body">
          </div>
        </div>      
    </div>
  </div>
</div>`;

const generateFrontPage = () => {
	document.body.innerHTML = menuBoilerplate + frontPageBoilerplate;
}