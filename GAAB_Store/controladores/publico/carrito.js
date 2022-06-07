API_CARRITO = SERVER + 'publico/mis_pedidos.php?action=';

document.addEventListener('DOMContentLoaded', function () {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  M.Slider.init(document.querySelectorAll('.slider'));
  M.Carousel.init(document.querySelectorAll('.carousel'));
  M.FormSelect.init(document.querySelectorAll('select'));
  M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
  let options = {
    endingTop: '20%',
    dismissible: false,
    onOpenStart: function(){
        document.getElementById('direccion-form').reset();
    }
}
  M.Modal.init(document.querySelectorAll('.modal'), options);

  fetch(API_CARRITO + 'loadCart', {
    method: 'get'
  }).then(function (request) {
    if (request.ok) {
      request.json().then(function (response) {
        if (response.status) {
          let content = '';
          let id = '';
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
                                          <p>Precio: ${row.precio_unitario}</p>
                                      </div>
                                      <div class="col s12 m4 l4">
                                          <p>Cantidad: ${row.cantidad_producto}</p>
                                      </div>
                                      <div class="col s12 m4 l4">
                                          <p>Subtotal: ${row.subtotal}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>`;

            id += row.id_producto + ' ';
          })
          document.getElementById('ids1').value = id;
          document.getElementById('total').innerHTML = 'Total: $' + response.total.suma;
          document.getElementById('carrito').innerHTML = content;
        }else{
            //añadido 07/06/22
            if(response.session){
                sweetAlert(3, response.exception, 'productos.html');
            }else{
                sweetAlert(3, response.exception, 'login.html');
            }
        }
      })
    }
  })
});

function openDirection(){
    M.Modal.getInstance(document.getElementById('modal-direccion')).open();
    document.getElementById('ids').value = document.getElementById('ids1').value;
}

document.getElementById('direccion-form').addEventListener('submit', function(event){
    event.preventDefault();

    fetch(API_CARRITO + 'finishOrder',{
            method: 'post',
            body: new FormData(document.getElementById('direccion-form'))
        }).then(function (request){
            if(request.ok){
                request.json().then(function (response){
                    if(response.status){
                        sweetAlert(1, response.message, 'carrito.html');
                        M.Modal.getInstance(document.getElementById('modal-direccion')).close();
                    }else{
                        sweetAlert(2, response.exception, null);
                    }
                })
            }
        })
})

document.getElementById('delete-form').addEventListener('submit', function(event){
    event.preventDefault();

    fetch(API_CARRITO + 'deleteRow',{
        method: 'post',
        body: new FormData(document.getElementById('delete-form'))
    }).then(function (request){
        if(request.ok){
            request.json().then(function (response){
                if(response.status){
                    sweetAlert(1, response.message, 'carrito.html');
                    M.modal.getInstance(document.getElementById('delete-modal')).close();
                }else{
                    sweetAlert(2, response.exception, null);
                }
            })
        }
    })
})

function openDelete(id){
    M.Modal.getInstance(document.getElementById('delete-modal')).open();

    document.getElementById('id_producto').value = id;
}


