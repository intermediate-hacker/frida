
const menuBoilerplate = 
`<div class="container-fluid">

  <img src="https://swgi.lums.edu.pk/sites/all/themes/swgi/logo.png">

  <nav class="navbar navbar-expand-md" style="background-color: #e3f2fd;">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">  
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <button class="btn btn-outline-primary" onclick="generateFrontPage();">Home</button>
        </li>  	
        <li class="nav-item">
          <button class="btn btn-outline-primary" onclick="generateSearchPage();">Search Database</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-primary">View Conferences</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-primary" onclick="generateContributePage();">Contribute</button>
        </li>
      </ul>
    </div>

    <div class="mx-auto order-0">
      <a class="navbar-brand mx-auto" href="#">Gender Studies Database</a>
    </div>

    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <button class="btn btn-outline-primary" onclick="generateAboutPage();">About</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-primary">Contact Us</button>
        </li>    
      </ul>
    </div>
  </nav>
</div>`;

const addMenuBoilerplate = () => {
  document.body.innerHTML = menuBoilerplate + document.body.innerHTML;
};

// addMenuBoilerplate();