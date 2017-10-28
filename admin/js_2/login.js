API_URL = "http://localhost/admin/servicios/";

//En caso que den clic en guardar
$(document).on("ready", setApp);

function setApp(){
	if(localStorage.getItem("admin")){
		loadAnswer();
	}
	else{
		loadFormulario();
	}
}

function loadAnswer(){
	$("#myPage").load("pages/areaAdmin.html", function(){
		
		$("#uploadimage").on("submit", function(e) {
			e.preventDefault();
			$("#message").empty();
			$('#loading').show();
			var formData = new FormData(this);
			var username = localStorage.getItem("admin");
			var almacen = $('#seleccion option:selected').text();
			var valor_factura = $('#valor_factura').val();
			formData.append('localStorage', username);
			formData.append('valor_factura', valor_factura);
			formData.append('almacen', almacen);

			$.ajax({
				url: API_URL+"facturas/crear_factura.php", // Url to which the request is send
				type: "POST",             // Type of request to be send, called as method
				data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
				contentType: false,       // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,        // To send DOMDocument or non processed data file it is set to false

				success: function(data){   // A function to be called if request succeeds

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
	
		$("#myPage").load("pages/login.html", function(){
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
		url: API_URL + "admin/login_admin.php",
		success: function(data){
			var dataParser = JSON.parse(data);
			saveStorage(dataParser);
		}
	});
}

function saveStorage(data){

	if(data == "error"){
		$("#answ").text("");
		$("#answ").css("display", "initial");
		$("#answ").text("Hubo un error con el usuario y/o contraseña");
		setTimeout(function(){
			$("#answ").fadeOut(1500);
		},2000);
	}
	else{
		if(localStorage){
			localStorage.setItem("admin", data["username"]);
			loadAnswer();
		}
		else{
			alert("Navegador no soportado");
		}
	}
}

function logOut(){
	localStorage.removeItem("admin");
	loadFormulario();
}

function resetForm()
{
	$('#uploadimage').trigger("reset");
}

