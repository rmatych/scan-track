(function() {
	$('.input-daterange').datepicker({
		format: 'mm/dd/yyyy',
		startDate: '3/28/2017',
		maxViewMode: 2,
		autoclose: true
	});

	document.getElementById('submit').onclick = function() {
		let startDate = document.getElementById('start').value;
		let endDate = document.getElementById('end').value;
		let url = '/spreadsheet?start=' + startDate + '&end=' + endDate;
		let link = document.createElement('a');
		link.href = url;
		link.click();
	};
})();
