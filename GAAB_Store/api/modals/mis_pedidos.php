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
    private $id_factura = null;
    private $calidad_producto = null;
    private $fecha_comentario = null;
    private $comentario = null;
    private $estado_valoracion = null;
    private $id_detalle_factura = null;
    private $ruta = '../imagenes/clientes/';

    public function setId($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->id = $valor;
            return true;
        } else {
            return false;
        }
    }

    //se establecen metodos set

    public function setNombre($valor)
    {
        if ($this->validateAlphabetic($valor, 1, 50)) {
            $this->nombre = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setApellido($valor)
    {
        if ($this->validateAlphabetic($valor, 1, 50)) {
            $this->apellido = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setTelefono($valor)
    {
        if ($this->validatePhone($valor)) {
            $this->telefono = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setUsuario($valor)
    {
        if ($this->validateAlphanumeric($valor, 1, 50)) {
            $this->usuario = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setClave($valor)
    {
        if ($this->validatePassword($valor)) {
            $this->clave = password_hash($valor, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setImagen($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->imagen = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo($valor)
    {
        if ($this->validateEmail($valor)) {
            $this->correo = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setDui($valor)
    {
        if ($this->validateDUI($valor)) {
            $this->dui = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setIdEstadoCliente($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->id_estado_cliente = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setIdFactura($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->id_factura = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setCalidadProducto($valor)
    {
        if ($valor) {
            if ($this->validateString($valor, 1, 250)) {
                $this->calidad_producto = $valor;
                return true;
            } else {
                return false;
            }
        } else {
            $this->calidad_producto = null;
            return true;
        }
    }

    public function setFechaComentario($value)
    {
        if ($this->validateDate($value)) {
            $this->fecha_comentario = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setComentario($value)
    {
        if ($value) {
            if ($this->validateString($value, 1, 250)) {
                $this->comentario = $value;
                return true;
            } else {
                return false;
            }
        } else {
            $this->comentario = null;
            return true;
        }
    }

    public function setEstadoValoracion($valor)
    {
        if ($this->validateAlphabetic($valor, 1, 50)) {
            $this->estado_valoracion = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setIdDetalleFactura($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->id_detalle_factura = $valor;
            return true;
        } else {
            return false;
        }
    }
    //se establecen metodos get

    public function getId()
    {
        return $this->id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getApellido()
    {
        return $this->apellido;
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

    public function getUsuario()
    {
        return $this->usuario;
    }

    public function getClave()
    {
        return $this->clave;
    }

    public function getImagen()
    {
        return $this->imagen;
    }

    public function getCorreo()
    {
        return $this->correo;
    }

    public function getDui()
    {
        return $this->dui;
    }

    public function getIdFactura()
    {
        return $this->id_factura;
    }

    public function getCalidadProducto()
    {
        return $this->calidad_producto;
    }

    public function getfechaComentario()
    {
        return $this->fecha_comentario;
    }

    public function getComentario()
    {
        return $this->comentario;
    }
    public function getEstadoValoracion()
    {
        return $this->estado_valoracion;
    }

    public function getIdDetalleFactura()
    {
        return $this->id_detalle_factura;
    }

    public function getRuta()
    {
        return $this->ruta;
    }


    //Función para leer compras de cliente
    public function readAll()
    {
        $sql = 'SELECT  cliente.id_cliente, sum(detalle_factura.cantidad_producto*detalle_factura.precio_unitario) as total,factura.fecha,factura.id_factura,factura.direccion
        FROM factura factura, detalle_factura detalle_factura, cliente cliente, productos productos
        WHERE factura.id_factura = detalle_factura.id_factura and cliente.id_cliente = factura.id_cliente and productos.id_producto = detalle_factura.id_producto and cliente.id_cliente = ?
        group  by  productos.nombre_producto, cliente.id_cliente, productos.precio_producto,detalle_factura.precio_unitario,factura.fecha,factura.estado_factura, factura.id_factura';
        $params = array($_SESSION['id_cliente']);
        return Database::getRows($sql, $params);
    }
    //Función para leer detalle
    public function readDetalle()
    {
        $sql = 'SELECT  factura.id_factura,cliente.id_cliente,productos.nombre_producto, sum(detalle_factura.cantidad_producto) as cantidad_producto, cliente.id_estado_cliente,detalle_factura.precio_unitario as precio_unitario,sum(detalle_factura.cantidad_producto*detalle_factura.precio_unitario) as subtotal,factura.fecha,factura.estado_factura
        FROM factura factura, detalle_factura detalle_factura, cliente cliente, productos productos
        WHERE factura.id_factura = detalle_factura.id_factura and cliente.id_cliente = factura.id_cliente and productos.id_producto = detalle_factura.id_producto and factura.id_factura=? 
        group  by factura.id_factura, productos.nombre_producto, cliente.id_cliente, productos.precio_producto,detalle_factura.precio_unitario,factura.fecha,factura.estado_factura';
        $params = array($this->id_factura);
        return Database::getRows($sql, $params);
    }

    //Función para leer id de productos y factura que se compro para comentar
    public function readIdFacturaComent(){
        $sql = 'SELECT  factura.id_factura,detalle_factura.id_detalle_factura,cliente.id_cliente,productos.id_producto,productos.nombre_producto
        FROM factura factura, detalle_factura detalle_factura, cliente cliente, productos productos
        WHERE factura.id_factura = detalle_factura.id_factura and cliente.id_cliente = factura.id_cliente and productos.id_producto = detalle_factura.id_producto and factura.id_factura=?
        group  by factura.id_factura, cliente.id_cliente, productos.id_producto,detalle_factura.id_detalle_factura,productos.nombre_producto';
        $params = array($this->id_factura);
        return Database::getRows($sql, $params);
    }

    //Función para crear coentario
    public function createComent()
    {
        // Se establece la zona horaria local para obtener la fecha del servidor.
        date_default_timezone_set('America/El_Salvador');
        $fecha_comentario = date('Y-m-d');
        $sql = 'INSERT INTO valoraciones(calidad_productos, fecha_comentario, comentario, estado_valoracion, id_detalle_factura)
                VALUES (?, ?, ?, ?, ?)';
        $params = array($this->calidad_producto, $fecha_comentario, $this->comentario, $this->estado_valoracion, $this->id_detalle_factura);
        return Database::executeRow($sql, $params);
    }
}
