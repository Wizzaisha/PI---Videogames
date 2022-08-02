import { Link } from "react-router-dom";
import s from "./VideogameCard.module.css";

function VideogameCard (props) {

    
    return (
        <div className={s.cardContainer}>

            <img src={props.background_image} alt="img" className={s.cardImage}/>
            
            <div className={s.infoContainer}>

                
                    <Link to={`/videogames/${props.id}`}>
                        <div className={s.nameText}>
                            <button>{props.name}</button>
                        </div>
                    </Link>
                

                <div className={s.cardText}>
                    <span>Rating:</span>
                    <span>{props.rating} <i>&#127775;</i></span>
                </div>

                <div className={s.cardText}>
                    <span>Released date:</span>
                    <span>{props.released}</span>
                </div>

                <div className={s.cardText}>
                    <span>Playtime:</span>
                    <span>{props.playtime}</span>
                </div>
                
                <div className={s.genresAndPlatforms}>
                    <div className={s.genresInfo}>
                        <p className={s.gpText}>Genres: </p>
                        <ul>
                            {props.genres && props.genres.map(genre => {
                                return (
                                    <li key={genre.id}><p>{genre.name}</p></li>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <p className={s.gpText}>Platforms:</p>
                        <ul>
                            {props.platforms && props.platforms.map(platform => {
                                return (
                                    <li key={platform.id}><p >{platform.name}</p></li>
                                )
                            })}
                        </ul>

                    </div>
                </div>

            </div>

        </div>
    )
}


export default VideogameCard;