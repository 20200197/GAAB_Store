<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/productos.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $producto = new Producto;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_cliente'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
                //Leer todos los productos
            case 'readAll':
                if ($result['dataset'] = $producto->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Leer todos los productos
            case 'readProductosAll':
                if ($result['dataset'] = $producto->readProductosAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No existen productos para mostrar';
                }
                break;
                //Buscar productos
            case 'search':
                $_POST = $producto->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un nombre o categoría';
                } elseif ($result['dataset'] = $producto->searchProductos($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Productos encontrados';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
                //Crear detalle de factura   
            case 'createDetalleFactura':
                $_POST = $producto->validateForm($_POST);
                if (!$producto->setId($_POST['id'])) {
                    $result['exception'] = 'Producto incorrecto';
                } elseif ($producto->createDetalleFactura()) {
                    // $result['status'] = 1;
                    $result['message'] = 'Detalle de factura creado correctamente';
                } elseif ($producto->createComentario()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comentario creado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Leer info de un registro
            case 'readOne':
                if (!$producto->setId($_POST['id'])) {
                    $result['exception'] = 'Producto incorrecto';
                } elseif ($result['dataset'] = $producto->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Producto inexistente';
                }
                break;
                //Leer calidad de producto
            case 'readCaliProducto':
                if (!$producto->setId($_POST['id_producto'])) {
                    $result['exception'] = 'Producto incorrecta';
                } elseif ($result['dataset'] = $producto->readCaliProducto()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Producto inexistente';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        switch ($_GET['action']) {
                //Leer todos los productos
            case 'readAll':
                if ($result['dataset'] = $producto->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                //Leer todos los productos
            case 'readProductosAll':
                if ($result['dataset'] = $producto->readProductosAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No existen productos para mostrar';
                }
                break;
                //Buscar productos
            case 'search':
                $_POST = $producto->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un nombre o categoría';
                } elseif ($result['dataset'] = $producto->searchProductos($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Productos encontrados';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
                //Crear detalle de factura   
            case 'createDetalleFactura':
                $_POST = $producto->validateForm($_POST);
                if (!$producto->setId($_POST['id'])) {
                    $result['exception'] = 'Producto incorrecto';
                } elseif ($producto->createDetalleFactura()) {
                    // $result['status'] = 1;
                    $result['message'] = 'Detalle de factura creado correctamente';
                } elseif ($producto->createComentario()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comentario creado correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Leer info de un registro
            case 'readOne':
                if (!$producto->setId($_POST['id'])) {
                    $result['exception'] = 'Producto incorrecto';
                } elseif ($result['dataset'] = $producto->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Producto inexistente';
                }
                break;
                //Leer calidad de producto
            case 'readCaliProducto':
                if (!$producto->setId($_POST['id_producto'])) {
                    $result['exception'] = 'Producto incorrecta';
                } elseif ($result['dataset'] = $producto->readCaliProducto()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Producto inexistente';
                }
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
