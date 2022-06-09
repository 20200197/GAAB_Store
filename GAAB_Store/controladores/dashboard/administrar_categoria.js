// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_CATEGORIA = SERVER + 'dashboard/administrar_categoria.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_CATEGORIA);
    // Se define una variable para establecer las opciones del componente Modal.
    let options = {
        dismissible: false,
        onOpenStart: function () {
            // Se restauran los elementos del formulario.
            document.getElementById('add-form').reset();
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
    document.getElementById('tbody-rows').innerHTML = content;
    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de crear.
document.getElementById('add-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se define una variable para establecer la acción a realizar en la API.
    let action = '';
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    saveRow(API_CATEGORIA, 'create', 'add-form', 'add-modal');
});

// Método manejador de eventos que se ejecuta cuando se envía el formulario de actualizar.
document.getElementById('update-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se define una variable para establecer la acción a realizar en la API.
    let action = '';
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    //Se especifica de una que acccion se realizara
    saveRow(API_CATEGORIA, 'update', 'update-form', 'update-modal');
});


// Función para preparar el formulario al momento de insertar un registro.
function openCreate() {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('add-modal')).open();
    // Se establece el campo de archivo como obligatorio.
    document.getElementById('imagen_categoria').required = true;
}

// Función para abrir el reporte de productos por categoría.
function openReport(id) {
    // Se define una variable para inicializar los parámetros del reporte.
    let params = '?id=' + id;
    // Se establece la ruta del reporte en el servidor.
    let url = SERVER + 'reports/dashboard/productos_categoria.php';
    // Se abre el reporte en una nueva pestaña del navegador web.
    window.open(url + params);
}

// Función para preparar el formulario al momento de modificar un registro.
function openUpdate(id) {
    document.getElementById('imagen_categoria').required = false;
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('update-modal')).open();
    document.getElementById('id_editar').value = id;
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id', id);
    // Petición para obtener los datos del registro solicitado.
    fetch(API_CATEGORIA + 'readOne', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
               //     document.getElementById('id').value = response.dataset.id_tipo_auto;
                    document.getElementById('nombre_categoria').value = response.dataset.nombre_categoria;

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
document.getElementById('delete-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    
    fetch(API_CATEGORIA + 'delete', {
        method: 'post',
        //se obtiene los datos del formulario
        body: new FormData(document.getElementById('delete-form'))
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se cierra la caja de dialogo (modal) del formulario.
                    M.Modal.getInstance(document.getElementById('delete-modal')).close();
                    // Se cargan nuevamente las filas en la tabla de la vista después de borrar un registro y se muestra un mensaje de éxito.
                    readRows(API_CATEGORIA);
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

// Función para establecer el registro a eliminar y abrir una caja de diálogo de confirmación.
function openDelete(id) {
    // Se abre la caja de diálogo (modal) que contiene el formulario.
    M.Modal.getInstance(document.getElementById('delete-modal')).open();
    // Se asigna el valor del registro al campo oculto del formulario.
    document.getElementById('id').value = id;
    //Datos de confirmar
    document.getElementById('imagen_estado').setAttribute('src', '../../recursos/img/imagenes/alvertencia.png');
    document.getElementById('titulo_dos').textContent = 'Advertencia';
    document.getElementById('texto_dos').textContent = '¿Está seguro de eliminar esta categoria de producto?';

}

document.getElementById('search-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    searchRows(API_CATEGORIA, 'search-form');
});