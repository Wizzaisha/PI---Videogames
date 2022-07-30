import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameDetails } from "../../redux/actions";

function DetailsVideogame () {

    const params = useParams();

    const videogame = useSelector(state => state.videogameDetails);
    const dispatch = useDispatch();
    
    useState(() => {
        dispatch(getVideogameDetails(params.idVideogame));
    }, [dispatch]);

    return (
        <div>
            <p>Details Videogame</p>
            {videogame && <div>
                <p>{videogame.name}</p>
                {videogame.description && <p>{videogame.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>}
                <img src={videogame.background_image} alt={"img"}></img>
            </div>}
        </div>
    )
}


export default DetailsVideogame;