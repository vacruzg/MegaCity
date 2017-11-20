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
	
	case "crear" : crearAlmacenes($conn);
					break;

    case "categoria" : listarCategoria($conn);
                    break;
    case "crear_categoria" : crearCategoria($conn);
                    break;
    case "actualiza_almacen" : actualizarAlmacen($conn);
                    break;
    case "elimina_almacen" : eliminarAlmacen($conn);
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
