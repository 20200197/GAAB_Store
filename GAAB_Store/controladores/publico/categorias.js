// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_CATEGORIA = SERVER + 'publico/categoria.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que muestra las categorías disponibles.
    readAllCategorias();
    // Se define una variable para establecer las opciones del componente Slider.
    let options = {
        height: 300
    }
    // Se inicializa el componente Slider para que funcione el carrusel de imágenes.
    M.Slider.init(document.querySelectorAll('.slider'), options);
});

// Función para obtener y mostrar las categorías disponibles.
function readAllCategorias() {
    // Petición para solicitar los datos de las categorías.
    fetch(API_CATEGORIA + 'readAll', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es satisfactoria, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es correcta, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    let content = '';
                    let url = '';
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        // Se define una dirección con los datos de cada categoría para mostrar sus productos en otra página web.
                        url = `producto_categoria.html?id_categoria=${row.id_categoria_producto}&nombre=${row.nombre_categoria}`;
                        // Se crean y concatenan las tarjetas con los datos de cada categoría.
                        content += `
                        <div class="col s12 m6 l3">
                        <a href="${url}">
                            <div class="card">
                                <div class="card-image">
                                    <img src="${SERVER}imagenes/categoria_producto/${row.imagen_categoria}" height="200" width="200">
                                </div>
                                <div class="card-action">
                                    <h5 id="titulo_producto">${row.nombre_categoria}</h5>
                                </div>
                            </div>
                        </a>
                    </div>

                        `;
                    });
                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar las categorías.
                    document.getElementById('categoria').innerHTML = content;
                    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
                } else {
                    // Se asigna al título del contenido un mensaje de error cuando no existen datos para mostrar.
                    let title = `<i class="material-icons small">cloud_off</i><span class="red-text">${response.exception}</span>`;
                    document.getElementById('title').innerHTML = title;
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}