<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Clientes extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $nombre_cliente = null;
    private $apellido_cliente = null;
    private $telefono_cliente = null;
    private $usuario_cliente = null;
    private $contrasenia = null;
    private $imagen_perfil_cliente = null;
    private $correo_cliente = null;
    private $dui_cliente = null;
    private $id_estado_cliente=null;
    private $nombre_producto = null;
    private $cantidad_producto=null;
    private $ruta = '../imagenes/administrar_cliente/';

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
    public function setId($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setNombre_cliente($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre_cliente= $value;
            return true;
        } else {
            return false;
        }
    }

    public function setApellido_cliente($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->apellido_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setTelefono_cliente($value)
    {
        if ($this->validateAlphanumeric($value, 1, 50)) {
            $this->telefono_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setUsuario_cliente($value)
    {
        if ($this->validateAlphanumeric($value, 1, 50)) {
            $this->usuario_cliente = $value;
            return true;
        } else {
            return false;
        }
    }
    public function setContrasenia($value)
    {
        if ($this->validatePassword($value, 1, 50)) {
            $this->contrasenia = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setImagen_perfil_cliente($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->imagen_perfil_cliente = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo_cliente($value)
    {
        if ($this->validateEmail($value)) {
            $this->correo_cliente = $value;
            return true;
        } else {
            return false;
        }
    }
    public function setDui_cliente($value)
    {
        if ($this->validateAlphanumeric($value, 1, 50)) {
            $this->dui_cliente = $value;
            return true;
        } else {
            return false;
        }
    }
    public function setNombre_producto($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre_producto = $value;
            return true;
        } else {
            return false;
        }
    }
    public function setCantidad_producto($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->cantidad_producto = $value;
            return true;
        } else {
            return false;
        }
    }
    public function setId_estado_cliente($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_estado_cliente = $value;
            return true;
        } else {
            return false;
        }
    }

    

    /*
    *   Métodos para obtener valores de los atributos.
    */
    public function getId()
    {
        return $this->id;
    }

    public function getNombre_cliente()
    {
        return $this->nombre_cliente;
    }

    public function getApellido_cliente()
    {
        return $this->apellido_cliente;
    }

    public function getTelefono_cliente()
    {
        return $this->telefono_cliente;
    }

    public function getUsuario_cliente()
    {
        return $this->usuario_cliente;
    }
    public function getContrasenia()
    {
        return $this->contrasenia;
    }
    public function getImagen_perfil_cliente()
    {
        return $this->imagen_perfil_cliente;
    }
    public function getCorreo_cliente()
    {
        return $this->correo_cliente;
    }
    public function getDui_cliente()
    {
        return $this->dui_cliente;
    }
    public function getId_estado_cliente()
    {
        return $this->id_estado_cliente;
    }

    public function getRuta()
    {
        return $this->ruta;
    }
    

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    public function searchRows($value)
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, telefono_cliente, usuario_cliente, imagen_perfil_cliente, correo_cliente, dui_cliente, estado_cliente
                FROM cliente 
                inner join estado_cliente using(id_estado_cliente)
                WHERE  nombre_cliente ILIKE ? OR apellido_cliente ILIKE ?
                ORDER BY apellido_cliente';
        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

 
    //Función para leer todos los datos
    public function readAll()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, telefono_cliente, usuario_cliente, imagen_perfil_cliente, correo_cliente, dui_cliente, estado_cliente
                FROM cliente 
                inner join estado_cliente using(id_estado_cliente) 
                ORDER BY apellido_cliente';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_cliente,id_estado_cliente
                FROM cliente 
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readOnes()
    {
        $sql = 'SELECT id_cliente,nombre_cliente, apellido_cliente, telefono_cliente, usuario_cliente, contrasenia, imagen_perfil_cliente, correo_cliente, dui_cliente, id_estado_cliente
                FROM cliente 
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readCliente_Estado()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, telefono_cliente, usuario_cliente, imagen_perfil_cliente, correo_cliente, dui_cliente, id_estado_cliente
                FROM cliente 
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    //Función para leer compras de cliente
    public function readCompras()
    {
        $sql = 'SELECT  cliente.id_cliente,productos.nombre_producto, sum(detalle_factura.cantidad_producto) as cantidad_producto, cliente.id_estado_cliente,detalle_factura.precio_unitario as precio_unitario,sum(detalle_factura.cantidad_producto*detalle_factura.precio_unitario) as subtotal,factura.fecha,factura.estado_factura
        FROM factura factura, detalle_factura detalle_factura, cliente cliente, productos productos
        WHERE factura.id_factura = detalle_factura.id_factura and cliente.id_cliente = factura.id_cliente and productos.id_producto = detalle_factura.id_producto and cliente.id_cliente = ?
        group  by  productos.nombre_producto, cliente.id_cliente, productos.precio_producto,detalle_factura.precio_unitario,factura.fecha,factura.estado_factura';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }


  
    //Función para actualizar fila
    public function updateRow()
    {
        $sql = 'UPDATE cliente 
                SET id_estado_cliente = ?
                WHERE id_cliente=?';
        $params = array($this->id_estado_cliente,$this->id);
        return Database::executeRow($sql, $params);
    }
   

 
    /*
    *   Métodos para generar reportes.
    */
    public function gastosCliente()
    {
        $sql = 'SELECT f.id_factura,sum(cantidad_producto * precio_unitario) as gastos_cliente, c.nombre_cliente, c.apellido_cliente
        from factura as f
        inner join detalle_factura as d
        on d.id_factura = f.id_factura
        inner join cliente as c
        on c.id_cliente =f.id_cliente
        group by f.id_factura , c.nombre_cliente, c.apellido_cliente 
        order by gastos_cliente';
        $params = null;
        return Database::getRows($sql,$params);
    }
}
