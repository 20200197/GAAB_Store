API_CARRITO = SERVER + "publico/mis_pedidos.php?action=";
const API = SERVER + "publico/cliente.php?action=";

document.addEventListener("DOMContentLoaded", function () {
  M.Sidenav.init(document.querySelectorAll(".sidenav"));
  M.Slider.init(document.querySelectorAll(".slider"));
  M.Carousel.init(document.querySelectorAll(".carousel"));
  M.FormSelect.init(document.querySelectorAll("select"));
  M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"));
  let options = {
    endingTop: "20%",
    dismissible: false,
    onOpenStart: function () {
      document.getElementById("direccion-form").reset();
    },
  };
  M.Modal.init(document.querySelectorAll(".modal"), options);

  //Leemos la info de cliente
  readInfo();

  fetch(API_CARRITO + "loadCart", {
    method: "get",
  }).then(function (request) {
    if (request.ok) {
      request.json().then(function (response) {
        if (response.status) {
          let content = "";
          let id = "";
          response.dataset.map(function (row) {
            content += `<div class="row">
                          <!--Detalles de producto-->
                          <div class="col s12 m2 l2">
                              <img id="imagen_produc" src="${SERVER}imagenes/productos/${row.imagen_producto}">
                          </div>
                          <div class="col s12 m10">
                              <div class="row">
                                  <div class="col s12 m10 l10">
                                      <h5>${row.nombre_producto}</h5>
                                  </div>
                                  <div class="col s4 m1 l1">
                                        <button class="eliminar" type="submit" onclick="openDelete(${row.id_producto})">Eliminar</button>
                                  </div>
                              </div>
                              <div class="row">
                                  <div class="col s12 m9 l9">
                                      <div class="col s12 m4 l4">
                                          <p>Precio: $${row.precio_unitario}</p>
                                      </div>
                                      <div class="col s12 m4 l4">
                                          <p>Cantidad: ${row.cantidad_producto}</p>
                                      </div>
                                      <div class="col s12 m4 l4">
                                          <p>Subtotal: $${row.subtotal}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>`;

            id += row.id_producto + " ";
          });
          document.getElementById("ids1").value = id;
          document.getElementById("total").innerHTML =
            "Total: $" + response.total.suma;
          document.getElementById("carrito").innerHTML = content;
        } else {
          //Evaluamos hacia adonde se redirigira si hay error
          // if (response.exception == 'Acción no disponible fuera de la sesión') {
          //     sweetAlert(3, response.exception, 'login.html');
          // } else if(response.exception=='No tiene productos en el carrito') {
          //     sweetAlert(3, response.exception, null);
          // }else{
          //     sweetAlert(3, response.exception,null);
          // }
          if (response.session) {
            sweetAlert(3, response.exception, "productos.html");
          } else {
            sweetAlert(3, response.exception, "login.html");
          }
        }
      });
    }
  });
});

//Fnción para abrir el modal de direccción
function openDirection() {
  M.Modal.getInstance(document.getElementById("modal-direccion")).open();
  document.getElementById("ids").value = document.getElementById("ids1").value;
}

//Enviamos dirección para agregar a factura
document
  .getElementById("direccion-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    fetch(API_CARRITO + "finishOrder", {
      method: "post",
      body: new FormData(document.getElementById("direccion-form")),
    }).then(function (request) {
      if (request.ok) {
        request.json().then(function (response) {
          if (response.status) {
            sweetAlert(1, response.message, "mis_pedidos.html");
            M.Modal.getInstance(
              document.getElementById("modal-direccion")
            ).close();
          } else {
            sweetAlert(2, response.exception, null);
          }
        });
      }
    });
  });

//Enviamos datos para eliminar
document
  .getElementById("delete-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    fetch(API_CARRITO + "deleteRow", {
      method: "post",
      body: new FormData(document.getElementById("delete-form")),
    }).then(function (request) {
      if (request.ok) {
        request.json().then(function (response) {
          if (response.status) {
            sweetAlert(1, response.message, "carrito.html");
            M.modal
              .getInstance(document.getElementById("delete-modal"))
              .close();
          } else {
            sweetAlert(2, response.exception, null);
          }
        });
      }
    });
  });

//Función para abrir el form de eliminar
function openDelete(id) {
  M.Modal.getInstance(document.getElementById("delete-modal")).open();
  document.getElementById("id_producto").value = id;
}

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
          readInfoSinLogueado();
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
}

//Función de si no se ha logueado
function readInfoSinLogueado() {
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
                                  <li><a class="waves-effect waves-red btn-danger " id="boton2"
                                          href="../publico/login.html">LOG IN</a></li>
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
                          <li><a href="../publico/login.html" class="waves-effect waves-red btn-danger">Log in</a></li>
                      </ul>
                      </div>
                      `;
  document.querySelector("header").innerHTML = header;
  //Opciones del dropdwon-trigger
  let options = {
    alignment: "right",
  };
  // Se inicializa el componente Sidenav para que funcione la navegación lateral.
  M.Sidenav.init(document.querySelectorAll(".sidenav"));
}
