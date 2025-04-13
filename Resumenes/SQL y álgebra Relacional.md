SQL (Structured Query Language) es el lenguaje utilizado por los sistemas de gestión de bases de datos (DBMS) para la definición y manipulación de bases de datos. Se basa en el álgebra relacional para obtener relaciones entre datos. La sintaxis básica de una consulta SQL incluye las cláusulas SELECT, FROM y WHERE.

SELECT especifica las columnas a consultar.
FROM indica las tablas de las cuales obtener los datos.
WHERE establece las condiciones para filtrar los resultados.
SQL es capaz de realizar las operaciones del álgebra relacional, como selección, proyección, uniones, intersecciones y diferencias. A continuación, se muestran equivalencias entre álgebra relacional y SQL:

Selección: SELECT * FROM materiales WHERE clave=1000
Proyección: SELECT clave, rfc, fecha FROM entregan
Unión: SELECT * FROM entregan WHERE clave=1000 UNION SELECT * FROM entregan WHERE clave=2000
Producto cartesiano: SELECT * FROM entregan, materiales
Para consultas más complejas, SQL permite el uso de funciones agregadas como SUM, AVG, MIN, MAX y COUNT. También se pueden agrupar los resultados con GROUP BY y filtrar los resultados agrupados con HAVING.

Ejemplos de consultas:

Para la cantidad total de productos vendidos por cada cliente: SELECT nocliente, fecha, SUM(cantidad), SUM(precioventa*cantidad) FROM ventas GROUP BY nocliente, fecha HAVING SUM(precioventa*cantidad) > 200
Para obtener estadísticas de toda la tabla sin agrupación: SELECT SUM(cantidad), SUM(precioventa*cantidad), AVG(cantidad), MIN(precioventa), MAX(precioventa) FROM ventas
SQL también permite realizar subconsultas y manejar operaciones como la intersección y la diferencia entre relaciones, aunque algunas operaciones (como INTERSECT y MINUS) solo están disponibles en ciertos sistemas DBMS como Oracle.
