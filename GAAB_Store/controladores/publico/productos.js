// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_PRODUCTO = SERVER + 'publico/producto.php?action=';
const API = SERVER + 'publico/cliente.php?action='

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);
    // Se obtienen los datos localizados por medio de las variables.
    const ID = params.get('id');
    const NAME = params.get('nombre');
    // Se llama a la función que muestra los productos de la categoría seleccionada previamente.
    readProductosAll();
    readInfo();
    //   readCaliProducto(19,NAME);
});

// Función para obtener y mostrar los productos de acuerdo a la categoría seleccionada.
function readProductosCategoriaa(id, categoria) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id_categoria_producto', id);
    // Petición para solicitar los productos de la categoría seleccionada.
    fetch(API_CATEGORIA + 'readProductosCategoria', {
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
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        // Se crean y concatenan las tarjetas con los datos de cada producto.
                        content += `
                        <div class="col s12 m6 l6" id="col">
                        <a href="prod_individual.html?id=${row.id_producto}">
                        <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                            </div>
                        </div>
                    </a>
                </div>

                        `

                    });

                    // Se asigna como título la categoría de los productos.
                    document.getElementById('title').textContent = 'Categoría: ' + categoria;
                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                    document.getElementById('producto').innerHTML = content;
                    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
                    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
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

// Función para obtener y mostrar los productos de acuerdo a la categoría seleccionada.
function readProductosAll() {
    // Petición para solicitar los productos de la categoría seleccionada.
    fetch(API_PRODUCTO + 'readProductosAll', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    let content = '';
                    let url = '';
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        // Se define una dirección con los datos de cada categoría para mostrar sus productos en otra página web.
                        url = `producto_categoria.html?id=${row.id_producto}&id_categoria=${row.id_categoria_producto}&nombre=${row.nombre_categoria}`;
                        //Compramos la calidad para colocarle las estrellas
                        if (row.calidad <= 1 && row.calidad > 0) {
                            //Para 0.5
                            if (row.calidad < 1) {
                                content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star_half</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                </div>
                            </div>
                        </a>
                    </div>
                        `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            } else {
                                //Para 1
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            }
                            //Para 1.5
                        } else if (row.calidad <= 2 && row.calidad > 1) {
                            if (row.calidad < 2 && row.calidad > 1) {
                                content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_half</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            } else {
                                //Para 2
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            }


                        } else if (row.calidad <= 3 && row.calidad > 2) {
                            //Para 2.5
                            if (row.calidad < 3 && row.calidad > 2) {
                                content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_half</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            } else {
                                //Para 3
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content += `
                             <div class="col s12 m6 l6" id="col">
                             <a href="${url}">
                             <div class="card medium">
                             <div class="card-image waves-effect waves-block waves-light">
                                 <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                             </div>
                             <div class="card-content"  id="calidad_calidad">
                                 <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                 <p>Precio: ${row.precio_producto}</p>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star_border</i>
                                 <i class="material-icons">star_border</i>
                             </div>
                         </div>
                     </a>
                 </div>
                     `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            }

                        } else if (row.calidad <= 4 && row.calidad > 3) {
                            //Para 3.5
                            if (row.calidad < 4 && row.calidad > 3) {
                                content += `
                                <div class="col s12 m6 l6" id="col">
                                <a href="${url}">
                                <div class="card medium">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                                </div>
                                <div class="card-content"  id="calidad_calidad">
                                    <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                    <p>Precio: ${row.precio_producto}</p>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star_half</i>
                                    <i class="material-icons">star_border</i>
                                </div>
                            </div>
                        </a>
                    </div>
                        `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            } else {
                                //Para 4
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content += `
                             <div class="col s12 m6 l6" id="col">
                             <a href="${url}">
                             <div class="card medium">
                             <div class="card-image waves-effect waves-block waves-light">
                                 <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                             </div>
                             <div class="card-content"  id="calidad_calidad">
                                 <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                 <p>Precio: ${row.precio_producto}</p>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star_border</i>
                             </div>
                         </div>
                     </a>
                 </div>
                     `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            }

                        } else if (row.calidad <= 5 && row.calidad > 4) {

                            //Para 4.5
                            if (row.calidad < 5 && row.calidad > 4) {
                                content += `
                                <div class="col s12 m6 l6" id="col">
                                <a href="${url}">
                                <div class="card medium">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                                </div>
                                <div class="card-content"  id="calidad_calidad">
                                    <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                    <p>Precio: ${row.precio_producto}</p>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star_half</i>
                                </div>
                            </div>
                        </a>
                    </div>
                        `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            } else {
                                // Se crean y concatenan las tarjetas con los datos de cada producto.
                                content += `
                              <div class="col s12 m6 l6" id="col">
                              <a href="${url}">
                              <div class="card medium">
                              <div class="card-image waves-effect waves-block waves-light">
                                  <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                              </div>
                              <div class="card-content"  id="calidad_calidad">
                                  <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                  <p>Precio: ${row.precio_producto}</p>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                              </div>
                          </div>
                      </a>
                  </div>
                      `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            }

                        } else if (row.calidad == null) {
                            content += `
                            <div class="col s12 m6 l6" id="col">
                           <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <p>No hay calificación para este producto</p>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById('producto').innerHTML = content;
                        }
                        else {
                            content += `
                            <div class="col s12 m6 l6" id="col">
                           <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <p>No hay calificación para este producto</p>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById('producto').innerHTML = content;
                        }

                    });

                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                    document.getElementById('producto').innerHTML = content;
                    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
                    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
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

function readProductosBuscador(dataset) {
    // Petición para solicitar los productos de la categoría seleccionada.
    fetch(API_PRODUCTO + 'readProductosAll', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    let content = '';
                    let url = '';
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    dataset.map(function (row) {
                        // Se define una dirección con los datos de cada categoría para mostrar sus productos en otra página web.
                        url = `producto_categoria.html?id=${row.id_producto}&id_categoria=${row.id_categoria_producto}&nombre=${row.nombre_categoria}`;
                        if (row.nombre_producto == null || row.tipo_auto == null || row.nombre_categoria == null) {
                            content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">No existe</span>
                                <p>Precio: $00.00</p>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById('producto').innerHTML = content;
                        } else {
                            //Compramos la calidad para colocarle las estrellas
                            if (row.calidad <= 1 && row.calidad > 0) {
                                //Para 0.5
                                if (row.calidad < 1) {
                                    content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star_half</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById('producto').innerHTML = content;
                                } else {
                                    //Para 1
                                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                                    content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById('producto').innerHTML = content;
                                }
                                //Para 1.5
                            } else if (row.calidad <= 2 && row.calidad > 1) {
                                if (row.calidad < 2 && row.calidad > 1) {
                                    content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_half</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById('producto').innerHTML = content;
                                } else {
                                    //Para 2
                                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                                    content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById('producto').innerHTML = content;
                                }


                            } else if (row.calidad <= 3 && row.calidad > 2) {
                                //Para 2.5
                                if (row.calidad < 3 && row.calidad > 2) {
                                    content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star_half</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById('producto').innerHTML = content;
                                } else {
                                    //Para 3
                                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                                    content += `
                             <div class="col s12 m6 l6" id="col">
                             <a href="${url}">
                             <div class="card medium">
                             <div class="card-image waves-effect waves-block waves-light">
                                 <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                             </div>
                             <div class="card-content"  id="calidad_calidad">
                                 <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                 <p>Precio: ${row.precio_producto}</p>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star_border</i>
                                 <i class="material-icons">star_border</i>
                             </div>
                         </div>
                     </a>
                 </div>
                     `
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById('producto').innerHTML = content;
                                }

                            } else if (row.calidad <= 4 && row.calidad > 3) {
                                //Para 3.5
                                if (row.calidad < 4 && row.calidad > 3) {
                                    content += `
                                <div class="col s12 m6 l6" id="col">
                                <a href="${url}">
                                <div class="card medium">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                                </div>
                                <div class="card-content"  id="calidad_calidad">
                                    <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                    <p>Precio: ${row.precio_producto}</p>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star_half</i>
                                    <i class="material-icons">star_border</i>
                                </div>
                            </div>
                        </a>
                    </div>
                        `
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById('producto').innerHTML = content;
                                } else {
                                    //Para 4
                                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                                    content += `
                             <div class="col s12 m6 l6" id="col">
                             <a href="${url}">
                             <div class="card medium">
                             <div class="card-image waves-effect waves-block waves-light">
                                 <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                             </div>
                             <div class="card-content"  id="calidad_calidad">
                                 <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                 <p>Precio: ${row.precio_producto}</p>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star</i>
                                 <i class="material-icons">star_border</i>
                             </div>
                         </div>
                     </a>
                 </div>
                     `
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById('producto').innerHTML = content;
                                }

                            } else if (row.calidad <= 5 && row.calidad > 4) {

                                //Para 4.5
                                if (row.calidad < 5 && row.calidad > 4) {
                                    content += `
                                <div class="col s12 m6 l6" id="col">
                                <a href="${url}">
                                <div class="card medium">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                                </div>
                                <div class="card-content"  id="calidad_calidad">
                                    <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                    <p>Precio: ${row.precio_producto}</p>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star_half</i>
                                </div>
                            </div>
                        </a>
                    </div>
                        `
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById('producto').innerHTML = content;
                                } else {
                                    // Se crean y concatenan las tarjetas con los datos de cada producto.
                                    content += `
                              <div class="col s12 m6 l6" id="col">
                              <a href="${url}">
                              <div class="card medium">
                              <div class="card-image waves-effect waves-block waves-light">
                                  <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                              </div>
                              <div class="card-content"  id="calidad_calidad">
                                  <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                  <p>Precio: ${row.precio_producto}</p>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                                  <i class="material-icons">star</i>
                              </div>
                          </div>
                      </a>
                  </div>
                      `
                                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                    document.getElementById('producto').innerHTML = content;
                                }

                            } else if (row.calidad == null) {
                                content += `
                            <div class="col s12 m6 l6" id="col">
                           <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <p>No hay calificación para este producto</p>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            }
                            else {
                                content += `
                            <div class="col s12 m6 l6" id="col">
                           <a href="${url}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <p>No hay calificación para este producto</p>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto').innerHTML = content;
                            }

                        }

                    });

                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                    document.getElementById('producto').innerHTML = content;
                    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
                    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
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

// Función para obtener y mostrar la calidad de los productos.
function readCaliProducto(id, categoria) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id_categoria_producto', id);
    // Petición para solicitar la calidad de la categoría seleccionada.
    fetch(API_CATEGORIA + 'readProductosCategoria', {
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
                    // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                    response.dataset.map(function (row) {
                        if (row.id_producto == 19) {
                            // Se crean y concatenan las tarjetas con los datos de cada producto.
                            content += `
                            <div class="col s12 m6 l6" id="col">
                            <a href="prod_individual.html?id=${row.id_producto}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                            </div>
                        </div>
                    </a>
                </div>
            
                            

                    `
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById('producto').innerHTML = content;
                        }
                        else {
                            content += `
                            <div class="col s12 m6 l6" id="col">
                           <a href="prod_individual.html?id=${row.id_producto}">
                            <div class="card medium">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="responsive-img" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                            </div>
                            <div class="card-content"  id="calidad_calidad">
                                <span class="card-title grey-text text-darken-4">${row.nombre_producto}</span>
                                <p>Precio: ${row.precio_producto}</p>
                                <i class="material-icons">star</i>
                                <i class="material-icons">star</i>
                            </div>
                        </div>
                    </a>
                </div>
            
                            
                    `
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById('producto').innerHTML = content;
                        }
                    });
                    // Se asigna como título la categoría de los productos.
                    document.getElementById('title').textContent = 'Categoría: ' + categoria;
                    M.Materialbox.init(document.querySelectorAll('.materialboxed'));
                    // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
                    M.Tooltip.init(document.querySelectorAll('.tooltipped'));
                } else {
                    sweetAlert(2, request.status + ' ' + request.statusText, null);
                    // Se presenta un mensaje de error cuando no existen datos para mostrar.
                    document.getElementById('ku').innerHTML = `<i class="material-icons small">cloud_off</i><span class="red-text">${response.exception}</span>`;
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });


}
document.getElementById('search-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    searchRowsProductos(API_PRODUCTO, 'search-form');
});

//Función para leer info
function readInfo() {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    fetch(API + 'fillInputs', {
        method: 'get'
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se revisa si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
                if (response.session) {
                    // Se comprueba si la respuesta es satisfactoria, de lo contrario se direcciona a la página web principal.
                    if (response.status) {
                        const header = `
                                <li>
                                <div class="user-view">
                                    <div class="background">
                                        <img src="../../recursos/img/imagenes/fondo.png">
                                    </div>
                                    <a><img class="circle" src="${SERVER}imagenes/clientes/${response.dataset.imagen_perfil_cliente}"></a>
                                    <a><span class="white-text name">${response.dataset.usuario_cliente}</span></a>
                                    <a><span class="white-text email">${response.dataset.correo_cliente}</span></a>
                                </div>
                            </li>
                            <li><a href="productos.html" class="waves-effect waves-red btn-danger">Productos</a>
                            </li>
                            <li><a href="categorias.html" class="waves-effect waves-red btn-danger">Catergorías</a>
                            </li>
                            <li><a href="soporte.html" class="waves-effect waves-red btn-danger">Soporte</a></li>
                            <li><a href="quienes_somos.html" class="waves-effect waves-red btn-danger">¿Quiénes
                                    somos?</a></li>
                            <div class="divider"></div>
                            </li>
                            <li><a href="../publico/mis_pedidos.html">Mis pedidos</a></li>
                            <li><a onClick="logOut()" class="waves-effect waves-red btn-danger">Log out</a></li>
                            </div>
                               `;

                        document.getElementById('slide-out').innerHTML = header;

                        const dropdown = `
                          <li><a href="../publico/perfil.html">Editar perfil</a></li>
                          <li><a href="../publico/mis_pedidos.html">Mis pedidos</a></li>
                          <li><a onClick="logOut()">Cerrar Sesión</a></li>
                                `;

                        document.getElementById('dropdown').innerHTML = dropdown;

                        const nav = `
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a class="waves-effect waves-red btn-danger" id="boton1">$${response.dataset.total}<img
                                    src="../../recursos/img/icono/shopping_cart_25px.png"></a></li>
                        <li>
                            <a class="waves-effect waves-red btn-danger dropdown-trigger"
                                data-target="dropdown"><img src="../../recursos/img/icono/user_35px.png"></a>
                        </li>
                    </ul>
                                      `;

                        document.getElementById('perfil_espacio').innerHTML = nav;

                        //Opciones del dropdwon-trigger
                        let options = {
                            alignment: 'right'

                        }
                        // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
                        M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), options);
                        // Se inicializa el componente Sidenav para que funcione la navegación lateral.
                        M.Sidenav.init(document.querySelectorAll('.sidenav'));
                    } else {
                        sweetAlert(3, response.exception, 'index.html');
                    }
                } else {
                    readInfoSinLogueado();
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

//Función de si no se ha logueado
function readInfoSinLogueado() {
    const header = `
            <li>
            <div class="user-view">
                <div class="background">
                 <img src="../../recursos/img/imagenes/fondo.png">
            </div>
        <a href="../publico/login.html"><span class="white-text">Log in</span></a>
            </div>
        </li>
        <li><a href="productos.html" class="waves-effect waves-red btn-danger">Productos</a>
        </li>
        <li><a href="categorias.html" class="waves-effect waves-red btn-danger">Catergorías</a>
        </li>
        <li><a href="soporte.html" class="waves-effect waves-red btn-danger">Soporte</a></li>
        <li><a href="quienes_somos.html" class="waves-effect waves-red btn-danger">¿Quiénes
                somos?</a></li>
        <div class="divider"></div>
        </li>
        <li><a href="../publico/mis_pedidos.html">Mis pedidos</a></li>
        <li><a href="login.html" class="waves-effect waves-red btn-danger">Log in</a></li>
        </div>
        `;

    document.getElementById('slide-out').innerHTML = header;

    const dropdown = `
                          <li><a href="../publico/perfil.html">Editar perfil</a></li>
                          <li><a href="../publico/mis_pedidos.html">Mis pedidos</a></li>
                          <li><a onClick="logOut()">Cerrar Sesión</a></li>
`;

    document.getElementById('dropdown').innerHTML = dropdown;

    const nav = `
    <ul id="nav-mobile" class="right hide-on-med-and-down">
    <li><a class="waves-effect waves-red btn-danger " id="boton2"
            href="../publico/login.html">LOG IN</a></li>
    <li>
        <a class="waves-effect waves-red btn-danger dropdown-trigger"
            data-target="dropdown"><img src="../../recursos/img/icono/user_35px.png"></a>
    </li>
</ul>
                  `;

    document.getElementById('perfil_espacio').innerHTML = nav;

    //Opciones del dropdwon-trigger
    let options = {
        alignment: 'right'

    }
    // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), options);
    // Se inicializa el componente Sidenav para que funcione la navegación lateral.
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
}

