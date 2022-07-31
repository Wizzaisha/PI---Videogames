import { Link } from "react-router-dom";


function VideogameCard (props) {

    
    return (
        <div>
            <Link to={`/videogames/${props.id}`}><p>{props.name}</p></Link>
            <p>{props.rating}</p>
            <p>{props.released}</p>
            <div>
                {props.genres && props.genres.map(genre => {
                    return (
                        <p key={genre.id}>{genre.name}</p>
                    )
                })}
            </div>
            <div>
                {props.platforms && props.platforms.map(platform => {
                    return (
                        <p key={platform.id}>{platform.name}</p>
                    )
                })}
            </div>
        </div>
    )
}


export default VideogameCard;