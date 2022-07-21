const express = require("express");
const model = require("../models/Videogame.js");

const router = express.Router();


router.get("/", (req, res, next) => {
    res.send({
        message: "Bienvenido al servidor del PI-VIDEOGAMES de Wizz",
        navigation: {
          videogames: "/videogames es la ruta donde se realizan todos los llamados a los datos relacionados a los videogames.",
          genre: "/genre es la ruta donde se realizan todos los llamados los datos relacionados al genre."
        } 
    });
});



module.exports = router;