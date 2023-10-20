CREATE DATABASE Inmuebles;

CREATE TABLE inmuebles(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    descripcion VARCHAR(255) 
);

INSERT INTO inmuebles (nombre,descripcion)
    VALUES ('Inmueble 1','descripcion de propiedad numero 1, esta es una descripción de pruegba'),
    ('Inmueble 2','propiedad numero dos, seguimos probando con otra descripcion, un poco mas larga esta vez que la anterior para probar diferentes formatos'),
    ('Inmueble 3','descripcion corta');

select * from inmuebles;