<?php

require_once("../conexion.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");



$operacion = $_POST['operacion'];//Se obtiene la operación a realizar del servicio tiempo
$datos = $_POST['datos']; //Se obtienen los diferentes datos con los que se opera.
//$_FILES["file"];
 

//Inicializo objeto para poder operar con la BD
$conn = obtenerConexionBaseDeDatos();


switch ($operacion){
	case "listar" : listarAlmacenes($conn);
					break;
	
	case "crear" : crearAlmacenes($conn, $datos);
					break;

    case "categoria" : listarCategoria($conn, $datos);
                    break;

}


function listarAlmacenes($conn)
{
	$data  = array('error'=>'', 'datos'=>array());

	$sql = "SELECT * FROM ALMACEN";
    $result = $conn->query($sql);
    $num_rows = $result->num_rows;

    if(!$result)
    {
    	$data['error'] = true;
    	$data['datos'] = "Erro al consultar en BD";
    	
         //Envío de datos
    	echo json_encode($data);

    	//Cerramos conexión con BD
    	cerrarConexionBaseDeDatos($conn);

    	return;
    }

    if($num_rows>0)
    {
    	$datos = array();
    	$data['error'] = false;

    	while($row = $result->fetch_assoc())
    	{
    		array_push($datos, array(
            		   'nombre_almacen'=>$row['NOMBRE_ALMACEN'],
            		   'pagina_web'=>$row['ENLACE_WEB'],
            		   'horario_atencion'=>$row['HORARIO_ATENCION']

    		));
    	}

    	//listado de los tiempos encontrados en BD
		$data['datos'] = $datos;
        //De esta forma estamos enviando los datos
		echo json_encode($data);

    }
    else
    {
    	//si ocurrio un error al momento de consultar
		$data['estado'] = false;
		echo json_encode($data);
    }

   cerrarConexionBaseDeDatos($conn);
}


function listarCategoria($conn)
{
    $data  = array('error'=>'', 'datos'=>array());

    $sql = "SELECT * FROM CATEGORIA";
    $result = $conn->query($sql);
    $num_rows = $result->num_rows;

    if(!$result)
    {
        $data['error'] = true;
        $data['datos'] = "Erro al consultar en BD";
        
         //Envío de datos
        echo json_encode($data);

        //Cerramos conexión con BD
        cerrarConexionBaseDeDatos($conn);

        return;
    }

    if($num_rows>0)
    {
        $datos = array();
        $data['error'] = false;

        while($row = $result->fetch_assoc())
        {
            array_push($datos, array(
                       'nombre_categoria'=>$row['NOMBRE_CATEGORIA']

            ));
        }

        //listado de los tiempos encontrados en BD
        $data['datos'] = $datos;
        //De esta forma estamos enviando los datos
        echo json_encode($data);

    }
    else
    {
        //si ocurrio un error al momento de consultar
        $data['estado'] = false;
        echo json_encode($data);
    }

   cerrarConexionBaseDeDatos($conn);
}


//Funcion que crea un registro nuevo en BD
function crearAlmacenes($conn, $datos){

  
 if(isset($_FILES["file"]["type"]))
 {
    echo "Entra qui".$_FILES["file"];
 }
 else
 {
     echo "no entra qui";
 }
    //Inicializamos lo que retornaremos
    $data  = array('estado'=>'', 'datos'=>array());
    

    //Capturo los datos que llegan por parametros   
    $nombre_almacen = $datos['nombre_almacen'];
    $pagina_web = $datos['pagina_web'];
    $horario_atencion = $datos['horario_atencion'];
    $logo = $datos['logo'];
    $codigo_categoria = $datos['categoria'];
            
    $sql = "INSERT INTO ALMACEN (nombre_almacen, enlace_web, horario_atencion,logo) VALUES ('". $nombre_almacen."', '".$pagina_web ."', '". $horario_atencion ."', '". $logo ."')";

   $result = $conn->query($sql);
    $codigoAlmacen = codigoAlmacen($conn);

   $sql2 = "INSERT INTO CATEGORIA_X_ALMACEN (cod_categoria, cod_almacen) VALUES (". $codigo_categoria.", ".$codigoAlmacen .")";
    
    
    
    $result2 = $conn->query($sql2);
    //Si ocurrio algun error en la consulta
    if(!$result && !$result2){
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

function codigoAlmacen($conn)
{
   
    $sql = "SELECT COD_ALMACEN FROM ALMACEN ORDER BY COD_ALMACEN DESC LIMIT 1";
    $result = $conn->query($sql);

    $row = $result->fetch_assoc();
  
    $codigo = $row['COD_ALMACEN'];

   return $codigo;



}