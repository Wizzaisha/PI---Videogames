


function VideogameCard (props) {


    return (
        <div>
            <p>{props.id}</p>
            <p>{props.name}</p>
            <p>{props.rating}</p>
            <p>{props.released}</p>
        </div>
    )
}


export default VideogameCard;