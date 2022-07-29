const API_PRODUCTOS = SERVER + "dashboard/producto.php?action=";
const ENDPOINT_TIPO = SERVER + "dashboard/tipo_auto.php?action=readAll";
const ENDPOINT_CATEGORIA =
  SERVER + "dashboard/administrar_categoria.php?action=readAll";

document.addEventListener("DOMContentLoaded", function () {
  readRows(API_PRODUCTOS);
  // Se define una variable para establecer las opciones del componente Modal.
  let options = {
    dismissible: false,
    onOpenStart: function () {
      // Se restauran los elementos del formulario.
      document.getElementById("add-form").reset();
      document.getElementById("update-form").reset();
      document.getElementById("stock-form").reset();
      document.getElementById("coment-form").reset();
    },
  };

  // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
  M.Modal.init(document.querySelectorAll(".modal"), options);
});

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    searchRows(API_PRODUCTOS, "search-form");
  });

function fillTable(dataset) {
  let content = "";

  dataset.map(function (row) {
    content += `
        <tr>
            <td><img src="${SERVER}imagenes/productos/${row.imagen_producto}" class="materialboxed" height="100" width="100"></td>
            <td>${row.nombre_producto}</td>
            <td>${row.nombre_categoria}</td>
            <td>${row.precio_producto}</td>
            <td>${row.cant_producto}</td>
            <td>${row.estado_producto}</td>
            <td><a onClick="openComent(${row.id_producto})" ><img src="../../recursos/img/icono/purchase_order_35px.png"></a></td>
            <td><a onClick="openStock(${row.id_producto})" ><img src="../../recursos/img/icono/plus_20px.png"></a></td>
            <td><a onClick="openUpdate(${row.id_producto})" ><img src="../../recursos/img/imagenes/file_35px.png"></a></td>
            <td><a onClick="openDelete(${row.id_producto})" ><img src="../../recursos/img/icono/eliminar_ico_25px.png"></a></td>
        </tr>
    `;
  });

  document.getElementById("tbody-rows").innerHTML = content;
}

function openCreate() {
  M.Modal.getInstance(document.getElementById("modal-add")).open();
  fillSelect(ENDPOINT_TIPO, "tipo-auto", null);
  fillSelect(ENDPOINT_CATEGORIA, "categoria", null);
}

function openUpdate(id) {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById("update-modal")).open();
  // Se define un objeto con los datos del registro seleccionado.
  const data = new FormData();
  data.append("id", id);
  // Petición para obtener los datos del registro solicitado.
  fetch(API_PRODUCTOS + "readOne", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          document.getElementById("id").value = response.dataset.id_producto;
          document.getElementById("nombre").value = response.dataset.nombre_producto;
          document.getElementById("descripcion_producto").value = response.dataset.descripcion;
          // document.getElementById('stock_producto').value = response.dataset.cant_producto;
          document.getElementById("precio_producto").value = response.dataset.precio_producto;
          fillSelect(ENDPOINT_TIPO, "tipo-auto-update", response.dataset.id_tipo_auto);
          fillSelect(ENDPOINT_CATEGORIA, "categoria_update", response.dataset.id_categoria_producto);
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

function openComent(id) {
  // Se abre la caja de diálogo (modal) que contiene el formulario.

  // Se define un objeto con los datos del registro seleccionado.
  const data = new FormData();
  data.append("id", id);
  // Petición para obtener los datos del registro solicitado.
  fetch(API_PRODUCTOS + "readComentT", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status && response.exception == null) {
          let content = "";
          M.Modal.getInstance(document.getElementById("coment-modal")).open();
          // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
          response.dataset.map(function (row) {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            content += `
            <tr>
                <td>${row.usuario_cliente}</td>
                <td>${row.comentario}</td>
                <td>${row.estado_valoracion}</td>
                <td><a onClick="openComentE(${row.id_producto},${row.id_valoracion})" ><img src="../../recursos/img/icono/eliminar_ico_25px.png"></a></td>
            </tr>
         `;
          });
          // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
          document.getElementById("tbody-coment").innerHTML = content;
        } else {
          sweetAlert(2, response.exception, null);
          // M.Modal.getInstance(document.getElementById("coment-modal")).close();
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

function openStock(id) {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById("stock-modal")).open();
  // Se define un objeto con los datos del registro seleccionado.
  const data = new FormData();
  data.append("id", id);
  // Petición para obtener los datos del registro solicitado.
  fetch(API_PRODUCTOS + "readOne", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          document.getElementById("id_stock").value = response.dataset.id_producto;
          document.getElementById("cantidad_producto").value = response.dataset.cant_producto;
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

//Función para abrir el modal de eliminar
function openDelete(id) {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById("delete-modal")).open();
  // Se define un objeto con los datos del registro seleccionado.
  const data = new FormData();
  data.append("id", id);
  // Petición para obtener los datos del registro solicitado.
  fetch(API_PRODUCTOS + "readOne", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          document.getElementById("id_producto").value = response.dataset.id_producto;
          document.getElementById("id_estado_producto").value = response.dataset.id_estado_producto;
          if (document.getElementById("id_estado_producto").value == 2) {
            document.getElementById("imagen_estado").setAttribute("src", "../../recursos/img/imagenes/Check Circle_80px(1).png");
            document.getElementById("titulo_im").textContent = "Activar";
            document.getElementById("texto_im").textContent = "¿Está seguro de activar este producto?";
          } else {
            document.getElementById("imagen_estado").setAttribute("src", "../../recursos/img/imagenes/alvertencia.png");
            document.getElementById("titulo_im").textContent = "Advertencia";
            document.getElementById("texto_im").textContent =
              "¿Está seguro de dar de baja este producto?";
          }
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

// Función para preparar el formulario al momento de modificar un registro.
function openComentE(id, id_valoracion) {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById("updateComentE-modal")).open();
  // Se define un objeto con los datos del registro seleccionado.
  const data = new FormData();
  data.append("id", id);
  data.append("id_valoracion", id_valoracion); //Dashboard
  // Petición para obtener los datos del registro solicitado.
  fetch(API_PRODUCTOS + "readUpdateE", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          document.getElementById("id_productoE").value = response.dataset.id_producto;
          document.getElementById("id_valoracion").value = response.dataset.id_valoracion;
          document.getElementById("estado_valoracion").value = response.dataset.estado_valoracion;
          //  var Inapropiado = 'Inapropiado';
          if (response.dataset.estado_valoracion == "Inapropiado") {
            document
              .getElementById("imagen_comentE")
              .setAttribute(
                "src",
                "../../recursos/img/imagenes/Check Circle_80px(1).png"
              );
            document.getElementById("titulo_comentE").textContent = "Activar";
            document.getElementById("texto_comentE").textContent =
              "¿Está seguro de activar este comentario?";
          } else {
            document
              .getElementById("imagen_comentE")
              .setAttribute(
                "src",
                "../../recursos/img/imagenes/alvertencia.png"
              );
            document.getElementById("titulo_comentE").textContent =
              "Advertencia";
            document.getElementById("texto_comentE").textContent =
              "¿Está seguro de dar de baja este comentario?";
          }
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

//Acción al ejecutar el updateE-form
document.getElementById("updateComentE-form").addEventListener("submit", function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  //Si el estado de comentario de el input estado valoracion es igual a Apropiado
  if (document.getElementById("estado_valoracion").value == "Inapropiado") {
    document.getElementById("estado_valoracion").value = "Apropiado";
    // Se define una variable para establecer la acción a realizar en la API.
    let action = "";
    //Cambiamos titulo de campo de tabla
    // document.getElementById('titulo_estado').textContent = 'Activar';
    // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
    saveRow(
      API_PRODUCTOS,
      "updateComentE",
      "updateComentE-form",
      "updateComentE-modal"
    );
    M.Modal.getInstance(document.getElementById("coment-modal")).close();
    //Si es distinto
  } else {
    //Se asigna el estado valoracion Apropiado para guardar
    document.getElementById("estado_valoracion").value = "Inapropiado";
    // Se define una variable para establecer la acción a realizar en la API.
    let action = "";
    //Cambiamos titulo de campo de tabla
    // document.getElementById('titulo_estado').textContent='Dar de baja';
    // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
    saveRow(
      API_PRODUCTOS,
      "updateComentE",
      "updateComentE-form",
      "updateComentE-modal"
    );
    M.Modal.getInstance(document.getElementById("coment-modal")).close();
  }
  sweetAlert(2, response.exception, null);
});

//Acción al ejecutar el delete-form
document.getElementById("delete-form").addEventListener("submit", function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  //Si el estado de producto de el input id estado producto es igual a 1
  if (document.getElementById("id_estado_producto").value == 1) {
    document.getElementById("id_estado_producto").value = 2;
    // Se define una variable para establecer la acción a realizar en la API.
    let action = "";
    //Cambiamos titulo de campo de tabla
    // document.getElementById('titulo_estado').textContent = 'Activar';
    // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
    saveRow(API_PRODUCTOS, "updateEstado", "delete-form", "delete-modal");
    //Si es distinto
  } else {
    //Se asigna el id 1 para guardar
    document.getElementById("id_estado_producto").value = 1;
    // Se define una variable para establecer la acción a realizar en la API.
    let action = "";
    //Cambiamos titulo de campo de tabla
    // document.getElementById('titulo_estado').textContent='Dar de baja';
    // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
    saveRow(API_PRODUCTOS, "updateEstado", "delete-form", "delete-modal");
    sweetAlert(2, response.exception, null);
  }
});

//Actualizar stock
document.getElementById("stock-form").addEventListener("submit", function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  saveRow(API_PRODUCTOS, "updateStock", "stock-form", "stock-modal");
});

//Actualizar productos
document.getElementById("update-form").addEventListener("submit", function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se define una variable para establecer la acción a realizar en la API.
  // Se comprueba si el campo oculto del formulario esta seteado para actualizar, de lo contrario será para crear.
  saveRow(API_PRODUCTOS, "update", "update-form", "update-modal");
});

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document.getElementById("add-form").addEventListener("submit", function (event) {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Se define una variable para establecer la acción a realizar en la API.
  let action = "";
  // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
  saveRow(API_PRODUCTOS, "create", "add-form", "modal-add");
});

// Función para abrir reporte de gastos por cliente
function openReport() {
  // Se establece la ruta del reporte en el servidor.
  let url = SERVER + `reportes/dashboard/productos.php`;
  // Se abre el reporte en una nueva pestaña del navegador web.
  window.open(url);
  // Se define un objeto con los datos del registro seleccionado.
  // const data = new FormData();
  // data.append("categoriaN", categoria);
  // request.send(data);

}

function openReportProductos() {
  // Se establece la ruta del reporte en el servidor.
  let url = SERVER + `reportes/dashboard/productos.php`;
  // Se abre el reporte en una nueva pestaña del navegador web.
  window.open(url);
  // Se define un objeto con los datos del registro seleccionado.
  // const data = new FormData();
  // data.append("categoriaN", categoria);
  // request.send(data);

}