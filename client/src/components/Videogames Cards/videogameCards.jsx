import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "./VideogameCard";
import { getAllVideogames } from "../../redux/actions/index.js";

function VideogameCards () {


    const allVideogames = useSelector(state => state.videogames);
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getAllVideogames("database"));
        }
        return () => mounted = false;

    }, []);

    
    return (
        <div>
            {allVideogames && allVideogames.map(game => {
                return (
                    <VideogameCard 
                        key={game.id}
                        id={game.id}
                        name={game.name}
                        description={game.description}
                        released={game.released}
                        rating={game.rating}
                        background_image={game.background_image}
                        playtime={game.playtime}
                        genre={game.genres}
                        platforms={game.platforms}
                    />
                )
            })}
        </div>
    )
}


export default VideogameCards;