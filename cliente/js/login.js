API_URL = "http://localhost/MegaCity/servicios/";
API_URL_IMAGES = "http://localhost/MegaCity/";

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
	$("#myPage").load("cliente/areaCliente.html", function(){
		$("#logOut").on("click", logOut);
		$("#uploadimage").on("submit", function(e) {
			e.preventDefault();
			$("#message").empty();
			$('#loading').show();
			var formData = new FormData(this);
			var username = localStorage.getItem("idUserMegacity");
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

function cargarMenuAreaCliente(){
	var screen = window.innerWidth;
	if(screen<768){
		hideMenu();
	}
	$("#logOut").on("click", logOut);
	$("#facturas").on("click", cargarRegistroFacturas);
	$("#uploadimage").on("submit", function(e) {
		e.preventDefault();
		$("#message").empty();
		$('#loading').show();
		var formData = new FormData(this);
		var username = localStorage.getItem("idUserMegacity");
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
}

function loadFormulario(){
	$("#myPage").load("cliente/paginaInicial.html", function(){
		$("#bodyInicio").load("cliente/complemento_pagina_inicio_cliente.html #inicio", cargarInicio);
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
		url: API_URL + "cliente/login_cliente.php",
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

function cargarMenu(){
	var screen = window.innerWidth;
	if(screen<768){
		hideMenu();
	}
	$("#acceso").on("submit", function(e){
			e.preventDefault();
			sendData();
			$("#answ").text("Cargando...");
	});
	$("#iniciarSesion").on("click", cargarIniciarSesion);
	$("#inicio").on("click", cargarInicio);
	$("#almacenes").on("click", cargarAlmacenes);
	$("#eventos").on("click", cargarEventos);
	$("#registro").on("click", cargarRegistro);
}

function resetForm()
{
	$('#uploadimage').trigger("reset");
}

function resetPage(){
	$("#bodyAlmacenes").empty();
	$("#bodyEventos").empty();
	$("#bodyRegistro").empty();
	$("#bodySesion").empty();
}

function resetPageAreaCliente(){
	$("#bodyRegistroFacturas").empty();
}

function cargarIniciarSesion(){
	resetPage();

	var screen = window.innerWidth;

	if(screen>768){
		funcionModal();
		cargarMenu();
	}
	else{
		$("#bodySesion").load("cliente/login.html", cargarMenu);
	}	
}

function cargarRegistroFacturas(){
	resetPageAreaCliente();

	var screen = window.innerWidth;

	if(screen>768){
		funcionModal();
		cargarMenuAreaCliente();
	}
	else{
		$("#bodyRegistroFacturas").load("cliente/registrarFacturas.html", cargarMenuAreaCliente);
	}	
}

function cargarInicio(){
	resetPage();
	cargarEventos();
}

function cargarAlmacenes(){
	resetPage();
	$("#bodyAlmacenes").load("cliente/complemento_pagina_inicio_cliente.html #almacenes", cargarMenu);
}

function cargarEventos(){
	resetPage();
	$("#bodyEventos").load("cliente/complemento_pagina_inicio_cliente.html #eventos", function(){
		getAll();
		cargarMenu();
	});
}

function cargarRegistro(){
	resetPage();
	$("#bodyRegistro").load("cliente/complemento_pagina_inicio_cliente.html #registro", cargarMenu);
}

function getAll(){
	
	$.ajaxSetup({
	    // force ajax call on all browsers
	    cache: false,
	    // Enables cross domain requests
	    crossDomain: true,
	    // Helps in setting cookie
	    xhrFields: {
	        withCredentials: false
	    }
	});


	$.ajax({
		 type: "POST",
		 data: {
			 "operacion" : "getAll",
			 "datos" : ""
		 }, //Son los parametros que voy a enviar a la consulta
		 url: API_URL + "eventos/eventos.php", //Aqui se pone la URL del servicio a consumir
		 success: function(data){
			 var datos = JSON.parse(data);
			 //Si no hay problema y consultamos bien
			 if(datos['estado'] == true){				 
				var eventos = document.getElementById("listado-eventos");

				console.log(datos);

				if(datos['datos'].length >0){

					divItem = "";

					$.each( datos['datos'], function( key, value ) {
			  
					  //construyo como quiero pintar los datos, esto se puede hacer diferente. Es un ejemplo
					  divItem += '<section class="col evento">';
					  divItem += '<section class="tituloEvento"><strong>' + value.titulo + '</strong></section>';

					  if(value.foto==null){
					  	divItem += '<section><img class="fotoEvento" src="' + API_URL_IMAGES + 'fotos/Eventos/error.jpg"/></section>';
					  }
					  else{
					  	divItem += '<section><img class="fotoEvento" src="' + API_URL_IMAGES + value.foto + '"/></section>';
					  }

					  //divItem += '<section><img class="fotoEvento" src="http://localhost/MegaCity1.5/fotos/Eventos/error.jpg"/></section>';
					  divItem += '<section class="descripcionEvento">' + value.descripcion + '</section>';
					  divItem += '<section><section class="fechaEvento"><strong>Fecha: </strong>' + value.fecha + '</section>';
					  
					  var date = new Date();
					  var hora = formatTime(date, value.hora);

					  divItem += '<section class="horaEvento"><strong>Hora: </strong>' + hora + '</section></section>';
					  divItem += '</section>';
					  
					  //Pongo en el div los datos que voy creando.
					  eventos.innerHTML = divItem;		 
					  
				  });
					
				}
				else{
					$("#listado-pendientes").append("No se encontraron datos");		 
				}
				 
			 }
			 else{
				 $("#listado-pendientes").append("ha ocurrido un error "+datos['datos']);
			 }
			 
		 },
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#listado-pendientes").append("ha ocurrido un error consultando los datos");
		 }
	});
	
 }

 function formatTime(date, time){
 	var array = time.split(":", 2);
 	date.setHours(array[0]);
 	date.setMinutes(array[1]);
 	var hours = date.getHours();
  	var minutes = date.getMinutes();
  	var ampm = hours >= 12 ? 'pm' : 'am';
  	hours = hours % 12;
  	hours = hours ? hours : 12; // the hour '0' should be '12'
  	minutes = minutes < 10 ? '0'+minutes : minutes;
  	var strTime = hours + ':' + minutes + ' ' + ampm;
  	return strTime;
 }

 function hideMenu(){
 	var target = $('.navbar-collapse');
 	if(target.hasClass('in')){
 		target.removeClass('in').height(0).css('overflow','hidden');
 	}
 }