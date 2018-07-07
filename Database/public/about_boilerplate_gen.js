const aboutBoilerplate = `
	<div class="container-fluid">
	<div class="card">
		<div class="card-header text-primary" style="background-color: #e3f2fd;"">
			About the Research Database Network (RDN)
		</div>
		<div class="card-body">
		<p>The Gender Studies in Pakistan Research and Database Network (RDN) aims to strengthen the capacity of gender studies research and programming in the country. It responds to a pressing need for a space that collates existing research and offers collaborative opportunities for the development of future research agendas. The database aims to expand the visibility of gender studies in Pakistan, and encourage the development of research connections amongst scholars interested in the field.</p>

<p>It will consolidate scattered gender-related resources, highlighting them and making them easily available, in order to challenge the reductive framings of gender relations and inequality in Pakistan. Targeting multiple types of research communities, the proposed project aims to evolve into a multimedia clearinghouse that can be of use to researchers, students, and laypersons. It will facilitate both research dissemination and the development of future research agendas and collaborations across different university communities. The online database resource will supplement academic bibliographies and help visualize existing research and reports. </p>

<p>The Database consists of a supplementary listserv for academics to connect over existing and future research projects.  People can sign up to be included in a list server to get notifications about gender-related newsletters, conference calls etc. There is a constantly updated events calendar to share information about events, conferences, and opportunities related to gender for students and academics.</p>
	</div>
	</div>
	</div>`;

const generateAboutPage = () => {
	document.body.innerHTML = menuBoilerplate + aboutBoilerplate;
}