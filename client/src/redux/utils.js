export function filterData(data, genres, platforms, genreModel, platformModel, origin, sortType){

    let videogamesData = [];
    
    if (origin === "database") {
        videogamesData = data.filter(element => element.hasOwnProperty("originDatbase"));
    } else if (origin === "api") {
        videogamesData = data.filter(element => !element.hasOwnProperty("originDatbase"));
    } else {
        videogamesData = data;
    }

    if(sortType.length > 0){
        sortItems(videogamesData, sortType);
    }

    if (platforms.length === 0) {
        return videogamesData.filter(game => {
            return game[genreModel].filter(element => {
                return genres.indexOf(element.name) > -1;
            }).length === genres.length;
        });
    } else if (genres.length === 0) {
        return videogamesData.filter(game => {
            return game[platformModel].filter(element => {
                return platforms.indexOf(element.name) > -1;
            }).length === platforms.length;
        });
    } else if (genres.length > 0 && platforms.length > 0) {
        return videogamesData.filter(game => {
            const genresFiltered = game[genreModel].filter(element => {
                return genres.indexOf(element.name) > -1;
            });

            const platformsFiltered = game[platformModel].filter(element => {
                return platforms.indexOf(element.name) > -1;
            });

            return genresFiltered.length === genres.length && platformsFiltered.length === platforms.length;
        });
    } else if (genres.length === 0 && platforms.length === 0) {
        return videogamesData;
    }

}


export function sortItems(data, type) {
    switch(type) {
        case "A - Z":
            sortAscending(data, "name");
            break;
        case "Z - A":
            sortDescending(data, "name");
            break;
        case "ratingAsc":
            sortAscending(data, "rating");
            break;
        case "ratingDesc":
            sortDescending(data, "rating");
            break;
        case "releasedAsc":
            sortAscending(data, "released");
            break;
        case "releasedDesc":
            sortDescending(data, "released");
            break;
        case "playtimeAsc":
            sortAscending(data, "playtime");
            break;
        case "playtimeDesc":
            sortDescending(data, "playtime");
            break;
        default:
            return "Property not found";
    }
}


function sortAscending(data, property) {
    data.sort((a, b) => {
        if (a[property] > b[property]) return 1;
        if (a[property] < b[property]) return -1;
        return 0;
    });
}

function sortDescending(data, property) {
    data.sort((a, b) => {
        if (a[property] < b[property]) return 1;
        if (a[property] > b[property]) return -1;
        return 0;
    });
}