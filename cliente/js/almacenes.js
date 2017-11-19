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
		 url: API_URL + "almacenes/gestionalmacenes.php", //Aqui se pone la URL del servicio a consumir
		 success: function(data){
			 var datos = JSON.parse(data);
			 //Si no hay problema y consultamos bien
			 if(datos['error'] == false){				 
				$("#almacenes").html('');
				
				if(datos['datos'].length >0){
					var i=0;

					$.each( datos['datos'], function( key, value ) {
			          i++;
					  //construyo como quiero pintar los datos, esto se puede hacer diferente. Es un ejemplo
					  
                      
					  tabla = '<tr>';
					  tabla += '<td id="cod_almacen'+value.cod_almacen+'">' + value.cod_almacen + '</td>';
					  tabla += '<td id="nombre'+value.cod_almacen+'">' + value.nombre_almacen + '</td>';
					  tabla += '<td id="pagina'+value.cod_almacen+'">' + value.pagina_web + '</td>';
					  tabla += '<td id="horario'+value.cod_almacen+'">' + value.horario_atencion + '</td>';
					  tabla += '<td><p data-placement="top" data-toggle="tooltip" title="Editar"><button id='+value.cod_almacen+' onclick="actualizaAlmacen(id)" class="btn btn-primary btn-xs" data-title="Editar"><span class="glyphicon glyphicon-pencil"></span></button></p></td>';
					  tabla += '<td><p data-placement="top" data-toggle="tooltip" title="Eliminar"><button id='+value.cod_almacen+' onclick="eliminarAlmacen(id)" class="btn btn-danger btn-xs" data-title="Delete"><span class="glyphicon glyphicon-trash"></span></button></p></td>';
					  tabla += '</tr>';
					  
					  //Pongo en el div los datos que voy creando.
					 // $("#almacenes").load(tabla);
					  $("#almacenes").append(tabla);		 
					  
				  });
					
					$('#tablaalmacenes').DataTable({
						responsive:true,
						"language": {
    					"decimal":        "",
    					"emptyTable":     "No data available in table",
   					 	"info":           "Mostrando _START_ a _END_ de _TOTAL_ entradas",
    					"infoEmpty":      "Mostrando 0 a 0 de 0 entradas",
    					"infoFiltered":   "(filtered from _MAX_ total entries)",
    					"infoPostFix":    "",
    					"thousands":      ",",
    					"lengthMenu":     "Mostrar _MENU_ entradas",
    					"loadingRecords": "Cargando...",
    					"processing":     "Procesanso...",
    					"search":         "Buscar:",
    					"zeroRecords":    "No se encontraron datos..",
    					"paginate": {
    						"first":      "Primero",
    						"last":       "Last",
    						"next":       "Siguiente",
    						"previous":   "Anterior"
    					},
    					"aria": {
    						"sortAscending":  ": activate to sort column ascending",
    						"sortDescending": ": activate to sort column descending"
    					}


}
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
		 url: API_URL + "almacenes/gestionalmacenes.php", //Aqui se pone la URL del servicio a consumir
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


 enviarDatos();

}

function enviarDatos(){

	$('#tablaagregar').DataTable({
						responsive:true,
						"searching": false,
						"paging": false,
						"ordering": false,
						"info": false

       					 });

	$("#agregar").on("submit", function(e) {
	e.preventDefault();
     var formData = new FormData(this);

	 var nombre_almacen = $("#nombre_almacen").val();
	 var pagina_web = $("#pagina_web").val();
	 var horario_atencion = $("#horario_atencion").val();	
	 var logo = $("#logo").val();
     var categoria = $("#categoria").val();
     var operacion = "crear";
     

     if(nombre_almacen!="" && pagina_web!="" && horario_atencion!="" && categoria!="" )
     {
     

     formData.append('nombre_almacen', nombre_almacen);
     formData.append('pagina_web', pagina_web);
	 formData.append('categoria', categoria);
	 formData.append('operacion', operacion);

    $.ajax({
    	url: API_URL + "almacenes/gestionalmacenes.php", 
		 type: "POST",
		 data:formData, //Son los parametros que voy a enviar a la consulta
		 //Aqui se pone la URL del servicio a consumir
         contentType: false,       // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,        // To send DOMDocument or non processed data file it is set to false
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
				$(".fileinput-remove").click();
				 
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


	});

}

function agregarCategoria()
{

	$('#tablaagregar').DataTable({
						responsive:true,
						"searching": false,
						"paging": false,
						"ordering": false,
						"info": false

       					 });
	 var nombre_categoria = $("#nombre_categoria").val();
	 var descripcion = $("#descripcion").val();

     if(nombre_categoria!="" && descripcion!="")
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
          "nombre_categoria":nombre_categoria ,
          "descripcion":descripcion
         }

    $.ajax({
		 type: "POST",
		 data: {
			 "operacion" : "crear_categoria",
			 "datos" : datos
		 }, //Son los parametros que voy a enviar a la consulta
		 url: API_URL + "almacenes/gestionalmacenes.php", //Aqui se pone la URL del servicio a consumir

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

}

function actualizaAlmacen(id)
{
     var cod_almacen = document.getElementById('cod_almacen'+id).innerHTML;
     var nombre_almacen = document.getElementById('nombre'+id).innerHTML;
     var pagina_web = document.getElementById('pagina'+id).innerHTML;
     var horario_atencion = document.getElementById('horario'+id).innerHTML;

 
    $("#edit").modal();
    $("#codigo").html(cod_almacen);
    document.getElementById("nombre").value = nombre_almacen;
    document.getElementById("pagina").value = pagina_web;
    document.getElementById("horario").value = horario_atencion;
   
}

function datosActualizarAlmacen()
{
	 var cod_almacen= document.getElementById('codigo').innerHTML;
	 var nombre_almacen = $("#nombre").val();
	 var pagina_web = $("#pagina").val();
	 var horario_atencion = $("#horario").val();

   
   
   var datos = {
          "cod_almacen":cod_almacen,
          "nombre_almacen":nombre_almacen,
          "pagina_web":pagina_web,
          "horario_atencion":horario_atencion
         }

    $.ajax({
		 type: "POST",
		 data: {
			 "operacion" : "actualiza_almacen",
			 "datos" : datos
		 }, //Son los parametros que voy a enviar a la consulta
		 url: API_URL + "almacenes/gestionalmacenes.php", //Aqui se pone la URL del servicio a consumir

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

function recargarPaginaAlmacen()
{

	    $('div').removeClass('modal-backdrop');
	    $('#myPage').removeClass('modal-open');
	   // location.reload();
	    $("#page-wrapper").load("./pages/almacenes.html");
}
   
function eliminarAlmacen(id)
{
      $("#delete").modal();
      $("#eliminar").html(id);
	 
}
   

function datosEliminarAlmacen()
{
	 var cod_almacen= document.getElementById('eliminar').innerHTML;
	
   
   
   var datos = {
          "cod_almacen":cod_almacen,
         }

    $.ajax({
		 type: "POST",
		 data: {
			 "operacion" : "elimina_almacen",
			 "datos" : datos
		 }, //Son los parametros que voy a enviar a la consulta
		 url: API_URL + "almacenes/gestionalmacenes.php", //Aqui se pone la URL del servicio a consumir

		 success: function(data){
			 var datos = JSON.parse(data);
			 //Si no hay problema y guardo correctamente
			 if(datos['estado'] == true){				 
				//Se muestra mensaje de ok
				
			
				$("#myModal").modal();
				$("#modal-title").html("Información");
			    $("#message").html("Se ha eliminado almacén!");
			    
            
				//Se limpian los datos del formulario
				//$("#tiempo option:selected").text();
					
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


