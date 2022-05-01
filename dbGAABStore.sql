PGDMP                         z            dbGAABStore    14.0    14.0 m    w           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            x           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            z           1262    25923    dbGAABStore    DATABASE     i   CREATE DATABASE "dbGAABStore" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "dbGAABStore";
                postgres    false            �            1255    26071    ecomentario(integer) 	   PROCEDURE     �   CREATE PROCEDURE public.ecomentario(IN id_ integer)
    LANGUAGE sql
    AS $$update valoraciones set estado_valoracion='Inapropiado' where id_valoracion = id_ $$;
 3   DROP PROCEDURE public.ecomentario(IN id_ integer);
       public          postgres    false            �            1255    26070 �   inempleado(character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, integer) 	   PROCEDURE     �  CREATE PROCEDURE public.inempleado(IN nombre character varying, IN apellido character varying, IN correo character varying, IN usuario character varying, IN contrasena character varying, IN dui character varying, IN imagen character varying, IN estado boolean, IN tipo integer)
    LANGUAGE sql
    AS $$insert into empleado values ((select max(id_empleado) + 1 from empleado),nombre,apellido,correo,usuario,contrasena,dui,imagen,estado,tipo);$$;
   DROP PROCEDURE public.inempleado(IN nombre character varying, IN apellido character varying, IN correo character varying, IN usuario character varying, IN contrasena character varying, IN dui character varying, IN imagen character varying, IN estado boolean, IN tipo integer);
       public          postgres    false            �            1255    26061 ;   modescripcio(character varying, integer, character varying) 	   PROCEDURE     -  CREATE PROCEDURE public.modescripcio(IN descripcion_producto character varying, IN id_producto_ integer, IN nombre_producto_ character varying)
    LANGUAGE sql
    AS $$update productos set descripcion = descripcion_producto where id_producto = id_producto_ or nombre_producto = nombre_producto_;$$;
 �   DROP PROCEDURE public.modescripcio(IN descripcion_producto character varying, IN id_producto_ integer, IN nombre_producto_ character varying);
       public          postgres    false            �            1255    26072    sp_agregar()    FUNCTION     �   CREATE FUNCTION public.sp_agregar() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin

insert into "log_agregar_producto" values (new.nombre_producto, current_date);

return new;
end
$$;
 #   DROP FUNCTION public.sp_agregar();
       public          postgres    false            �            1255    26089 #   sp_datos_cliente(character varying)    FUNCTION     d  CREATE FUNCTION public.sp_datos_cliente(character varying) RETURNS TABLE(num1 character varying, num2 character varying, num3 character varying, num4 character varying, num5 character varying)
    LANGUAGE sql
    AS $_$

select nombre_cliente, apellido_cliente, telefono_cliente, correo_cliente,  dui_cliente from cliente where usuario_cliente = $1

$_$;
 :   DROP FUNCTION public.sp_datos_cliente(character varying);
       public          postgres    false            �            1255    26077    sp_editar()    FUNCTION     �   CREATE FUNCTION public.sp_editar() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin

insert into "log_editar_producto" values (old.nombre_producto, new.nombre_producto);

return new;
end
$$;
 "   DROP FUNCTION public.sp_editar();
       public          postgres    false            �            1255    26082    sp_eliminar()    FUNCTION     �   CREATE FUNCTION public.sp_eliminar() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin

insert into "log_eliminar_producto" values (old.nombre_producto, current_date);

return new;
end
$$;
 $   DROP FUNCTION public.sp_eliminar();
       public          postgres    false            �            1255    26088 +   sp_fechas_compra_usuario(character varying)    FUNCTION     �   CREATE FUNCTION public.sp_fechas_compra_usuario(character varying) RETURNS TABLE(fecha1 date)
    LANGUAGE sql
    AS $_$

select fecha from factura inner join cliente on factura.id_cliente = cliente.id_cliente where cliente.usuario_cliente = $1

$_$;
 B   DROP FUNCTION public.sp_fechas_compra_usuario(character varying);
       public          postgres    false            �            1255    26087 &   sp_valor_inventario(character varying)    FUNCTION     �   CREATE FUNCTION public.sp_valor_inventario(nombre character varying) RETURNS numeric
    LANGUAGE sql
    AS $$

select cant_producto * precio_producto from productos where nombre_producto = nombre;

$$;
 D   DROP FUNCTION public.sp_valor_inventario(nombre character varying);
       public          postgres    false            �            1259    25924    categoria_producto    TABLE     �   CREATE TABLE public.categoria_producto (
    id_categoria_producto integer NOT NULL,
    nombre_categoria character varying(50) NOT NULL,
    imagen_categoria character varying(1000) NOT NULL
);
 &   DROP TABLE public.categoria_producto;
       public         heap    postgres    false            �            1259    25929 ,   categoria_producto_id_categoria_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_producto_id_categoria_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE public.categoria_producto_id_categoria_producto_seq;
       public          postgres    false    209            {           0    0 ,   categoria_producto_id_categoria_producto_seq    SEQUENCE OWNED BY     }   ALTER SEQUENCE public.categoria_producto_id_categoria_producto_seq OWNED BY public.categoria_producto.id_categoria_producto;
          public          postgres    false    210            �            1259    25930    cliente    TABLE     
  CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre_cliente character varying(50) NOT NULL,
    apellido_cliente character varying(50) NOT NULL,
    telefono_cliente character varying(9) NOT NULL,
    usuario_cliente character varying(20) NOT NULL,
    contrasenia character varying(100) NOT NULL,
    imagen_perfil_cliente character varying(1000) NOT NULL,
    correo_cliente character varying(100) NOT NULL,
    dui_cliente character varying(10) NOT NULL,
    id_estado_cliente integer NOT NULL
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    25935    cliente_id_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_cliente_seq;
       public          postgres    false    211            |           0    0    cliente_id_cliente_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    212            �            1259    25936    detalle_factura    TABLE     �   CREATE TABLE public.detalle_factura (
    id_detalle_factura integer NOT NULL,
    cantidad_producto integer NOT NULL,
    precio_unitario numeric(6,2) NOT NULL,
    id_producto integer NOT NULL,
    id_factura integer NOT NULL
);
 #   DROP TABLE public.detalle_factura;
       public         heap    postgres    false            �            1259    25939 &   detalle_factura_id_detalle_factura_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_factura_id_detalle_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.detalle_factura_id_detalle_factura_seq;
       public          postgres    false    213            }           0    0 &   detalle_factura_id_detalle_factura_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.detalle_factura_id_detalle_factura_seq OWNED BY public.detalle_factura.id_detalle_factura;
          public          postgres    false    214            �            1259    25940    empleado    TABLE       CREATE TABLE public.empleado (
    id_empleado integer NOT NULL,
    nombre_empleado character varying(50) NOT NULL,
    apellido_empleado character varying(50) NOT NULL,
    correo_empleado character varying(100) NOT NULL,
    usuario_empleado character varying(50) NOT NULL,
    contrasenia_empleado character varying(100) NOT NULL,
    dui_empleado character varying(10) NOT NULL,
    imagen_perfil_empleado character varying(1000) NOT NULL,
    estado_empleado boolean NOT NULL,
    id_tipo_empleado integer NOT NULL
);
    DROP TABLE public.empleado;
       public         heap    postgres    false            �            1259    25945    empleado_id_empleado_seq    SEQUENCE     �   CREATE SEQUENCE public.empleado_id_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.empleado_id_empleado_seq;
       public          postgres    false    215            ~           0    0    empleado_id_empleado_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.empleado_id_empleado_seq OWNED BY public.empleado.id_empleado;
          public          postgres    false    216            �            1259    25946    estado_cliente    TABLE     �   CREATE TABLE public.estado_cliente (
    id_estado_cliente integer NOT NULL,
    estado_cliente character varying(20) NOT NULL
);
 "   DROP TABLE public.estado_cliente;
       public         heap    postgres    false            �            1259    25949 $   estado_cliente_id_estado_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.estado_cliente_id_estado_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.estado_cliente_id_estado_cliente_seq;
       public          postgres    false    217                       0    0 $   estado_cliente_id_estado_cliente_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.estado_cliente_id_estado_cliente_seq OWNED BY public.estado_cliente.id_estado_cliente;
          public          postgres    false    218            �            1259    25950    estado_producto    TABLE     �   CREATE TABLE public.estado_producto (
    id_estado_producto integer NOT NULL,
    estado_producto character varying(25) NOT NULL
);
 #   DROP TABLE public.estado_producto;
       public         heap    postgres    false            �            1259    25953 &   estado_producto_id_estado_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.estado_producto_id_estado_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.estado_producto_id_estado_producto_seq;
       public          postgres    false    219            �           0    0 &   estado_producto_id_estado_producto_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.estado_producto_id_estado_producto_seq OWNED BY public.estado_producto.id_estado_producto;
          public          postgres    false    220            �            1259    25954    factura    TABLE     �   CREATE TABLE public.factura (
    id_factura integer NOT NULL,
    fecha date NOT NULL,
    total numeric(6,2) NOT NULL,
    estado_factura character varying(20) NOT NULL,
    direccion character varying(250) NOT NULL,
    id_cliente integer NOT NULL
);
    DROP TABLE public.factura;
       public         heap    postgres    false            �            1259    25957    factura_id_factura_seq    SEQUENCE     �   CREATE SEQUENCE public.factura_id_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.factura_id_factura_seq;
       public          postgres    false    221            �           0    0    factura_id_factura_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.factura_id_factura_seq OWNED BY public.factura.id_factura;
          public          postgres    false    222            �            1259    26074    log_agregar_producto    TABLE     z   CREATE TABLE public.log_agregar_producto (
    nombre_producto character varying(50) NOT NULL,
    fecha date NOT NULL
);
 (   DROP TABLE public.log_agregar_producto;
       public         heap    postgres    false            �            1259    26079    log_editar_producto    TABLE     �   CREATE TABLE public.log_editar_producto (
    nombre_antiguo character varying(50) NOT NULL,
    nombre_nuevo character varying(50) NOT NULL
);
 '   DROP TABLE public.log_editar_producto;
       public         heap    postgres    false            �            1259    26084    log_eliminar_producto    TABLE     {   CREATE TABLE public.log_eliminar_producto (
    nombre_producto character varying(50) NOT NULL,
    fecha date NOT NULL
);
 )   DROP TABLE public.log_eliminar_producto;
       public         heap    postgres    false            �            1259    25958 	   productos    TABLE     �  CREATE TABLE public.productos (
    id_producto integer NOT NULL,
    nombre_producto character varying(50) NOT NULL,
    descripcion character varying(150) NOT NULL,
    cant_producto integer NOT NULL,
    imagen_producto character varying(1000) NOT NULL,
    precio_producto numeric(6,2) NOT NULL,
    id_categoria_producto integer NOT NULL,
    id_estado_producto integer NOT NULL,
    id_tipo_auto integer NOT NULL,
    id_empleado integer NOT NULL
);
    DROP TABLE public.productos;
       public         heap    postgres    false            �            1259    25963    productos_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.productos_id_producto_seq;
       public          postgres    false    223            �           0    0    productos_id_producto_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.productos_id_producto_seq OWNED BY public.productos.id_producto;
          public          postgres    false    224            �            1259    25964 	   tipo_auto    TABLE     �   CREATE TABLE public.tipo_auto (
    id_tipo_auto integer NOT NULL,
    tipo_auto character varying(20) NOT NULL,
    imagen_tipo_auto character varying(1000) NOT NULL
);
    DROP TABLE public.tipo_auto;
       public         heap    postgres    false            �            1259    25969    tipo_auto_id_tipo_auto_seq    SEQUENCE     �   CREATE SEQUENCE public.tipo_auto_id_tipo_auto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.tipo_auto_id_tipo_auto_seq;
       public          postgres    false    225            �           0    0    tipo_auto_id_tipo_auto_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.tipo_auto_id_tipo_auto_seq OWNED BY public.tipo_auto.id_tipo_auto;
          public          postgres    false    226            �            1259    25970    tipo_empleado    TABLE        CREATE TABLE public.tipo_empleado (
    id_tipo_empleado integer NOT NULL,
    tipo_empleado character varying(25) NOT NULL
);
 !   DROP TABLE public.tipo_empleado;
       public         heap    postgres    false            �            1259    25973 "   tipo_empleado_id_tipo_empleado_seq    SEQUENCE     �   CREATE SEQUENCE public.tipo_empleado_id_tipo_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.tipo_empleado_id_tipo_empleado_seq;
       public          postgres    false    227            �           0    0 "   tipo_empleado_id_tipo_empleado_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.tipo_empleado_id_tipo_empleado_seq OWNED BY public.tipo_empleado.id_tipo_empleado;
          public          postgres    false    228            �            1259    25974    valoraciones    TABLE     $  CREATE TABLE public.valoraciones (
    id_valoracion integer NOT NULL,
    calidad_productos integer NOT NULL,
    fecha_comentario date NOT NULL,
    comentario character varying(200) NOT NULL,
    estado_valoracion character varying(20) NOT NULL,
    id_detalle_factura integer NOT NULL
);
     DROP TABLE public.valoraciones;
       public         heap    postgres    false            �            1259    25977    valoraciones_id_valoracion_seq    SEQUENCE     �   CREATE SEQUENCE public.valoraciones_id_valoracion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.valoraciones_id_valoracion_seq;
       public          postgres    false    229            �           0    0    valoraciones_id_valoracion_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.valoraciones_id_valoracion_seq OWNED BY public.valoraciones.id_valoracion;
          public          postgres    false    230            �           2604    25978 (   categoria_producto id_categoria_producto    DEFAULT     �   ALTER TABLE ONLY public.categoria_producto ALTER COLUMN id_categoria_producto SET DEFAULT nextval('public.categoria_producto_id_categoria_producto_seq'::regclass);
 W   ALTER TABLE public.categoria_producto ALTER COLUMN id_categoria_producto DROP DEFAULT;
       public          postgres    false    210    209            �           2604    25979    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    212    211            �           2604    25980 "   detalle_factura id_detalle_factura    DEFAULT     �   ALTER TABLE ONLY public.detalle_factura ALTER COLUMN id_detalle_factura SET DEFAULT nextval('public.detalle_factura_id_detalle_factura_seq'::regclass);
 Q   ALTER TABLE public.detalle_factura ALTER COLUMN id_detalle_factura DROP DEFAULT;
       public          postgres    false    214    213            �           2604    25981    empleado id_empleado    DEFAULT     |   ALTER TABLE ONLY public.empleado ALTER COLUMN id_empleado SET DEFAULT nextval('public.empleado_id_empleado_seq'::regclass);
 C   ALTER TABLE public.empleado ALTER COLUMN id_empleado DROP DEFAULT;
       public          postgres    false    216    215            �           2604    25982     estado_cliente id_estado_cliente    DEFAULT     �   ALTER TABLE ONLY public.estado_cliente ALTER COLUMN id_estado_cliente SET DEFAULT nextval('public.estado_cliente_id_estado_cliente_seq'::regclass);
 O   ALTER TABLE public.estado_cliente ALTER COLUMN id_estado_cliente DROP DEFAULT;
       public          postgres    false    218    217            �           2604    25983 "   estado_producto id_estado_producto    DEFAULT     �   ALTER TABLE ONLY public.estado_producto ALTER COLUMN id_estado_producto SET DEFAULT nextval('public.estado_producto_id_estado_producto_seq'::regclass);
 Q   ALTER TABLE public.estado_producto ALTER COLUMN id_estado_producto DROP DEFAULT;
       public          postgres    false    220    219            �           2604    25984    factura id_factura    DEFAULT     x   ALTER TABLE ONLY public.factura ALTER COLUMN id_factura SET DEFAULT nextval('public.factura_id_factura_seq'::regclass);
 A   ALTER TABLE public.factura ALTER COLUMN id_factura DROP DEFAULT;
       public          postgres    false    222    221            �           2604    25985    productos id_producto    DEFAULT     ~   ALTER TABLE ONLY public.productos ALTER COLUMN id_producto SET DEFAULT nextval('public.productos_id_producto_seq'::regclass);
 D   ALTER TABLE public.productos ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    224    223            �           2604    25986    tipo_auto id_tipo_auto    DEFAULT     �   ALTER TABLE ONLY public.tipo_auto ALTER COLUMN id_tipo_auto SET DEFAULT nextval('public.tipo_auto_id_tipo_auto_seq'::regclass);
 E   ALTER TABLE public.tipo_auto ALTER COLUMN id_tipo_auto DROP DEFAULT;
       public          postgres    false    226    225            �           2604    25987    tipo_empleado id_tipo_empleado    DEFAULT     �   ALTER TABLE ONLY public.tipo_empleado ALTER COLUMN id_tipo_empleado SET DEFAULT nextval('public.tipo_empleado_id_tipo_empleado_seq'::regclass);
 M   ALTER TABLE public.tipo_empleado ALTER COLUMN id_tipo_empleado DROP DEFAULT;
       public          postgres    false    228    227            �           2604    25988    valoraciones id_valoracion    DEFAULT     �   ALTER TABLE ONLY public.valoraciones ALTER COLUMN id_valoracion SET DEFAULT nextval('public.valoraciones_id_valoracion_seq'::regclass);
 I   ALTER TABLE public.valoraciones ALTER COLUMN id_valoracion DROP DEFAULT;
       public          postgres    false    230    229            \          0    25924    categoria_producto 
   TABLE DATA           g   COPY public.categoria_producto (id_categoria_producto, nombre_categoria, imagen_categoria) FROM stdin;
    public          postgres    false    209   P�       ^          0    25930    cliente 
   TABLE DATA           �   COPY public.cliente (id_cliente, nombre_cliente, apellido_cliente, telefono_cliente, usuario_cliente, contrasenia, imagen_perfil_cliente, correo_cliente, dui_cliente, id_estado_cliente) FROM stdin;
    public          postgres    false    211   ��       `          0    25936    detalle_factura 
   TABLE DATA           z   COPY public.detalle_factura (id_detalle_factura, cantidad_producto, precio_unitario, id_producto, id_factura) FROM stdin;
    public          postgres    false    213   b�       b          0    25940    empleado 
   TABLE DATA           �   COPY public.empleado (id_empleado, nombre_empleado, apellido_empleado, correo_empleado, usuario_empleado, contrasenia_empleado, dui_empleado, imagen_perfil_empleado, estado_empleado, id_tipo_empleado) FROM stdin;
    public          postgres    false    215   �       d          0    25946    estado_cliente 
   TABLE DATA           K   COPY public.estado_cliente (id_estado_cliente, estado_cliente) FROM stdin;
    public          postgres    false    217   t�       f          0    25950    estado_producto 
   TABLE DATA           N   COPY public.estado_producto (id_estado_producto, estado_producto) FROM stdin;
    public          postgres    false    219   ��       h          0    25954    factura 
   TABLE DATA           b   COPY public.factura (id_factura, fecha, total, estado_factura, direccion, id_cliente) FROM stdin;
    public          postgres    false    221   ͕       r          0    26074    log_agregar_producto 
   TABLE DATA           F   COPY public.log_agregar_producto (nombre_producto, fecha) FROM stdin;
    public          postgres    false    231   ��       s          0    26079    log_editar_producto 
   TABLE DATA           K   COPY public.log_editar_producto (nombre_antiguo, nombre_nuevo) FROM stdin;
    public          postgres    false    232   Ȗ       t          0    26084    log_eliminar_producto 
   TABLE DATA           G   COPY public.log_eliminar_producto (nombre_producto, fecha) FROM stdin;
    public          postgres    false    233   &�       j          0    25958 	   productos 
   TABLE DATA           �   COPY public.productos (id_producto, nombre_producto, descripcion, cant_producto, imagen_producto, precio_producto, id_categoria_producto, id_estado_producto, id_tipo_auto, id_empleado) FROM stdin;
    public          postgres    false    223   \�       l          0    25964 	   tipo_auto 
   TABLE DATA           N   COPY public.tipo_auto (id_tipo_auto, tipo_auto, imagen_tipo_auto) FROM stdin;
    public          postgres    false    225   ܚ       n          0    25970    tipo_empleado 
   TABLE DATA           H   COPY public.tipo_empleado (id_tipo_empleado, tipo_empleado) FROM stdin;
    public          postgres    false    227   %�       p          0    25974    valoraciones 
   TABLE DATA           �   COPY public.valoraciones (id_valoracion, calidad_productos, fecha_comentario, comentario, estado_valoracion, id_detalle_factura) FROM stdin;
    public          postgres    false    229   b�       �           0    0 ,   categoria_producto_id_categoria_producto_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('public.categoria_producto_id_categoria_producto_seq', 5, true);
          public          postgres    false    210            �           0    0    cliente_id_cliente_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 13, true);
          public          postgres    false    212            �           0    0 &   detalle_factura_id_detalle_factura_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.detalle_factura_id_detalle_factura_seq', 20, true);
          public          postgres    false    214            �           0    0    empleado_id_empleado_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.empleado_id_empleado_seq', 7, true);
          public          postgres    false    216            �           0    0 $   estado_cliente_id_estado_cliente_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.estado_cliente_id_estado_cliente_seq', 2, true);
          public          postgres    false    218            �           0    0 &   estado_producto_id_estado_producto_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.estado_producto_id_estado_producto_seq', 2, true);
          public          postgres    false    220            �           0    0    factura_id_factura_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.factura_id_factura_seq', 10, true);
          public          postgres    false    222            �           0    0    productos_id_producto_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.productos_id_producto_seq', 26, true);
          public          postgres    false    224            �           0    0    tipo_auto_id_tipo_auto_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.tipo_auto_id_tipo_auto_seq', 4, true);
          public          postgres    false    226            �           0    0 "   tipo_empleado_id_tipo_empleado_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.tipo_empleado_id_tipo_empleado_seq', 3, true);
          public          postgres    false    228            �           0    0    valoraciones_id_valoracion_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.valoraciones_id_valoracion_seq', 6, true);
          public          postgres    false    230            �           2606    25990 (   categoria_producto pk_categoria_producto 
   CONSTRAINT     y   ALTER TABLE ONLY public.categoria_producto
    ADD CONSTRAINT pk_categoria_producto PRIMARY KEY (id_categoria_producto);
 R   ALTER TABLE ONLY public.categoria_producto DROP CONSTRAINT pk_categoria_producto;
       public            postgres    false    209            �           2606    25992    cliente pk_cliente 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT pk_cliente PRIMARY KEY (id_cliente);
 <   ALTER TABLE ONLY public.cliente DROP CONSTRAINT pk_cliente;
       public            postgres    false    211            �           2606    25994 "   detalle_factura pk_detalle_factura 
   CONSTRAINT     p   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT pk_detalle_factura PRIMARY KEY (id_detalle_factura);
 L   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT pk_detalle_factura;
       public            postgres    false    213            �           2606    25996    empleado pk_empleado 
   CONSTRAINT     [   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT pk_empleado PRIMARY KEY (id_empleado);
 >   ALTER TABLE ONLY public.empleado DROP CONSTRAINT pk_empleado;
       public            postgres    false    215            �           2606    25998     estado_cliente pk_estado_cliente 
   CONSTRAINT     m   ALTER TABLE ONLY public.estado_cliente
    ADD CONSTRAINT pk_estado_cliente PRIMARY KEY (id_estado_cliente);
 J   ALTER TABLE ONLY public.estado_cliente DROP CONSTRAINT pk_estado_cliente;
       public            postgres    false    217            �           2606    26000 "   estado_producto pk_estado_producto 
   CONSTRAINT     p   ALTER TABLE ONLY public.estado_producto
    ADD CONSTRAINT pk_estado_producto PRIMARY KEY (id_estado_producto);
 L   ALTER TABLE ONLY public.estado_producto DROP CONSTRAINT pk_estado_producto;
       public            postgres    false    219            �           2606    26002    factura pk_factura 
   CONSTRAINT     X   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT pk_factura PRIMARY KEY (id_factura);
 <   ALTER TABLE ONLY public.factura DROP CONSTRAINT pk_factura;
       public            postgres    false    221            �           2606    26004    productos pk_producto 
   CONSTRAINT     \   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT pk_producto PRIMARY KEY (id_producto);
 ?   ALTER TABLE ONLY public.productos DROP CONSTRAINT pk_producto;
       public            postgres    false    223            �           2606    26006    tipo_auto pk_tipo_auto 
   CONSTRAINT     ^   ALTER TABLE ONLY public.tipo_auto
    ADD CONSTRAINT pk_tipo_auto PRIMARY KEY (id_tipo_auto);
 @   ALTER TABLE ONLY public.tipo_auto DROP CONSTRAINT pk_tipo_auto;
       public            postgres    false    225            �           2606    26008    tipo_empleado pk_tipo_empleado 
   CONSTRAINT     j   ALTER TABLE ONLY public.tipo_empleado
    ADD CONSTRAINT pk_tipo_empleado PRIMARY KEY (id_tipo_empleado);
 H   ALTER TABLE ONLY public.tipo_empleado DROP CONSTRAINT pk_tipo_empleado;
       public            postgres    false    227            �           2606    26010    valoraciones pk_valoracion 
   CONSTRAINT     c   ALTER TABLE ONLY public.valoraciones
    ADD CONSTRAINT pk_valoracion PRIMARY KEY (id_valoracion);
 D   ALTER TABLE ONLY public.valoraciones DROP CONSTRAINT pk_valoracion;
       public            postgres    false    229            �           2620    26073    productos tr_agregar    TRIGGER     n   CREATE TRIGGER tr_agregar AFTER INSERT ON public.productos FOR EACH ROW EXECUTE FUNCTION public.sp_agregar();
 -   DROP TRIGGER tr_agregar ON public.productos;
       public          postgres    false    236    223            �           2620    26078    productos tr_editar    TRIGGER     l   CREATE TRIGGER tr_editar AFTER UPDATE ON public.productos FOR EACH ROW EXECUTE FUNCTION public.sp_editar();
 ,   DROP TRIGGER tr_editar ON public.productos;
       public          postgres    false    238    223            �           2620    26083    productos tr_eliminar    TRIGGER     p   CREATE TRIGGER tr_eliminar AFTER DELETE ON public.productos FOR EACH ROW EXECUTE FUNCTION public.sp_eliminar();
 .   DROP TRIGGER tr_eliminar ON public.productos;
       public          postgres    false    239    223            �           2606    26011    productos fk_categoria_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_categoria_producto FOREIGN KEY (id_categoria_producto) REFERENCES public.categoria_producto(id_categoria_producto);
 I   ALTER TABLE ONLY public.productos DROP CONSTRAINT fk_categoria_producto;
       public          postgres    false    209    3247    223            �           2606    26016    factura fk_cliente    FK CONSTRAINT     ~   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);
 <   ALTER TABLE ONLY public.factura DROP CONSTRAINT fk_cliente;
       public          postgres    false    221    3249    211            �           2606    26021    valoraciones fk_detalle_factura    FK CONSTRAINT     �   ALTER TABLE ONLY public.valoraciones
    ADD CONSTRAINT fk_detalle_factura FOREIGN KEY (id_detalle_factura) REFERENCES public.detalle_factura(id_detalle_factura);
 I   ALTER TABLE ONLY public.valoraciones DROP CONSTRAINT fk_detalle_factura;
       public          postgres    false    229    3251    213            �           2606    26026    productos fk_empleado    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_empleado FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado) NOT VALID;
 ?   ALTER TABLE ONLY public.productos DROP CONSTRAINT fk_empleado;
       public          postgres    false    215    223    3253            �           2606    26031    cliente fk_estado_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT fk_estado_cliente FOREIGN KEY (id_estado_cliente) REFERENCES public.estado_cliente(id_estado_cliente);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT fk_estado_cliente;
       public          postgres    false    211    3255    217            �           2606    26036    productos fk_estado_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_estado_producto FOREIGN KEY (id_estado_producto) REFERENCES public.estado_producto(id_estado_producto) NOT VALID;
 F   ALTER TABLE ONLY public.productos DROP CONSTRAINT fk_estado_producto;
       public          postgres    false    3257    223    219            �           2606    26041    detalle_factura fk_factura    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT fk_factura FOREIGN KEY (id_factura) REFERENCES public.factura(id_factura) NOT VALID;
 D   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT fk_factura;
       public          postgres    false    213    221    3259            �           2606    26046    detalle_factura fk_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);
 E   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT fk_producto;
       public          postgres    false    213    223    3261            �           2606    26051    productos fk_tipo_auto    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_tipo_auto FOREIGN KEY (id_tipo_auto) REFERENCES public.tipo_auto(id_tipo_auto) NOT VALID;
 @   ALTER TABLE ONLY public.productos DROP CONSTRAINT fk_tipo_auto;
       public          postgres    false    3263    225    223            �           2606    26056    empleado fk_tipo_empleado    FK CONSTRAINT     �   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT fk_tipo_empleado FOREIGN KEY (id_tipo_empleado) REFERENCES public.tipo_empleado(id_tipo_empleado);
 C   ALTER TABLE ONLY public.empleado DROP CONSTRAINT fk_tipo_empleado;
       public          postgres    false    3265    215    227            \   F   x�3���+I-��/J-�,I-.�2�t�@1��)M�qL8}S�/��LN��r��&�%�d��CDb���� O�b      ^   �  x�m��j�@���wِ���V��$l詗��u$mYI��mz��'?¾Xg�	H������|��o1������^�Z*��#ȪV���	^�"a_�=��M{�5Z���	�!t�}xf�SFTFy.����=e؇.0��*����GV�C��mv�ܓ�|Z��q)��}����c���꭬i@EVK�s~�m�oHF���Rs���瀌-d䢱\-4���)�4�65��֭�S��/$��)�2����p���#<��u8 ��WB�J�╲)t���;m�2u٣���	�����wh^x�ܫu�*�+���#|�6�;���e���N�8�a��˪�^�}±��B�.�V��O!M��i����Țk���³��Ӫ������a?���H�K��׫��inW�^����&Ꮫ�f�3O�x      `   �   x�E���0D�a���ۻt�9z�&���w��2�_]\v� 0��
oqe��U�4ehvi�"͗ �u�}8yW:���h��w1��)�����_%
yx�T�fm�V��y�,E��'��J~JK��%l���SO���9���R�/V,,�      b   `  x�U�KN�0E�7�`����xF[�����#����FNR��U�1�OU����tu��c���r�b,uh���3�vU���H��ˍP��z�����o�m{�@�Gg��|'�ٶ�D���๾K8^}l��ζ-!��1c���;�HĖW���L�`��́B��Chfn"��s1���J*��u��*�'rִ�S�	��Ղ�+��"+�8�JN�g�&|��c�3'�ϙ����EƄ��Le���^�w�hn7�I�)��	!u<3���>i��@�a\�&x�0�p���4��Q`��ǅ��xmj;�M����_F]O�Ԅ*=�)x�\�oF�{_eY�����      d      x�3�tL.�,��2���K�0c���� ^��      f      x�3�t�S(.�O��2�΄�c���� t��      h   �   x�}�=�0����@���M:B��
,t�` q~:�)�����@Y�f���]�c�c�����q�5"�[�5C#�q�A��8L��Mn;��D���ηh�����O�D�-�+?���=ZJ�J*q�� a�KtB.k��>B��n &����	"$<L`$�1�g���9L��yEDo�wm.      r   &   x�+(�O)M.��4202�50�52�*�3����� 0��      s   N   x�J-)�/�,�/J-��)�R�K��SH�*��B�q!)�B��������圓Y�������WRZ��ǉ.@��=... 5�>�      t   &   x�+(�O)M.��4202�50�52�*�3����� 0��      j   p  x��U�r�6}���$%��c���ԉ<v��C_V$��� 5�?�!�O��u$(+�x��򜳻gSr�U��k�Ҵe�f���|V9f�@��L+��i���wx����݂n�^.��ݿ[��(�eƒyq�ˊ��7���H& mTd%�l��+���s��JZAOǴuH�k��p����
��LZcU1RP�7�q<}�~����j�^~�����:��ps�X/*���L�[��Y>,nr�9��r�=ĺS!���^H�n�a-�3Zִsb- &Yi|�I
{'Ψd���FsC�Q�U]P��+2��$K����b���	t�c�����+�$��Ѓƍ݂F��\hЖŔ��&,���ӒD�"�;�`=��?��ʭߩfm�S���JFU��,�Y���)�i���*�O��,܊c�ɀ��+0���tv��'>���zDW�X	6�'$�Ag�g�~����y_��i�U`���Җci��>�c���ba��KŴsL�~�3�ޱM����b1����;�n��P'L�/J�!�v`�ɖ?A���o����y]�J�8l�o?����¾���?T�&a�W<p�Gco���E�Ho��vp4�ܯG|ǅ�	p�pa�:��[�6�Q��A��(w)�+۬��u,q@�s�F2Q��1`>az�lg���In����VY��F=�&A�>�׷��nfhĪ װF��I;��ڏ�$0��������O?Kr="(ɭ�}�8��oaO?-��/ŋ�"Q}��g&��)eǣ#���[֢U�n;nB����Чõrw\(�F��w,+�<y�_7U���׈����A+y؋��a�y�1�c��n�=f��\�r�?�'�ɿ��?      l   9   x�3��L��--�,I-.�2�NMĨp�9�s3��RK!&���%�v� \ �      n   -   x�3�tO-J�+I�2�tN�J-��2�.-H-*�,�/����� ��
�      p      x�U�KN�@�מS� �LJ`RH��1S�����8����Ԇ�7����BBU7U`���42J�S�>h+y�t�L8L��{.��8�)FQ��>S�-�@������u4�������ҝ�p�?V��1�K��[���
5<�b!��lל��pd]�|���a����R�q��f�q-�󥿝��BΆ�����#]��2<$�x������W����je��N���ϝͣ0N	����=_9�B�{     