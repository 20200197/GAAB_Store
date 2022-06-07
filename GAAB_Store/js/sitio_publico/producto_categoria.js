// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_CATEGORIA = SERVER + 'publico/categoria.php?action=';
const API_PRODUCTO = SERVER + 'publico/producto.php?action=';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se busca en la URL las variables (parámetros) disponibles.
    let params = new URLSearchParams(location.search);
    // Se obtienen los datos localizados por medio de las variables.
    const ID = params.get('id_categoria');
    const NAME = params.get('nombre');
    // Se llama a la función que muestra los productos de la categoría seleccionada previamente.
    readProductosCategoria(ID, NAME);
    //   readCaliProducto(19,NAME);
});


// Función para obtener y mostrar los productos de acuerdo a la categoría seleccionada.
function readProductosCategoria(id, categoria) {
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
                        //Compramos la calidad para colocarle las estrellas
                        if (row.calidad <= 1 && row.calidad > 0) {
                            //Para 0.5
                            if (row.calidad < 1) {
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
                                document.getElementById('producto_categoria').innerHTML = content;
                            } else {
                                //Para 1
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
                                document.getElementById('producto_categoria').innerHTML = content;
                            }
                            //Para 1.5
                        } else if (row.calidad <= 2 && row.calidad > 1) {
                            if (row.calidad < 2 && row.calidad > 1) {
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
                                document.getElementById('producto_categoria').innerHTML = content;
                            } else {
                                //Para 2
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
                                document.getElementById('producto_categoria').innerHTML = content;
                            }


                        } else if (row.calidad <= 3 && row.calidad > 2) {
                            //Para 2.5
                            if (row.calidad < 3 && row.calidad > 2) {
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
                                <i class="material-icons">star_half</i>
                                <i class="material-icons">star_border</i>
                                <i class="material-icons">star_border</i>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto_categoria').innerHTML = content;
                            } else {
                                //Para 3
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
                                document.getElementById('producto_categoria').innerHTML = content;
                            }

                        } else if (row.calidad <= 4 && row.calidad > 3) {
                            //Para 3.5
                            if (row.calidad < 4 && row.calidad > 3) {
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
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star_half</i>
                                    <i class="material-icons">star_border</i>
                                </div>
                            </div>
                        </a>
                    </div>
                        `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto_categoria').innerHTML = content;
                            } else {
                                //Para 4
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
                                document.getElementById('producto_categoria').innerHTML = content;
                            }

                        } else if (row.calidad <= 5 && row.calidad > 4) {

                            //Para 4.5
                            if (row.calidad < 5 && row.calidad > 4) {
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
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star</i>
                                    <i class="material-icons">star_half</i>
                                </div>
                            </div>
                        </a>
                    </div>
                        `
                                // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                                document.getElementById('producto_categoria').innerHTML = content;
                            } else {
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
                                document.getElementById('producto_categoria').innerHTML = content;
                            }

                        } else if (row.calidad == null) {
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
                                <p>No hay calificación para este producto</p>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById('producto_categoria').innerHTML = content;
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
                                <p>No hay calificación para este producto</p>
                            </div>
                        </div>
                    </a>
                </div>
                    `
                            // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                            document.getElementById('producto_categoria').innerHTML = content;
                        }

                    });

                    // Se asigna como título la categoría de los productos.
                    document.getElementById('title').textContent = 'Categoría: ' + categoria;
                    // Se agregan las tarjetas a la etiqueta div mediante su id para mostrar los productos.
                    document.getElementById('producto_categoria').innerHTML = content;
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
                            document.getElementById('producto_categoria').innerHTML = content;
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
                            document.getElementById('producto_categoria').innerHTML = content;
                        }
                    });
                    // Se asigna como título la categoría de los productos.
                    document.getElementById('title').textContent = 'Categoría: ' + categoria;
                    // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
                    document.getElementById('ku').textContent = 'ku';
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