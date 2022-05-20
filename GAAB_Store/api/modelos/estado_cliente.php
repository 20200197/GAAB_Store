<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Estado_cliente extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $estado_cliente = null;
   

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

    public function setEstado_cliente($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->estado_cliente= $value;
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

    public function getEstado_cliente()
    {
        return $this->estado_cliente;
    }


    public function readAll()
    {
        $sql = 'SELECT id_estado_cliente, estado_cliente
                FROM estado_cliente 
                ORDER BY estado_cliente';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, telefono_cliente, usuario_cliente, contrasenia, imagen_perfil_cliente, correo_cliente, dui_cliente, e.estado_cliente
                FROM cliente c , estado_cliente e
                WHERE e.id_estado_cliente=c.id_estado_cliente and id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE cliente 
                SET nombre_cliente = ?, apellido_cliente = ?, telefono_cliente = ?, usuario_cliente=?, contrasenia=?,imagen_perfil_cliente=?,correo_cliente=?,dui_cliente=?,
                WHERE id_cliente=?';
        $params = array($this->nombre_cliente, $this->apellido_cliente, $this->telefono_cliente, $this->usuario_cliente, $this->contrasenia,$this->imagen_perfil_cliente,$this->correo_cliente,$this->dui_cliente,$this->id_estado_cliente);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM cliente
                WHERE id_cliente= ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
