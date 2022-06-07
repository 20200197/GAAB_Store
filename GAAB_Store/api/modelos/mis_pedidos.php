<?php

class Pedidos extends Validator
{
    //definimos las propiedades de la clase

    private $id = null;
    private $nombre = null;
    private $apellido = null;
    private $telefono = null;
    private $usuario = null;
    private $clave = null;
    private $imagen = null;
    private $correo = null;
    private $dui = null;
    private $id_estado_cliente = null;
    private $ruta = '../imagenes/clientes/';

    public function setId($valor){
        if($this->validateNaturalNumber($valor)){
            $this->id = $valor;
            return true;
        }else{
            return false;
        }
    }

    //se establecen metodos set

    public function setNombre($valor){
        if($this->validateAlphabetic($valor, 1, 50)){
            $this->nombre = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setApellido($valor){
        if($this->validateAlphabetic($valor, 1, 50)){
            $this->apellido = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setTelefono($valor){
        if($this->validatePhone($valor)){
            $this->telefono = $valor;
            return true;
        } else{
            return false;
        }
    }

    public function setUsuario($valor){
        if($this->validateAlphanumeric($valor, 1, 50)){
            $this->usuario = $valor;
            return true;
        } else{
            return false;
        }
    }

    public function setClave($valor){
        if ($this->validatePassword($valor)) {
            $this->clave = password_hash($valor, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setImagen($file){
        if ($this->validateImageFile($file, 500, 500)) {
            $this->imagen = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo($valor){
        if($this->validateEmail($valor)){
            $this->correo = $valor;
            return true;
        } else{
            return false;
        }
    }

    public function setDui($valor){
        if($this->validateDUI($valor)){
            $this->dui = $valor;
            return true;
        }else{
            return false;
        }
    }

    public function setIdEstadoCliente($valor){
        if($this->validateNaturalNumber($valor)){
            $this->id_estado_cliente = $valor;
            return true;
        }else{
            return false;
        }
    }

    //se establecen metodos get

    public function getId(){
        return $this->id;
    }

    public function getNombre(){
        return $this->nombre;
    }

    public function getApellido(){
        return $this->apellido;
    }

    public function getTelefono(){
        return $this->telefono;
    }

    public function getUsuario(){
        return $this->usuario;
    }

    public function getClave(){
        return $this->clave;
    }

    public function getImagen(){
        return $this->imagen;
    }

    public function getCorreo(){
        return $this->correo;
    }

    public function getDui(){
        return $this->dui;
    }

    public function getIdEstadoCliente(){
        return $this->id_estado_cliente;
    }

    public function getRuta(){
        return $this->ruta;
    }


    //Función para leer compras de cliente
    public function readAll()
    {
        $sql = 'SELECT  cliente.id_cliente,productos.nombre_producto, sum(detalle_factura.cantidad_producto) as cantidad_producto, cliente.id_estado_cliente,detalle_factura.precio_unitario as precio_unitario,sum(detalle_factura.cantidad_producto*detalle_factura.precio_unitario) as subtotal,factura.fecha,factura.estado_factura
        FROM factura factura, detalle_factura detalle_factura, cliente cliente, productos productos
        WHERE factura.id_factura = detalle_factura.id_factura and cliente.id_cliente = factura.id_cliente and productos.id_producto = detalle_factura.id_producto and cliente.id_cliente = 5
        group  by  productos.nombre_producto, cliente.id_cliente, productos.precio_producto,detalle_factura.precio_unitario,factura.fecha,factura.estado_factura';
        $params = null;
        return Database::getRows($sql, $params);
    }

}