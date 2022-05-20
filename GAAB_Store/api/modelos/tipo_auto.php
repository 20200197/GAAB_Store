<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Tipo_auto extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $tipo_auto = null;
    private $imagen_tipo_auto = null;

    private $ruta = '../imagenes/tipo_auto/';

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

    public function setTipo_auto($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->tipo_auto= $value;
            return true;
        } else {
            return false;
        }
    }

    public function setImagen_tipo_auto($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->imagen_tipo_auto = $this->getFileName();
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

    public function getTipo_auto()
    {
        return $this->tipo_auto;
    }

    public function getImagen_tipo_auto()
    {
        return $this->imagen_tipo_auto;
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
        $sql = 'SELECT id_tipo_auto, tipo_auto, imagen_tipo_auto
                FROM tipo_auto 
                WHERE  tipo_auto ILIKE ? 
                ORDER BY tipo_auto';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tipo_auto(tipo_auto, imagen_tipo_auto)
                VALUES(?, ?)';
        $params = array($this->tipo_auto, $this->imagen_tipo_auto);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_tipo_auto, tipo_auto, imagen_tipo_auto
                FROM tipo_auto
                ORDER BY tipo_auto';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_tipo_auto,tipo_auto,imagen_tipo_auto
                FROM tipo_auto
                WHERE id_tipo_auto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }




    public function updateRow($current_image)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        ($this->imagen_tipo_auto) ? $this->deleteFile($this->getRuta(), $current_image) : $this->imagen_tipo_auto = $current_image;

        $sql = 'UPDATE tipo_auto 
                SET tipo_auto=  ?, imagen_tipo_auto=?
                WHERE id_tipo_auto=?';
        $params = array($this->tipo_auto,$this->imagen_tipo_auto,$this->id);
        return Database::executeRow($sql, $params);
    }
    

    public function deleteRow()
    {
        $sql = 'DELETE FROM tipo_auto
                WHERE id_tipo_auto= ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
