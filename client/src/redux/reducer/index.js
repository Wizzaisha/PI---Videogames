
import { 
    GET_ALL_VIDEOGAMES, 
    GET_VIDEOGAME_DETAIL, 
    CREATE_VIDEOGAME, 
    GET_ALL_GENRES, 
    GET_ALL_PLATFORMS, 
    FILTER_BY,
    FILTER_BY_ORIGIN,
    SORT_BY } from "../actions"

import { filter, sortItems } from "../utils";

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
        case FILTER_BY:
            
            const { genres, platforms } = action.payload.filterValues;

            const filteredGames = genres.length === 0 && platforms.length === 0 ? state.videogamesCopy : filter(state.videogamesCopy, genres, platforms, "genres", "platforms");
            return {
                ...state,
                videogames: filteredGames
            }
        case FILTER_BY_ORIGIN:
            if (action.payload === "all") {
                return {
                    ...state,
                    videogames: state.videogamesCopy
                }
                
            } else if (action.payload === "database") {
                return {
                    ...state,
                    videogames: state.videogamesCopy.filter(element => element.hasOwnProperty("originDatbase"))
                }
            } else if (action.payload === "api") {
                return {
                    ...state,
                    videogames: state.videogamesCopy.filter(element => !element.hasOwnProperty("originDatbase"))
                }
            }
            break;

        case SORT_BY:

            const sortedItems = sortItems(state.videogames, action.payload);
            
            return {
                
                ...state,
                videogames: sortedItems
            }
        default: 
            return {...state}
    }    
}


export default rootReducer;