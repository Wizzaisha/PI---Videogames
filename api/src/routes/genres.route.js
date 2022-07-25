require('dotenv').config();
const express = require("express");
const axios = require("axios");
// const fetch = require('node-fetch');


// Data controller
const { genreAndPlatformsDataController } = require("../utils.js"); 


// dotenv
const {
    API_KEY,
  } = process.env;


// Model import
const { Genre } = require('../db.js');

// Router import
const router = express.Router();

// Oligatorio
// GET /genres
router.get("/", async (req, res, next) => {

    try {

        const findData = await Genre.findAll();

        // Con axios
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const dataJson = genreAndPlatformsDataController(response.data["results"]);

        // // Con fecth
        // const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        // // Aqui faltaria el paso de convertir la data
        // const dataJson = await response.json();
        

        if(findData.length === 0 || findData.length < dataJson.length) {
            // Promise para agregar todos los generos
            await Promise.all(
                dataJson.map((genre) => Genre.findOrCreate({ 
                    where: {
                        name: genre.name
                    },
                }))
            );

            res.status(201).send({message: "Data successfully added to the database."});
        } else {
            res.status(200).send(findData);
        }

    } catch (error) {
        res.status(400).send({error: error.message});
    }

});


module.exports = router;