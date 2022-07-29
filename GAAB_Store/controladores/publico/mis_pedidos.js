// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_MIS_PEDIDOS = SERVER + "publico/mis_pedidos.php?action=";
const API = SERVER + "publico/cliente.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", function () {
  // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
  readRowsMisPedidos(API_MIS_PEDIDOS);
  // Se define una variable para establecer las opciones del componente Modal.
  let options = {
    endingTop: "20%",
    dismissible: false,
    onOpenStart: function () {
      // Se restauran los elementos del formulario.
      document.getElementById("comentar-form").reset();
    },
  };
  readInfo();
  // Se inicializa el componente Modal para que funcionen las cajas de diálogo.
  M.Modal.init(document.querySelectorAll(".modal"), options);
  //Valor de radio si no se califica productos
  document.getElementById("radio0").value = null;
});

// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
  let content = "";
  // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
  dataset.map(function (row) {
    // Se crean y concatenan las filas de la tabla con los datos de cada registro.
    content += `
            <tr>
            <td>$${row.total}</td>
             <td>${row.id_factura}</td>
             <td>${row.direccion}</td>
             <td>${row.fecha}</td>
             <td><a onClick="openDetalle(${row.id_factura})"><img src="../../recursos/img/imagenes/file_35px.png"></td></a>
             <td><a onClick="openReport(${row.id_factura})"><i class="material-icons black-text iconos">print</i></td></a>
            </tr>
        `;
  });
  // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
  document.getElementById("tbody-misPedidos").innerHTML = content;
  // Se inicializa el componente Material Box para que funcione el efecto Lightbox.
  M.Materialbox.init(document.querySelectorAll(".materialboxed"));
  // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
  M.Tooltip.init(document.querySelectorAll(".tooltipped"));
}

function openReport(id){
  let params = '?id=' + id;
  let url = SERVER + 'reportes/publico/factura.php';

  window.open(url + params);
}


// Función para preparar el formulario al momento de abrir las compras.
function openDetalle(id) {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById("detalle-modal")).open();
  // Se define un objeto con los datos del registro seleccionado.
  const data = new FormData();
  data.append("idfactura", id);
  // Petición para obtener los datos del registro solicitado.
  fetch(API_MIS_PEDIDOS + "readDetalle", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          let content = "";
          // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
          response.dataset.map(function (row) {
            var estado_factura;
            var estado;
            if (
              row.estado_factura == "En_proceso" ||
              row.estado_factura == "En proceso"
            ) {
              row.estado_factura = "En_proceso";
              estado = row.estado_factura;
              estado_factura = "En proceso";
            } else {
              row.estado_factura = "Cancelado";
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
                                <td class="${estado}">${estado_factura}</td>
                                <td><a onClick="openComent(${row.id_factura},${row.id_producto})"><i class="material-icons">comment</i></td></a>
                            </tr>
                        `;
          });
          // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
          document.getElementById("tbody-detalle").innerHTML = content;
        } else {
          sweetAlert(2, response.exception, null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

//Función para abrir form de comentar
function openComent(id,id_prod) {
  //Abrimos el modal
  M.Modal.getInstance(document.getElementById("modal-comentar")).open();
  // Se define un objeto con los datos del registro seleccionado.
  const data = new FormData();
  data.append("idfactura", id);
  data.append("id_prod", id_prod);
  // Petición para obtener los datos del registro solicitado.
  fetch(API_MIS_PEDIDOS + "readIdFacturaComent", {
    method: "post",
    body: data,
  }).then(function (request) {
    // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      // Se obtiene la respuesta en formato JSON.
      request.json().then(function (response) {
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (response.status) {
          let content = "";
          // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
         
            document.getElementById("id_detalle_factura").value =
              response.dataset.id_detalle_factura;
              var nombre_producto = response.dataset.nombre_producto;
            content += `
                             <h6>Comentar para ${nombre_producto}</h6>
                        `;
       
          // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
          document.getElementById("row_produc").innerHTML = content;
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
  .getElementById("comentar-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
    saveRow(API_MIS_PEDIDOS, "createComent", "comentar-form", "modal-comentar");
    M.Modal.getInstance(document.getElementById("detalle-modal")).close();
  });
//Función para leer info
function readInfo() {
  // Petición para obtener en nombre del usuario que ha iniciado sesión.
  fetch(API + "fillInputs", {
    method: "get",
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
                      <!--Colocamos encabezado-->
                      <nav class="nav-extended" id="encabezado">
                          <div class="col s12 m12">
                              <div class="row">
                                  <div class="col s12 m3">
                                      <div class="nav-wrapper">
                                          <!--Insertamos logo de GAAB Store-->
                                          <a href="../../sitio_publico/index.html" class="brand-logo"><img
                                                  src="${SERVER}imagenes/logo_gaab_white_png.png" height="50"></a>
                                          <!--Insertamos navegador lateral-->
                                          <a href="#" data-target="slide-out" class="sidenav-trigger hide-on-med-and-up"><img
                                                  src="../../recursos/img/icono/menu_25px.png"></a>
                                      </div>
                                  </div>
                                  <div class="col  m1"></div>
                                  <div class="col s12 m4"></div>
                                  <div class="col s4 m4">
                                      <ul id="nav-mobile" class="right hide-on-med-and-down">
                                          <li><a class="waves-effect waves-red btn-danger" id="boton1"
                                                  href="carrito.html">$${response.total}<img
                                                      src="../../recursos/img/icono/shopping_cart_25px.png"></a></li>
      
                                          <li>
                                              <a class="waves-effect waves-red btn-danger dropdown-trigger"
                                                  data-target="dropdown"><img src="../../recursos/img/icono/user_35px.png"></a>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          <div class=" hide-on-med-and-down" id="menus">
                              <!--Insertamos un navegador de contenido con los menus visibles para publico-->
                              <div class="nav-content">
                                  <ul class="tabs tabs-transparent">
                                      <li class="tab" id="tabla"><a href="../publico/index.html">Inicio</a></li>
                                      <li class="tab" id="tabla"><a href="../publico/productos.html">Productos</a></li>
                                      <li class="tab" id="tabla"><a href="categorias.html" class="waves-effect waves-red btn-danger">Catergorías</a>
                                      </li>
                                      <li class="tab" id="tabla"><a href="categorias.html" class="waves-effect waves-red btn-danger">Catergorías</a>
                                      </li>
                                      <li class="tab" id="tabla"><a href="../publico/soporte.html">Soporte</a></li>
                                      <li class="tab" id="tabla"><a href="../publico/quienes_somos.html">¿Quiénes somos?</a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </nav>
                      <!--Insertamos las opciones del navegador lateral-->
                      <ul id="slide-out" class="sidenav">
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
                          <li><a class="waves-effect waves-red btn-danger" id="boton1" href="carrito.html">$${response.total}<img
                                      src="../../recursos/img/icono/shopping_cart_25px.png"></a></li>
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
                      </ul>
                      </div>
                      <!--Opciones de menú desplegable-->
                      <ul id='dropdown' class='dropdown-content'>
                          <li><a href="../publico/perfil.html">Editar perfil</a></li>
                          <li><a href="../publico/mis_pedidos.html">Mis pedidos</a></li>
                          <li><a onClick="logOut()">Cerrar Sesión</a></li>
                      </ul>
                      `;

            document.querySelector("header").innerHTML = header;
            //Opciones del dropdwon-trigger
            let options = {
              alignment: "right",
            };
            // Se inicializa el componente Dropdown para que funcione la lista desplegable en los menús.
            M.Dropdown.init(
              document.querySelectorAll(".dropdown-trigger"),
              options
            );
            // Se inicializa el componente Sidenav para que funcione la navegación lateral.
            M.Sidenav.init(document.querySelectorAll(".sidenav"));
          } else {
            sweetAlert(3, response.exception, "index.html");
          }
        } else {
          // sweetAlert(3, response.exception, 'login.html');
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

/** Funcion para abrir reporte **/
function openReportCompras(){
  let url = SERVER + 'reportes/publico/compras.php';
 
  window.open(url);
}
 