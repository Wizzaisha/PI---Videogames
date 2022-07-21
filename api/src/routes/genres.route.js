require('dotenv').config();
const express = require("express");
const axios = require("axios");
// const fetch = require('node-fetch');

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

    const findData = await Genre.findAll();
    
    if(!findData.length) {
        try {
                    // Con axios
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const dataJson = response.data;

        
        // Con fecth
        // const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        // const dataJson = await response.json();

        // Promise para agregar todos los generos
        await Promise.all(
            dataJson["results"].map((genre) => Genre.findOrCreate({ where: {name: genre.name} }))
        )

        res.status(201).send("Data successfully added to the database.");
        } catch (error) {
            res.status(400).send({error: error.message});
        }

    } else {
        res.status(200).send(findData);
    }
    
        

});


module.exports = router;