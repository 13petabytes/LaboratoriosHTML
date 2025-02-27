const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const querystring = require("querystring");

const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // ✅ 1. Manejo de archivos estáticos (CSS, imágenes, JS, etc.)
    if (pathname === "/style.css") {
        fs.readFile("style.css", function(err, data) {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Archivo no encontrado");
            } else {
                res.writeHead(200, { "Content-Type": "text/css" });
                res.end(data);
            }
        });
        return;
    }

    // ✅ 2. Página principal (HTML)
    if (pathname === "/") {
        fs.readFile("index.html", function(err, data) {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error interno del servidor");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
        return;
    }

    // ✅ 3. Otras páginas (about, contact)
    if (pathname === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Acerca de</h1><p>Esta es la página de información.</p>");
        return;
    }

    if (pathname === "/contact") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Contacto</h1><p>Correo: contacto@ejemplo.com</p>");
        return;
    }

    // ✅ 4. Procesar formulario y guardar la contraseña en datos.txt
    if (pathname === "/submit" && req.method === "POST") {
        let body = "";
        req.on("data", function(chunk) {
            body += chunk.toString();
        });

        req.on("end", function() {
            const formData = querystring.parse(body);
            const password = formData.password || "Contraseña no recibida";

            fs.appendFile("datos.txt", `Contraseña recibida: ${password}\n`, function(err) {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Error al guardar los datos.");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end("<h1>Datos recibidos y guardados</h1><a href='/'>Volver</a>");
                }
            });
        });
        return;
    }

    // ✅ 5. Página no encontrada (404)
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Error 404: Página no encontrada</h1>");
});

// ✅ 6. Servidor escucha en el puerto 3000
server.listen(3000, function() {
    console.log("Servidor ejecutándose en http://localhost:3000");
});
