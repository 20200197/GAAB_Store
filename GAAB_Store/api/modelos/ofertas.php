<?php

class Ofertas extends Validator
{
    private $id = null;
    private $titulo = null;
    private $texto = null;
    private $estado = null;
    private static $imagen = null;
    private $ruta = '../imagenes/ofertas/';

    public function setId($valor)
    {
        if ($this->validateNaturalNumber($valor)) {
            $this->id = $valor;
            return true;
        } else {
            return false;
        }
    }


    public function setTitulo($valor)
    {
        if ($valor) {
            if ($this->validateString($valor, 1, 250)) {
                $this->titulo = $valor;
                return true;
            } else {
                return false;
            }
        } else {
            $this->titulo = null;
            return true;
        }
    }
    public function setEstado($valor)
    {
        if ($this->validateAlphabetic($valor, 1, 250)) {
            $this->estado = $valor;
            return true;
        } else {
            return false;
        }
    }

    public function setTexto($valor)
    {
        if ($valor) {
            if ($this->validateString($valor, 1, 250)) {
                $this->texto = $valor;
                return true;
            } else {
                return false;
            }
        } else {
            $this->texto = null;
            return true;
        }
    }


    public function setImagen($file)
    {
        if ($this->validateImageFile($file, 1900, 445)) {
            $this->imagen = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }


    public function getRuta()
    {
        return $this->ruta;
    }

    public function getTitulo()
    {
        return $this->titulo;
    }
    public function getTexto()
    {
        return $this->texto;
    }
    public function getEstado()
    {
        return $this->estado;
    }
    public  function getImagen()
    {
        return $this->imagen;
    }


    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */

    //Función para leer todo
    public function readAll()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion, cant_producto, imagen_producto, precio_producto, nombre_categoria, estado_producto, tipo_auto, nombre_empleado
                FROM productos
                INNER JOIN categoria_producto USING (id_categoria_producto)
                INNER JOIN estado_producto USING (id_estado_producto)
                INNER JOIN tipo_auto USING (id_tipo_auto)
                INNER JOIN empleado USING (id_empleado)
                ORDER BY nombre_producto';
        $params = null;
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion, cant_producto, imagen_producto, precio_producto, id_categoria_producto, id_estado_producto, id_tipo_auto
                FROM productos 
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    //Función para actualizar estado de producto
    public function updateEstado()
    {
        $sql = 'UPDATE productos 
                SET id_estado_producto = ?
                WHERE id_producto=?';
        $params = array($this->id_estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function searchRows($valor)
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion, cant_producto, imagen_producto, precio_producto, nombre_categoria, estado_producto, tipo_auto, nombre_empleado
                FROM productos
                INNER JOIN categoria_producto USING(id_categoria_producto)
                INNER JOIN tipo_auto USING(id_tipo_auto)
                INNER JOIN estado_producto USING(id_estado_producto)
                INNER JOIN empleado USING(id_empleado)
                WHERE nombre_producto ILIKE ? OR nombre_categoria ILIKE ?
                ORDER BY nombre_producto';
        $params = array("%$valor%", "%$valor%");
        return Database::getRows($sql, $params);
    }

    //Función para crear fila
    public function createRow()
    {
        $sql = 'INSERT INTO productos(nombre_producto, descripcion, cant_producto, imagen_producto, precio_producto, id_categoria_producto, id_estado_producto, id_tipo_auto, id_empleado)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->cant_producto, $this->imagen, $this->precio, $this->id_categoria, $this->id_estado, $this->id_tipo_auto, $this->id_empleado);
        return Database::executeRow($sql, $params);
    }

    //Función para actualizar fila
    public function updateRow($current_image)
    {
        // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
        ($this->imagen) ? $this->deleteFile($this->getRuta(), $current_image) : $this->imagen = $current_image;
        $sql = 'UPDATE  productos
                SET  nombre_producto = ?, descripcion=?, imagen_producto=?, precio_producto=?, id_categoria_producto=?, id_estado_producto=?, id_tipo_auto=?
                where id_producto=?';
        $params = array($this->nombre, $this->descripcion, $this->imagen, $this->precio, $this->id_categoria, $this->id_estado, $this->id_tipo_auto, $this->id);
        return Database::executeRow($sql, $params);
    }
    //Actualizar stock
    public function updateStock()
    {

        $sql = 'UPDATE  productos
                SET  cant_producto=?
                where id_producto=?';
        $params = array($this->cant_producto, $this->id);
        return Database::executeRow($sql, $params);
    }

    //Actualizar estado comentario
    public function updateComentE()
    {

        $sql = 'UPDATE  valoraciones
                SET  estado_valoracion=?
                where id_valoracion=?';
        $params = array($this->estado_valoracion, $this->id_valoracion);
        return Database::executeRow($sql, $params);
    }

    //Leer productos de categoria
    public function readProductosCategoria()
    {
        $sql = 'SELECT productos.id_producto, nombre_producto, descripcion, cant_producto, imagen_producto, precio_producto,categoria_producto.nombre_categoria,estado_producto.estado_producto,tipo_auto.tipo_auto, avg(valoraciones.calidad_productos) as calidad
        from valoraciones
		FULL OUTER  join detalle_factura as detalle_factura on valoraciones.id_detalle_factura=detalle_factura.id_detalle_factura 
		FULL OUTER join productos as productos on detalle_factura.id_producto = productos.id_producto
        FULL  OUTER join categoria_producto as categoria_producto on productos.id_categoria_producto=categoria_producto.id_categoria_producto
		FULL OUTER join estado_producto as estado_producto on productos.id_estado_producto=estado_producto.id_estado_producto
		FULL OUTER join tipo_auto as tipo_auto on productos.id_tipo_auto=tipo_auto.id_tipo_auto
        WHERE productos.id_categoria_producto = ? AND productos.id_estado_producto = 1  
       group by productos.id_producto,categoria_producto.nombre_categoria,estado_producto.estado_producto,tipo_auto.tipo_auto';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    //Leer comentario de producto
    public function readComent()
    {
        $sql = 'SELECT productos.id_producto, valoraciones.comentario as comentario,cliente.imagen_perfil_cliente, cliente.usuario_cliente as usuario_cliente
        FROM  valoraciones 
        FULL OUTER  join detalle_factura as detalle_factura on valoraciones.id_detalle_factura=detalle_factura.id_detalle_factura 
        FULL OUTER join productos as productos on detalle_factura.id_producto = productos.id_producto
        FULL  OUTER join categoria_producto as categoria_producto on productos.id_categoria_producto=categoria_producto.id_categoria_producto
        FULL OUTER join estado_producto as estado_producto on productos.id_estado_producto=estado_producto.id_estado_producto
        FULL OUTER join tipo_auto as tipo_auto on productos.id_tipo_auto=tipo_auto.id_tipo_auto
        FULL OUTER join factura as factura on detalle_factura.id_factura = factura.id_factura
		FULL OUTER join cliente as cliente on factura.id_cliente = cliente.id_cliente
        WHERE productos.id_producto = ?';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    //Leer comentarios no nulos
    public function readComentT()
    {
        $sql = 'SELECT productos.id_producto, valoraciones.comentario as comentario,cliente.imagen_perfil_cliente, cliente.usuario_cliente as usuario_cliente,valoraciones.estado_valoracion as estado_valoracion, valoraciones.id_valoracion as id_valoracion
        FROM  valoraciones 
        FULL OUTER  join detalle_factura as detalle_factura on valoraciones.id_detalle_factura=detalle_factura.id_detalle_factura 
        FULL OUTER join productos as productos on detalle_factura.id_producto = productos.id_producto
        FULL  OUTER join categoria_producto as categoria_producto on productos.id_categoria_producto=categoria_producto.id_categoria_producto
        FULL OUTER join estado_producto as estado_producto on productos.id_estado_producto=estado_producto.id_estado_producto
        FULL OUTER join tipo_auto as tipo_auto on productos.id_tipo_auto=tipo_auto.id_tipo_auto
        FULL OUTER join factura as factura on detalle_factura.id_factura = factura.id_factura
		FULL OUTER join cliente as cliente on factura.id_cliente = cliente.id_cliente
        WHERE productos.id_producto = ? and comentario is not null';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    //Leer datos de comentario para actualizar estado
    public function readUpdateE()
    {
        $sql = 'SELECT productos.id_producto,valoraciones.estado_valoracion as estado_valoracion, valoraciones.id_valoracion
        FROM  valoraciones 
        FULL OUTER  join detalle_factura as detalle_factura on valoraciones.id_detalle_factura=detalle_factura.id_detalle_factura 
        FULL OUTER join productos as productos on detalle_factura.id_producto = productos.id_producto
        FULL  OUTER join categoria_producto as categoria_producto on productos.id_categoria_producto=categoria_producto.id_categoria_producto
        FULL OUTER join estado_producto as estado_producto on productos.id_estado_producto=estado_producto.id_estado_producto
        FULL OUTER join tipo_auto as tipo_auto on productos.id_tipo_auto=tipo_auto.id_tipo_auto
        FULL OUTER join factura as factura on detalle_factura.id_factura = factura.id_factura
		FULL OUTER join cliente as cliente on factura.id_cliente = cliente.id_cliente
        WHERE productos.id_producto = ? and comentario is not null and valoraciones.id_valoracion=?';
        $params = array($this->id, $this->id_valoracion);
        return Database::getRow($sql, $params);
    }

    //Calidad de productos
    public function readCaliProducto()
    {
        $sql = 'SELECT avg(calidad_productos) as calidad
                FROM  valoraciones 
                where id_detalle_factura = ?';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    //Crear detallefactura solo con el idproducto para agregarse despúes al comentario
    public function createDetalleFactura()
    {
        $sql = 'INSERT INTO detalle_factura(id_producto)
                VALUES (?)';
        $params = null;
        return Database::executeRow($sql, $params);
    }

    //Crear comentario sin comprar producto
    public function createComentario()
    {
        $sql = 'INSERT INTO valoraciones(fecha_comentario,comentario,id_detalle_factura)
                VALUES (?, ?, ?)';
        $params = array($this->fecha_comentario, $this->comentario, $this->id_detalle_factura);
        return Database::executeRow($sql, $params);
    }

    //Función para leer productos 
    public function readProductosAll()
    {
        $sql = 'SELECT productos.id_producto, nombre_producto, descripcion, cant_producto, imagen_producto, precio_producto,categoria_producto.id_categoria_producto,categoria_producto.nombre_categoria,estado_producto.estado_producto,tipo_auto.tipo_auto, avg(valoraciones.calidad_productos) as calidad
        from valoraciones
		FULL OUTER  join detalle_factura as detalle_factura on valoraciones.id_detalle_factura=detalle_factura.id_detalle_factura 
		FULL OUTER join productos as productos on detalle_factura.id_producto = productos.id_producto
        FULL  OUTER join categoria_producto as categoria_producto on productos.id_categoria_producto=categoria_producto.id_categoria_producto
		FULL OUTER join estado_producto as estado_producto on productos.id_estado_producto=estado_producto.id_estado_producto
		FULL OUTER join tipo_auto as tipo_auto on productos.id_tipo_auto=tipo_auto.id_tipo_auto
        WHERE   productos.id_estado_producto = 1  
       group by productos.id_producto,categoria_producto.nombre_categoria,estado_producto.estado_producto,tipo_auto.tipo_auto,categoria_producto.id_categoria_producto';
        $params = null;
        return Database::getRows($sql, $params);
    }


    public function searchProductos($valor)
    {
        $sql = 'SELECT productos.id_producto, nombre_producto, descripcion, cant_producto, imagen_producto, precio_producto,categoria_producto.id_categoria_producto,categoria_producto.nombre_categoria,estado_producto.estado_producto,tipo_auto.tipo_auto, avg(valoraciones.calidad_productos) as calidad
                from valoraciones
                FULL OUTER  join detalle_factura as detalle_factura on valoraciones.id_detalle_factura=detalle_factura.id_detalle_factura 
                FULL OUTER join productos as productos on detalle_factura.id_producto = productos.id_producto
                FULL  OUTER join categoria_producto as categoria_producto on productos.id_categoria_producto=categoria_producto.id_categoria_producto
                FULL OUTER join estado_producto as estado_producto on productos.id_estado_producto=estado_producto.id_estado_producto
                FULL OUTER join tipo_auto as tipo_auto on productos.id_tipo_auto=tipo_auto.id_tipo_auto
                WHERE   productos.id_estado_producto = 1  and nombre_producto ILIKE ? OR nombre_categoria ILIKE ?  OR tipo_auto ILIKE ?
                group BY nombre_producto,productos.id_producto,categoria_producto.id_categoria_producto,estado_producto.estado_producto,tipo_auto.tipo_auto';
        $params = array("%$valor%", "%$valor%", "%$valor%");
        return Database::getRows($sql, $params);
    }
}
