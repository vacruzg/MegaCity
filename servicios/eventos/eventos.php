<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

require_once('../conexion.php');

$operacion = $_POST['operacion'];//Se obtiene la operación a realizar del servicio tiempo
$datos = $_POST['datos']; //Se obtienen los diferentes datos con los que se opera.

//Inicializo objeto para poder operar con la BD
$conn = obtenerConexionBaseDeDatos();

switch ($operacion){
	case "getAll" : getAll($conn);
					break;
	
	case "create" : create($conn, $datos);
					break;
}

/********************************************************************************
*            Aqui inician las operaciones del servicio tiempo                   *
*                                                                               *
*   Por ejemplo la operación para consultar todos                               *
*   la operación crear                                                          *
*   la operación eliminar                                                       *
*********************************************************************************/

//Función que consulta todos los datos en BD
function getAll($conn){
	//Inicializamos lo que retornaremos
	$data  = array('estado'=>'', 'datos'=>array());
	
	$sql = "SELECT * FROM EVENTO e, EVENTO_X_SUCURSAL exs WHERE e.COD_EVENTO=exs.COD_EVENTO";
	//var_dump($sql);
	$result = $conn->query($sql);
	
	//Si ocurrio algun error en la consulta
	if(!$result){
		$data['estado'] = false;
		$data['datos'] = "Ocurrio un error en la consulta";
		
		//De esta forma estamos enviando los datos
		echo json_encode($data);
		
		//Cerramos la conexión
		cerrarConexionBaseDeDatos($conn);
		
		//Terminamos el metodo
		return;
	}
	
	//Si la consulta arrojo datos
	if ($result->num_rows > 0) {
		$datos= array();
		$data['estado'] = true;

		while($row = $result->fetch_assoc()){				
			array_push($datos, array(
					"titulo" => $row['TITULO'],
					"descripcion" => $row['DESCRIPCION_EVENTO'],
					"fecha" => $row['FECHA'],
					"hora" => $row['HORA'],
					"foto" => $row['FOTO']
			));				
		}

		//listado de los tiempos encontrados en BD
		$data['datos'] = $datos;
		
		//De esta forma estamos enviando los datos
		echo json_encode($data);
	} else {
		//si ocurrio un error al momento de consultar
		$data['estado'] = true;
		echo json_encode($data);
	}
	
	cerrarConexionBaseDeDatos($conn);
}

//Funcion que crea un registro nuevo en BD
function create($conn, $datos){
	//Inicializamos lo que retornaremos
	$data  = array('estado'=>'', 'datos'=>array());
	
	//Capturo los datos que llegan por parametros	
	$tiempo = $datos['tiempo'];
	$tipo = $datos['tipo'];
	$horas_duracion = $datos['horas_duracion'];
	$horas_suspendido = $datos['horas_suspendido'];
			
	$sql = "INSERT INTO tiempo (tiempo, tipo, horas_duracion, horas_suspendido) VALUES ('".$tiempo."', '".$tipo."', ".$horas_duracion.", ".$horas_suspendido.")";
	
	
	$result = $conn->query($sql);
	
	//Si ocurrio algun error en la consulta
	if(!$result){
		$data['estado'] = false;
		$data['datos'] = "Ocurrio un error en la consulta";
		
		//De esta forma estamos enviando los datos
		echo json_encode($data);
		
		//Cerramos la conexión
		cerrarConexionBaseDeDatos($conn);
		
		//Terminamos el metodo
		return;
	}
	
	//Si la consulta se ejecuto con éxito
	$data['estado'] = true;
	//De esta forma estamos enviando los datos
	echo json_encode($data);	
	cerrarConexionBaseDeDatos($conn);
}


?>