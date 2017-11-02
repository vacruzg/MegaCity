API_URL = "http://localhost/MegaCity/servicios/";

/*//Esto es para activar la libreria de Bootstrap Material
$(function () {
     $.material.init();
	 getAll();
});*/

//Función que carga todos los tiempos que esten en BD

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
		 url: API_URL + "eventos.php", //Aqui se pone la URL del servicio a consumir
		 success: function(data){
			 var datos = JSON.parse(data);
			 //Si no hay problema y consultamos bien
			 if(datos['estado'] == true){				 
				$("#listado-eventos").html('');
				
				if(datos['datos'].length >0){
					$.each( datos['datos'], function( key, value ) {
			  
					  //construyo como quiero pintar los datos, esto se puede hacer diferente. Es un ejemplo
					  divItem  = '<section class="col evento">';
					  divItem += '<section class="tituloEvento">' + value.TITULO + '</section>';
					  divItem += '<section><img class="fotoEvento" src="' + value.FOTO + '"/></section>';
					  divItem += '<section class="descripcionEvento">' + value.DESCRIPCION_EVENTO + '</section>';
					  divItem += '<section><section class="fechaEvento">' + value.FECHA + '</section>';
					  divItem += '<section class="horaEvento">' + value.HORA + '</section></section>';
					  divItem += '</section>';
					  
					  //Pongo en el div los datos que voy creando.
					  $("#listado-pendientes").append(divItem);		 
					  
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


/* 
//En caso que den clic en guardar
$("#guardar-estado").click(function(){
	
	//Se obtienen los valores del formulario
	 var tiempo = $("#tiempo option:selected").text();
     var tipo = $("#tipo option:selected").text();
     var horas_duracion = $("#hours").val();
     var horas_suspendido =  $("#hoursSuspend").val();
	 
	 console.log(horas_duracion);
	 console.log(horas_suspendido);

        $(".alert-custom-clima-ok").hide();
        $(".alert-custom-clima-validation").hide();
        if(horas_duracion == '' || horas_suspendido == ''){
          $(".alert-custom-clima-validation").show();
		  window.location.href = "#error";
          return false;
        }

	
	
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

	var TiempoDatos = {
          "tiempo":tiempo,
          "tipo":tipo,
		  "horas_duracion": horas_duracion,
          "horas_suspendido": horas_suspendido
         }

	$.ajax({
		 type: "POST",
		 data: {
			 "operacion" : "create",
			 "datos" : TiempoDatos
		 }, //Son los parametros que voy a enviar a la consulta
		 url: API_URL + "tiempo.php", //Aqui se pone la URL del servicio a consumir
		 success: function(data){
			 var datos = JSON.parse(data);
			 //Si no hay problema y guardo correctamente
			 if(datos['estado'] == true){				 
				//Se muestra mensaje de ok
				$(".alert-custom-clima-ok").show();
				
				//Se limpian los datos del formulario
				//$("#tiempo option:selected").text();
				$("#hours").val("");
				$("#hoursSuspend").val("");
				
				//Llamamos getAll para que refresque los datos en la pantalla
				getAll();				
				
			 }
			 else{
				 $(".alert-custom-clima-error").show();
			}			 
		 },
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
				$(".alert-custom-clima-error").show();
		 }
	});
	
 });
 

//Función que si cambia el tipo de tiempo, cambia la imagen	  
$("#tipo").change(function(){
	var tipoSelect = $("#tipo option:selected").text();
	$("#img-clima").attr("src", "img/moderado-clima.png");
	if(tipoSelect != 'Moderado'){
	  $("#img-clima").attr("src", "img/intenso-clima.png");
	}
  });

*/