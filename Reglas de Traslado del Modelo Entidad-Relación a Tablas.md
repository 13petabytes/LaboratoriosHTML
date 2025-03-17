El Modelo Entidad-Relación (MER) debe traducirse a un Modelo Relacional (MR) para implementarse en bases de datos. Se usa la notación:
nombretabla(nombrecolumna1, nombrecolumna2, ...), donde las columnas subrayadas representan la llave primaria.

Reglas de Transferencia
Entidad → Tabla

Se crea una tabla con el mismo nombre que la entidad.
Las columnas corresponden a los atributos de la entidad.
El identificador de la entidad se convierte en la llave primaria.
Si no hay identificador, se crea una llave primaria artificial.
Asociaciones N:N → Nueva Tabla

Se crea una tabla con los identificadores de las entidades participantes.
La llave primaria es la combinación de las llaves de las entidades relacionadas.
Se pueden incluir atributos propios de la relación.
Asociaciones 1:N → Llave en la tabla del lado N

Se agrega la llave primaria de la entidad del lado 1 en la tabla del lado N.
No se crea una nueva tabla.
Asociaciones 1:1 → Llave en una tabla

Se agrega la llave primaria de una entidad a la otra.
Elementos adicionales
Relaciones ISA (Herencia)

La llave primaria de la entidad generalizadora es la misma en las entidades especializadas.
Entidades Fuertes y Débiles

La entidad fuerte hereda su identificador a la entidad débil.
La entidad débil debe incluir una columna adicional para distinguir sus registros.
Roles (Relaciones Reflexivas o Múltiples)

Se manejan como relaciones normales, pero se renombran los identificadores heredados según su función en la relación.
Este proceso garantiza la transformación eficiente del MER en un MR, asegurando consistencia e integridad en la base de datos.
