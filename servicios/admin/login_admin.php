<?php

require_once("../conexion.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

$conn = obtenerConexionBaseDeDatos();

login($conn);

function login($conn){

$data  = array();

if(isset($_POST["login"])){
	if(!empty($_POST['username']) && !empty($_POST['password'])){
		$username = $_POST['username'];
		$password = md5($_POST['password']);

		$sql = "SELECT * FROM USUARIOS u, EMPLEADOS e WHERE u.codigo=e.codigo AND e.codigo='".$username."' AND u.password='".$password."'";

		$result = $conn->query($sql);

		$numrows = $result->num_rows;

		if($numrows!=0){
		
			while($row = $result->fetch_assoc()){
				$dbusername = $row['codigo'];
				$dbpassword = $row['password'];
			}

			if($username == $dbusername && $password == $dbpassword){

				$data['username'] = $username; 
				echo json_encode($data);
				cerrarConexionBaseDeDatos($conn);
				return;
			}
			else{
				$data = "error";
				echo json_encode($data);
				cerrarConexionBaseDeDatos($conn);
				return;
			}
		}
		else{
			$data = "error";
			echo json_encode($data);
			cerrarConexionBaseDeDatos($conn);
			return;
		}
	}
	else{
		$data = "error";
		echo json_encode($data);
		cerrarConexionBaseDeDatos($conn);
		return;
	}
}
}
?>