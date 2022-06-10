PGDMP     6    .        	        z            dbGAAB_Store    14.1    14.1 m    w           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            x           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            z           1262    33922    dbGAAB_Store    DATABASE     j   CREATE DATABASE "dbGAAB_Store" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "dbGAAB_Store";
                postgres    false            �            1255    33923    ecomentario(integer) 	   PROCEDURE     �   CREATE PROCEDURE public.ecomentario(IN id_ integer)
    LANGUAGE sql
    AS $$update valoraciones set estado_valoracion='Inapropiado' where id_valoracion = id_ $$;
 3   DROP PROCEDURE public.ecomentario(IN id_ integer);
       public          postgres    false            �            1255    33924 �   inempleado(character varying, character varying, character varying, character varying, character varying, character varying, character varying, boolean, integer) 	   PROCEDURE     �  CREATE PROCEDURE public.inempleado(IN nombre character varying, IN apellido character varying, IN correo character varying, IN usuario character varying, IN contrasena character varying, IN dui character varying, IN imagen character varying, IN estado boolean, IN tipo integer)
    LANGUAGE sql
    AS $$insert into empleado values ((select max(id_empleado) + 1 from empleado),nombre,apellido,correo,usuario,contrasena,dui,imagen,estado,tipo);$$;
   DROP PROCEDURE public.inempleado(IN nombre character varying, IN apellido character varying, IN correo character varying, IN usuario character varying, IN contrasena character varying, IN dui character varying, IN imagen character varying, IN estado boolean, IN tipo integer);
       public          postgres    false            �            1255    33925 ;   modescripcio(character varying, integer, character varying) 	   PROCEDURE     -  CREATE PROCEDURE public.modescripcio(IN descripcion_producto character varying, IN id_producto_ integer, IN nombre_producto_ character varying)
    LANGUAGE sql
    AS $$update productos set descripcion = descripcion_producto where id_producto = id_producto_ or nombre_producto = nombre_producto_;$$;
 �   DROP PROCEDURE public.modescripcio(IN descripcion_producto character varying, IN id_producto_ integer, IN nombre_producto_ character varying);
       public          postgres    false            �            1255    33926    sp_agregar()    FUNCTION     �   CREATE FUNCTION public.sp_agregar() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin

insert into "log_agregar_producto" values (new.nombre_producto, current_date);

return new;
end
$$;
 #   DROP FUNCTION public.sp_agregar();
       public          postgres    false            �            1255    33927 #   sp_datos_cliente(character varying)    FUNCTION     d  CREATE FUNCTION public.sp_datos_cliente(character varying) RETURNS TABLE(num1 character varying, num2 character varying, num3 character varying, num4 character varying, num5 character varying)
    LANGUAGE sql
    AS $_$

select nombre_cliente, apellido_cliente, telefono_cliente, correo_cliente,  dui_cliente from cliente where usuario_cliente = $1

$_$;
 :   DROP FUNCTION public.sp_datos_cliente(character varying);
       public          postgres    false            �            1255    33928    sp_editar()    FUNCTION     �   CREATE FUNCTION public.sp_editar() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin

insert into "log_editar_producto" values (old.nombre_producto, new.nombre_producto);

return new;
end
$$;
 "   DROP FUNCTION public.sp_editar();
       public          postgres    false            �            1255    33929    sp_eliminar()    FUNCTION     �   CREATE FUNCTION public.sp_eliminar() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin

insert into "log_eliminar_producto" values (old.nombre_producto, current_date);

return new;
end
$$;
 $   DROP FUNCTION public.sp_eliminar();
       public          postgres    false            �            1255    33930 +   sp_fechas_compra_usuario(character varying)    FUNCTION     �   CREATE FUNCTION public.sp_fechas_compra_usuario(character varying) RETURNS TABLE(fecha1 date)
    LANGUAGE sql
    AS $_$

select fecha from factura inner join cliente on factura.id_cliente = cliente.id_cliente where cliente.usuario_cliente = $1

$_$;
 B   DROP FUNCTION public.sp_fechas_compra_usuario(character varying);
       public          postgres    false            �            1255    33931 &   sp_valor_inventario(character varying)    FUNCTION     �   CREATE FUNCTION public.sp_valor_inventario(nombre character varying) RETURNS numeric
    LANGUAGE sql
    AS $$

select cant_producto * precio_producto from productos where nombre_producto = nombre;

$$;
 D   DROP FUNCTION public.sp_valor_inventario(nombre character varying);
       public          postgres    false            �            1259    33932    categoria_producto    TABLE     �   CREATE TABLE public.categoria_producto (
    id_categoria_producto integer NOT NULL,
    nombre_categoria character varying(50) NOT NULL,
    imagen_categoria character varying(1000) NOT NULL
);
 &   DROP TABLE public.categoria_producto;
       public         heap    postgres    false            �            1259    33937 ,   categoria_producto_id_categoria_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_producto_id_categoria_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE public.categoria_producto_id_categoria_producto_seq;
       public          postgres    false    209            {           0    0 ,   categoria_producto_id_categoria_producto_seq    SEQUENCE OWNED BY     }   ALTER SEQUENCE public.categoria_producto_id_categoria_producto_seq OWNED BY public.categoria_producto.id_categoria_producto;
          public          postgres    false    210            �            1259    33938    cliente    TABLE     
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
       public         heap    postgres    false            �            1259    33943    cliente_id_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_cliente_seq;
       public          postgres    false    211            |           0    0    cliente_id_cliente_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    212            �            1259    33944    detalle_factura    TABLE     �   CREATE TABLE public.detalle_factura (
    id_detalle_factura integer NOT NULL,
    cantidad_producto integer NOT NULL,
    precio_unitario numeric(6,2) NOT NULL,
    id_producto integer NOT NULL,
    id_factura integer NOT NULL
);
 #   DROP TABLE public.detalle_factura;
       public         heap    postgres    false            �            1259    33947 &   detalle_factura_id_detalle_factura_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_factura_id_detalle_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.detalle_factura_id_detalle_factura_seq;
       public          postgres    false    213            }           0    0 &   detalle_factura_id_detalle_factura_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.detalle_factura_id_detalle_factura_seq OWNED BY public.detalle_factura.id_detalle_factura;
          public          postgres    false    214            �            1259    33948    empleado    TABLE       CREATE TABLE public.empleado (
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
       public         heap    postgres    false            �            1259    33953    empleado_id_empleado_seq    SEQUENCE     �   CREATE SEQUENCE public.empleado_id_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.empleado_id_empleado_seq;
       public          postgres    false    215            ~           0    0    empleado_id_empleado_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.empleado_id_empleado_seq OWNED BY public.empleado.id_empleado;
          public          postgres    false    216            �            1259    33954    estado_cliente    TABLE     �   CREATE TABLE public.estado_cliente (
    id_estado_cliente integer NOT NULL,
    estado_cliente character varying(20) NOT NULL
);
 "   DROP TABLE public.estado_cliente;
       public         heap    postgres    false            �            1259    33957 $   estado_cliente_id_estado_cliente_seq    SEQUENCE     �   CREATE SEQUENCE public.estado_cliente_id_estado_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.estado_cliente_id_estado_cliente_seq;
       public          postgres    false    217                       0    0 $   estado_cliente_id_estado_cliente_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.estado_cliente_id_estado_cliente_seq OWNED BY public.estado_cliente.id_estado_cliente;
          public          postgres    false    218            �            1259    33958    estado_producto    TABLE     �   CREATE TABLE public.estado_producto (
    id_estado_producto integer NOT NULL,
    estado_producto character varying(25) NOT NULL
);
 #   DROP TABLE public.estado_producto;
       public         heap    postgres    false            �            1259    33961 &   estado_producto_id_estado_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.estado_producto_id_estado_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.estado_producto_id_estado_producto_seq;
       public          postgres    false    219            �           0    0 &   estado_producto_id_estado_producto_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.estado_producto_id_estado_producto_seq OWNED BY public.estado_producto.id_estado_producto;
          public          postgres    false    220            �            1259    33962    factura    TABLE     �   CREATE TABLE public.factura (
    id_factura integer NOT NULL,
    fecha date,
    total numeric(9,2),
    estado_factura character varying(20) NOT NULL,
    direccion character varying(250),
    id_cliente integer NOT NULL
);
    DROP TABLE public.factura;
       public         heap    postgres    false            �            1259    33965    factura_id_factura_seq    SEQUENCE     �   CREATE SEQUENCE public.factura_id_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.factura_id_factura_seq;
       public          postgres    false    221            �           0    0    factura_id_factura_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.factura_id_factura_seq OWNED BY public.factura.id_factura;
          public          postgres    false    222            �            1259    33966    log_agregar_producto    TABLE     z   CREATE TABLE public.log_agregar_producto (
    nombre_producto character varying(50) NOT NULL,
    fecha date NOT NULL
);
 (   DROP TABLE public.log_agregar_producto;
       public         heap    postgres    false            �            1259    33969    log_editar_producto    TABLE     �   CREATE TABLE public.log_editar_producto (
    nombre_antiguo character varying(50) NOT NULL,
    nombre_nuevo character varying(50) NOT NULL
);
 '   DROP TABLE public.log_editar_producto;
       public         heap    postgres    false            �            1259    33972    log_eliminar_producto    TABLE     {   CREATE TABLE public.log_eliminar_producto (
    nombre_producto character varying(50) NOT NULL,
    fecha date NOT NULL
);
 )   DROP TABLE public.log_eliminar_producto;
       public         heap    postgres    false            �            1259    33975 	   productos    TABLE     �  CREATE TABLE public.productos (
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
       public         heap    postgres    false            �            1259    33980    productos_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.productos_id_producto_seq;
       public          postgres    false    226            �           0    0    productos_id_producto_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.productos_id_producto_seq OWNED BY public.productos.id_producto;
          public          postgres    false    227            �            1259    33981 	   tipo_auto    TABLE     �   CREATE TABLE public.tipo_auto (
    id_tipo_auto integer NOT NULL,
    tipo_auto character varying(20) NOT NULL,
    imagen_tipo_auto character varying(1000) NOT NULL
);
    DROP TABLE public.tipo_auto;
       public         heap    postgres    false            �            1259    33986    tipo_auto_id_tipo_auto_seq    SEQUENCE     �   CREATE SEQUENCE public.tipo_auto_id_tipo_auto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.tipo_auto_id_tipo_auto_seq;
       public          postgres    false    228            �           0    0    tipo_auto_id_tipo_auto_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.tipo_auto_id_tipo_auto_seq OWNED BY public.tipo_auto.id_tipo_auto;
          public          postgres    false    229            �            1259    33987    tipo_empleado    TABLE        CREATE TABLE public.tipo_empleado (
    id_tipo_empleado integer NOT NULL,
    tipo_empleado character varying(25) NOT NULL
);
 !   DROP TABLE public.tipo_empleado;
       public         heap    postgres    false            �            1259    33990 "   tipo_empleado_id_tipo_empleado_seq    SEQUENCE     �   CREATE SEQUENCE public.tipo_empleado_id_tipo_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.tipo_empleado_id_tipo_empleado_seq;
       public          postgres    false    230            �           0    0 "   tipo_empleado_id_tipo_empleado_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.tipo_empleado_id_tipo_empleado_seq OWNED BY public.tipo_empleado.id_tipo_empleado;
          public          postgres    false    231            �            1259    33991    valoraciones    TABLE       CREATE TABLE public.valoraciones (
    id_valoracion integer NOT NULL,
    calidad_productos integer,
    fecha_comentario date NOT NULL,
    comentario character varying(200) NOT NULL,
    estado_valoracion character varying(20) NOT NULL,
    id_detalle_factura integer NOT NULL
);
     DROP TABLE public.valoraciones;
       public         heap    postgres    false            �            1259    33994    valoraciones_id_valoracion_seq    SEQUENCE     �   CREATE SEQUENCE public.valoraciones_id_valoracion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.valoraciones_id_valoracion_seq;
       public          postgres    false    232            �           0    0    valoraciones_id_valoracion_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.valoraciones_id_valoracion_seq OWNED BY public.valoraciones.id_valoracion;
          public          postgres    false    233            �           2604    33995 (   categoria_producto id_categoria_producto    DEFAULT     �   ALTER TABLE ONLY public.categoria_producto ALTER COLUMN id_categoria_producto SET DEFAULT nextval('public.categoria_producto_id_categoria_producto_seq'::regclass);
 W   ALTER TABLE public.categoria_producto ALTER COLUMN id_categoria_producto DROP DEFAULT;
       public          postgres    false    210    209            �           2604    33996    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    212    211            �           2604    33997 "   detalle_factura id_detalle_factura    DEFAULT     �   ALTER TABLE ONLY public.detalle_factura ALTER COLUMN id_detalle_factura SET DEFAULT nextval('public.detalle_factura_id_detalle_factura_seq'::regclass);
 Q   ALTER TABLE public.detalle_factura ALTER COLUMN id_detalle_factura DROP DEFAULT;
       public          postgres    false    214    213            �           2604    33998    empleado id_empleado    DEFAULT     |   ALTER TABLE ONLY public.empleado ALTER COLUMN id_empleado SET DEFAULT nextval('public.empleado_id_empleado_seq'::regclass);
 C   ALTER TABLE public.empleado ALTER COLUMN id_empleado DROP DEFAULT;
       public          postgres    false    216    215            �           2604    33999     estado_cliente id_estado_cliente    DEFAULT     �   ALTER TABLE ONLY public.estado_cliente ALTER COLUMN id_estado_cliente SET DEFAULT nextval('public.estado_cliente_id_estado_cliente_seq'::regclass);
 O   ALTER TABLE public.estado_cliente ALTER COLUMN id_estado_cliente DROP DEFAULT;
       public          postgres    false    218    217            �           2604    34000 "   estado_producto id_estado_producto    DEFAULT     �   ALTER TABLE ONLY public.estado_producto ALTER COLUMN id_estado_producto SET DEFAULT nextval('public.estado_producto_id_estado_producto_seq'::regclass);
 Q   ALTER TABLE public.estado_producto ALTER COLUMN id_estado_producto DROP DEFAULT;
       public          postgres    false    220    219            �           2604    34001    factura id_factura    DEFAULT     x   ALTER TABLE ONLY public.factura ALTER COLUMN id_factura SET DEFAULT nextval('public.factura_id_factura_seq'::regclass);
 A   ALTER TABLE public.factura ALTER COLUMN id_factura DROP DEFAULT;
       public          postgres    false    222    221            �           2604    34002    productos id_producto    DEFAULT     ~   ALTER TABLE ONLY public.productos ALTER COLUMN id_producto SET DEFAULT nextval('public.productos_id_producto_seq'::regclass);
 D   ALTER TABLE public.productos ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    227    226            �           2604    34003    tipo_auto id_tipo_auto    DEFAULT     �   ALTER TABLE ONLY public.tipo_auto ALTER COLUMN id_tipo_auto SET DEFAULT nextval('public.tipo_auto_id_tipo_auto_seq'::regclass);
 E   ALTER TABLE public.tipo_auto ALTER COLUMN id_tipo_auto DROP DEFAULT;
       public          postgres    false    229    228            �           2604    34004    tipo_empleado id_tipo_empleado    DEFAULT     �   ALTER TABLE ONLY public.tipo_empleado ALTER COLUMN id_tipo_empleado SET DEFAULT nextval('public.tipo_empleado_id_tipo_empleado_seq'::regclass);
 M   ALTER TABLE public.tipo_empleado ALTER COLUMN id_tipo_empleado DROP DEFAULT;
       public          postgres    false    231    230            �           2604    34005    valoraciones id_valoracion    DEFAULT     �   ALTER TABLE ONLY public.valoraciones ALTER COLUMN id_valoracion SET DEFAULT nextval('public.valoraciones_id_valoracion_seq'::regclass);
 I   ALTER TABLE public.valoraciones ALTER COLUMN id_valoracion DROP DEFAULT;
       public          postgres    false    233    232            \          0    33932    categoria_producto 
   TABLE DATA           g   COPY public.categoria_producto (id_categoria_producto, nombre_categoria, imagen_categoria) FROM stdin;
    public          postgres    false    209   0�       ^          0    33938    cliente 
   TABLE DATA           �   COPY public.cliente (id_cliente, nombre_cliente, apellido_cliente, telefono_cliente, usuario_cliente, contrasenia, imagen_perfil_cliente, correo_cliente, dui_cliente, id_estado_cliente) FROM stdin;
    public          postgres    false    211   ��       `          0    33944    detalle_factura 
   TABLE DATA           z   COPY public.detalle_factura (id_detalle_factura, cantidad_producto, precio_unitario, id_producto, id_factura) FROM stdin;
    public          postgres    false    213   Փ       b          0    33948    empleado 
   TABLE DATA           �   COPY public.empleado (id_empleado, nombre_empleado, apellido_empleado, correo_empleado, usuario_empleado, contrasenia_empleado, dui_empleado, imagen_perfil_empleado, estado_empleado, id_tipo_empleado) FROM stdin;
    public          postgres    false    215   ��       d          0    33954    estado_cliente 
   TABLE DATA           K   COPY public.estado_cliente (id_estado_cliente, estado_cliente) FROM stdin;
    public          postgres    false    217   3�       f          0    33958    estado_producto 
   TABLE DATA           N   COPY public.estado_producto (id_estado_producto, estado_producto) FROM stdin;
    public          postgres    false    219   _�       h          0    33962    factura 
   TABLE DATA           b   COPY public.factura (id_factura, fecha, total, estado_factura, direccion, id_cliente) FROM stdin;
    public          postgres    false    221   ��       j          0    33966    log_agregar_producto 
   TABLE DATA           F   COPY public.log_agregar_producto (nombre_producto, fecha) FROM stdin;
    public          postgres    false    223   ��       k          0    33969    log_editar_producto 
   TABLE DATA           K   COPY public.log_editar_producto (nombre_antiguo, nombre_nuevo) FROM stdin;
    public          postgres    false    224   З       l          0    33972    log_eliminar_producto 
   TABLE DATA           G   COPY public.log_eliminar_producto (nombre_producto, fecha) FROM stdin;
    public          postgres    false    225   6�       m          0    33975 	   productos 
   TABLE DATA           �   COPY public.productos (id_producto, nombre_producto, descripcion, cant_producto, imagen_producto, precio_producto, id_categoria_producto, id_estado_producto, id_tipo_auto, id_empleado) FROM stdin;
    public          postgres    false    226   l�       o          0    33981 	   tipo_auto 
   TABLE DATA           N   COPY public.tipo_auto (id_tipo_auto, tipo_auto, imagen_tipo_auto) FROM stdin;
    public          postgres    false    228   ��       q          0    33987    tipo_empleado 
   TABLE DATA           H   COPY public.tipo_empleado (id_tipo_empleado, tipo_empleado) FROM stdin;
    public          postgres    false    230   ޝ       s          0    33991    valoraciones 
   TABLE DATA           �   COPY public.valoraciones (id_valoracion, calidad_productos, fecha_comentario, comentario, estado_valoracion, id_detalle_factura) FROM stdin;
    public          postgres    false    232   �       �           0    0 ,   categoria_producto_id_categoria_producto_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('public.categoria_producto_id_categoria_producto_seq', 5, true);
          public          postgres    false    210            �           0    0    cliente_id_cliente_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 14, true);
          public          postgres    false    212            �           0    0 &   detalle_factura_id_detalle_factura_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.detalle_factura_id_detalle_factura_seq', 23, true);
          public          postgres    false    214            �           0    0    empleado_id_empleado_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.empleado_id_empleado_seq', 7, true);
          public          postgres    false    216            �           0    0 $   estado_cliente_id_estado_cliente_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.estado_cliente_id_estado_cliente_seq', 2, true);
          public          postgres    false    218            �           0    0 &   estado_producto_id_estado_producto_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.estado_producto_id_estado_producto_seq', 2, true);
          public          postgres    false    220            �           0    0    factura_id_factura_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.factura_id_factura_seq', 16, true);
          public          postgres    false    222            �           0    0    productos_id_producto_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.productos_id_producto_seq', 26, true);
          public          postgres    false    227            �           0    0    tipo_auto_id_tipo_auto_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.tipo_auto_id_tipo_auto_seq', 4, true);
          public          postgres    false    229            �           0    0 "   tipo_empleado_id_tipo_empleado_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.tipo_empleado_id_tipo_empleado_seq', 3, true);
          public          postgres    false    231            �           0    0    valoraciones_id_valoracion_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.valoraciones_id_valoracion_seq', 7, true);
          public          postgres    false    233            �           2606    34007 (   categoria_producto pk_categoria_producto 
   CONSTRAINT     y   ALTER TABLE ONLY public.categoria_producto
    ADD CONSTRAINT pk_categoria_producto PRIMARY KEY (id_categoria_producto);
 R   ALTER TABLE ONLY public.categoria_producto DROP CONSTRAINT pk_categoria_producto;
       public            postgres    false    209            �           2606    34009    cliente pk_cliente 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT pk_cliente PRIMARY KEY (id_cliente);
 <   ALTER TABLE ONLY public.cliente DROP CONSTRAINT pk_cliente;
       public            postgres    false    211            �           2606    34011 "   detalle_factura pk_detalle_factura 
   CONSTRAINT     p   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT pk_detalle_factura PRIMARY KEY (id_detalle_factura);
 L   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT pk_detalle_factura;
       public            postgres    false    213            �           2606    34013    empleado pk_empleado 
   CONSTRAINT     [   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT pk_empleado PRIMARY KEY (id_empleado);
 >   ALTER TABLE ONLY public.empleado DROP CONSTRAINT pk_empleado;
       public            postgres    false    215            �           2606    34015     estado_cliente pk_estado_cliente 
   CONSTRAINT     m   ALTER TABLE ONLY public.estado_cliente
    ADD CONSTRAINT pk_estado_cliente PRIMARY KEY (id_estado_cliente);
 J   ALTER TABLE ONLY public.estado_cliente DROP CONSTRAINT pk_estado_cliente;
       public            postgres    false    217            �           2606    34017 "   estado_producto pk_estado_producto 
   CONSTRAINT     p   ALTER TABLE ONLY public.estado_producto
    ADD CONSTRAINT pk_estado_producto PRIMARY KEY (id_estado_producto);
 L   ALTER TABLE ONLY public.estado_producto DROP CONSTRAINT pk_estado_producto;
       public            postgres    false    219            �           2606    34019    factura pk_factura 
   CONSTRAINT     X   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT pk_factura PRIMARY KEY (id_factura);
 <   ALTER TABLE ONLY public.factura DROP CONSTRAINT pk_factura;
       public            postgres    false    221            �           2606    34021    productos pk_producto 
   CONSTRAINT     \   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT pk_producto PRIMARY KEY (id_producto);
 ?   ALTER TABLE ONLY public.productos DROP CONSTRAINT pk_producto;
       public            postgres    false    226            �           2606    34023    tipo_auto pk_tipo_auto 
   CONSTRAINT     ^   ALTER TABLE ONLY public.tipo_auto
    ADD CONSTRAINT pk_tipo_auto PRIMARY KEY (id_tipo_auto);
 @   ALTER TABLE ONLY public.tipo_auto DROP CONSTRAINT pk_tipo_auto;
       public            postgres    false    228            �           2606    34025    tipo_empleado pk_tipo_empleado 
   CONSTRAINT     j   ALTER TABLE ONLY public.tipo_empleado
    ADD CONSTRAINT pk_tipo_empleado PRIMARY KEY (id_tipo_empleado);
 H   ALTER TABLE ONLY public.tipo_empleado DROP CONSTRAINT pk_tipo_empleado;
       public            postgres    false    230            �           2606    34027    valoraciones pk_valoracion 
   CONSTRAINT     c   ALTER TABLE ONLY public.valoraciones
    ADD CONSTRAINT pk_valoracion PRIMARY KEY (id_valoracion);
 D   ALTER TABLE ONLY public.valoraciones DROP CONSTRAINT pk_valoracion;
       public            postgres    false    232            �           2620    34028    productos tr_agregar    TRIGGER     n   CREATE TRIGGER tr_agregar AFTER INSERT ON public.productos FOR EACH ROW EXECUTE FUNCTION public.sp_agregar();
 -   DROP TRIGGER tr_agregar ON public.productos;
       public          postgres    false    237    226            �           2620    34029    productos tr_editar    TRIGGER     l   CREATE TRIGGER tr_editar AFTER UPDATE ON public.productos FOR EACH ROW EXECUTE FUNCTION public.sp_editar();
 ,   DROP TRIGGER tr_editar ON public.productos;
       public          postgres    false    226    239            �           2620    34030    productos tr_eliminar    TRIGGER     p   CREATE TRIGGER tr_eliminar AFTER DELETE ON public.productos FOR EACH ROW EXECUTE FUNCTION public.sp_eliminar();
 .   DROP TRIGGER tr_eliminar ON public.productos;
       public          postgres    false    226    240            �           2606    34031    productos fk_categoria_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_categoria_producto FOREIGN KEY (id_categoria_producto) REFERENCES public.categoria_producto(id_categoria_producto);
 I   ALTER TABLE ONLY public.productos DROP CONSTRAINT fk_categoria_producto;
       public          postgres    false    226    209    3247            �           2606    34036    factura fk_cliente    FK CONSTRAINT     ~   ALTER TABLE ONLY public.factura
    ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente);
 <   ALTER TABLE ONLY public.factura DROP CONSTRAINT fk_cliente;
       public          postgres    false    3249    221    211            �           2606    34041    valoraciones fk_detalle_factura    FK CONSTRAINT     �   ALTER TABLE ONLY public.valoraciones
    ADD CONSTRAINT fk_detalle_factura FOREIGN KEY (id_detalle_factura) REFERENCES public.detalle_factura(id_detalle_factura);
 I   ALTER TABLE ONLY public.valoraciones DROP CONSTRAINT fk_detalle_factura;
       public          postgres    false    3251    213    232            �           2606    34046    productos fk_empleado    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_empleado FOREIGN KEY (id_empleado) REFERENCES public.empleado(id_empleado) NOT VALID;
 ?   ALTER TABLE ONLY public.productos DROP CONSTRAINT fk_empleado;
       public          postgres    false    226    3253    215            �           2606    34051    cliente fk_estado_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT fk_estado_cliente FOREIGN KEY (id_estado_cliente) REFERENCES public.estado_cliente(id_estado_cliente);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT fk_estado_cliente;
       public          postgres    false    3255    217    211            �           2606    34056    productos fk_estado_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_estado_producto FOREIGN KEY (id_estado_producto) REFERENCES public.estado_producto(id_estado_producto) NOT VALID;
 F   ALTER TABLE ONLY public.productos DROP CONSTRAINT fk_estado_producto;
       public          postgres    false    3257    226    219            �           2606    34061    detalle_factura fk_factura    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT fk_factura FOREIGN KEY (id_factura) REFERENCES public.factura(id_factura) NOT VALID;
 D   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT fk_factura;
       public          postgres    false    3259    213    221            �           2606    34066    detalle_factura fk_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);
 E   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT fk_producto;
       public          postgres    false    3261    226    213            �           2606    34071    productos fk_tipo_auto    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT fk_tipo_auto FOREIGN KEY (id_tipo_auto) REFERENCES public.tipo_auto(id_tipo_auto) NOT VALID;
 @   ALTER TABLE ONLY public.productos DROP CONSTRAINT fk_tipo_auto;
       public          postgres    false    226    3263    228            �           2606    34076    empleado fk_tipo_empleado    FK CONSTRAINT     �   ALTER TABLE ONLY public.empleado
    ADD CONSTRAINT fk_tipo_empleado FOREIGN KEY (id_tipo_empleado) REFERENCES public.tipo_empleado(id_tipo_empleado);
 C   ALTER TABLE ONLY public.empleado DROP CONSTRAINT fk_tipo_empleado;
       public          postgres    false    230    215    3265            \   w   x�]�1�0 ��yLE7�;H��uQ
�;���!X��zؘ�*K��(�L8rD�Η�C�>��T�~;������n��1E����o�Y��D��L_�9�|6�!�}�c�{�},�      ^     x�m�Mn�0���sxKפ���a�F[���E�nh�V�H����m���+A�PJ ˨���Û��W_�����^@qa��(��eW7���G�Ǵ�Y>K|�<�� �D��V������ky��K�$7���>B����.x/�\j7D#U��Uݹ���\ y� Z��_�s>�̩/��(a��
;����}�HԂpEE��U�u�l�]���m��iX�}�aw�*q�D���	2*#Z:8-/q�h�%#
q���}?*�綴x/�*��+(��I��o�ˎ�P�˨�#���ʖIV'��o�܇Q��JK�c[�ȇ����l)Bb��<�i���B�ܑ@�D�z��kol�;��h�2������S���Z�(Ԃ<�V�?���?Q�O/s��e�mwz� �D�o��hk�f��x�J �6k����!Q���9e�S:���O���M�������1�������v��&*��ԇ�K��n|��>�@2�́�D86�=Ӟ9��BP����f����!8      `   �   x�M���0��a���w���8C��JA�g� ��q�?��v@(�K	l�P���G}Ҵ���AK4"�a���xG�'V�`�1�`�ۇ0���P%���&������.��w��3Py��Yj`?�=�-}�}��K�����nVx��2a�W������},4�      b   �  x�U��r�0�ׇ���[R�@��C��Y؝t2��T"K� w�w�S��*.+,��o>�#D�����hȝ��%�n�������$�Q��R.H�U�C$��Sg��:�-t��w �H�.��$����"a���Ӎ�[kt�"�9�sTxk�:�%�ĥ#q(�C�)�U�^�97>���9�,��H��:f���h�ja�ΡyA��\-1pyp�Y��1EpR,J�r�r=l�3jo�i���zh�.�1CY
ŀ5��Q�=��������z
e<�Hf���e��4W���5W�����8{���B kmj=�M	w��{v=U#T�M ��yE֫���/��~�6�������q��J<=�=�~0S~M?���{iͮ�F��Lr&���)l��uE��m�      d      x�3�tL.�,��2���K�0c���� ^��      f      x�3�t�S(.�O��2�΄�c���� t��      h   �   x�}��n� ��y�T�` �.�iҞ��(��vQ25U���h��j��ØV̹���Y)e��M[�zX_2�ʪm�l9Z���`�x��Ptj]�%��
s�IE�e�
��g�v*M��}�/P�[>�\���_����������b�H�'�D�DHj���ɃH�io�sRC�GnsU���Oԣ�<U�.h�d��D����p8W������_��e��֣�����M�}�����*�lW���X�|      j   &   x�+(�O)M.��4202�50�52�*�3����� 0��      k   V  x��W1n�0��W��C ��A�n]�	(b@���N}B>VIuR7	�t(:T�Hޝ�3��^P�l`��fm�=��ط�Tj1¸���320qv�����
{u\��ݰD�nѰ�qq������Le*S��T�2��a$ٽ��'���T&V�r���{�a0Egا%w��Ժ��f6d#�c ��7��(�;v�c~��{\aP��?\:R�fY�tC�a�>lݏ�L+��O�Fo�<��"a�}s������a���94쨉i�g��\���g���sX�+!���9L��a��,v8A�4�d�Z����7��=8��f)��v�F����� �;�P��      l   &   x�+(�O)M.��4202�50�52�*�3����� 0��      m     x�}V�r�6]C_�P\��\ƪ�ub��t��@E� �6��.:��X. ҄�xF�A
��%��۝6�ڎLh���Bb��w�0��A�^
֮1׍��ʭ��f��AiIDc�U%H����ۢ$�.������]�A����E$�o�S�뛱[�3��wwo�`�ig�RJ�v&ٲ5AɊ�h�z��'[�˿��;=h�x#vZ=��x��#�h5'qM*�FVH)ЈѦQ����v�n�¤ռ �D/��Q����?�r��),�=�as��4DxK�K&��?2r�-W/���W5ؕ8�0?���*�.N��ʅ+O��^�t�j-K�5k�e�~�u#��}J��%��_���#ܰ��X��4
�=�핾��}zx�	*�i��=R�9��k�ƉŸT��L�9�t�19�v������X� �r�Ћ̇((@[�)�g��������wc�e��K�d��ڇm��F�9��tPM��"��k�~[���c5$�}����[��`�*{yu�����ǩ
�U)���;ga�	���Y�ȃ&�ilW����~>��̏{E �yAs�3􄘠[+*М�Ϝځ��˿��GoH>����٨ J�QQҪ������q�o�@��zg���UK�[�H8ޫF�-p�ճ��BR'�H\����a�7��C�Y�P�`�W|���
NΎ�	�	~�t��̖�64�0��avn�J��>�˝4�9l�}�A`L�my6�a���w�od3ȯA�(S�H��Oa�,�\��ԣ4{Wig��eK�EZ]�{RM��w�l��}T�R��2��9l6����D�9�/���("Ƨٴ�&k�}����H�px����.�77��E-Jvt�\�	�S@J��<[:�pTv:��1� @��L�
RE&BL�w��z��?�9���_j�����(�e��i��Ѓ <���q�*��Rv������?���yB�7��ϻ�8���jA���b��^9��ݏ�g�ʄVqL��γp��q�Z��z��      o   9   x�3��L��--�,I-.�2�NMĨp�9�s3��RK!&���%�v� \ �      q   -   x�3�tO-J�+I�2�tN�J-��2�.-H-*�,�/����� ��
�      s     x�U�AN�@EמS� �LJ
K��@BH�ٸ�����L2n�8B/�(o����vp�t�(��t�}��q%(��H\!%�#7�]Ǚ"�F��^��i)�SO�������6T��O����=a�?(Uv�i��B�1�Y�
W£$̔t&�kH��sZ�li�����6�Ouy�=/����`�K{3E�-�9j��u�݁��V
`�]����c���p?j��C�ܦ�yI:�ב���Ȍc�^����̩���U��XzҌ~X&wּ\c����2     