export function filter(data, genre, model){

    const dataFiltered = []
    
    data.forEach(element => {
        element[model].forEach(e => {
            if (e.name === genre) dataFiltered.push(element);
        })
    });
    
    return dataFiltered;
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

