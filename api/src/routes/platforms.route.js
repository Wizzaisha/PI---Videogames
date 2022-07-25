require('dotenv').config();
const express = require("express");
const axios = require("axios");

// dotenv
const {
    API_KEY,
  } = process.env;


// Data controller
const { genreAndPlatformsDataController, uniqueElements } = require("../utils.js"); 

// Model import
const { Platforms } = require('../db.js');

// Router import
const router = express.Router();

// Oligatorio
// GET /genres
router.get("/", async (req, res, next) => {

    try {

        const findData = await Platforms.findAll();
        const platFormsData = [];


        if (findData.length === 0){
            // Filtrando platforms desde la ruta /games
            const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
            // Corta los primeros 100 datos y los mapea a plataformas
            const gamesData = response.data["results"].slice(0, 100).map(game => game.platforms);
            // Extrae los nombres de las diferentes plataformas 
            gamesData.forEach(platforms => {
                platforms.forEach(e => platFormsData.push(e.platform));
            });
            // Formatea los datos a los deseados para subir a la base de datos!
            const filterData = genreAndPlatformsDataController(platFormsData);
            // Filtra los elementos unicos! por nombre!!!!!!
            const uniqueData = uniqueElements(filterData);
            
            // Promise para agregar todas las plataformas
            await Promise.all(
                uniqueData.map((platform) => Platforms.findOrCreate({ 
                    where: {
                        name: platform.name
                    }
                }))
            );

            res.status(201).send({message: "Datos agregados exitosamente"});

        } else {
            res.status(200).send(findData);
        }
    } catch (error) {
        res.status(400).send({error: error.message});
    }

});


module.exports = router;