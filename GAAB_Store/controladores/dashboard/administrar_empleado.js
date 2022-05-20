// Constantes para establecer las rutas y parámetros de comunicación con la API.
const API_EMPLEADOS = SERVER + 'dashboard/administrar_empleados.php?action=';
const ENDPOINT_TIPO_EMPLEADO = SERVER + 'dashboard/administrar_tipo_empleado.php?action=readAll';

document.addEventListener('DOMContentLoaded', function () {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  M.Slider.init(document.querySelectorAll('.slider'));
  M.Carousel.init(document.querySelectorAll('.carousel'));
});



// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  readRows(API_EMPLEADOS);
  // Se define una variable para establecer las opciones del componente Modal.
  let options = {
    dismissible: false,
    onOpenStart: function () {
      // Se restauran los elementos del formulario.
      document.getElementById('save-form').reset();
    }
  }
  // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
  M.Modal.init(document.querySelectorAll('.modal'), options);
});

// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
  let content = '';
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map(function (row) {
    // Se establece un icono para el estado del producto.
    //(row.estado_empleado) ? icon = 'visibility' : icon = 'visibility_off';
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += `
      <tr>
        <td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100"></td>
        <td>${row.nombre_empleado}</td>
        <td>${row.apellido_empleado}</td>
        <td>${row.correo_empleado}</td>
        <td>${row.usuario_empleado}</td>
        <td>${row.dui_empleado}</td>
        <td>${row.tipo_empleado}</td>
        <td>${row.estado_empleado}</td>
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

// Función para preparar el formulario al momento de insertar un registro.
function openCreate() {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById('save-modal')).open();
  // Se establece el campo de archivo como obligatorio.
  document.getElementById('archivo').required = true;
  // Se llama a la función que llena el select del formulario. Se encuentra en el archivo components.js
  fillSelect(ENDPOINT_TIPO_EMPLEADO, 'id_tipo_empleado', null);
}

// Función para preparar el formulario al momento de modificar un registro.
function openUpdate(id) {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById('update-modal')).open();
  // Se establece el campo de archivo como opcional.
  document.getElementById('archivo').required = false;
  // Se define un objeto con los datos del registro seleccionado.
  const data = new FormData();
  data.append('id', id);
  // Petición para obtener los datos del registro solicitado.
  fetch(API_EMPLEADOS + 'readOne', {
      method: 'post',
      body: data
  }).then(function (request) {
      // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
      if (request.ok) {
          // Se obtiene la respuesta en formato JSON.
          request.json().then(function (response) {
              // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
              if (response.status) {
                  // Se inicializan los campos del formulario con los datos del registro seleccionado.
                  document.getElementById('id').value = response.dataset.id_empleado;
                  document.getElementById('nombre_em').value = response.dataset.nombre_empleado
                  document.getElementById('apellido_em').value = response.dataset.apellido_empleado;
                  document.getElementById('dui_em').value = response.dataset.dui_empleado;
                  document.getElementById('correo_em').value = response.dataset.correo_empleado;
                  document.getElementById('usuario_em').value = response.dataset.usuario_empleado;
                  document.getElementById('contrasenia_empleado').value = response.dataset.contrasenia_empleado;
                  document.getElementById('confirmar').value = response.dataset.contrasenia_empleado;
                  fillSelect(ENDPOINT_TIPO_EMPLEADO, 'id_tipo_em', response.dataset.id_tipo_empleado);
                  if (response.dataset.estado_empleado) {
                      document.getElementById('estado_ep').checked = true;
                  } else {
                      document.getElementById('estado_ep').checked = false;
                  }
                  // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                  M.updateTextFields();
              } else {
                  sweetAlert(2, response.exception, null);
              }
          });
      } else {
          console.log(request.status + ' ' + request.statusText);
      }
  });
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document.getElementById('update-form').addEventListener('submit', function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se define una variable para establecer la acción a realizar en la API.
  let action = '';
  // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
  saveRow(API_EMPLEADOS, 'update', 'update-form', 'update-modal');
});


// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('search-form').addEventListener('submit', function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
  searchRows(API_EMPLEADOS, 'search-form');

});

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document.getElementById('save-form').addEventListener('submit', function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se define una variable para establecer la acción a realizar en la API.
  let action = '';
  //Colocamos el estado como true por defecto
  document.getElementById('estado_ep').value = true;
  // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
  saveRow(API_EMPLEADOS, 'create', 'save-form', 'save-modal');

});