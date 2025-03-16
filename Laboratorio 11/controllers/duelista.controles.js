const Duelista = require('../models/duelista.model.js');

//Inicio

exports.get_inicio = (request, response, nexts) => {
    response.render('index');
};

exports.get_preguntas = (request, response, nexts) => {
    response.render('index_lab5');
};

exports.get_agregar = (request, response, next) => {
    response.render('agregar_duelista');
};

exports.post_agregar = (request, response, next) => {
    console.log(request.body);
    const duelista = new Duelista(request.body.nombre);
    duelista.save();
    console.log(Duelista.fetchAll());
    response.redirect('/duelista');
};

exports.get_lista = (request, response, next) => { 
    response.render('lista_duelistas', {
        duelistas: Duelista.fetchAll(),
    });
};

exports.get_mostrar = (request, response, next) => {
    const path = require('path');
    response.sendFile(path.join(__dirname, '..', 'paguinas', 'index.html'));
};
