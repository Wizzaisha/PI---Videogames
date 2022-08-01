import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameDetails } from "../../redux/actions";
import s from "./DetailsVideogame.module.css";

function DetailsVideogame () {

    const params = useParams();

    const navigate = useNavigate();

    const videogame = useSelector(state => state.videogameDetails);
    const dispatch = useDispatch();
    
    useState(() => {
        dispatch(getVideogameDetails(params.idVideogame));
    }, [dispatch]);

    return (
        <div className={s.detailsContainer}>
            <h2>Details Videogame</h2>

            <button 
                className={s.goBackStyle}
                onClick={() => navigate(-1)}
            >Go back</button>

            {videogame && 
                <div className={s.videogameDetails}>
                    <img src={videogame.background_image} alt={"img"}></img>
                
                    <div className={s.cardInfoContainer}>
                        <div className={s.detailsTitle}>
                        <p>{videogame.name}</p>
                        </div>

                        <div className={s.detailsTextContainer}>
                            <div className={s.detailsText}>
                                <span>Metacritic: </span>
                                <p>{videogame.metacritic} <i>&#x2714;</i></p>
                            </div>

                            <div className={s.detailsText}>
                                <span>Rating: </span>
                                <p>{videogame.rating} <i>&#127775;</i></p>
                            </div>

                            <div className={s.detailsText}>
                                <span>Playtime: </span>
                                <p>{videogame.playtime}</p>
                            </div>
                            <div className={s.detailsText}>
                                <span>Released: </span>
                                <p>{videogame.released}</p>
                            </div>
                        </div>  


                        {videogame.description && <p className={s.detailsDescription}>{videogame.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>}
                        
                        <div className={s.detailsGenresAndPlatforms}>
                            <div className={s.detailsGenres}>
                                <p>Genres: </p>
                                <ul>
                                    {videogame.genres && videogame.genres.map(genre => {
                                        return (
                                            <li key={genre.id}><p>{genre.name}</p></li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className={s.detailsPlatforms}>
                                <p>Platforms: </p>
                                <ul>
                                    {videogame.platforms && videogame.platforms.map(platform => {
                                        return (
                                            <li key={platform.id}><p>{platform.name}</p></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default DetailsVideogame;