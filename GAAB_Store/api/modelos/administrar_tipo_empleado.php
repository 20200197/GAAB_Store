<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/

class Tipo_empleado extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $tipo_empleado = null;

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

    public function setTipo_empleado($value)
    {
        if ($this->validateAlphanumeric($value, 1, 50)) {
            $this->tipo_empleado= $value;
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

    public function getTipo_empleado()
    {
        return $this->tipo_empleado;
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
    public function searchRows($value)
    {
        $sql = 'SELECT id_tipo_empleado, tipo_empleado
                FROM tipo_empleado 
                WHERE  tipo_empleado ILIKE ? 
                ORDER BY tipo_empleado';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tipo_empleado(tipo_empleado)
                VALUES(?)';
        $params = array($this->tipo_empleado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_tipo_empleado, tipo_empleado
                FROM tipo_empleado
                ORDER BY tipo_empleado';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_tipo_empleado, tipo_empleado,
                FROM tipo_empleado
                WHERE id_tipo_empleado = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}