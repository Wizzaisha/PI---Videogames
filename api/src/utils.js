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
