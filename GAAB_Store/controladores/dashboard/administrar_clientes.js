// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_CLIENTES = SERVER + 'dashboard/administrar_cliente.php?action=';
const ENDPOINT_ESTADO = SERVER + 'dashboard/estado.php?action=readAll';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_CLIENTES);
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
                <td>${row.nombre_cliente}</td>
                <td>${row.apellido_cliente}</td>
                <td>${row.telefono_cliente}</td>
                <td>${row.usuario_cliente}</td>
                <td><img src="${SERVER}imagenes/administrar_cliente/${row.imagen_perfil_cliente}" class="materialboxed" height="100"></td>
                <td>${row.correo_cliente}</td>
                <td>${row.dui_cliente}</td>
                <td id="r_estado">${row.estado_cliente}</td>
                <td>
            <a onClick="openCompra(${row.id_cliente})"><img src="../../recursos/img/imagenes/file_35px.png"></a></td>
            <td>
            <a onClick="openUpdate(${row.id_cliente})" id="texto_estado" ><img src="../../recursos/img/icono/eliminar_ico_25px.png"></a></td>
            </tr>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-rows').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('search-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    searchRows(API_CLIENTES, 'search-form');
});


// Función para abrir reporte de gastos por cliente
function openReport(id) {
    // Se define una variable para inicializar los parámetros del reporte.
    let params = '?id=' + id;
    // Se establece la ruta del reporte en el servidor.
    let url = SERVER + 'reportes/dashboard/gastos_cliente.php';
    // Se abre el reporte en una nueva pestaña del navegador web.
    window.open(url + params);
}

// Función para preparar el formulario al momento de abrir las compras.
function openCompra(idcliente) {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('save-modal')).open();
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('idcliente', idcliente);
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
                        //Evaluamos para cerrar no mostrar nada si no hay datos
                        if (response.exception == 'No hay datos registrados') {
                            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                            content += `
                        <tr>
                            <td>${null}</td>
                            <td>${null}</td>
                            <td>${null}</td>
                            <td>${null}</td>
                            <td>${null}</td>
                            <td id="${null}" class="${null}">${null}</td>
                         </tr>
                          `;
                            // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
                            document.getElementById('tbody-compras').innerHTML = content;
                        } else {
                            var estado_factura;
                            var estado;
                            if (row.estado_factura == 'En_proceso' || row.estado_factura == 'En proceso') {
                                row.estado_factura = 'En_proceso';
                                estado = row.estado_factura;
                                estado_factura = 'En proceso'
                            } else {
                                row.estado_factura = 'Cancelado';
                                estado = row.estado_factura;
                                estado_factura = row.estado_factura;
                            }
                            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                            content += `
                            <tr>
                                <td>${row.nombre_producto}</td>
                                <td>${row.cantidad_producto}</td>
                                <td>${row.precio_unitario}</td>
                                <td>${row.subtotal}</td>
                                <td>${row.fecha}</td>
                                <td id="${estado}" class="${estado_factura}">${estado_factura}</td>
                            </tr>
                        `;
                        }
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

function cambiarcolor() {
    document.getElementById('estado_factura').style.backgroundColor = 'green';
}

// Función para preparar el formulario al momento de modificar un registro.
function openUpdate(id) {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('update-modal')).open();
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id', id);
    // Petición para obtener los datos del registro solicitado.
    fetch(API_CLIENTES + 'readOne', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    document.getElementById('id').value = response.dataset.id_cliente;
                    document.getElementById('id_estado_cliente').value = response.dataset.id_estado_cliente;
                    if (document.getElementById('id_estado_cliente').value == 2) {
                        document.getElementById('imagen_estado').setAttribute('src', '../../recursos/img/imagenes/Check Circle_80px(1).png');
                        document.getElementById('titulo_im').textContent = 'Activar'
                        document.getElementById('texto_im').textContent = '¿Está seguro de activar este cliente?'
                    } else {
                        document.getElementById('imagen_estado').setAttribute('src', '../../recursos/img/imagenes/alvertencia.png');
                        document.getElementById('titulo_im').textContent = 'Advertencia'
                        document.getElementById('texto_im').textContent = '¿Está seguro de dar de baja este cliente?'
                    }

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
    //Si el estado de cliente de el input id estado cliente es igual a 1
    if (document.getElementById('id_estado_cliente').value == 1) {
        document.getElementById('id_estado_cliente').value = 2;
        // Se define una variable para establecer la acción a realizar en la API.
        let action = '';
        //Cambiamos titulo de campo de tabla
        // document.getElementById('titulo_estado').textContent = 'Activar';
        (document.getElementById('id').value) ? action = 'update' : action = '';
        // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
        saveRow(API_CLIENTES, action, 'update-form', 'update-modal');
        //Si es distinto
    } else {
        //Se asigna el id 1 para guardar
        document.getElementById('id_estado_cliente').value = 1;
        // Se define una variable para establecer la acción a realizar en la API.
        let action = '';
        //Cambiamos titulo de campo de tabla
        // document.getElementById('titulo_estado').textContent='Dar de baja';
        (document.getElementById('id').value) ? action = 'update' : action = '';
        // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
        saveRow(API_CLIENTES, action, 'update-form', 'update-modal');
        sweetAlert(2, response.exception, null);
    }
});

