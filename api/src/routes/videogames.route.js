require('dotenv').config();
const express = require("express");
const axios = require("axios");

// Data controller
const { dataApiController, detailsApiController } = require("../utils.js"); 


// dotenv
const {
    API_KEY,
  } = process.env;

const { Videogame, Genre, Platforms } = require('../db.js');

const router = express.Router();

let INDEX = 0;

// Obligatorio
// GET /videogames
// GET /videogames?name="..."
router.get("/", async (req, res, next) => {
    const { name, typeReq } = req.query;

    const optionsApi = {
        params: {
            key: API_KEY
        }
    }

    const optionsDb = {
        include: [{model: Genre}, {model: Platforms}]
    }

    try {
        
        if (name) {
            optionsApi.params.search = name;
            optionsDb.where = {name: name};
        }

        // Datadb
        const dataFromDb = await Videogame.findAll(optionsDb);
        
        // DataAPI
        const response = await axios.get("https://api.rawg.io/api/games", optionsApi);
        const dataFromApi = dataApiController(response.data["results"]);

        // // Data combinada 
        const dataDbApi = [...dataFromApi, ...dataFromDb];
        
        if (typeReq) {
            if (typeReq === "database") res.status(200).send(dataFromDb);
            else if (typeReq === "api") res.status(200).send(dataFromApi);
            else if (typeReq === "both") res.status(200).send(dataDbApi);
        } else {
            if (dataDbApi.length > 15) {
                const arrData = dataDbApi.slice(0, 15);  
                res.status(200).send(arrData);
            }
            else if (dataDbApi.length === 0) res.status(200).send({message: `The videogame ${name} does not exist.`});
            else res.status(200).send(dataDbApi);
            
        }

    } catch (error) {
        res.status(400).send({error: error.message});
    }

    

});

router.get("/:idVideogame", async (req, res, next) => {
    const { idVideogame } = req.params;

    const optionsApi = {
        params: {
            key: API_KEY
        }
    };

    const optionsDb = {
        where: {id: idVideogame},
        
    };
    
    try {
        // Primero busca en la base de datos
        // Db data
        const dbData = await Videogame.findOne(optionsDb);

        if (dbData) {
            res.status(200).send(dbData);
        } else {
            // Si no esta en la bd busca en la API
            // Api data
            const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}`, optionsApi)
            const apiData = detailsApiController(response.data);
            

            if (apiData) res.status(200).send(apiData);
        } 

    } catch (error) {
        res.status(404).send({error: error.message});
    }


});


// Obligatorio
// POST /videogames
router.post("/", async (req, res, next) => {

    const { name, description, released, rating, background_image, playtime, genres, platforms } = req.body;

        try {
            
            const idAux = name.slice(0, name.length > 4 ? 3 : name.length);
            const id = `${INDEX}${idAux}`;
            const videoGameCreated = await Videogame.create({
                id,
                name,
                description,
                released,
                rating,
                background_image,
                playtime
            });

            INDEX++;

            // Funcion para crear o encontrar un genero o plataforma!
            const findOrCreateItem = async(name, model) => {
                const data = await model.findOrCreate({where: {name: name}});
                return data[0];
            }

            // Promesas para agregar plataformas y generos!
            await Promise.all(
                // Con este map se crean todos los generos uno por uno
                genres.map(async genre => videoGameCreated.addGenre(await findOrCreateItem(genre, Genre))),
                platforms.map(async platform => videoGameCreated.addPlatform(await findOrCreateItem(platform, Platforms)))
            )

            res.status(201).send({message: "Datos agregados exitosamente"});

        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }
    
    
);



module.exports = router;