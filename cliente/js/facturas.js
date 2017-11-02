API_URL = "http://localhost/MegaCity/servicios/";
API_URL2 = "http://localhost/MegaCity/";

function listarFacturasPendientes(){
	
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
		 url: API_URL + "facturas/cargar_facturas.php", //Aqui se pone la URL del servicio a consumir
		 success: function(data){
			 var datos = JSON.parse(data);
			 //Si no hay problema y consultamos bien
			 if(datos['estado'] == true){				 
				$("#facturas-pendientes").html('');
				
				if(datos['datos'].length >0){
					$.each( datos['datos'], function( key, value ) {
			  
					  //construyo como quiero pintar los datos, esto se puede hacer diferente. Es un ejemplo
					  divItem  = '<tr>';
					  divItem += '<td>' + value.cod_factura + '</td>';
					  divItem += '<td><img id="myImg" src="' + API_URL2 + value.foto + '" data-toggle="modal" onclick="funcionModalFacturas(this.src)">';
					  /**divItem += '<section class="modal fade  in" id="myModal" role="dialog" style="display: none;">';
					  divItem += '<section class="modal-dialog">';
					  divItem += '<section class="modal-content">';
					  divItem += '<section class="modal-header headLogin">';
					  divItem += '<h4 class="headLogin"><strong>Vista previa</strong></h4></section>';
					  divItem += '<section class="modal-body" style="padding:40px 50px;">';
					  divItem += '<img id="myImgModal" src="' + API_URL2 + value.foto + '"></section></section></section></section></td>';**/
					  divItem += '<td>' + value.cod_usuario + '</td>';
					  divItem += '<td>' + value.almacen + '</td>';
					  divItem += '<td>' + value.valor_factura + '</td>';
					  divItem += '<td>' + value.fecha + '</td>';
					  divItem += '<td><form class="form" id="' + value.cod_factura + '" action="" method="post" enctype="multipart/form-data"><input type="number" id="Pts' + value.cod_factura + '" min="0"></form></td>';
					  divItem += '<td><select name="seleccion" id="seleccion' + value.cod_factura + '" class="form-control" form="' + value.cod_factura + '"><option value="0">----------</option>';
					  divItem += '<option value="1">Aprobada</option><option value="2">Rechazada</option></select></td>';
					  divItem += '<td><input type="submit" form="' + value.cod_factura + '"></td>'
					  divItem += '</tr>';
					  
					  //Pongo en el div los datos que voy creando.
					  $("#facturas-pendientes").append(divItem);		 
					  
				  });
					validarFacturas();
					
				}
				else{
					$("#alertaInfo").text("");
					$("#alertaInfo").css("display", "inline-block");
					$("#alertaInfo").text("No se encontraron facturas pendientes");
					setTimeout(function(){
						$("#alertaInfo").fadeOut(1500);
					},2000);
				}
				 
			 }
			else{
			 	$("#alertaWarning").text("");
				$("#alertaWarning").css("display", "inline-block");
				$("#alertaWarning").text("Ocurrio un error en la consulta");
				setTimeout(function(){
					$("#alertaWarning").fadeOut(1500);
				},2000);
			 }
			 
		 },
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#alertaWarning").text("");
				$("#alertaWarning").css("display", "inline-block");
				$("#alertaWarning").text("Ocurrio un error en la consulta");
				setTimeout(function(){
					$("#alertaWarning").fadeOut(1500);
				},2000);
		 }
	});
	
 }

function validarFacturas(){

$(".form").on("submit", function(e) {
		e.preventDefault();
		console.log(e);
		console.log(this.id);

		var pts = '#Pts'+this.id;
		var accion = '#seleccion'+this.id+' option:selected';
		console.log(accion);
		console.log(pts);
		var puntos = $(pts).val();
		var estado = $(accion).val();

		if(estado=='0'){
			$("#alertaDanger").text("");
			$("#alertaDanger").css("display", "inline-block");
			$("#alertaDanger").text("Debe elegir una acción");
			setTimeout(function(){
				$("#alertaDanger").fadeOut(1500);
			},2000);
		}

		if(estado=='1'){
			if(puntos==""){
				$("#alertaDanger").text("");
				$("#alertaDanger").css("display", "inline-block");
				$("#alertaDanger").text("Debe ingresar los puntos otorgados");
				setTimeout(function(){
					$("#alertaDanger").fadeOut(1500);
				},2000);
			}
			else{
				aprobarFactura(puntos, this.id);
			}
		}

		if(estado=='2'){
			rechazarFactura(this.id);
		}
	});
}

function aprobarFactura(puntos, cod_factura){
	
	var datos = {
		"puntos":puntos ,
    	"cod_factura":cod_factura
    }

	$.ajax({
	data: {
		"operacion" : "aprobarFactura",
	 	"datos" : datos
	},
	type: 'POST',
	datatype: 'json',
	url: API_URL + "facturas/cargar_facturas.php",
	success: function(data){
		var dataParser = JSON.parse(data);
		refrescar(dataParser);
	}
	});
}

function rechazarFactura(cod_factura){
	
	var datos = {
    	"cod_factura":cod_factura
    }

	$.ajax({
	data: {
		"operacion" : "rechazarFactura",
	 	"datos" : datos
	},
	type: 'POST',
	datatype: 'json',
	url: API_URL + "facturas/cargar_facturas.php",
	success: function(data){
		var dataParser = JSON.parse(data);
		refrescar(dataParser);
	}
	});
}

function refrescar(datos){

	console.log(datos['estado']);

	if(datos['estado'] == true){				 

		$("#alertaSuccess").text("");
		$("#alertaSuccess").css("display", "inline-block");
		$("#alertaSuccess").text("Acción aplicada exitosamente!!!");
		setTimeout(function(){
			$("#alertaSuccess").fadeOut(1500);
		},2000);

		listarFacturasPendientes();
	}
	else{
		$("#alertaDanger").text("");
		$("#alertaDanger").css("display", "inline-block");
		$("#alertaDanger").text("Debe ingresar los puntos otorgados");
		setTimeout(function(){
			$("#alertaDanger").fadeOut(1500);
		},2000);
	}	
}