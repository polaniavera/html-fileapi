function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {	
	var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    while (allTextLines.length) {
		lines.push(allTextLines.shift().split(','));
	}

	var arrMod = formatArray(lines);
	var myJSON = JSON.stringify(arrMod);
	document.getElementById("output").innerHTML += myJSON;
	//drawOutput(myJSON);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

function drawOutput(lines){
	//Clear previous data
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	for (var i = 0; i < lines.length; i++) {
		var row = table.insertRow(-1);
		for (var j = 0; j < lines[i].length; j++) {
			var firstNameCell = row.insertCell(-1);
			firstNameCell.appendChild(document.createTextNode(lines[i][j]));
		}
	}
	document.getElementById("output").appendChild(lines);
}

//***************************************************************************************** */
//***************************************************************************************** */

function formatArray(arr){
	var objectMain = [];
	//Get current date and time
	var date = formatDate();
	var time = formatTime();

	for(i = 1; i < arr.length-1; i++){
		var objectSingle = { };
		objectSingle.Latitud = 9.99999;
		objectSingle.Longitud = -74.44444;
		objectSingle.TanqueConductor = parseFloat(arr[i][0]);
		objectSingle.TanquePasajero = parseFloat(arr[i][1]);
		objectSingle.BotonPanico = true;
		objectSingle.Velocidad = parseFloat(arr[i][2]);
		objectSingle.Fecha = date;
		objectSingle.Hora = time;
		objectSingle.IdUsuario = 1;
		objectSingle.IdItem = 1;

		objectMain.push(objectSingle);
	}
	return objectMain;
}

function formatDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
		dd = '0'+dd
	} 
	if(mm<10) {
		mm = '0'+mm
	} 
	today = yyyy + '-' + mm + '-' + dd;
	return today.toString();
}

function formatTime(){
	var hour = new Date();
	var hh = hour.getHours();  
    var min = hour.getMinutes();
	var ss = hour.getSeconds();
	hour = hh + ':' + min + ':' + ss;
	return hour.toString();
}

function newTime(oldTime){
	var hh = oldTime.getHours();  
    var min = oldTime.getMinutes();
	var ss = oldTime.getSeconds();
	oldTime = hh + ':' + min + ':' + ss;
	return hour.toString();
}
