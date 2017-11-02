<?php

require_once("../conexion.php");

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");



$operacion = $_POST['operacion'];//Se obtiene la operación a realizar del servicio tiempo
//$datos = $_POST['datos']; //Se obtienen los diferentes datos con los que se opera.
//$_FILES["file"];
 

//Inicializo objeto para poder operar con la BD
$conn = obtenerConexionBaseDeDatos();


switch ($operacion){
	case "listar" : listarAlmacenes($conn);
					break;
	
	case "crear" : crearAlmacenes($conn);
					break;

    case "categoria" : listarCategoria($conn);
                    break;
    case "crear_categoria" : crearCategoria($conn);
                    break;

}


function listarAlmacenes($conn)
{
    $datos = $_POST['datos'];
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
    $datos = $_POST['datos'];
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
function crearAlmacenes($conn){

  if(isset($_FILES["file"]["type"])){

    $temporary = explode(".", $_FILES["file"]["name"]);
    $file_extension = end($temporary);

    //Inicializamos lo que retornaremos
    $data  = array('estado'=>'', 'datos'=>array());
    

    //Capturo los datos que llegan por parametros   
    $nombre_almacen = $_POST['nombre_almacen'];
    $pagina_web = $_POST['pagina_web'];
    $horario_atencion = $_POST['horario_atencion'];
    //$logo = $datos['logo'];
    $codigo_categoria = $_POST['categoria'];

    $codigoAlmacen = codigoAlmacen($conn);
    $dir = "../../fotos/logos/";
    if(!file_exists($dir)){
                    mkdir($dir, 0777, true);
                }
    $dir = $dir.($codigoAlmacen+1).'.'.$file_extension;
    $logo = $dir;

    $targetPath = $dir;
    $sourcePath = $_FILES["file"]["tmp_name"];
    move_uploaded_file($sourcePath, $targetPath);

            
    $sql = "INSERT INTO ALMACEN (cod_almacen,nombre_almacen, enlace_web, horario_atencion,logo) VALUES ('". ($codigoAlmacen+1)."','". $nombre_almacen."', '".$pagina_web ."', '". $horario_atencion ."', '". $logo ."')";

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
else
{
    $data['estado'] = false;
}
}

function codigoAlmacen($conn)
{
   
    $sql = "SELECT COD_ALMACEN FROM ALMACEN ORDER BY COD_ALMACEN DESC LIMIT 1";
    $result = $conn->query($sql);

    $row = $result->fetch_assoc();
  
    $codigo = $row['COD_ALMACEN'];

    if($codigo==null)
    {
        $codigo = 0;
    }

   return $codigo;



}

function crearCategoria($conn)
{
    //Inicializamos lo que retornaremos
    $data  = array('estado'=>'', 'datos'=>array());
    $datos = $_POST['datos'];

    //Capturo los datos que llegan por parametros   
    $nombre_categoria= $datos['nombre_categoria'];
    $descripcion= $datos['descripcion'];
    
    $codigoCategoria = codigoCategoria($conn);      
    $sql = "INSERT INTO CATEGORIA (cod_categoria, nombre_categoria,descripcion_categoria) VALUES ('". ($codigoCategoria+1)."','". $nombre_categoria."', '".$descripcion ."')";

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

function codigoCategoria($conn)
{
   
    $sql = "SELECT COD_CATEGORIA FROM CATEGORIA ORDER BY COD_CATEGORIA DESC LIMIT 1";
    $result = $conn->query($sql);

    $row = $result->fetch_assoc();
  
    $codigo = $row['COD_CATEGORIA'];

    if($codigo==null)
    {
        $codigo = 0;
    }

   return $codigo;



}