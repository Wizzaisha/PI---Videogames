
import { 
    GET_ALL_VIDEOGAMES, 
    GET_VIDEOGAME_DETAIL, 
    CREATE_VIDEOGAME, 
    GET_ALL_GENRES, 
    GET_ALL_PLATFORMS, 
    FILTER_BY_AND_SORT } from "../actions"

import { filterData } from "../utils";

const initialState = {
    videogames: [],
    videogamesCopy: [],
    videogameDetails: {},
    createVideogameResponse: {},
    allGenres: [],
    allPlatforms: []
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VIDEOGAMES:            
            return {
                ...state,
                videogames: action.payload,
                videogamesCopy: action.payload
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                videogameDetails: action.payload
            }

        case CREATE_VIDEOGAME:
            return {
                ...state,
                createVideogameResponse: action.payload
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                allGenres: action.payload
            }
        case GET_ALL_PLATFORMS:
            return {
                ...state,
                allPlatforms: action.payload
            } 
        case FILTER_BY_AND_SORT:
            
            const { genres, platforms, origin, sort } = action.payload.filterValues;
            const filteredGames = filterData(state.videogamesCopy, genres, platforms, "genres", "platforms", origin, sort);
            return {
                ...state,
                videogames: filteredGames
            }

        default: 
            return {...state}
    }    
}


export default rootReducer;