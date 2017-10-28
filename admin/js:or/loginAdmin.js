API_URL = "http://localhost/admin/servicios/admin/";

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