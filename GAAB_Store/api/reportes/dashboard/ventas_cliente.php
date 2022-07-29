<?php
// contiene los metodos para llenar los reportes 
require('../../ayudantes/dashboard_report.php');
require('../../modelos/administrar_cliente.php');


// Se instancia la clase para crear el reporte.
$pdf = new Report;

//Iniciamos la sesión
session_start();
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Top 10 clientes más frecuentes por semana',$_SESSION['alias_usuario']);

// Se instancia el módelo Clientes para obtener los datos.
$administrar_cliente = new Clientes;
// Se verifica si existen registros (clientes) para mostrar, de lo contrario se imprime un mensaje.
if ($dataCliente = $administrar_cliente->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(47, 116, 181);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 11);
    $pdf->SetTextColor(255, 255, 255);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(50, 10, utf8_decode('Nombre cliente'), 1, 0, 'C', 1);
    $pdf->cell(50, 10, utf8_decode('Apellido cliente'), 1, 0, 'C', 1);
    $pdf->cell(50, 10, utf8_decode('Total gastado'), 1, 0, 'C', 1);
    $pdf->cell(35, 10, utf8_decode('Estado cliente'), 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(225);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 11);
            // Se verifica si existen registros (gastos) para mostrar, de lo contrario se imprime un mensaje.
            if ($dataCliente = $administrar_cliente->topCliente()) {
                // Se recorren los registros ($dataClientes) fila por fila ($rowCliente).
                foreach ($dataCliente as $rowCliente) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->SetTextColor(0, 0, 0);
                    $pdf->cell(50, 10, utf8_decode($rowCliente['nombre_cliente']), 1, 0);
                    $pdf->cell(50, 10, utf8_decode($rowCliente['apellido_cliente']), 1, 0);
                    $pdf->cell(50, 10, utf8_decode($rowCliente['gastos_cliente']), 1, 0);
                    $pdf->cell(35, 10, utf8_decode($rowCliente['estado_cliente']), 1, 1);
                }
            } else {
                $pdf->cell(0, 10, utf8_decode('Aún no se cuenta con un top 10'), 1, 1);
            }
    
    
} else {
    $pdf->cell(0, 10, utf8_decode('No hay clientes para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método footer()
$pdf->output('I', 'clientes frecuentes.pdf');
