import { Link } from "react-router-dom";


function VideogameCard (props) {


    return (
        <div>
            <Link to={`/videogames/${props.id}`}><p>{props.name}</p></Link>
            <p>{props.rating}</p>
            <p>{props.released}</p>
        </div>
    )
}


export default VideogameCard;