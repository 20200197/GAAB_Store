// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_USUARIOS = SERVER + 'dashboard/usuarios.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    fetch(API_USUARIOS + 'readProfile', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se revisa si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
                if (response.session) {
                    // Se comprueba si la respuesta es satisfactoria, de lo contrario se direcciona a la página web principal.
                    if (response.status) {
                        // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
                        document.getElementById('id').value = response.dataset.id_empleado;
                        document.getElementById('nombre_empleado').value = response.dataset.nombre_empleado;
                        document.getElementById('apellido_empleado').value = response.dataset.apellido_empleado;
                        document.getElementById('correo_empleado').value = response.dataset.correo_empleado;
                        document.getElementById('usuario_empleado').value = response.dataset.usuario_empleado;
                        document.getElementById('dui_empleado').value = response.dataset.dui_empleado;
                        document.getElementById('imagen_profile').setAttribute('src', SERVER + 'imagenes/usuarios/' + response.dataset.imagen_perfil_empleado);
                        // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
                        M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
                        // Se inicializa el componente Sidenav para que funcione la navegación lateral.
                        M.Sidenav.init(document.querySelectorAll('.sidenav'));
                    } else {
                        sweetAlert(3, response.exception, 'index.html');
                    }
                } else {
                    location.href = 'index.html';
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
     // Se define una variable para establecer las opciones del componente Modal.
     let options = {
        dismissible: false
    }
    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
});

// Función para preparar el formulario al momento de modificar un registro.
function openUpdate(id) {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('update-modal')).open();
    document.getElementById('id_id').value = id;
   
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de cambiar contraseña.
document.getElementById('update-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para actualizar la contraseña.
    fetch(API_USUARIOS + 'changePassword', {
        method: 'post',
        body: new FormData(document.getElementById('update-form'))
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se muestra un mensaje de éxito.
                    sweetAlert(1, response.message, 'main.html');
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

// Método manejador de eventos que se ejecuta cuando se envía el formulario de editar perfil.
document.getElementById('profile-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para actualizar los datos personales del usuario.
    fetch(API_USUARIOS + 'editProfile', {
        method: 'post',
        body: new FormData(document.getElementById('profile-form'))
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    sweetAlert(1, response.message, 'main.html');
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});

