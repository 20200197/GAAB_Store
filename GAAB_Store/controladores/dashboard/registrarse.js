// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_USUARIOS = SERVER + "dashboard/usuarios.php?action=";
const ENDPOINT_TIPO_EMPLEADO =
  SERVER + "dashboard/tipo_empleado.php?action=readAll";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", function () {
  fetch(API_USUARIOS + "readUsers", {
    method: "get",
  }).then(function (request) {
    //  Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
    if (request.ok) {
      request.json().then(function (response) {
        // Se comprueba si existe una sesión, de lo contrario se revisa si la respuesta es satisfactoria.
        if (response.session) {
          location.href = "main.html";
        } else if (response.status) {
          sweetAlert(3, response.message, "index.html");
        } else {
          sweetAlert(4, "Debe crear un usuario para comenzar", null);
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
  // Se inicializa el componente Tooltip para que funcionen las sugerencias textuales.
  M.Tooltip.init(document.querySelectorAll(".tooltipped"));
  // Se establece el campo de archivo como obligatorio.
  document.getElementById("archivo").required = true;
  openTipo_empleado();
  //Colocamos el estado como true por defecto
  document.getElementById("estado_ep").value = true;
  // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
  M.updateTextFields();
});

// Método manejador de eventos que se ejecuta cuando se envía el formulario de registrar.
document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para registrar el primer usuario del sitio privado.
    fetch(API_USUARIOS + "register", {
      method: "post",
      body: new FormData(document.getElementById("register-form")),
    }).then(function (request) {
      // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
      if (request.ok) {
        request.json().then(function (response) {
          // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
          if (response.status) {
            sweetAlert(1, response.message, "index.html");
            // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
            M.updateTextFields();
          } else {
            sweetAlert(2, response.exception, null);
          }
        });
      } else {
        console.log(request.status + " " + request.statusText);
      }
    });
  });

//Colocación de guión automaticamente
document
  .getElementById("dui_empleado")
  .addEventListener("input", function (evt) {
    let value = this.value.replace("-", "");
    //comienzo de linea  Digito numerico   Final de linea
    if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, "$1$2$3-$4");
    }
    this.value = value;
  });

//Funcion para cargar los tipos
function openTipo_empleado() {
  // Se llama a la función que llena el select del formulario. Se encuentra en el archivo components.js
  fillSelect(ENDPOINT_TIPO_EMPLEADO, "id_tipo_empleado", null);
}
