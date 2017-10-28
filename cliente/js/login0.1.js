API_URL = "http://172.20.10.6/MegaCity1.3/servicios/model/";
API_URL2 = "http://172.20.10.6/MegaCity1.3/servicios/core/";
//CLIENTE = "http://172.20.10.6/MegaCity1.3/";
//En caso que den clic en guardar

$(document).on("ready", setApp);

function setApp(){
	if(localStorage.getItem("idUserMegacity")){
		loadAnswer();
		console.log("loadAnswer");
	}
	else{
		loadFormulario();
		console.log("loadFormulario");
	}
}

/*function loadAnswer(){
	$("#contenido").load("respuesta.html", function(){
		$("#logOut").on("click", logOut);
	});
}

function loadFormulario(){
	$("#contenido").load("formulario.html", function(){
		$("#acceso").on("submit", function(e){
			e.preventDefault();
			sendData();
			$("#answ").text("Cargando...");
		});
	});
}*/


function loadAnswer(){
	$("#myPage").load("cliente/areaCliente.html", function(){
		$("#logOut").on("click", logOut);
		$("#uploadimage").on("submit", function(e) {
			e.preventDefault();
			$("#message").empty();
			$('#loading').show();
			var formData = new FormData(this);
			var username = localStorage.getItem("idUserMegacity");
			formData.append('localStorage', username);

			console.log(username);

			$.ajax({
				url: API_URL2+"ajax_php_file.php", // Url to which the request is send
				type: "POST",             // Type of request to be send, called as method
				data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
				contentType: false,       // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,        // To send DOMDocument or non processed data file it is set to false

				success: function(data){   // A function to be called if request succeeds
				
					//$('#uploadimage').trigger("reset");
					//$('#loading').hide();
					$('#myModal').modal();
					$("#modal-title").html("Observación");
					$("#message").html(data);

					$("#file").val("");
					
				}
			});
		});
	});
}

function loadFormulario(){
	$("#myPage").load("cliente/paginaInicial.html", function(){
		$("#acceso").on("submit", function(e){
			e.preventDefault();
			sendData();
			$("#answ").text("Cargando...");
		});
	});
}

function sendData(){
	var username = $("#usrname").val();
	var password = $("#psw").val();

	$.ajax({
		data: {
			"login" : "true",
		 	"username" : username,
			"password" : password
		},
		type: 'POST',
		datatype: 'json',
		url: API_URL + "loginOracle.php",
		success: function(data){
			var dataParser = JSON.parse(data).toString();
			saveStorage(dataParser);
		}
	});
}

function saveStorage(data){

	if(data == "error"){
		$("#answ").text("Hubo un error con el usuario y/o contraseña");
		setTimeout(function(){
			$("#answ").fadeOut(1500);
		},2000);
	}
	else{
		if(localStorage){
			localStorage.setItem("idUserMegacity", data["username"]);
			loadAnswer();
		}
		else{
			alert("Navegador no soportado");
		}
	}
}

function logOut(){
	localStorage.removeItem("idUserMegacity");
	loadFormulario();
}

function resetForm()
{
	$('#uploadimage').trigger("reset");
}