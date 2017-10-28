<?php

require_once("../conexion.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

$conn = obtenerConexionBaseDeDatos();

crearFactura($conn);

function crearFactura($conn){
	if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpg");

		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);

		if(($_FILES["file"]["size"] < 3145728) && in_array($file_extension, $validextensions)){

			if($_FILES["file"]["error"] > 0){
				echo "Return Code: ".$_FILES["file"]["error"]."<br/><br/>";
			}
			else{
				$localStorage = $_POST["localStorage"];
				$valor_factura = $_POST["valor_factura"];
				$almacen = $_POST['almacen'];

				$cod_almacen = consultarCodAlmacen($conn, $almacen);

				if(is_null($cod_almacen)){
					return;
				}

				$cod_factura = consultarCodFactura($conn);		

				$dir = "../../fotos/Facturas/".$localStorage;

				if(!file_exists($dir)){
					mkdir($dir, 0777, true);
				}

				$dir = $dir.'/'.$cod_factura.'.'.$file_extension;

				if(file_exists($dir)){
					echo "<span id='invalid'>Error al subir imagen</span><br/>";
					cerrarConexionBaseDeDatos($conn);
					return;
					//echo $_FILES["file"]["name"]."<span id='invalid'><b>already exists.</b></span>"; //Esto es cuando no quiero reemplazar imagenes con el mismo nombre
				}
				else{
					$sourcePath = $_FILES["file"]["tmp_name"];
					//$targetPath = $dir."/".$_FILES["file"]["name"]; //Esto incluye el nombre original del archivo
					$targetPath = $dir;
					insertarFactura($conn, $localStorage, $dir, $cod_almacen, $valor_factura, $sourcePath, $targetPath);
				}
			}
		}
		else{
			echo "<span id='invalid'>***Solo se admiten archivos con extension *.jpg y con tamaño máximo a 3MB***</span>";
			cerrarConexionBaseDeDatos($conn);
			return;
		}
	}
}

function consultarCodAlmacen($conn, $nombre_almacen){
	$sql_almacen = "SELECT cod_almacen codigo FROM almacen WHERE nombre_almacen = '".$nombre_almacen."'";
	$result_almacen = $conn->query($sql_almacen);
	$numrows_almacen = $result_almacen->num_rows;

	if($numrows_almacen>0){
		while($row = $result_almacen->fetch_assoc()){
			$cod_almacen = $row['codigo'];
			return $cod_almacen;
		}
	}
	else{
		echo "<span id='invalid'>Ha ocurrido un error, por favor vuelva a intentarlo</span><br/>";
		cerrarConexionBaseDeDatos($conn);
		return NULL;
		//echo $_FILES["file"]["name"]."<span id='invalid'><b>already exists.</b></span>"; //Esto es cuando no quiero reemplazar imagenes con el mismo nombre
	}
}

function consultarCodFactura($conn){
	$sql_cod_factura = "SELECT MAX(cod_factura) max FROM facturas";
	$result_cod_factura = $conn->query($sql_cod_factura);
	
	if(is_null($result_cod_factura)){
		$cod_factura = "1";
		return $cod_factura;
	}
	else{
		$numrows_cod_factura = $result_cod_factura->num_rows;
		while($row = $result_cod_factura->fetch_assoc()){
			$cod_factura = $row['max']+1;
		}
	}
	return $cod_factura;
}

function insertarFactura($conn, $localStorage, $dir, $cod_almacen, $valor_factura, $sourcePath, $targetPath){
	$sql_factura = "INSERT INTO facturas (cod_usuario, foto, cod_estado, cod_almacen, valor_factura, fecha) VALUES ('".$localStorage."','".$dir."', 3, ".$cod_almacen.",'".$valor_factura."', sysdate())";

	$result_factura = $conn->query($sql_factura);
	//Si ocurrio algun error en la consulta
	if(!$result_factura){
		echo "<span id='invalid'>Error al subir imagenes</span><br/>";
		cerrarConexionBaseDeDatos($conn);
		return;
	}

	move_uploaded_file($sourcePath, $targetPath);
	echo "<span id='success'>Imagen subida con éxito....!!</span><br/>";
	echo "<br/><b>Nombre de archivo:</b> ".$_FILES["file"]["name"]."<br>";
	echo "<b>Tamaño:</b> ".round(($_FILES["file"]["size"]/1024), 2)." kB<br>";
	cerrarConexionBaseDeDatos($conn);
	return;
}
?>