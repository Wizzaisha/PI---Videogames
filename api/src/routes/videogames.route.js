require('dotenv').config();
const { Op } = require("sequelize");
const express = require("express");
const axios = require("axios");

// Data controller
const { dataApiController, detailsApiController, apiCallGet } = require("../utils.js"); 


// dotenv
const {
    API_KEY,
  } = process.env;

const { Videogame, Genre, Platforms } = require('../db.js');
const e = require('express');

const router = express.Router();

let INDEX = 0;

// Obligatorio
// GET /videogames
// GET /videogames?name="..."
router.get("/", async (req, res, next) => {
    const { name } = req.query;

    const optionsApi = {
        params: {
            key: API_KEY,
        }
    }

    const optionsDb = {
        include: [{model: Genre}, {model: Platforms}]
    }

    try {
        
        if (name) {
            optionsApi.params.search = name;
            optionsDb.where = {
                name: {
                    [Op.substring]: name
                }
            };

            // Datadb
            const dataFromDb = await Videogame.findAll(optionsDb);
            
            // DataAPI
            const response = await axios.get("https://api.rawg.io/api/games", optionsApi);
            const dataFromApi = dataApiController(response.data["results"]);

            // Data combinada
            const dataDbApi = [...dataFromApi, ...dataFromDb];
            
            // Condicionales para enviar la data
            if (dataDbApi.length > 15 && dataFromDb.length < 15) {
                const arrData = [...dataFromApi.slice(0, 15 - dataFromDb.length), ...dataFromDb]; 
                res.status(200).send(arrData);
            }

            else if (dataFromDb.length > 15) res.status(200).send(dataFromDb.slice(0, 15)); 
            else if (dataDbApi.length === 0) res.status(200).send({message: `The videogame ${name} does not exist.`});
            else res.status(200).send(dataDbApi);
            
        } else {

            const dataFromDb = await Videogame.findAll(optionsDb);
            
            if (dataFromDb.length > 100) {
                res.status(200).send(dataFromDb);
            } else {
                const page_size_max = 40;
                const max = 100;
                let page = 1;
                let dataMax = max - dataFromDb.length;
                let numberCalls = [];

                while (dataMax > 0){
                    
                    if(dataMax > page_size_max){
                        numberCalls.push({
                            page_size: page_size_max,
                            page: page++
                        });
                    } else {
                        numberCalls.push({
                            page_size: dataMax,
                            page: page++
                        });
                    }
                    
                    dataMax -= page_size_max;
                };
                
                // Promise All de los llamados a la API
                const response = await Promise.all(
                    numberCalls.map(otp => axios.get("https://api.rawg.io/api/games", {params: {
                        key: API_KEY,
                        page_size: otp.page_size,
                        page: otp.page
                    }}))
                );
                
                // Obtener los datos del mapeo de la respuesta
                const dataReponse = response.map(element => element.data);

                const dataFormated = [];

                // Formateo de datos para añadirlos a un nuevo array
                dataReponse.forEach(element => {
                    dataFormated.push(dataApiController(element.results));
                });

                // Eliminacion de los array anidados para juntar los datos
                const dataFromApi = dataFormated.flat();
                
                // Juntar la data de la db con la api
                const dataDbApi = [...dataFromApi, ...dataFromDb];

                console.log(dataDbApi.length);
                res.status(200).send(dataDbApi);
            }
        
        };
    } catch (error) {
        res.status(400).send({error: error.message});
    };

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

    const { name, description, released, rating, background_image, playtime, genres, platforms, originDatbase } = req.body;

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
                playtime,
                originDatbase
            });

            INDEX++;

            // Funcion para crear o encontrar un genero o plataforma!
            const findOrCreateItem = async(data, model) => {
                const response = await model.findOrCreate({
                    where: {
                        name: data.name
                    }});
                return response[0];
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