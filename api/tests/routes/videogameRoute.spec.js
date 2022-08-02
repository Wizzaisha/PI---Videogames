const app = require("../../src/app");
const request = require("supertest");
const { conn } = require("../../src/db");

const videogameDetails = {
    "id": 3498,
    "name": "Grand Theft Auto V",
    "description": "<p>Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. <br />\nSimultaneous storytelling from three unique perspectives: <br />\nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. <br />\nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.</p>",
    "released": "2013-09-17",
    "rating": 4.48,
    "metacritic": 91,
    "background_image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    "playtime": 72,
    "platforms": [
        {
            "id": 4,
            "name": "PC",
            "slug": "pc",
            "image": null,
            "year_end": null,
            "year_start": null,
            "games_count": 467216,
            "image_background": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
        },
        {
            "id": 186,
            "name": "Xbox Series S/X",
            "slug": "xbox-series-x",
            "image": null,
            "year_end": null,
            "year_start": 2020,
            "games_count": 566,
            "image_background": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg"
        },
        {
            "id": 18,
            "name": "PlayStation 4",
            "slug": "playstation4",
            "image": null,
            "year_end": null,
            "year_start": null,
            "games_count": 6433,
            "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
        },
        {
            "id": 16,
            "name": "PlayStation 3",
            "slug": "playstation3",
            "image": null,
            "year_end": null,
            "year_start": null,
            "games_count": 3591,
            "image_background": "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg"
        },
        {
            "id": 14,
            "name": "Xbox 360",
            "slug": "xbox360",
            "image": null,
            "year_end": null,
            "year_start": null,
            "games_count": 2776,
            "image_background": "https://media.rawg.io/media/games/588/588c6bdff3d4baf66ec36b1c05b793bf.jpg"
        },
        {
            "id": 1,
            "name": "Xbox One",
            "slug": "xbox-one",
            "image": null,
            "year_end": null,
            "year_start": null,
            "games_count": 5345,
            "image_background": "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg"
        },
        {
            "id": 187,
            "name": "PlayStation 5",
            "slug": "playstation5",
            "image": null,
            "year_end": null,
            "year_start": 2020,
            "games_count": 630,
            "image_background": "https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg"
        }
    ],
    "genres": [
        {
            "id": 4,
            "name": "Action",
            "slug": "action",
            "games_count": 157488,
            "image_background": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"
        },
        {
            "id": 3,
            "name": "Adventure",
            "slug": "adventure",
            "games_count": 119284,
            "image_background": "https://media.rawg.io/media/games/951/951572a3dd1e42544bd39a5d5b42d234.jpg"
        }
    ],
    "developers": [
        {
            "id": 3524,
            "name": "Rockstar North",
            "slug": "rockstar-north",
            "games_count": 29,
            "image_background": "https://media.rawg.io/media/screenshots/b98/b98adb52b2123a14d1c88e828a6b49f3.jpg"
        },
        {
            "id": 10,
            "name": "Rockstar Games",
            "slug": "rockstar-games",
            "games_count": 25,
            "image_background": "https://media.rawg.io/media/games/686/686909717c3aa01518bc42ae2bf4259e.jpg"
        }
    ],
    "stores": [
        {
            "id": 290375,
            "url": "",
            "store": {
                "id": 3,
                "name": "PlayStation Store",
                "slug": "playstation-store",
                "domain": "store.playstation.com",
                "games_count": 7785,
                "image_background": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"
            }
        },
        {
            "id": 438095,
            "url": "",
            "store": {
                "id": 11,
                "name": "Epic Games",
                "slug": "epic-games",
                "domain": "epicgames.com",
                "games_count": 1038,
                "image_background": "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg"
            }
        },
        {
            "id": 290376,
            "url": "",
            "store": {
                "id": 1,
                "name": "Steam",
                "slug": "steam",
                "domain": "store.steampowered.com",
                "games_count": 65434,
                "image_background": "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg"
            }
        },
        {
            "id": 290377,
            "url": "",
            "store": {
                "id": 7,
                "name": "Xbox 360 Store",
                "slug": "xbox360",
                "domain": "marketplace.xbox.com",
                "games_count": 1914,
                "image_background": "https://media.rawg.io/media/games/b49/b4912b5dbfc7ed8927b65f05b8507f6c.jpg"
            }
        },
        {
            "id": 290378,
            "url": "",
            "store": {
                "id": 2,
                "name": "Xbox Store",
                "slug": "xbox-store",
                "domain": "microsoft.com",
                "games_count": 4721,
                "image_background": "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg"
            }
        }
    ]
};

const postData = {
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

describe("GET /videogames", () => {
    xtest("Deberia responder con un status code de 200", async () => {
        const response = await request(app).get("/videogames").send()
        expect(response.statusCode).toBe(200);
    })

    xtest("Deberia responder con un array de 200 datos", async () => {
        const response = await request(app).get("/videogames").send()
        expect(response.body.length).toBe(200);
    })

    xtest("Deberia responder con un array de los 15 primeros datos cuando se da un nombre", async () => {
        const response = await request(app).get("/videogames?name=dark%20souls").send()
        expect(response.body.length <= 15).toBeTruthy();
    })

    xtest("Deberia responser con los datos correctos cuando se hace una peticion al detalle de un videojuego por el id", async () => {
        const response = await request(app).get("/videogames/3498").send()
        const responseData = response.body;
        expect(responseData.name).toBe(videogameDetails.name);
        expect(responseData.id).toBe(videogameDetails.id);
        expect(responseData.description).toBe(videogameDetails.description);
    })

});

xdescribe("POST /videogames", () => {
    beforeAll(async () => {
        await conn.sync({ force: true });
        console.log('Wizz');
    });
    test("Deberia añadir los datos a la base de datos", async () => {
        const response = await request(app).post("/videogames").send(postData)
        expect(response.body.message).toBe("Datos agregados exitosamente");
    })
});

