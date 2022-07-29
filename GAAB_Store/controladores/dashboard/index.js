const API_USUARIOS = SERVER + "dashboard/usuarios.php?action=";

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", function () {
  //se hace la petición para verificar primer usuario por medio del metodo get.
  fetch(API_USUARIOS + "readUsers", {
    method: "get",
  }).then(function (request) {
    if (request.ok) {
      request.json().then(function (response) {
        if (response.session) {
          location.href = "main.html";
        } else if (response.status) {
          sweetAlert(4, "Debe autenticarse para ingresar", null);
        } else {
          sweetAlert(3, response.exception, "registrarse.html");
        }
      });
    } else {
      console.log(request.status + " " + request.statusText);
    }
  });
  M.Tooltip.init(document.querySelectorAll(".tooltipped"));
  // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
  M.updateTextFields();
});

// Método manejador de eventos que se ejecuta cuando se envía el formulario de iniciar sesión.
document
  .getElementById("login-privado")
  .addEventListener("submit", function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para revisar si el administrador se encuentra registrado.
    fetch(API_USUARIOS + "logIn", {
      method: "post",
      body: new FormData(document.getElementById("login-privado")),
    }).then(function (request) {
      // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
      if (request.ok) {
        request.json().then(function (response) {
          // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
          if (response.status) {
            sweetAlert(1, response.message, "main.html");
          } else {
            sweetAlert(2, response.exception, null);
          }
        });
      } else {
        console.log(request.status + " " + request.statusText);
      }
    });
  });
