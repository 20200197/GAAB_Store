<?php
require_once('../../ayudantes/dashboard_report.php');
require_once('../../modelos/mis_pedidos.php');

$pdf = new Report;

//Iniciamos sesión
session_start();
$pdf->startReport('Factura #' . $_GET['id'], $_SESSION['usuario_cliente']);
$pdf->SetTitle('Factura');

$factura = new Pedidos;

$pdf->setFillColor(47, 116, 181);
    // Se establece la fuente para los encabezados.
$pdf->setFont('Arial', 'B', 11);

$pdf->SetTextColor(255);
$pdf->Cell(28, 10, utf8_decode("DUI"), 1, 0, 'C', 1);
$pdf->Cell(52, 10, utf8_decode("NOMBRE"), 1, 0, 'C', 1);
$pdf->Cell(46, 10, utf8_decode("TELÉFONO"), 1, 0, 'C', 1);
$pdf->Cell(59, 10, utf8_decode("CORREO"), 1, 1, 'C', 1);

if ($factura->setId($_GET['id'])) {
    $pdf->SetFillColor(255);
    $pdf->setFont('Arial', '', 11);
    $pdf->SetTextColor(0);

    if ($data = $factura->readDetail()) {
        $pdf->Cell(28, 10, utf8_decode($factura->getDui()), 1, 0);
        $pdf->Cell(52, 10, utf8_decode($factura->getNombre() . ' ' . $factura->getApellido()), 1, 0);
        $pdf->Cell(46, 10, utf8_decode($factura->getTelefono()), 1, 0);
        $pdf->Cell(59, 10, utf8_decode($factura->getCorreo()), 1, 1);

        $pdf->Ln(10);
        $pdf->setFillColor(47, 116, 181);
        $pdf->setFont('Arial', 'B', 11);
        $pdf->SetTextColor(255);
        $pdf->Cell(143, 10, utf8_decode('DIRECCIÓN'), 1, 0, 'C', 1);
        $pdf->Cell(42, 10, utf8_decode('FECHA DE COMPRA'), 1, 1, 'C', 1);

        $pdf->setFont('Arial', '', 11);
        $pdf->SetTextColor(0);
        $pdf->Cell(143, 10, utf8_decode($factura->getDireccion()), 1, 0);
        $pdf->Cell(42, 10, utf8_decode($factura->getFecha()), 1, 1);

        $pdf->Ln(10);
        $pdf->SetFillColor(47, 116, 181);
        $pdf->SetFont('Arial', 'B', 11);
        $pdf->SetTextColor(255);
        $pdf->Cell(15, 10, utf8_decode('CANT'), 1, 0, 'C', 1);
        $pdf->Cell(128, 10, utf8_decode('PRODUCTO'), 1, 0, 'C', 1);
        $pdf->Cell(21, 10, utf8_decode('P/U'), 1, 0, 'C', 1);
        $pdf->Cell(21, 10, utf8_decode('TOTAL'), 1, 1, 'C', 1);
        foreach ($data as $row) {
            $pdf->SetFont('Arial', '', 11);
            $pdf->SetTextColor(0);
            $pdf->Cell(15, 10, utf8_decode($row['cantidad_producto']), 1, 0, 'C');
            $pdf->Cell(128, 10, utf8_decode($row['nombre_producto']), 1, 0, '');
            $pdf->Cell(21, 10, utf8_decode($row['precio_unitario']), 1, 0, 'C');
            $pdf->Cell(21, 10, utf8_decode($row['total_detalle']), 1, 1, 'C');
        }
        $pdf->SetFont('Arial', '', 11);
        $pdf->Cell(143, 10, utf8_decode('TOTAL'), 1, 0, 'R');
        $pdf->Cell(42, 10, utf8_decode('$' . $factura->getTotal()), 1, 1, 'C');
    } else {
        $pdf->Cell(185, 10, utf8_decode("Error: No se encuentra la factura"), 1, 0, 'C', 0);
    }
} else {
    $pdf->Cell(185, 10, utf8_decode("Recurso no disponible"), 1, 0, 'C', 0);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'Factura #' . $_GET['id'] . '.pdf');