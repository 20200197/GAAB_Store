<?php
/*
*	Clase para manejar la tabla usuarios de la base de datos.
*   Es clase hija de Validator.
*/
class Usuarios extends Validator
{
    // Declaración de atributos (propiedades).
    private $id = null;
    private $nombre_empleado = null;
    private $apellido_empleado = null;
    private $correo_empleado = null;
    private $usuario_empleado = null;
    private $contrasenia_empleado = null;
    private $dui_empleado = null;
    private $imagen_perfil_empleado = null;
    private $estado_empleado = null;
    private $id_tipo_empleado = null;
    private $ruta = '../imagenes/usuarios/';

    /*
    *   Métodos para validar y asignar valores de los atributos.
    */
  

    public function setId($value){
        if($this->validateNaturalNumber($value)){
            $this->id = $value;
            return true;
        }else{
            return false;
        }
    }

    public function setNombre_empleado($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombre_empleado = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setApellido_empleado($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->apellido_empleado = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setCorreo_empleado($value)
    {
        if ($this->validateEmail($value)) {
            $this->correo_empleado = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setUsuario_empleado($value)
    {
        if ($this->validateAlphanumeric($value, 1, 50)) {
            $this->usuario_empleado = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setContrasenia_empleado($value)
    {
        if ($this->validatePassword($value)) {
            $this->contrasenia_empleado = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            return false;
        }
    }

    public function setDui_empleado($value)
    {
        if ($this->validateDui($value, 10, 10)) {
            $this->dui_empleado = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setImagen_perfil_empleado($file)
    {
        if ($this->validateImageFile($file, 500, 500)) {
            $this->imagen_perfil_empleado = $this->getFileName();
            return true;
        } else {
            return false;
        }
    }

    public function setEstado_empleado($value)
    {
        if ($this->validateBoolean($value)) {
            $this->estado_empleado = $value;
            return true;
        } else {
            return false;
        }
    }

    public function setId_tipo_empleado($value)
    {
        if ($this->validateNaturalNumber($value)) {
            $this->id_tipo_empleado = $value;
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

    public function getNombre_empleado()
    {
        return $this->nombre_empleado;
    }

    public function getApellido_empleado()
    {
        return $this->apellido_empleado;
    }

    public function getCorreo_empleado()
    {
        return $this->correo_empleado;
    }

    public function getUsuario_empleado()
    {
        return $this->usuario_empleado;
    }

    public function getContrasenia_empleado()
    {
        return $this->contrasenia_empleado;
    }

    public function getDui_empleado()
    {
        return $this->dui_empleado;
    }

    public function getImagen_perfil_empleado()
    {
        return $this->imagen_perfil_empleado;
    }

    public function getEstado_empleado()
    {
        return $this->estado_empleado;
    }

    public function getId_estado_empleado()
    {
        return $this->estado_empleado;
    }

    public function getRuta()
    {
        return $this->ruta;
    }

    //Métodos para login

   //Función para checar usuario en login
    public function checkUser($usuario)
    {
        $sql = 'SELECT id_empleado,correo_empleado,imagen_perfil_empleado FROM empleado WHERE usuario_empleado = ?';
        $params = array($usuario);
        if ($data = Database::getRow($sql, $params)) {
            $this->id = $data['id_empleado'];
            $this->usuario_empleado = $usuario;
            $this->correo_empleado = $data['correo_empleado'];
            $this->imagen_perfil_empleado = $data['imagen_perfil_empleado'];
            return true;
        } else {
            return false;
        }
    }

    //Función para confirmar contraseña en el login
    public function checkPassword($password)
    {
        $sql = 'SELECT contrasenia_empleado FROM empleado WHERE id_empleado = ?';
        $params = array($this->id);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['contrasenia_empleado'])) {
            return true;
        } else {
            return false;
        }
    }

    //Función para leer perfil de empleado
    public function readProfile()
    {
        $sql = 'SELECT id_empleado, nombre_empleado, apellido_empleado, correo_empleado, usuario_empleado, dui_empleado,imagen_perfil_empleado
                FROM empleado
                WHERE id_empleado = ?';
        $params =  array($_SESSION['id_usuario']);
      //  $id_empleado_ = $params;
        return Database::getRow($sql, $params);
    }


    //Función para editar perfil de empleado
    public function editProfile($current_image)
    {
         // Se verifica si existe una nueva imagen para borrar la actual, de lo contrario se mantiene la actual.
         ($this->imagen_perfil_empleado) ? $this->deleteFile($this->getRuta(), $current_image) : $this->imagen_perfil_empleado = $current_image;

        $sql = 'UPDATE empleado
                SET nombre_empleado = ?, apellido_empleado = ?, correo_empleado = ?,usuario_empleado =?,imagen_perfil_empleado=?
                WHERE id_empleado = ?';
        $params = array($this->nombre_empleado, $this->apellido_empleado, $this->correo_empleado,$this->usuario_empleado,$this->imagen_perfil_empleado,$_SESSION['id_usuario']);
        return Database::executeRow($sql, $params);
    }

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, delete).
    */
   

    //Función para crear fila
    public function createUsuario()
    {
        $sql = 'INSERT INTO empleado(nombre_empleado, apellido_empleado, correo_empleado, usuario_empleado, contrasenia_empleado, dui_empleado, imagen_perfil_empleado, estado_empleado, id_tipo_empleado)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre_empleado, $this->apellido_empleado, $this->correo_empleado, $this->usuario_empleado, $this->contrasenia_empleado, $this->dui_empleado, $this->imagen_perfil_empleado,$this->estado_empleado, $this->id_tipo_empleado);
        return Database::executeRow($sql, $params);
    }

    //Función para leer los datos
    public function readAll()
    {
        $sql = 'SELECT id_empleado, nombre_empleado, apellido_empleado, correo_empleado, usuario_empleado, dui_empleado
                FROM empleado
                ORDER BY apellido_empleado';
        $params = null;
        return Database::getRows($sql, $params);
    }

    //Función para leer imagen de empleado
    public function readRegistro()
    {
        $sql = 'SELECT id_empleado, imagen_perfil_empleado
                FROM empleado
                where id_empleado=?';
        $params = array($_SESSION['id_usuario']);
        return Database::getRow($sql, $params);
    }

    //Función para cambiar contraseña
    public function changePassword()
    {
        $sql = 'UPDATE empleado SET contrasenia_empleado = ? WHERE id_empleado = ?';
        $params = array($this->contrasenia_empleado, $_SESSION['id_usuario']);
        return Database::executeRow($sql, $params);
    }

    public function readOnes()
    {
        $sql = 'SELECT  id_empleado, nombre_empleado, apellido_empleado, correo_empleado, usuario_empleado, dui_empleado, imagen_perfil_empleado
                FROM empleado
                WHERE id_empleado = ?';
        $params = array($_SESSION['id_usuario']);
        return Database::getRow($sql, $params);
    }

    
}

    
