const { Videogame } = require("../../src/db");
const { conn } = require("../../src/db");

const postData = {
    "id": "0Smo",
    "name": "Smol kiwawa",
    "description": "VIVA LA KIWAWA",
    "released": "2022-01-10",
    "rating": 5,
    "background_image": "https://storage.qoo-img.com/cimg/note/2022/05/26/929014749c44478aa30dca8f922dfecf.png",
    "playtime": 120,
    "originDatbase": true,
    "genres": [
        {
            "name": "Adventure"
        },
        {
            "name": "Action"
        },
        {
            "name": "RPG"
        }
    ],
    "platforms": [
        {
            "name": "PC" 
        },
        {
            "name": "PlayStation 5" 
        },
        {
            "name": "Xbox One" 
        }
    ]
};


describe("Videogame Model", () => {
    beforeAll(async () => {
        await conn.sync({ force: true });
        console.log('Wizz');
    });


    xtest("No deberia crear un videojuego si no se pasa un nombre", async () => {
        expect.assertions(1);
        try {
            await Videogame.create({
                id: postData.id,
                description: postData.description,
                background_image: postData.background_image
            })
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    xtest("No deberia crear un videojuego si no se pasa una descripcion", async () => {
        expect.assertions(1);
        try {
            await Videogame.create({
                id: postData.id,
                name: postData.name,
                background_image: postData.background_image
            })
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    xtest("No deberia crear un videojuego si no se pasa una imagen", async () => {
        expect.assertions(1);
        try {
            await Videogame.create({
                id: postData.id,
                name: postData.name,
                description: postData.description,
            })
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    });

    xtest("Deberia crear un videojuego si se cumplen con todos los requisitos", async () => {
        
        const videogame = await Videogame.create({
            id: postData.id,
            name: postData.name,
            description: postData.description,
            released: postData.released,
            rating: postData.rating,
            background_image: postData.background_image,
            playtime: postData.playtime,
            originDatbase: postData.originDatbase
        });

        expect(videogame.toJSON()).toEqual({
            id: postData.id,
            name: postData.name,
            description: postData.description,
            released: postData.released,
            rating: postData.rating,
            background_image: postData.background_image,
            playtime: postData.playtime,
            originDatbase: postData.originDatbase
        });
        
    });

})