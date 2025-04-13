El diseño de bases de datos relacionales busca minimizar redundancias y optimizar la recuperación de información. Para ello, se emplea el Modelo Entidad-Relación (ER), propuesto por Peter Chen en 1976, que representa datos mediante entidades, asociaciones y atributos.

Problemas en el diseño de bases de datos
Un mal diseño genera:

Redundancia de datos, lo que implica almacenamiento ineficiente.
Inconsistencias en actualizaciones.
Valores nulos excesivos, lo que puede desperdiciar espacio.
Fases del diseño de bases de datos
Recolección y análisis de requerimientos: Se identifican necesidades de los usuarios.
Diseño conceptual: Se modela la base con el MER.
Diseño lógico: Se convierte el MER a un modelo relacional.
Diseño físico: Se organizan archivos y estructuras de almacenamiento.
Elementos del Modelo ER
Entidades: Representan objetos del mundo real y se dibujan como rectángulos.
Asociaciones: Representan relaciones entre entidades y se dibujan como rombos.
Atributos: Propiedades de entidades o asociaciones, representadas en el modelo con distintos tipos (simples, compuestos, mono/multivaluados, almacenados/derivados).
Identificadores: Claves primarias que identifican de forma única cada entidad.
Cardinalidad y Participación
Cardinalidad: Define el número de elementos relacionados en cada entidad (1:1, 1:N, N:N).
Participación: Puede ser total (todos los elementos deben estar relacionados) o parcial.
Modelo ER Extendido
Incluye conceptos avanzados como:

Roles: Cuando una entidad tiene más de una función en una relación.
Generalización y especialización: Definen jerarquías de entidades mediante relaciones ISA (superclase-subclase).
Este modelo ayuda a diseñar bases de datos eficientes, garantizando coherencia, optimización del almacenamiento y flexibilidad en la representación de datos.
