<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/mis_pedidos.php');
require_once('../modelos/factura_detalle.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancian las clases correspondientes.
    $pedidos = new Pedidos;
    $factura = new Factura;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como cliente, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_cliente'])) {
        // Se compara la acción a realizar según la petición del controlador.
        switch ($_GET['action']) {
                //Leer compras
            case 'readAll':
                if ($result['dataset'] = $pedidos->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Cerrar sesión
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['exception'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
                //Leer detalle de pedidos
            case 'readDetalle':
                if (!$pedidos->setIdFactura($_POST['idfactura'])) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif ($result['dataset'] = $pedidos->readDetalle()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Leemos el id de factura para comentar
            case 'readIdFacturaComent':
                if (!$pedidos->setIdFactura($_POST['idfactura'])) {
                    $result['exception'] = 'Factura incorrecta';
                } elseif ($result['dataset'] = $pedidos->readIdFacturaComent()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
            case 'createComent':
                $_POST = $pedidos->validateForm($_POST);
                if (!$pedidos->setCalidadProducto($_POST['estrellas'])) {
                    $result['exception'] = 'Calidad incorrecta';
                } elseif (!$pedidos->setComentario($_POST['comentario'])) {
                    $result['exception'] = 'Comentario incorrecto';
                } elseif (!$pedidos->setEstadoValoracion('Apropiado')) {
                    $result['exception'] = 'Estado incorrecto';
                } elseif (!$pedidos->setIdDetalleFactura($_POST['id_detalle_factura'])) {
                    $result['exception'] = 'Detalle incorrecto';
                } elseif ($pedidos->createComent()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comentario creado correctamente';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No se pudo crear el comentario';
                }

                break;
                //Cargar cart
            case 'loadCart':
                $_POST = $factura->validateForm($_POST);
                if (!$factura->checkOrder()) {
                    $result['exception'] = 'Debe agregar un producto al carrito';
                } elseif ($result['dataset'] = $factura->readDetail()) {
                    $result['status'] = 1;
                    $result['total'] = $factura->total();
                    $_SESSION['id_factura'] = $factura->getIdFactura();
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No tiene productos en el carrito';
                }
                break;
                //Crear detalle de pedido
            case 'createDetail':
                $_POST = $factura->validateForm($_POST);
                if (!$factura->checkOrder()) {
                    $result['exception'] = 'Ocurrió un problema al obtener el pedido';
                } elseif (!$factura->setIdProducto($_POST['id_producto'])) {
                    $result['exception'] = 'No se pudo agregar el producto';
                } elseif (!$factura->setCantidadPorducto($_POST['cantidad'])) {
                    $result['exception'] = 'Ingrese una cantidad de productos';
                } elseif (!$factura->checkStock()) {
                    $result['exception'] = 'Lo sentimos, no contamos con inventario suficiente para añadir este producto al carrito';
                } elseif ($data = $factura->checkProductExist()) {
                    $factura->setCantidadPorducto($data['cantidad_producto'] + $_POST['cantidad']);
                    if ($factura->checkStock()) {
                        $_SESSION['id_factura'] = $factura->getIdFactura();
                        $factura->addToDetail();
                        $result['status'] = 1;
                        $result['message'] = 'Producto agregado correctamente';
                    } else {
                        $result['exception'] = 'Lo sentimos, no contamos con inventario suficiente para añadir este producto al carrito';
                    }
                } elseif ($factura->createDetail()) {
                    $_SESSION['id_factura'] = $factura->getIdFactura();
                    $result['status'] = 1;
                    $result['message'] = 'Producto agregado correctamente';
                }
                break;
                //Terminar orden
            case 'finishOrder':
                if (!$factura->setDireccion($_POST['direction'])) {
                    $result['exception'] = 'Debe ingresar una dirección válida';
                } elseif ($factura->finishOrder()) {
                    $result['status'] = 1;
                    $result['message'] = 'Orden completada';
                    $factura->minusStock($_POST['ids']);
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Error realizando la orden';
                }
                break;
                //Elimiar producto de pedido
            case 'deleteRow':
                $_POST = $factura->validateForm($_POST);
                if (!$factura->setIdProducto($_POST['id_producto'])) {
                    $result['exception'] = 'Ha ocurrido un error al cargar el producto';
                } elseif ($factura->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto eliminado correctamente';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Ha ocurrido un error inesperado';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible';
        }
    } else {
        // Se compara la acción a realizar cuando un cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAll':
                $result['exception'] = 'Debe iniciar sesión para ver sus pedidos';
                break;
            case 'createDetail':
                $result['exception'] = 'Debe iniciar sesión para agregar el producto al carrito';
                break;
            case 'loadCart':
                $result['exception'] = 'Debe de inciar sesión para acceder al carrito';
                break;
            default:
                $result['exception'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
