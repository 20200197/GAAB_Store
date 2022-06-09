// Constantes para establecer las rutas y parámetros de comunicación con la API.
const API_OFERTAS = SERVER + 'publico/ofertas.php?action=';


// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  //readRows(API_EMPLEADOS);
  readOfertas();
  // Se define una variable para establecer las opciones del componente Modal.
  let options = {
    dismissible: false,
    onOpenStart: function () {
      // Se restauran los elementos del formulario.
      document.getElementById('save-form').reset();
      // Se restauran los elementos del formulario.
      document.getElementById('update-form').reset();
    }
  }
  // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
  M.Modal.init(document.querySelectorAll('.modal'), options);
  M.Collapsible.init(document.querySelectorAll('.collapsible'));
  M.Materialbox.init(document.querySelectorAll('.materialboxed'));
  M.Slider.init(document.querySelectorAll('.slider'));
});

function readOfertas() {
  // Petición para obtener los datos del producto solicitado.
  fetch(API_OFERTAS + 'readOfertas', {
    method: 'get'
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          let content = '';
          // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
          response.map(function (row) {
            // Se crean y concatenan las tarjetas con los datos de cada producto.
            content += `
                      <li>
                          <img src="${SERVER}imagenes/ofertas/629bf75a0e1fc.jpg" class="responsive-img">
                          <div class="caption right-align black-text">
                          </div>
                      </li>
                      `
          });
          // Se colocan los datos en la tarjeta de acuerdo al producto seleccionado previamente.
          document.getElementById('ofertas_ofertas').innerHTML = content;
        } else {
          // Se presenta un mensaje de error cuando no existen datos para mostrar.
          document.getElementById('title').innerHTML = `<i class="material-icons small">cloud_off</i><span class="red-text">${response.exception}</span>`;
        }
      });
    } else {
      console.log(request.status + ' ' + request.statusText);
    }
  });
}
