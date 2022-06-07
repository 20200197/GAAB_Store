<?php

class Clientes extends Validator
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

    //se establecen metodos a utilizar

    public function register(){
        $sql = 'INSERT INTO cliente(nombre_cliente, apellido_cliente, telefono_cliente, usuario_cliente, contrasenia, imagen_perfil_cliente, correo_cliente, dui_cliente, id_estado_cliente) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->telefono, $this->usuario, $this->clave, $this->imagen, $this->correo, $this->dui, $this->id_estado_cliente);
        
        return Database::executeRow($sql, $params);
    }

    public function checkUser($usuario){
        $sql = 'SELECT * FROM cliente WHERE usuario_cliente = ? AND id_estado_cliente = 1';
        $params = array($usuario);

        if($data = Database::getRow($sql, $params)){
            $this->id = $data['id_cliente'];
            $this->nombre = $data['nombre_cliente'];
            $this->apellido = $data['apellido_cliente'];
            $this->usuario = $data['usuario_cliente'];
            $this->correo = $data['correo_cliente'];
            $this->dui = $data['dui_cliente'];
            $this->telefono = $data['telefono_cliente'];
            $this->imagen = $data['imagen_perfil_cliente'];+
            $this->id_estado_cliente = $data['id_estado_cliente'];

            return true;
        }else{
            return false;
        }
    }

    public function checkPassword($pass){
        $sql = 'SELECT contrasenia FROM cliente WHERE id_cliente = ?';
        $params = array($this->id);
        $data = Database::getRow($sql, $params);

        if (password_verify($pass, $data['contrasenia'])) {
            return true;
        } else {
            return false;
        }
    }
    
    public function read($column, $data){
        $sql = "SELECT * FROM cliente
                WHERE $column = ?";
        $params = array($data);

        return Database::getRow($sql, $params);
    }
}