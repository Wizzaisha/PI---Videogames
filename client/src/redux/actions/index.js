import axios from "axios";

// Actions types
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_ALL_GENRES = "GET_ALL_GENRES";
export const GET_ALL_PLATFORMS = "GET_ALL_PLATFORMS";
export const FILTER_BY = "FILTER_BY";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const SORT_BY = "SORT_BY";

// Actions functions
export const getAllVideogames = (name) => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/videogames", {params: {name: name}});
        return dispatch({type: GET_ALL_VIDEOGAMES, payload: response.data});
    }
};


export const getVideogameDetails = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/videogames/${id}`);
        return dispatch({type: GET_VIDEOGAME_DETAIL, payload: response.data});
    }
};

export const createVideogame = (data) => {
    return async (dispatch) => {
        const response = await axios.post("http://localhost:3001/videogames", data);
        return dispatch({type: CREATE_VIDEOGAME, payload: response.data});
    }
};

export const getAllGenres = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/genres");
        return dispatch({type: GET_ALL_GENRES, payload: response.data});
    }
};

export const getAllPlatforms = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/platforms");
        return dispatch({type: GET_ALL_PLATFORMS, payload: response.data});
    }
}


export const filterBy = (filterValues) => {
    return (dispatch) => {
        return dispatch({type: FILTER_BY, payload: {filterValues}});
    }
}

export const filterByOrigin = (origin) => {
    return (dispatch) => {
        return dispatch({type: FILTER_BY_ORIGIN, payload: origin});
    }
}

export const sortBy = (type) => {
    return (dispatch) => {
        return dispatch({type: SORT_BY, payload: type});
    }
}
