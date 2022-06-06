const API_CLIENTE = SERVER + 'publico/cliente.php?action='

document.addEventListener('DOMContentLoaded', function () {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  M.Slider.init(document.querySelectorAll('.slider'));
  M.Carousel.init(document.querySelectorAll('.carousel'));
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
  var elems = document.querySelectorAll('.dropdown-trigger');
  // Se define una variable para establecer las opciones del componente Modal.
  let options = {
    dismissible: false
  }
  // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
  M.Modal.init(document.querySelectorAll('.modal'), options);

  fetch(API_CLIENTE + 'fillInputs', {
    method: 'get'
  }).then(function (request) {
    if (request.ok) {
      request.json().then(function (response) {
        if (response.session) {
          if (response.status) {
            document.getElementById('id').value = response.dataset.id_cliente;
            document.getElementById('nombre').value = response.dataset.nombre_cliente;
            document.getElementById('apellido').value = response.dataset.apellido_cliente;
            document.getElementById('telefono').value = response.dataset.telefono_cliente;
            document.getElementById('usuario').value = response.dataset.usuario_cliente;
            document.getElementById('correo').value = response.dataset.correo_cliente;
            document.getElementById('dui').value = response.dataset.dui_cliente;
            document.getElementById('imagen_profile').setAttribute('src', SERVER + 'imagenes/clientes/' + response.dataset.imagen_perfil_cliente);
          }
        }
      })
    }
  })
});


// Método manejador de eventos que se ejecuta cuando se envía el formulario de editar perfil.
document.getElementById('profile-form').addEventListener('submit', function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Petición para actualizar los datos personales del usuario.
  fetch(API_CLIENTE + 'editProfile', {
      method: 'post',
      body: new FormData(document.getElementById('profile-form'))
  }).then(function (request) {
      // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
      if (request.ok) {
          // Se obtiene la respuesta en formato JSON.
          request.json().then(function (response) {
              // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
              if (response.status) {
                  sweetAlert(1, response.message, 'index.html');
              } else {
                  sweetAlert(2, response.exception, null);
              }
          });
      } else {
          console.log(request.status + ' ' + request.statusText);
      }
  });
});


// Función para preparar el formulario al momento de modificar un registro.
function openUpdate(id) {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById('update-modal')).open();
  // document.getElementById('id_id').value = id;

}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de cambiar contraseña.
document.getElementById('update-form').addEventListener('submit', function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Petición para actualizar la contraseña.
  fetch(API_CLIENTE + 'changePassword', {
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
          sweetAlert(1, response.message, 'index.html');
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + ' ' + request.statusText);
    }
  });
});


