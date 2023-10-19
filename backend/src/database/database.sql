CREATE DATABASE Inmuebles;

CREATE TABLE inmuebles(
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(255) 
);

INSERT INTO inmuebles (descripcion)
    VALUES ('descripcion de propiedad numero 1, esta es una descripción de pruegba'),
    ('propiedad numero dos, seguimos probando con otra descripcion, un poco mas larga esta vez que la anterior para probar diferentes formatos'),
    ('descripcion corta');

select * from inmuebles;