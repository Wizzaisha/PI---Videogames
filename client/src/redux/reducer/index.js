
import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_DETAIL, CREATE_VIDEOGAME, GET_ALL_GENRES, GET_ALL_PLATFORMS } from "../actions"


const initialState = {
    videogames: [],
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
                videogames: action.payload
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
        default: 
            return {...state}
    }    
}


export default rootReducer;