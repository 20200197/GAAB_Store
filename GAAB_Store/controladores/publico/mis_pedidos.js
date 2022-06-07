// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_MIS_PEDIDOS = SERVER + 'publico/mis_pedidos.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_MIS_PEDIDOS);
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false
    }

    // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
    M.Modal.init(document.querySelectorAll('.modal'), options);
});


// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
            <tr>
            <td>${row.nombre_producto}</td>
             <td>${row.cantidad_producto}</td>
             <td>${row.precio_unitario}</td>
             <td>${row.subtotal}</td>
             <td>${row.fecha}</td>
             <td class="estado_factura">${row.estado_factura}</td>
            </tr>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-misPedidos').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}

// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTableMisPedidos(dataset) {
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
      // Se establece un estado para el estado del producto.
      var estadoo;
      (row.estado_empleado) ? estadoo = 'Activo' : estadoo = 'Inactivo';
      // Se crean y concatenan las filas de la tabla con los datos de cada registro.
      //<td><img src="${SERVER}imagenes/administrar_empleados/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
      content += `
        <tr>
          <td><img src="${SERVER}imagenes/usuarios/${row.imagen_perfil_empleado}" class="materialboxed" height="100" width="100"></td>
          <td>${row.nombre_empleado}</td>
          <td>${row.apellido_empleado}</td>
          <td>${row.correo_empleado}</td>
          <td>${row.usuario_empleado}</td>
          <td>${row.dui_empleado}</td>
          <td>${row.tipo_empleado}</td>
          <td>${estadoo}</td>
          <td><a onclick="openUpdate(${row.id_empleado})"><img src="../../recursos/img/icono/edit_25px.png"></a></td>
        </tr>
      `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-misPedidos').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  }
  



// Función para preparar el formulario al momento de abrir las compras.
function openCompra(id) {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('save-modal')).open();
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id', id);
    // Petición para obtener los datos del registro solicitado.
    fetch(API_CLIENTES + 'readCompras', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    let content = '';
                    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                        content += `
                            <tr>
                                <td>${row.nombre_producto}</td>
                                <td>${row.cantidad_producto}</td>
                                <td>${row.precio_unitario}</td>
                                <td>${row.subtotal}</td>
                                <td>${row.fecha}</td>
                                <td class="estado_factura">${row.estado_factura}</td>
                            </tr>
                        `;
                    });
                    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                    document.getElementById('tbody-compras').innerHTML = content;
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}



