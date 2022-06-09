/*
*   Controlador de uso general en las páginas web del sitio privado cuando no se ha iniciado sesión.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    const header = `
        <nav class="nav-extended" id="encabezado">
                <div class="row" id="otro">
                    <div class="col s12 m12">
                        <div class="row">
                            <div class="col s12 m12 l12">
                                <div class="nav-wrapper">
                                    <!--Insertamos logo de GAAB Store-->
                                    <a href="../../vista/dashboard/main.html"
                                        class="brand-logo center-align"><img
                                            src="../../recursos/img/logo/logo_gaab_white_png_105.png"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    `;
    

    document.querySelector('header').innerHTML = header;
   
});