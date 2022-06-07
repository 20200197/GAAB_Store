const API_CLIENTE = SERVER + 'publico/cliente.php?action='

document.addEventListener('DOMContentLoaded', function() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    M.Slider.init(document.querySelectorAll('.slider'));
    M.Carousel.init(document.querySelectorAll('.carousel'));
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    var elems = document.querySelectorAll('.dropdown-trigger');
    let options={
      alignment:'left'
    
    };
    var instances = M.Dropdown.init(elems,options);
    
    fetch(API_CLIENTE + 'getUser', {
        method: 'get',
    }).then(function(request){
        if(request.ok){
            request.json().then(function(response){
                if(response.status){
                    sweetAlert(1, response.username + "  " + response.id_cliente);
                }
            })
        }else{
            console.log(request.status + ' ' + request.statusText);
        }
    })
  
  });

  document.getElementById('login').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Petición para revisar si el administrador se encuentra registrado.
    fetch(API_CLIENTE + 'logIn', {
        method: 'post',
        body: new FormData(document.getElementById('login'))
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    sweetAlert(1, response.message, 'index.html');
                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
});