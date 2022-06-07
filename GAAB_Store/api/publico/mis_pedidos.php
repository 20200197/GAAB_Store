<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/mis_pedidos.php');
require_once('../modelos/factura_detalle.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();
    // Se instancian las clases correspondientes.
    $factura = new Factura;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null, 'dataset' => null, 'total' => null, 'session' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_cliente'])) {
        // Se compara la acción a realizar según la petición del controlador.
        $result['session'] = 1;
        switch ($_GET['action']) {
                //Leer compras
            case 'loadCart':
                $_POST = $factura->validateForm($_POST);
                if(!$factura->checkOrder()){
                    $result['exception'] = 'Debe agregar un producto al carrito';
                }elseif($result['dataset'] = $factura->readDetail()){
                    $result['status'] = 1;
                    $result['total'] = $factura->total();
                    $_SESSION['id_factura'] = $factura->getIdFactura();
                }elseif(Database::getException()){
                    $result['exception'] = Database::getException();
                }else{
                    $result['exception'] = 'No tiene productos en el carrito';
                }
                break;
            case 'createDetail':
                $_POST = $factura->validateForm($_POST);
                if(!$factura->checkOrder()){
                    $result['exception'] = 'Ocurrió un problema al obtener el pedido';
                }elseif(!$factura->setIdProducto($_POST['id_producto'])){
                    $result['exception'] = 'No se pudo agregar el producto';
                }elseif(!$factura->setCantidadPorducto($_POST['cantidad'])){
                    $result['exception'] = 'Ingrese una cantidad de productos';
                }elseif(!$factura->checkStock()){
                    $result['exception'] = 'Lo sentimos, no contamos con inventario suficiente para añadir este producto al carrito';
                }elseif($data = $factura->checkProductExist()){
                    $factura->setCantidadPorducto($data['cantidad_producto'] + $_POST['cantidad']);
                    if($factura->checkStock()){
                        $_SESSION['id_factura'] = $factura->getIdFactura();
                        $result['session'] = $_SESSION['id_factura'];
                        $factura->addToDetail();
                        $result['status'] = 1;
                        $result['message'] = 'Producto agregado correctamente';
                    }else{
                        $result['exception'] = 'Lo sentimos, no contamos con inventario suficiente para añadir este producto al carrito';
                    }
                }elseif($factura->createDetail()){
                    $_SESSION['id_factura'] = $factura->getIdFactura();
                    $result['session'] = $_SESSION['id_factura'];
                    $result['status'] = 1;
                    $result['message'] = 'Producto agregado correctamente';
                }
                break;
            case 'finishOrder':
                if($_POST['ids'] == ''){
                    $result['exception'] = 'Debe de agregar productos al carrito para finalizar la orden';
                }elseif(!$factura->setDireccion($_POST['direction'])){
                    $result['exception'] = 'Debe ingresar una dirección válida';
                }elseif($factura->finishOrder()){
                    $result['status'] = 1;
                    $result['message'] = 'Orden completada';
                    $factura->minusStock($_POST['ids']);
                }elseif(Database::getException()){
                    $result['exception'] = Database::getException();
                }else{
                    $result['exception'] = 'Error realizando la orden';
                }
                break;
            case 'deleteRow':
                $_POST = $factura->validateForm($_POST);
                if(!$factura->setIdProducto($_POST['id_producto'])){
                    $result['exception'] = 'Ha ocurrido un error al cargar el producto';
                }elseif($factura->deleteRow()){
                    $result['status'] = 1;
                    $result['message'] = 'Producto eliminado correctamente';
                }elseif(Database::getException()){
                    $result['exception'] = Database::getException();
                }else{
                    $result['exception'] = 'Ha ocurrido un error inesperado';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible';
        }
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        //añadido 07/06/22
        }else{
            switch($_GET['action']){
                case 'createDetail':
                    $result['exception'] = 'Debe iniciar sesión para añadir al carrito';
                    break;
                case 'loadCart':
                    $result['exception'] = 'Debe de inciar sesión para acceder al carrito';
                    break;
                default:
                    $result['exception'] = 'Acción no disponible fuera de la sesión';
                    break;
            }
        }
        print(json_encode($result));
    }
 else {
    print(json_encode('Recurso no disponible'));
}
