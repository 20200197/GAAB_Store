<?php
require('../../ayudantes/dashboard_report.php');
require('../../modelos/productos.php');


// Se instancia la clase para crear el reporte.
$pdf = new Report;

//Inicimos la sesión
session_start();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Top 10 productos más vendidos', $_SESSION['alias_usuario']);

// Se instancia el módelo Productos para procesar los datos.
$producto = new Producto;
// Se verifica si existen registros (categorías) para mostrar, de lo contrario se imprime un mensaje.
if ($dataProductos = $producto->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(47, 116, 181);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 11);
    //Color de texto
    $pdf->SetTextColor(255, 255, 255);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(35, 10, utf8_decode('Categoria'), 1, 0, 'C', 1);
    $pdf->cell(25, 10, utf8_decode('En stock'), 1, 0, 'C', 1);
    $pdf->cell(36, 10, utf8_decode('Tipo auto'), 1, 0, 'C', 1);
    $pdf->cell(25, 10, utf8_decode('Vendidos'), 1, 0, 'C', 1);
    $pdf->cell(35, 10, utf8_decode('Total vendido($)'), 1, 0, 'C', 1);
    $pdf->cell(30, 10, utf8_decode('Estado'), 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(214, 216, 223);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);
    //Color de texto
    $pdf->SetTextColor(0, 0, 0);

    // Se instancia el módelo Productos para procesar los datos.
    $producto = new Producto;
    // Se establece la categoría para obtener sus productos, de lo contrario se imprime un mensaje de error.
    if ($producto->productos()) {
        // Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
        if ($dataProductos = $producto->productos()) {
            // Se recorren los registros ($dataProductos) fila por fila ($rowProducto).
            foreach ($dataProductos as $rowProducto) {
                // Se imprime una celda con el nombre de la categoría.
                $pdf->cell(0, 10, utf8_decode('Producto: ' . $rowProducto['nombre_producto']), 1, 1, 'C', 1);
                // Se imprimen las celdas con los datos de los productos.
                $pdf->cell(35, 10,  utf8_decode($rowProducto['nombre_categoria']), 1, 0, 'C');
                $pdf->cell(25, 10, $rowProducto['cant_producto'], 1, 0, 'C');
                $pdf->cell(36, 10, $rowProducto['tipo_auto'], 1, 0, 'C');
                $pdf->cell(25, 10, ('$' . $rowProducto['cantidad_vendida']), 1, 0, 'C');
                $pdf->cell(35, 10, $rowProducto['total'], 1, 0, 'C');
                $pdf->cell(30, 10, $rowProducto['estado_producto'], 1, 1, 'C');
            }
        } else {
            $pdf->cell(0, 10, utf8_decode('No hay productos para mostrar'), 1, 1);
        }
    } else {
        $pdf->cell(0, 10, utf8_decode('Producto incorrecto o inexistente'), 1, 1);
    }
} else {
    $pdf->cell(0, 10, utf8_decode('No hay productos para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'productos.pdf');
