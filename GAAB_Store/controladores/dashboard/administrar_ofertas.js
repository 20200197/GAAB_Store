// Constantes para establecer las rutas y parámetros de comunicación con la API.
const API_OFERTAS = SERVER + 'dashboard/administrar_ofertas.php?action=';


// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  //readRows(API_OFERTAS);
  // Se define una variable para establecer las opciones del componente Modal.
  let options = {
    dismissible: false,
    onOpenStart: function () {
      // Se restauran los elementos del formulario.
      document.getElementById('save-form').reset();
      // Se restauran los elementos del formulario.
      //document.getElementById('update-form').reset();
    }
  }
  // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
  M.Modal.init(document.querySelectorAll('.modal'), options);
  M.Collapsible.init(document.querySelectorAll('.collapsible'))
});

function fillTable(dataset){
  let content = '';
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map(function (row) {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
    content += `
      <tr>
        <td><img src="${SERVER}imagenes/usuarios/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
        <td>${row.nombre_empleado}</td>
        <td>${row.apellido_empleado}</td>
        <td><a onclick="openUpdate(${row.id_empleado})"><img src="../../recursos/img/icono/edit_25px.png"></a></td>
      </tr>
    `;
  });
  // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
  document.getElementById('tbody-adminEmple').innerHTML = content;
  // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
  M.Materialbox.init(document.querySelectorAll('.materialboxed'));
  // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
  M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}

function openCreate(){
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById('save-modal')).open();
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document.getElementById('save-form').addEventListener('submit', function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se define una variable para establecer la acción a realizar en la API.
  let action = '';
  // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
  fetch(API_OFERTAS + 'create', {
    method: 'post',
    body: new FormData(document.getElementById('save-form'))
}).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
        // Se obtiene la respuesta en formato JSON.
        request.json().then(function (response) {
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (response.status) {
                // Se cierra la caja de dialogo (modal) del formulario.
                M.Modal.getInstance(document.getElementById('save-modal')).close();
                // Se cargan nuevamente las filas en la tabla de la vista después de guardar un registro y se muestra un mensaje de éxito.
                // readRows(api);
                sweetAlert(1, response.message, null);
            } else {
                sweetAlert(2, response.exception, null);
            }
        });
    } else {
        console.log(request.status + ' ' + request.statusText);
    }
});
});



