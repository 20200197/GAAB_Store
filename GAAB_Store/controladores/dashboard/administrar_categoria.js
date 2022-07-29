// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_CATEGORIA = SERVER + "dashboard/administrar_categoria.php?action=";
const ENDPOINT_CATEGORIA = SERVER + "dashboard/administrar_categoria.php?action=readAll";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", function () {
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  readRows(API_CATEGORIA);
  // Se define una variable para establecer las opciones del componente Modal.
  let options = {
    dismissible: false,
    onOpenStart: function () {
      // Se restauran los elementos del formulario.
      document.getElementById("add-form").reset();
      document.getElementById("update-form").reset();
    },
  };
  // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
  M.Modal.init(document.querySelectorAll(".modal"), options);
});
// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map(function (row) {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += `
            <tr>
                <td>${row.nombre_categoria}</td>
                <td><img src="${SERVER}imagenes/categoria_producto/${row.imagen_categoria}" class="materialboxed"  height="100" width="100"></td>
                <td>
            <a onClick="openUpdate(${row.id_categoria_producto})"><img src="../../recursos/img/imagenes/file_35px.png"></td></a>
            <td>
            <a onClick="openDelete(${row.id_categoria_producto})"><img src="../../recursos/img/icono/eliminar_ico_25px.png"></a></td>
            </tr>
        `;
  });
  // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
  document.getElementById("tbody-rows").innerHTML = content;
  // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
  M.Materialbox.init(document.querySelectorAll(".materialboxed"));
  // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
  M.Tooltip.init(document.querySelectorAll(".tooltipped"));
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de crear.
document
  .getElementById("add-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se define una variable para establecer la acción a realizar en la API.
    let action = "";
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    saveRow(API_CATEGORIA, "create", "add-form", "add-modal");
  });

// Método manejador de eventos que se ejecuta cuando se envía el formulario de actualizar.
document
  .getElementById("update-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se define una variable para establecer la acción a realizar en la API.
    let action = "";
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    //Se especifica de una que acccion se realizara
    saveRow(API_CATEGORIA, "update", "update-form", "update-modal");
  });

// Función para preparar el formulario al momento de insertar un registro.
function openCreate() {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById("add-modal")).open();
  // Se establece el campo de archivo como obligatorio.
  document.getElementById("imagen_categoria").required = true;
}



// Función para preparar el formulario al momento de modificar un registro.
function openUpdate(id) {
  document.getElementById("imagen_categoria").required = false;
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById("update-modal")).open();
  document.getElementById("id_editar").value = id;
  // Se define un objeto con los datos del registro seleccionado.
  const data = new FormData();
  data.append("id", id);
  // Petición para obtener los datos del registro solicitado.
  fetch(API_CATEGORIA + "readOne", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          //     document.getElementById('id').value = response.dataset.id_tipo_auto;
          document.getElementById("nombre_categoria").value =
            response.dataset.nombre_categoria;
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document
  .getElementById("delete-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    fetch(API_CATEGORIA + "delete", {
      method: "post",
      //se obtiene los datos del formulario
      body: new FormData(document.getElementById("delete-form")),
    }).then(function (request) {
      // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
      if (request.ok) {
        // Se obtiene la respuesta en formato JSON.
        request.json().then(function (response) {
          // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
          if (response.status) {
            // Se cierra la caja de dialogo (modal) del formulario.
            M.Modal.getInstance(
              document.getElementById("delete-modal")
            ).close();
            // Se cargan nuevamente las filas en la tabla de la vista después de borrar un registro y se muestra un mensaje de éxito.
            readRows(API_CATEGORIA);
            sweetAlert(1, response.message, null);
          } else {
            sweetAlert(2, response.exception, null);
          }
        });
      } else {
        console.log(request.status + " " + request.statusText);
      }
    });
  });

// Función para establecer el registro a eliminar y abrir una caja de diálogo de confirmación.
function openDelete(id) {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById("delete-modal")).open();
  // Se asigna el valor del registro al campo oculto del formulario.
  document.getElementById("id").value = id;
  //Datos de confirmar
  document
    .getElementById("imagen_estado")
    .setAttribute("src", "../../recursos/img/imagenes/alvertencia.png");
  document.getElementById("titulo_dos").textContent = "Advertencia";
  document.getElementById("texto_dos").textContent =
    "¿Está seguro de eliminar esta categoria de producto?";
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    searchRows(API_CATEGORIA, "search-form");
  });

  
  // Función para abrir reporte de gastos por cliente
function openReport(categoria) {
  // Se establece la ruta del reporte en el servidor.
  let url = SERVER + `reportes/dashboard/productos_categoria.php?categoria=${categoria}`;
  // Se abre el reporte en una nueva pestaña del navegador web.
  window.open(url);
  // Se define un objeto con los datos del registro seleccionado.
  // const data = new FormData();
  // data.append("categoriaN", categoria);
  // request.send(data);

}

//Cargmo opciones de las categorias en el select para los reportes
function openOpciones() {
  // M.Modal.getInstance(document.getElementById("parametro-modal")).open();
  //Cargamos el select
  fetch(ENDPOINT_CATEGORIA, {
    method: 'get'
}).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
        // Se obtiene la respuesta en formato JSON.
        request.json().then(function (response) {
            let content = '';
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (response.status) {
                // Si no existe un valor para seleccionar, se muestra una opción para indicarlo.
                if (!null) {
                    content += '<option disabled selected>Seleccione una opción</option>';
                }
                // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                response.dataset.map(function (row) {
                    // Se obtiene el dato del primer campo de la sentencia SQL (valor para cada opción).
                    value = Object.values(row)[0];
                    // Se obtiene el dato del segundo campo de la sentencia SQL (texto para cada opción).
                    text = Object.values(row)[1];
                    // Se verifica si el valor de la API es diferente al valor seleccionado para enlistar una opción, de lo contrario se establece la opción como seleccionada.
                    if (value != null) {
                        content += `<option value="${value}">${text}</option>`;
                    } else {
                        content += `<option value="${value}" selected>${text}</option>`;
                    }
                });
            } else {
                content += '<option>No hay opciones disponibles</option>';
            }
            // Se agregan las opciones a la etiqueta select mediante su id.
            document.getElementById("opciones_categoriaa").innerHTML = content;
        });
    } else {
        console.log(request.status + ' ' + request.statusText);
    }
});
  openParametro();
}

//Función para abriri parametro para reporte
function openParametro() {
  Swal.fire({
    title: 'Selecciona la categoria',
    html: '<div class="input-field"><select class="browser-default" id="opciones_categoriaa" name="opciones_categoriaa" required> </select></div>',
    showCancelButton: true,
  }).then(function () {
    //Obtenemos la opcion seleccinada
    var selectedOption = document.getElementById("opciones_categoriaa").options[document.getElementById("opciones_categoriaa").selectedIndex];
    console.log(selectedOption.text);
    openReport(selectedOption.text);
  });
}