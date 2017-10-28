API_URL = "http://localhost/MegaCity1.5/servicios/admin/";

//En caso que den clic en guardar
$(document).on("ready", setApp);

function setApp(){
	if(localStorage.getItem("idUserMegacity")){
		loadAnswer();
	}
	else{
		loadFormulario();
	}
}

function loadAnswer(){
	$("#admin").load("moduloadmin.html", function(){
		$("#logOut").on("click", logOut);
	});
}

function loadFormulario(){
	$("#admin").load("login.html", function(){
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
		url: API_URL + "login_admin.php",
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