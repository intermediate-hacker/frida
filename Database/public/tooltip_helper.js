const addTooltipAfterElement = (elementID, tooltip) => {
	document.getElementById(elementID).innerHTML += `
	<div class="alert alert-info alert-dismissible fade show w-25 p-3" role="alert" onclick="authorFirstNameButtonDone = false;">
		<button type="button" class="close" data-dismiss="alert">
			&times;
		</button>
		${tooltip}
	</div>`;
};