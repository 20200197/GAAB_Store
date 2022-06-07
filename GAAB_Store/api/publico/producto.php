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
            case 'readAll':
                if ($result['dataset'] = $producto->readAll()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay datos registrados';
                }
                break;
                case 'readProductosAll':
                     if ($result['dataset'] = $producto->readProductosAll()) {
                        $result['status'] = 1;
                    } elseif (Database::getException()) {
                        $result['exception'] = Database::getException();
                    } else {
                        $result['exception'] = 'No existen productos para mostrar';
                    }
                    break;
            case 'search':
                $_POST = $producto->validateForm($_POST);
                if ($_POST['search'] == '') {
                    $result['exception'] = 'Ingrese un nombre o categoría';
                } elseif ($result['dataset'] = $producto->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Productos encontrados';
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'No hay coincidencias';
                }
                break;
            case 'create':
                $_POST = $producto->validateForm($_POST);
                if (!$producto->setNombre($_POST['nombre_producto'])) {
                    $result['exception'] = 'Ingrese un nombre correcto';
                } elseif (!$producto->setDescripcion($_POST['descripcion'])) {
                    $result['exception'] = 'Descripción incorrecta';
                } elseif (!$producto->setCantidad($_POST['stock_producto'])) {
                    $result['exception'] = 'Cantidad incorrecta';
                } elseif (!$producto->setPrecio($_POST['precio_producto'])) {
                    $result['exception'] = 'Precio incorrecto';
                } elseif (!isset($_POST['categoria'])) {
                    $result['exception'] = 'Seleccione una categoría';
                } elseif (!$producto->setIdCategoria($_POST['categoria'])) {
                    $result['exception'] = 'Categoría incorrecta';
                } elseif (!isset($_POST['tipo-auto'])) {
                    $result['exception'] = 'Seleccione un tipo de auto';
                } elseif (!$producto->setIdTipoAuto($_POST['tipo-auto'])) {
                    $result['exception'] = 'tipo de auto incorrecto';
                } elseif (!$producto->setIdEstado(1)) {
                    $result['exception'] = 'Problema en estado';
                } elseif (!$producto->setIdEmpleado($_SESSION['id_usuario'])) {
                    $result['exception'] = 'Debe iniciar sesión';
                } elseif (!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen';
                } elseif (!$producto->setImagen($_FILES['archivo'])) {
                    $result['exception'] = $producto->getFileError();
                } elseif ($producto->createRow()) {
                    $result['status'] = 1;
                    if ($producto->saveFile($_FILES['archivo'], $producto->getRuta(), $producto->getImage())) {
                        $result['message'] = 'Producto creado correctamente';
                    } else {
                        $result['message'] = 'Producto creado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                case 'createDetalleFactura':
                    $_POST = $producto->validateForm($_POST);
                    if (!$producto->setId($_POST['id'])) {
                        $result['exception'] = 'Producto incorrecto';
                    }  elseif ($producto->createDetalleFactura()) {
                       // $result['status'] = 1;
                        $result['message'] = 'Detalle de factura creado correctamente';
                    }elseif ($producto->createComentario()) {
                        $result['status'] = 1;
                        $result['message'] = 'Comentario creado correctamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                    break;
            case 'readOne':
                if (!$producto->setId($_POST['id'])) {
                    $result['exception'] = 'Producto incorrecta';
                } elseif ($result['dataset'] = $producto->readOne()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Producto inexistente';
                }
                break;
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
            case 'update':
                $_POST = $producto->validateForm($_POST);
                if (!$producto->setId($_POST['id'])) {
                    $result['exception'] = 'Tipo de auto incorrecto';
                } elseif (!$data = $producto->readOne()) {
                    $result['exception'] = 'Tipo de auto inexistente ';
                } elseif (!$producto->setNombre($_POST['nombre'])) {
                    $result['exception'] = 'nombre incorrecto';
                } elseif (!$producto->setDescripcion($_POST['descripcion_producto'])) {
                    $result['exception'] = 'Descripción incorrecta';
                } elseif (!$producto->setCantidad($_POST['stock_producto'])) {
                    $result['exception'] = 'Cantidad incorrecta';
                } elseif (!$producto->setPrecio($_POST['precio_producto'])) {
                    $result['exception'] = 'Precio incorrecto';
                } elseif (!isset($_POST['categoria_update'])) {
                    $result['exception'] = 'Seleccione una categoría';
                } elseif (!$producto->setIdCategoria($_POST['categoria_update'])) {
                    $result['exception'] = 'Categoría incorrecta';
                } elseif (!isset($_POST['tipo-auto-update'])) {
                    $result['exception'] = 'Seleccione un tipo de auto';
                } elseif (!$producto->setIdTipoAuto($_POST['tipo-auto-update'])) {
                    $result['exception'] = 'tipo de auto incorrecto';
                } elseif (!$producto->setIdEstado(1)) {
                    $result['exception'] = 'Problema en estado';
                } elseif (!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
                    if ($producto->updateRow($data['imagen_producto'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Producto modificado correctamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$producto->setImagen($_FILES['archivo'])) {
                    $result['exception'] = $producto->getFileError();
                } elseif ($producto->updateRow($data['imagen_producto'])) {
                    $result['status'] = 1;
                    if ($producto->saveFile($_FILES['archivo'], $producto->getRuta(), $producto->getImage())) {
                        $result['message'] = 'Producto modificado correctamente';
                    } else {
                        $result['message'] = 'Producto modificado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'updateEstado':
                $_POST = $producto->validateForm($_POST);
                if (!$producto->setId($_POST['id'])) {
                    $result['exception'] = 'Tipo de auto incorrecto';
                } elseif (!$data = $producto->readOne()) {
                    $result['exception'] = 'Tipo de auto inexistente ';
                } elseif (!$producto->setIdEstado(1)) {
                    $result['exception'] = 'Problema en estado';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'delete':
                if (!$tipo_auto->setId($_POST['id'])) {
                    $result['exception'] = 'Tipo de auto incorrecta';
                } elseif (!$data = $tipo_auto->readOne()) {
                    $result['exception'] = 'Tipo de auto inexistente';
                } elseif ($tipo_auto->deleteRow()) {
                    $result['status'] = 1;
                    if ($tipo_auto->deleteFile($tipo_auto->getRuta(), $data['imagen_tipo_auto'])) {
                        $result['message'] = 'Tipo de auto eliminado correctamente';
                    } else {
                        $result['message'] = 'tipo de auto eliminado pero no se borró la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible dentro de la sesión';
        }
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
