API_URL = "http://localhost/MegaCity/servicios/";

function listarMunicipios()
{

    
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
			 "operacion" : "municipios",
			 "datos" : ""
		 }, //Son los parametros que voy a enviar a la consulta
		 url: API_URL + "cliente/registro_cliente.php", //Aqui se pone la URL del servicio a consumir
		 success: function(data){
			 var datos = JSON.parse(data);
			 var i =0;
			 //Si no hay problema y consultamos bien
			 if(datos['error'] == false){				 
				$("#municipio").html('');
				
				if(datos['datos'].length >0){

					$.each( datos['datos'], function( key, value ) {
						i++;
			  
					  //construyo como quiero pintar los datos, esto se puede hacer diferente. Es un ejemplo
					  
                      
					  option = '<option value ="'+i+'">';
					  option +=  value.nombre_municipio;
					  option += '</option>';
					  
					  //Pongo en el div los datos que voy creando.
					 // $("#almacenes").load(tabla);
					  $("#municipio").append(option);		 
					  
				  });
					
					
				}
				else{
					//$("#item_pendiente").show();
					$("#categoria").append("No se encontraron datos");		 
				}
				 
			 }
			 else{
				// $("#item_pendiente").show();
				 $("#categoria").append("ha ocurrido un error "+datos['datos']);
			 }
			 
		 },
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#categoria").append("ha ocurrido un error consultando los datos");
		 }
	});


}

function registroCliente()
{
	 var nombres = $("#nombre").val();
	 var apellidos = $("#apellido").val();
	 var cedula = $("#cedula").val();
	 var password = $("#password").val();
	 var edad = $("#edad").val();
	 var telefono = $("#telefono").val();
	 var calle = $("#calle").val();
	 var carrera = $("#carrera").val();
	 var numero = $("#numero").val();
	 var barrio = $("#barrio").val();
	 var apartamento = $("#apartamento").val();
	 var piso = $("#piso").val(); 	 
	 var municipio = $("#municipio").val();

    
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

    var datos = {

        "nombres":nombres,
        "apellidos":apellidos,
        "cedula":cedula,
        "password":password,
        "edad":edad,
        "telefono":telefono,
        "calle":calle,
        "carrera":carrera,
        "numero":numero,
        "barrio":barrio,
        "apartamento":apartamento,
        "piso":piso,
        "municipio":municipio
          
         }
   
         $.ajax({
		 type: "POST",
		 data: {
			 "operacion" : "crear_usuario",
			 "datos" : datos
		 }, //Son los parametros que voy a enviar a la consulta
		 url: API_URL + "cliente/registro_cliente.php", //Aqui se pone la URL del servicio a consumir

		 success: function(data){
			 var datos = JSON.parse(data);
			 //Si no hay problema y guardo correctamente
			 if(datos['estado'] == true){				 
				//Se muestra mensaje de ok
				
			
				$("#myModal").modal();
				$("#modal-title").html("Información");
			    $("#message").html("Se ha guardado correctamente la Información");
				//Se limpian los datos del formulario
				//$("#tiempo option:selected").text();
				$("#nombre_categoria").val("");
				$("#descripcion").val("");			
			 }
			 else{
				 $("#myModal").modal();
				$("#modal-title").html("ERROR");
			    $("#message").html("Hubo un error en guardar la Información");
			}			 
		 },
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#myModal").modal();
				$("#modal-title").html("ERROR");
			    $("#message").html("Hubo un error en guardar la Información");
		 }
	});
        
}