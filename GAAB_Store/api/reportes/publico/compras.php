<?php
require_once('../../ayudantes/dashboard_report.php');
require_once('../../modelos/mis_pedidos.php');

$pdf = new Report;

//Iniciamos sesión
session_start();
$pdf->startReport('Compras de los últimos 7 días', $_SESSION['usuario_cliente']);
$pdf->SetTitle('Compras');

$factura = new Pedidos;

$pdf->setFillColor(47, 116, 181);

if (isset($_SESSION['id_cliente'])) {
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);
    $pdf->SetTextColor(255);
    $pdf->Cell(15, 10, utf8_decode('CANT'), 1, 0, 'C', 1);
    $pdf->Cell(119, 10, utf8_decode('PRODUCTO'), 1, 0, 'C', 1);
    $pdf->Cell(30, 10, utf8_decode('CATEGORIA'), 1, 0, 'C', 1);
    $pdf->Cell(21, 10, utf8_decode('PRECIO'), 1, 1, 'C', 1);

    $pdf->SetTextColor(0);
    foreach ($factura->getComprasSemana() as $row) {
        $pdf->setFont('Arial', '', 11);
        $pdf->Cell(15, 10, utf8_decode($row['cantidad_producto']), 1, 0, 'L');
        $pdf->Cell(119, 10, utf8_decode($row['nombre_producto']), 1, 0, 'L');
        $pdf->Cell(30, 10, utf8_decode($row['nombre_categoria']), 1, 0, 'L');
        $pdf->Cell(21, 10, utf8_decode($row['precio_producto']), 1, 1, 'L');
    }
} else {
    $pdf->setFont('Arial', 'B', 18);
    $pdf->Cell(185, 10, utf8_decode('Acceso denegado'), 0, 0, 'C');
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'Compras_semanales.pdf');