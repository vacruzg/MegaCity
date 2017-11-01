API_URL = "http://localhost/MegaCity/servicios/";



function listarAlmacenes()
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
			 "operacion" : "listar",
			 "datos" : ""
		 }, //Son los parametros que voy a enviar a la consulta
		 url: API_URL + "almacenes/listaralmacenes.php", //Aqui se pone la URL del servicio a consumir
		 success: function(data){
			 var datos = JSON.parse(data);
			 //Si no hay problema y consultamos bien
			 if(datos['error'] == false){				 
				$("#almacenes").html('');
				
				if(datos['datos'].length >0){

					$.each( datos['datos'], function( key, value ) {
			  
					  //construyo como quiero pintar los datos, esto se puede hacer diferente. Es un ejemplo
					  
                      
					  tabla = '<tr>';
					  tabla += '<td>' + value.nombre_almacen + '</td>';
					  tabla += '<td>' + value.pagina_web + '</td>';
					  tabla += '<td>' + value.horario_atencion + '</td>';
					  tabla += '</tr>';
					  
					  //Pongo en el div los datos que voy creando.
					 // $("#almacenes").load(tabla);
					  $("#almacenes").append(tabla);		 
					  
				  });
					
					$('#tablaalmacenes').DataTable({
						responsive:true
       					 });
				}
				else{
					//$("#item_pendiente").show();
					$("#almacenes").append("No se encontraron datos");		 
				}
				 
			 }
			 else{
				// $("#item_pendiente").show();
				 $("#almacenes").append("ha ocurrido un error "+datos['datos']);
			 }
			 
		 },
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#almacenes").append("ha ocurrido un error consultando los datos");
		 }
	});



}

function listarCategoria()
{

   $('#file-es').fileinput({
        theme: 'fe',
        language: 'es',
        uploadUrl: '#',
        allowedFileExtensions: ['jpg'],

        fileActionSettings : {
// Disable
showUpload : false,

},
    });
    
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
			 "operacion" : "categoria",
			 "datos" : ""
		 }, //Son los parametros que voy a enviar a la consulta
		 url: API_URL + "almacenes/listaralmacenes.php", //Aqui se pone la URL del servicio a consumir
		 success: function(data){
			 var datos = JSON.parse(data);
			 var i =0;
			 //Si no hay problema y consultamos bien
			 if(datos['error'] == false){				 
				$("#categoria").html('');
				
				if(datos['datos'].length >0){

					$.each( datos['datos'], function( key, value ) {
						i++;
			  
					  //construyo como quiero pintar los datos, esto se puede hacer diferente. Es un ejemplo
					  
                      
					  option = '<option value ="'+i+'">';
					  option +=  value.nombre_categoria;
					  option += '</option>';
					  
					  //Pongo en el div los datos que voy creando.
					 // $("#almacenes").load(tabla);
					  $("#categoria").append(option);		 
					  
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

function enviarDatos(){

	
	 
	 var nombre_almacen = $("#nombre_almacen").val();
	 var pagina_web = $("#pagina_web").val();
	 var horario_atencion = $("#horario_atencion").val();	
	 var logo = $("#logo").val();
     var categoria = $("#categoria").val();

     if(nombre_almacen!="" && pagina_web!="" && horario_atencion!="" && categoria!="" )
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
   
   var datos = {
          "nombre_almacen":nombre_almacen ,
          "pagina_web":pagina_web,
          "horario_atencion": horario_atencion,
          //"logo": logo,
          "categoria": categoria
         }

    $.ajax({
		 type: "POST",
		 data: {
			 "operacion" : "crear",
			 "datos" : datos
		 }, //Son los parametros que voy a enviar a la consulta
		 url: API_URL + "almacenes/listaralmacenes.php", //Aqui se pone la URL del servicio a consumir

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
				$("#nombre_almacen").val("");
				$("#pagina_web").val("");			
				$("#horario_atencion").val("");	
				$("#logo").val("");	
			 }
			 else{
				 $(".alert-custom-clima-error").show();
			}			 
		 },
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
				$(".alert-custom-clima-error").show();
		 }
	});
	
}

	}