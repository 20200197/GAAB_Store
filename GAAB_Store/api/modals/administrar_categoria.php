<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Categoria extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $nombre_categoria = null;
    private $imagen_categoria = null;

    private $ruta = '../imagenes/categoria_producto/';

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

    public function setNombre_categoria($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre_categoria= $value;
            return true;
        } else {
            return false;
        }
    }

    public function setImagen_categoria($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->imagen_categoria = $this->getFileName();
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

    public function getNombre_categoria()
    {
        return $this->nombre_categoria;
    }

    public function getImagen_categoria()
    {
        return $this->imagen_categoria;
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
        $sql = 'SELECT id_categoria_producto, nombre_categoria, imagen_categoria
                FROM categoria_producto 
                WHERE  nombre_categoria ILIKE ? 
                ORDER BY nombre_categoria';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO categoria_producto(nombre_categoria, imagen_categoria)
                VALUES(?, ?)';
        $params = array($this->nombre_categoria, $this->imagen_categoria);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_categoria_producto, nombre_categoria, imagen_categoria
                FROM categoria_producto
                ORDER BY nombre_categoria';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_categoria_producto,nombre_categoria,imagen_categoria
                FROM categoria_producto
                WHERE id_categoria_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }




    public function updateRow($current_image)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        ($this->imagen_categoria) ? $this->deleteFile($this->getRuta(), $current_image) : $this->imagen_categoria = $current_image;

        $sql = 'UPDATE categoria_producto 
                SET nombre_categoria=  ?, imagen_categoria=?
                WHERE id_categoria_producto=?';
        $params = array($this->nombre_categoria,$this->imagen_categoria,$this->id);
        return Database::executeRow($sql, $params);
    }
    

    public function deleteRow()
    {
        $sql = 'DELETE FROM categoria_producto
                WHERE id_categoria_producto= ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
