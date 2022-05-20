<?php
/*
*	Clase para manejar la tabla productos de la base de datos.
*   Es clase hija de Validator.
*/
class Admin_Empleados extends Validator
{
    //Declaración de atributos
    private $id = null;
    private $nombre = null;
    private $apellido = null;
    private $correo = null;
    private $usuario = null;
    private $contrasenia = null;
    private $dui = null;
    private $imagen = null;
    private $estado = null;
    private $tipo = null;
    private $ruta = '../imagenes/administrar_empleados/';

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

    public function setNombre($value)
    {
        if ($this->validateAlphabetic($value,1, 50)) {
            $this->nombre = $value;
            return true;
        }else {
            return false;
        }
    }

    public function setApellido($value)
    {
        if ($this->validateAlphabetic($value,1, 50)) {
            $this->apellido = $value;
            return true;
        }else {
            return false;
        }
    }

    public function setCorreo($value)
    {
        if ($this->validateEmail($value)) {
            $this->correo = $value;
            return true;
        }else {
            return false;
        }
    }

    public function setUsuario($value)
    {
        if ($this->validateAlphanumeric($value,1, 50)) {
            $this->usuario = $value;
            return true;
        }else {
            return false;
        }
    }

    public function setContrasenia($value)
    {
        if ($this->validatePassword($value)) {
            $this->contrasenia = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setDui($value)
    {
        if ($this->validateDui($value,10, 10)) {
            $this->dui = $value;
            return true;
        }else {
            return false;
        }
    }

    public function setImagen($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->imagen = $this->getFileName();
            return true;
        }else {
            return false;
        }
    }

    public function setTipo($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->tipo = $value;
            return true;
        }else {
            return false;
        }
    }

    public function setEstado($value)
    {
        if ($this->validateBoolean($value)) {
            $this->estado = $value;
            return true;
        }else {
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

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getApellido()
    {
        return $this->apellido;
    }

    public function getCorreo()
    {
        return $this->correo;
    }

    public function getUsuario()
    {
        return $this->usuario;
    }

    public function getContrasenia()
    {
        return $this->contrasenia;
    }

    public function getDui()
    {
        return $this->correo;
    }

    public function getImagen()
    {
        return $this->imagen;
    }

    public function getEstado()
    {
        return $this->estado;
    }

    public function getTipo()
    {
        return $this->tipo;
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
        $sql = 'SELECT id_empleado, nombre_empleado, apellido_empleado, correo_empleado, usuario_empleado, dui_empleado, imagen_perfil_empleado, estado_empleado, id_tipo_empleado
                FROM empleado INNER JOIN tipo_empleado USING(id_tipo_empleado)
                WHERE nombre_empleado ILIKE ? OR apellido_empleado ILIKE ? OR dui_empleado ILIKE ?
                ORDER BY nombre_empleado';
        $params = array("%$value%", "%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_empleado, nombre_empleado, apellido_empleado, correo_empleado, usuario_empleado, dui_empleado, imagen_perfil_empleado, estado_empleado, tipo_empleado
                FROM empleado INNER JOIN tipo_empleado USING(id_tipo_empleado)
                ORDER BY nombre_empleado';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_empleado, nombre_empleado, apellido_empleado, correo_empleado, usuario_empleado, dui_empleado, imagen_perfil_empleado, estado_empleado, id_tipo_empleado
                FROM empleado
                WHERE id_empleado = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }


    public function createRow()
    {
        $sql = 'INSERT INTO empleado(nombre_empleado, apellido_empleado, correo_empleado, usuario_empleado, contrasenia_empleado, dui_empleado, imagen_perfil_empleado, estado_empleado, id_tipo_empleado)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->usuario, $this->contrasenia, $this->dui, $this->imagen, $this->estado, $this->tipo);
        return Database::executeRow($sql, $params);
    }

    public function updateRow($current_image)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        ($this->imagen) ? $this->deleteFile($this->getRuta(), $current_image) : $this->imagen = $current_image;

        $sql = 'UPDATE empleado
                SET nombre_empleado = ?, apellido_empleado = ?, correo_empleado = ?, usuario_empleado = ?, contrasenia_empleado = ?, dui_empleado = ?, imagen_perfil_empleado = ?, estado_empleado = ?, id_tipo_empleado = ?
                WHERE id_empleado = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->usuario, $this->contrasenia, $this->dui, $this->imagen, $this->estado, $this->tipo, $this->id);
        return Database::executeRow($sql, $params);
    }

}