<?php

if ($_SERVER['HTTP_HOST'] !== 'localhost') {
	define('ENTORNO', 'LIVE');	
} else {
	define('ENTORNO', 'DEV');
}

if (ENTORNO === 'DEV') {
	header('Access-Control-Allow-Origin: *');
}

$CODIDOS_HTTP_RESPUESTA = array(
	'200' => 'HTTP/1.0 200 OK',
	'204' => 'HTTP/1.0 204 No Content',
	'500' => 'HTTP/1.0 500 Internal Server Error'
);

function obtenerConexionBaseDeDatos() {

	$db_server = "localhost";
	$db_user = "root";
	$db_pass = "1234";
	$db_name = "centro_comercial";

	$conexion = new mysqli($db_server, $db_user, $db_pass, $db_name);

	if ($conexion->connect_error) {
		die('Connection failed: ' . $conn->connect_error);
	}

	return $conexion;
}

function cerrarConexionBaseDeDatos($conexion) {
	$conexion->close();
}

?>
