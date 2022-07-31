export function filter(data, genres, platforms, genreModel, platformModel){

    if (platforms.length === 0) {
        return data.filter(game => {
            return game[genreModel].filter(element => {
                return genres.indexOf(element.name) > -1;
            }).length === genres.length;
        });
    } else if (genres.length === 0) {
        return data.filter(game => {
            return game[platformModel].filter(element => {
                return platforms.indexOf(element.name) > -1;
            }).length === platforms.length;
        });
    } else {
        return data.filter(game => {
            const genresFiltered = game[genreModel].filter(element => {
                return genres.indexOf(element.name) > -1;
            });

            const platformsFiltered = game[platformModel].filter(element => {
                return platforms.indexOf(element.name) > -1;
            });

            return genresFiltered.length === genres.length && platformsFiltered.length === platforms.length;
        });
    }




}


export function sortItems(data, type) {
    const dataToSort = data;
    switch(type) {
        case "A - Z":
            sortAscending(dataToSort, "name");
            break;
        case "Z - A":
            sortDescending(dataToSort, "name");
            break;
        case "ratingAsc":
            sortAscending(dataToSort, "rating");
            break;
        case "ratingDesc":
            sortDescending(dataToSort, "rating");
            break;
        case "releasedAsc":
            sortAscending(dataToSort, "released");
            break;
        case "releasedDesc":
            sortDescending(dataToSort, "released");
            break;
        case "playtimeAsc":
            sortAscending(dataToSort, "playtime");
            break;
        case "playtimeDesc":
            sortDescending(dataToSort, "playtime");
            break;
        default:
            return "Property not found";
    }

    return dataToSort;
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

