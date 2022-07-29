<?php
require('../../ayudantes/dashboard_report.php');
require('../../modelos/productos.php');
require('../../modelos/tipo_auto.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
//Se inicia ls sesión
session_start();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Productos más vendidos por tipo de auto', $_SESSION['alias_usuario']);

// Se instancia el módelo Categorías para obtener los datos.
$productoVendidos = new Tipo_auto;
// Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
if ($dataProductosVendidos = $productoVendidos->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(47, 116, 181);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 11);
    $pdf->SetTextColor(255, 255, 255);
    // Se imprimen las celdas con los encabezados.

    $pdf->cell(50, 10, utf8_decode('Nombre'), 1, 0, 'C', 1);
    $pdf->cell(36, 10, utf8_decode('Precio (US$)'), 1, 0, 'C', 1);
    $pdf->cell(20, 10, utf8_decode('Estado'), 1, 0, 'C', 1);
    $pdf->cell(50, 10, utf8_decode('Cantidad en stock ($)'), 1, 0, 'C', 1);
    $pdf->cell(30, 10, utf8_decode('Categoria '), 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(214, 216, 223);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);
    $pdf->SetTextColor(0, 0, 0);
    // Se recorren los registros ($dataProductosVendidos) fila por fila ($rowCategoria).
    foreach ($dataProductosVendidos as $rowTipoAuto) {
        // Se imprime una celda con el nombre del tipo_auto.
        $pdf->cell(0, 10, utf8_decode('Tipo de auto: ' . ' ' . $rowTipoAuto['tipo_auto']), 1, 1, 'C', 1);
        // Se instancia el módelo Productos para procesar los datos.
        $producto = new Producto;
        // Se establece la categoría para obtener sus productos, de lo contrario se imprime un mensaje de error.
        if ($producto->setIdTipoAuto($rowTipoAuto['id_tipo_auto'])) {
            // Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
            if ($dataProductos = $producto->productosTipoauto()) {
                // Se recorren los registros ($dataProductosVendidos) fila por fila ($rowProducto).

                foreach ($dataProductos as $rowProducto) {
                    // Se imprimen las celdas con los datos de los productos.

                    $pdf->cell(50, 10, utf8_decode($rowProducto['nombre_producto']), 1, 0);
                    $pdf->cell(36, 10, $rowProducto['precio_producto'], 1, 0);
                    $pdf->cell(20, 10, ($rowProducto['estado_producto']), 1, 0);
                    $pdf->cell(50, 10, $rowProducto['cant_producto'], 1, 0);
                    $pdf->cell(30, 10, utf8_decode($rowProducto['nombre_categoria']), 1, 1);
                }
            } else {
                $pdf->cell(0, 10, utf8_decode('No hay productos para este tipo de auto'), 1, 1);
            }
        } else {
            $pdf->cell(0, 10, utf8_decode('Tipo de auto incorrecta o inexistente'), 1, 1);
        }
    }
} else {
    $pdf->cell(0, 10, utf8_decode('No hay tipo auto para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'Productos_por_tipo_auto .pdf');
