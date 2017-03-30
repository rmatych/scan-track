$('.input-daterange').datepicker({
    format: "mm/dd/yyyy",
    startDate: "3/28/2017",
    maxViewMode: 2,
    autoclose: true
});

document.getElementById("submit").onclick = () => {
	console.log(document.getElementById("start").value);
}