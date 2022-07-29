/*
 *   Controlador de uso general en las páginas web del sitio privado cuando se ha iniciado sesión.
 *   Sirve para manejar las plantillas del encabezado y pie del documento.
 */

// Constante para establecer la ruta y parámetros de comunicación con la API.
const API = SERVER + "dashboard/usuarios.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", function () {
  // Petición para obtener en nombre del usuario que ha iniciado sesión.
  fetch(API + "readProfile", {
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
                        <nav class="nav-extended" id="encabezado">
                            <div class="row" id="otro">
                                <div class="col s12 m1 " id="nave">
                                    <div class="nav-wrapper">
                                        <a href="main.html" class="brand-logo"><img
                                                src="${SERVER}imagenes/logo_gaab_white_png.png" height="50"></a>
                                        <a href="#" data-target="slide-out" class="sidenav-trigger hide-on-med-and-up"><img
                                                src="../../recursos/img/icono/menu_25px.png"></a>
                                    </div>
                                </div>
                                <div class="col s2 m4 l3"></div>
                                <div class="col s12 m4 " id="buscador_espacio">
                                </div>
                                <div class="col s4 m4 " id="todo">
                                    <div class="col s2 m6"></div>
                                    <div class="col s1 m6 l8" id="botones">
                                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                                            <li><a class="waves-effect waves-red btn-danger dropdown-trigger" data-target="dropdown"
                                                    id="boton3"><img src="../../recursos/img/icono/user_35px.png"></a></li>
                                    </div>
                                    </ul>
                                </div>
                            </div>
                            <div class=" hide-on-med-and-down" id="menus">
                                <div class="nav-content">
                                    <ul class="tabs tabs-transparent">
                                        <li class="tab" id="tabla1"><a href="main.html">Inicio</a></li>
                                        <li class="tab" id="tabla2"><a href="administrar_empleado.html">Administrar
                                                empleados</a></li>
                                        <li class="tab" id="tabla3"><a href="administrar_cliente.html">Administrar
                                                clientes</a></li>
                                        <li class="tab" id="tabla4"><a href="administrar_categoria.html">Administrar
                                                categoria</a></li>
                                        <li class="tab" id="tabla5"><a href="tipo_auto.html">Administrar tipo de
                                                auto</a></li>
                                        <li class="tab" id="tabla6"><a href="tipo_usuario.html">Tipo de usuario</a>
                                        </li>
                                        <li class="tab" id="tabla7"><a href="administrar_producto.html">Administrar
                                                productos</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <ul id="slide-out" class="sidenav">
                            <li>
                                <div class="user-view">
                                    <div class="background">
                                        <img src="../../recursos/img/imagenes/fondo.png">
                                    </div>
                                    <a href="#user"><img class="circle" src="${SERVER}imagenes/usuarios/${response.dataset.imagen_perfil_empleado}" id="image_image"></a>
                                    <a href="#name"><span class="white-text name" >${response.dataset.usuario_empleado}</span></a>
                                    <a href="#email"><span class="white-text email" >${response.dataset.correo_empleado}</span></a>
                                </div>
                            </li>
                            <li><a href="administrar_empleado.html" class="waves-effect waves-red btn-danger">Administrar
                                    empleados</a></li>
                            <li><a href="administrar_cliente.html" class="waves-effect waves-red btn-danger">Administrar
                                    clientes</a></li>
                            <li><a href="administrar_categoria.html" class="waves-effect waves-red btn-danger">Adminitrar
                                    categoria</a></li>
                            <li><a href="tipo_auto.html" class="waves-effect waves-red btn-danger">Administrar tipo de
                                    auto</a></li>
                            <li><a href="tipo_usuario.html" class="waves-effect waves-red btn-danger">Tipo de
                                    usuario</a></li>
                            <li><a href="administrar_producto.html" class="waves-effect waves-red btn-danger">Administrar
                                    productos</a></li>
                            <li>
                                <div class="divider"></div>
                            <li><a onclick="logOut()" class="waves-effect waves-red btn-danger">Cerrar Sesión</a></li>
                            </li>
                
                        </ul>
                        </div>
                        <ul id='dropdown' class='dropdown-content'>
                            <li><a href="perfil.html">Editar perfil</a></li>
                            <li><a onclick="logOut()">Cerrar Sesión</a></li>
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
          location.href = "index.html";
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
});

// Función para abrir el modal de cerrarCesion
function openLog() {
  // Se abre la caja de diálogo (modal) que contiene el formulario.
  M.Modal.getInstance(document.getElementById("log-modal")).open();
  document
    .getElementById("imagen_estado")
    .setAttribute("src", "../../recursos/img/imagenes/log.png");
  document.getElementById("titulo_im").textContent = "Cerrar Sesión";
  document.getElementById("texto_im").textContent =
    "¿Esta seguro de cerrar sesión?";
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document
  .getElementById("log-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica si fue cliqueado el botón Sí para hacer la petición de cerrar sesión, de lo contrario se muestra un mensaje.
    fetch(API + "logOut", {
      method: "get",
    }).then(function (request) {
      // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
      if (request.ok) {
        // Se obtiene la respuesta en formato JSON.
        request.json().then(function (response) {
          // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
          if (response.status) {
            sweetAlert(1, response.message, "index.html");
          } else {
            sweetAlert(2, response.exception, null);
          }
        });
      } else {
        console.log(request.status + " " + request.statusText);
      }
    });
  });
