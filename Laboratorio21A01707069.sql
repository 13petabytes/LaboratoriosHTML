SELECT 
    SUM(E.Cantidad) AS TotalCantidad,
    SUM(E.Cantidad * M.Precio * (1 + M.Impuesto/100)) AS ImporteTotal
FROM Entregan E, Materiales M
WHERE E.Clave = M.Clave
AND YEAR(E.Fecha) = 1997;

SELECT 
    P.RazonSocial,
    COUNT(*) AS NumeroEntregas,
    SUM(E.Cantidad * M.Precio * (1 + M.Impuesto/100)) AS ImporteTotal
FROM Entregan E, Materiales M, Proveedores P
WHERE E.Clave = M.Clave
AND E.RFC = P.RFC
GROUP BY P.RazonSocial;

SELECT 
    M.Clave,
    M.Descripcion,
    SUM(E.Cantidad) AS TotalCantidad,
    MIN(E.Cantidad) AS MinimaCantidad,
    MAX(E.Cantidad) AS MaximaCantidad,
    SUM(E.Cantidad * M.Precio * (1 + M.Impuesto/100)) AS ImporteTotal
FROM Entregan E, Materiales M
WHERE E.Clave = M.Clave
GROUP BY M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) > 400;

SELECT 
    P.RazonSocial,
    M.Clave,
    M.Descripcion,
    AVG(E.Cantidad) AS PromedioCantidad
FROM Entregan E, Materiales M, Proveedores P
WHERE E.Clave = M.Clave
AND E.RFC = P.RFC
GROUP BY P.RazonSocial, M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) >= 500;

SELECT 
    CASE 
        WHEN AVG(E.Cantidad) < 370 THEN 'Grupo < 370'
        WHEN AVG(E.Cantidad) > 450 THEN 'Grupo > 450'
    END AS Grupo,
    P.RazonSocial,
    M.Clave,
    M.Descripcion,
    AVG(E.Cantidad) AS PromedioCantidad
FROM Entregan E, Materiales M, Proveedores P
WHERE E.Clave = M.Clave
AND E.RFC = P.RFC
GROUP BY P.RazonSocial, M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) < 370 OR AVG(E.Cantidad) > 450;


INSERT INTO Materiales VALUES ('2010', 'Cemento gris', 120.5, 16, 2.0);
INSERT INTO Materiales VALUES ('2020', 'Arena fina', 85.0, 8, 2.0);
INSERT INTO Materiales VALUES ('2030', 'Grava 3/4', 100.0, 10, 2.0);
INSERT INTO Materiales VALUES ('2040', 'Varilla 3/8', 210.0, 16, 2.0);
INSERT INTO Materiales VALUES ('2050', 'Tabique rojo', 4.5, 8, 2.0);

SELECT Clave, Descripcion
FROM Materiales
WHERE Clave NOT IN (SELECT DISTINCT Clave FROM Entregan);

SELECT RazonSocial
FROM Proveedores P
WHERE RFC IN (
    SELECT RFC FROM Entregan E
    JOIN Proyectos PR ON E.Numero = PR.Numero
    WHERE PR.Denominacion = 'Vamos México'
)
AND RFC IN (
    SELECT RFC FROM Entregan E
    JOIN Proyectos PR ON E.Numero = PR.Numero
    WHERE PR.Denominacion = 'Querétaro Limpio'
);

SELECT M.Descripcion
FROM Materiales M
WHERE M.Clave NOT IN (
    SELECT E.Clave
    FROM Entregan E
    JOIN Proyectos P ON E.Numero = P.Numero
    WHERE P.Denominacion = 'CIT Yucatán'
);

SELECT 
    P.RazonSocial,
    AVG(E.Cantidad) AS Promedio_Proveedor
FROM Entregan E
JOIN Proveedores P ON E.RFC = P.RFC
GROUP BY P.RFC, P.RazonSocial
HAVING AVG(E.Cantidad) > (
    SELECT AVG(Cantidad)
    FROM Entregan
    WHERE RFC = 'VAGO780901'
);

SELECT 
    P.RFC,
    P.RazonSocial
FROM Proveedores P
WHERE RFC IN (
    SELECT E.RFC
    FROM Entregan E
    JOIN Proyectos PR ON E.Numero = PR.Numero
    WHERE PR.Denominacion = 'Infonavit Durango'
    GROUP BY E.RFC
    HAVING 
        SUM(CASE WHEN EXTRACT(YEAR FROM Fecha) = 2000 THEN Cantidad ELSE 0 END) >
        SUM(CASE WHEN EXTRACT(YEAR FROM Fecha) = 2001 THEN Cantidad ELSE 0 END)
);

