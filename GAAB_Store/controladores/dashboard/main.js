// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_MAIN = SERVER + "dashboard/main.php?action=";
const API_PRODUCTOS = SERVER + "dashboard/producto.php?action="

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", function () {
  // Se define una variable para establecer las opciones del componente Modal.
  let options = {
    dismissible: false,
  };
  // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
  M.Modal.init(document.querySelectorAll(".modal"), options);

  cargarGraficaValoraciones();
  cargarPieCategoriaPorcentaje();
  cargarVentasMes();
  graficoBarrasProductos();
  graficoDonasProductosMejores();
});

/** Función para cargar grafico con el promedio de calificaciones de los productos del mes actual **/
function cargarGraficaValoraciones() {
  fetch(API_PRODUCTOS + 'getValoration', {
    method: 'get'
  }).then(function (request) {
    if (request.ok) {
      request.json().then(function (response) {
        if (response.status) {
          let producto = [];
          let valoracion = [];
          response.dataset.map(function (row) {
            producto.push(row.nombre_producto);
            valoracion.push(row.promedio);
          });

          barGraph('chart1', producto, valoracion, 'Calidad', 'Promedio de calificaciones de productos del mes actual');
        } else {
          document.getElementById('grafica1').innerHTML = '<h5>No hay valoraciones disponibles correspondientes al mes actual aún</h5>';
        }
      });
    } else {
      console.log(request.status + ' ' + request.statusText);
    }
  });
}

/**Función donde muestra el porcentaje de ventas por categoria del mes actual**/
function cargarPieCategoriaPorcentaje() {
  fetch(API_PRODUCTOS + 'getPorcentajeCategoria', {
    method: 'get'
  }).then(function (request) {
    if (request.ok) {
      request.json().then(function (response) {
        if (response.status) {
          let categoria = [];
          let porcentaje = [];
          response.dataset.map(function (row) {
            categoria.push(row.nombre_categoria);
            porcentaje.push(row.porcentaje);
          });

          pieGraph('chart2', categoria, porcentaje, 'Porcentaje de ventas por categoría');
        } else {
          document.getElementById('grafica2').innerHTML = '<h5>No hay ventas correspondientes al mes actual aún</h5>';
        }
      });
    } else {
      console.log(request.status + ' ' + request.statusText);
    }
  });
}

/** Cantidad de ventas por cada mes  **/
function cargarVentasMes() {
  fetch(API_PRODUCTOS + 'getVentasMes', {
    method: 'get'
  }).then(function (request) {
    if (request.ok) {
      request.json().then(function (response) {
        if (response.status) {
          let ventas = [];
          let nombres = [];

          response.dataset.map(function (row) {
            ventas.push(row.total);
            switch (row.mes) {
              case '1':
                nombres.push('Enero');
                break;
              case '2':
                nombres.push('Febrero');
                break;
              case '3':
                nombres.push('Marzo');
                break;
              case '4':
                nombres.push('Abril');
                break;
              case '5':
                nombres.push('Mayo');
                break;
              case '6':
                nombres.push('Junio');
                break;
              case '7':
                nombres.push('Julio');
                break;
              case '8':
                nombres.push('Agosto');
                break;
              case '9':
                nombres.push('Septiembre');
                break;
              case '10':
                nombres.push('Octubre');
                break;
              case '11':
                nombres.push('Noviembre');
                break;
              case '12':
                nombres.push('Diciembre');
                break;
              default:
                break;
            }
          });
          barGraph('chart3', nombres, ventas, 'Ventas', 'Ventas por mes');
        } else {

        }
      });
    } else {
      console.log(request.status + ' ' + request.statusText);
    }
  });
}

// Función para mostrar la el top 10 de productos más vendidos durante los meses que han pasado.
function graficoBarrasProductos() {
  // Petición para obtener los datos del gráfico.
  fetch(API_PRODUCTOS + 'cantidadProductosPorMes', {
    method: 'get'
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
        if (response.status) {
          // Se declaran los arreglos para guardar los datos a graficar.
          let productos = [];
          let porcentajes = [];
          // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
          response.dataset.map(function (row) {
            // Se agregan los datos a los arreglos.
            productos.push(row.fecha);//Aqui incluye la fecha con el nombre de producto
            porcentajes.push(row.cantidad_vendida);
          });
          // Se llama a la función que genera y muestra un gráfico de barras. Se encuentra en el archivo components.js
          barGraph('chart4', productos, porcentajes, 'Cantidad de productos', 'Top 10 prodcutos más vendidos en los últumos meses');
        } else {
          document.getElementById('graficas4').innerHTML = '<h5>No han habido ventas en los últimos meses </h5>';
        }
      });
    } else {
      console.log(request.status + ' ' + request.statusText);
    }
  });
}

/** Los productos con mejores valoraciones **/
function graficoDonasProductosMejores() {
  // Petición para obtener los datos del gráfico.
  fetch(API_PRODUCTOS + 'productosMejores', {
      method: 'get'
  }).then(function (request) {
      // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
      if (request.ok) {
          request.json().then(function (response) {
              // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
              if (response.status) {
                  // Se declaran los arreglos para guardar los datos a graficar.
                  let productos = [];
                  let canti_cali = [];
                  // Se recorre el conjunto de registros devuelto por la API (dataset) fila por fila a través del objeto row.
                  response.dataset.map(function (row) {
                      // Se agregan los datos a los arreglos.
                      productos.push(row.nombre_producto);
                      canti_cali.push(row.calidad_productos);
                  });
                  // Se llama a la función que genera y muestra un gráfico de barras. Se encuentra en el archivo components.js
                  doughnutGraph('chart5', productos, canti_cali, 'Calidad de producto', 'Top 10 de productos con mejores valoraciones');
              } else {
                  document.getElementById('chart5').remove();
                  console.log(response.exception);
              }
          });
      } else {
          console.log(request.status + ' ' + request.statusText);
      }
  });
}

