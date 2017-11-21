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
	case "municipios" : listarmMunicipos($conn);
					break;
	
	case "crear_usuario" : crearUsuarios($conn);
					break;
}

function listarmMunicipos($conn)
{
    $datos = $_POST['datos'];
    $data  = array('error'=>'', 'datos'=>array());

    $sql = "SELECT * FROM MUNICIPIO";
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
                       'nombre_municipio'=>$row['NOMBRE_MUNICIPIO']

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

function crearUsuarios($conn)
{
    $data  = array('estado'=>'', 'datos'=>array());
    $datos = $_POST['datos'];

    //Capturo los datos que llegan por parametros   
   $nombres = $datos['nombres'];
   $apellidos = $datos['apellidos'];
   $cedula = $datos['cedula'];
   $password = md5($datos['password']);
   $edad = $datos['edad'];
   $telefono = $datos['telefono'];
   $calle = $datos['calle'];
   $carrera = $datos['carrera'];
   $numero = $datos['numero'];
   $barrio = $datos['barrio'];
   $apartamento = $datos['apartamento'];
   $piso = $datos['piso'];
   $municipio = $datos['municipio'];
   $puntos =0;


    $codigoDireccion = codigoDireccion($conn);

    $sql = "INSERT INTO DIRECCION (cod_direccion, calle,carrera,numero,barrio,apto,piso,cod_municipio) VALUES ('". ($codigoDireccion+1)."','".$calle."', '".$carrera ."','".$numero."','".$barrio."', '".$apartamento ."', '".$piso ."', '".$municipio."')";

   $result = $conn->query($sql);

   $sql2 = "INSERT INTO USUARIO (cod_usuario,nombre,apellido,edad,password,telefono,cod_direccion) VALUES ('".$cedula."','".$nombres."', '".$apellidos."','".$edad."','".$password."', '".$telefono."', '".($codigoDireccion+1)."')";
    $result2 = $conn->query($sql2);

   $sql3 = "INSERT INTO CLIENTE (cod_usuario,puntos) VALUES ('".$cedula."','".$puntos."')";

   $result3 = $conn->query($sql3);
   
    //Si ocurrio algun error en la consulta
    if(!$result && !$result2 && !$result3){
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

function codigoDireccion($conn)
{
   
    $sql = "SELECT COD_DIRECCION FROM DIRECCION ORDER BY COD_DIRECCION  DESC LIMIT 1";
    $result = $conn->query($sql);

    $row = $result->fetch_assoc();
  
    $codigo = $row['COD_DIRECCION'];

    if($codigo==null)
    {
        $codigo = 0;
    }

   return $codigo;

}