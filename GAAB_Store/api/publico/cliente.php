<?php
require_once('../ayudantes/database.php');
require_once('../ayudantes/validator.php');
require_once('../modelos/clientes.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $cliente = new Clientes;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'exception' => null, 'dataset' => null,  'username' => null,  'email' => null,  'image_profile' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['id_cliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'getUser':
                if (isset($_SESSION['correo_cliente'])) {
                    $result['status'] = 1;
                    $result['id_cliente'] = $_SESSION['id_cliente'];
                    $result['email'] = $_SESSION['correo_cliente'];
                    $result['username'] = $_SESSION['usuario_cliente'];
                    $result['image_profile'] = $_SESSION['imagen_perfil'];
                } else {
                    $result['exception'] = 'Correo de usuario indefinido';
                }
                break;
                //Leer perfil de cliente
            case 'readProfile':
                if ($result['dataset'] = $cliente->readProfile()) {
                    $result['status'] = 1;
                } elseif (Database::getException()) {
                    $result['exception'] = Database::getException();
                } else {
                    $result['exception'] = 'Cliente inexistente';
                }
                break;
            case 'fillInputs':
                if($result['dataset'] = $cliente->getProfile($_SESSION['id_cliente'])){
                    $result['status'] = 1;
                }else{
                    $result['exception'] = 'Debe loguearse para cargar los datos' + ' ' + Database::getException();
                }
                break;
                //Cambiar contraseña 
            case 'changePassword':
                $_POST = $cliente->validateForm($_POST);
                if (!$cliente->setId($_SESSION['id_cliente'])) {
                    $result['exception'] = 'Usuario de cliente incorrecto';
                } elseif (!$cliente->checkPassword($_POST['actual'])) {
                    $result['exception'] = 'Contraseña actual incorrecta';
                } elseif ($_POST['nueva'] != $_POST['confirmar']) {
                    $result['exception'] = 'Contraseñas nuevas diferentes';
                } elseif (!$cliente->setClave($_POST['nueva'])) {
                    $result['exception'] = $cliente->getPasswordError();
                } elseif ($cliente->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
                //Editar perfil de empleado
            case 'editProfile':
                $_POST = $cliente->validateForm($_POST);
                if (!$data = $cliente->readOnes()) {
                    $result['exception'] = 'Perfil de empleado inexistente';
                } elseif (!$cliente->setNombre($_POST['nombre'])) {
                    $result['exception'] = 'Nombre incorrecto';
                } elseif (!$cliente->setApellido($_POST['apellido'])) {
                    $result['exception'] = 'Apellido incorrectos';
                } elseif (!$cliente->setTelefono($_POST['telefono'])) {
                    $result['exception'] = 'Telefono incorrecto';
                } elseif (!$cliente->setUsuario($_POST['usuario'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$cliente->setCorreo($_POST['correo'])) {
                    $result['exception'] = 'Correo incorrecto';
                } elseif (!$cliente->setDui($_POST['dui'])) {
                    $result['exception'] = 'Dui incorrecto';
                } elseif (!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
                    if ($cliente->editProfile($data['imagen_perfil_cliente'])) {
                        $result['status'] = 1;
                        $result['message'] = 'Perfil modificado corectamente';
                    } else {
                        $result['exception'] = Database::getException();
                    }
                } elseif (!$cliente->setImagen($_FILES['archivo'])) {
                    $result['exception'] = $cliente->getFileError();
                } elseif ($cliente->editProfile($data['imagen_perfil_cliente'])) {
                    $result['status'] = 1;
                    if ($cliente->saveFile($_FILES['archivo'], $cliente->getRuta(), $cliente->getImagen())) {
                        $result['message'] = 'Perfil modificado correctamente';
                    } else {
                        $result['message'] = 'Perfil modificado pero no se guardó la imagen';
                    }
                } else {
                    $result['exception'] = Database::getException();
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['exception'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            default:
                $result['exception'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'register':
                $_POST = $cliente->validateForm($_POST);
                if(!$cliente->setNombre($_POST['nombre'])){
                    $result['exception'] = 'Nombre incorrecto';
                }elseif(!$cliente->setApellido($_POST['apellido'])){
                    $result['exception'] = 'Apellido incorrecto';
                }elseif(!$cliente->setTelefono($_POST['telefono'])){
                    $result['exception'] = 'Telefono incorrecto';
                }elseif($cliente->read('telefono_cliente', $cliente->getTelefono())){
                    $result['exception'] = 'El telefono ingresado ya esta en uso';
                } elseif(!$cliente->setUsuario($_POST['usuario'])){
                    $result['exception'] = 'Usuario incorrecto';
                }elseif ($cliente->read('usuario_cliente', $cliente->getUsuario())) { 
                    $result['exception'] = 'El usuario ingresado ya esta en uso'; 
                }elseif(!$cliente->setDui($_POST['dui'])){
                    $result['exception'] = 'DUI incorrecto';
                }elseif ($cliente->read('dui_cliente', $cliente->getDui())) { 
                    $result['exception'] = 'El dui ingresado ya esta en uso'; 
                }elseif(!$cliente->setCorreo($_POST['correo'])){
                    $result['exception'] = 'Correo incorrecto';
                }elseif ($cliente->read('correo_cliente', $cliente->getCorreo())) { 
                    $result['exception'] = 'El correo ingresado ya esta en uso';
                }elseif($_POST['password1'] != $_POST['password2']){
                    $result['exception'] = 'Las contraseñas no coinciden';
                }elseif(!$cliente->setClave($_POST['password1'])){
                    $result['exception'] = $cliente->getPasswordError();
                }elseif(!$cliente->setIdEstadoCliente(1)){
                    $result['exception'] = 'estado incorrecto';
                }elseif(!is_uploaded_file($_FILES['archivo']['tmp_name'])) {
                    $result['exception'] = 'Seleccione una imagen';
                }elseif(!$cliente->setImagen($_FILES['archivo'])) {
                    $result['exception'] = $cliente->getFileError();
                }elseif($cliente->register()){
                    if($cliente->saveFile($_FILES['archivo'], $cliente->getRuta(), $cliente->getImagen())){
                        $result['message'] = 'Usuario registrado correctamente';
                        $result['status'] = 1;
                    }else{
                        $result['exception'] = Database::getException();
                    }
                }else{
                    $result['exception'] = Database::getException();
                }
                break;
            case 'logIn':
                $_POST = $cliente->validateForm($_POST);
                if (!$cliente->checkUser($_POST['usuario'])) {
                    $result['exception'] = 'Usuario incorrecto';
                } elseif (!$cliente->getIdEstadoCliente() == 2) {
                    $result['exception'] = 'La cuenta ha sido desactivada';
                } elseif ($cliente->checkPassword($_POST['password'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                    $_SESSION['id_cliente'] = $cliente->getId();
                    $_SESSION['correo_cliente'] = $cliente->getCorreo();
                    $_SESSION['usuario_cliente'] = $cliente->getUsuario();
                    $_SESSION['imagen_perfil'] = $cliente->getImagen();
                } else {
                    $result['exception'] = 'Clave incorrecta';
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