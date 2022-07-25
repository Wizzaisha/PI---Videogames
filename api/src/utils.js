exports.dataApiController = (dataArray) => {
    return dataArray.map(element => {
        return {
            id: element["id"],
            name: element["name"],
            released: element["released"],
            rating: element["rating"],
            background_image: element["background_image"],
            playtime: element["playtime"],
            platforms: element["platforms"],
            genres: element["genres"]
        }
    });
};

exports.detailsApiController = (data) => {
    
    return {
        id: data["id"],
        name: data["name_original"],
        description: data["description"],
        released: data["released"],
        rating: data["rating"],
        background_image: data["background_image"],
        playtime: data["playtime"],
        parent_platforms: data["platforms"],
        genres: data["genres"],
        developers: data["developers"],
        stores: data["stores"]
    }
    
};

exports.genreAndPlatformsDataController = (data) => {
    return data.map(element => {
        return {
            name: element["name"],
        }
    });
}

exports.uniqueElements = (objArr) => {
    // Esto funciona...
    // se crea un nuevo array, dentro de este se hace un spread y se crea un new map!
    // luego se agrega el objeto a formatear (tiene que ser un obj)
    // Luego se hace un map a dicho array en donde cada item se filtrara segun el primer parametro del array 
    // despues de la arrow funct, osea
    // se arma un par "key" "value" similar a los diccionarios de python
    // en donde gracias al new Map se va iterando por cada uno y si alguno tiene el nombre "name" lo pasa y escribe
    // el siguiente si es un valor unico!
    return [...new Map(objArr.map(item => [item["name"], item])).values()];
}