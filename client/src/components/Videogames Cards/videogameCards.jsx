import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "./VideogameCard";
import { 
    getAllVideogames, 
    getAllGenres, 
    getAllPlatforms, 
    filterByGenre, 
    filterByPlatform,
    sortBy,
    filterByOrigin } from "../../redux/actions/index.js";

// Componente de paginado
import Pagination from "./Pagination";


function VideogameCards () {

    // Use dispatch y use Selector 
    const allVideogames = useSelector(state => state.videogames);
    const allGenres = useSelector(state => state.allGenres);
    const allPlatforms = useSelector(state => state.allPlatforms);
    const dispatch = useDispatch();
    
    // ESTADOS PAGINADO
    // Estado de la pagina actual (siempre inicia en 1)
    const [currentPage, setCurrentPage] = useState(1);

    // Estado de los items por pagina (osea 15)
    const [videogamePerPage, setVideogamePerPage] = useState(15);

    // Indice del ultimo videojuego en la pagina, osea 15
    const indexOfLastVideogame = currentPage * videogamePerPage;

    // Indice del primer videojuego en la pagina, osea 0
    const indexOfFirstVideogame = indexOfLastVideogame - videogamePerPage;
    
    // Guarda todos los videojuegos que va a tener por pagina
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    // Constante de paginado, es la que va a ayudar al renderizado
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Filtrado por genero

    function handleChangeSelectGenre (event) {

        const { value } = event.target;

        dispatch(filterByGenre(value));
        setCurrentPage(1);
    }

    // Filtrado por plataforma

    function handleChangeSelectPlatform (event) {
        const { value } = event.target;
        dispatch(filterByPlatform(value));
        setCurrentPage(1);
    }

    // Filtrado de datos por origen

    function handleChangeOriginData (event) {
        const { value } = event.target;

        dispatch(filterByOrigin(value));

        setCurrentPage(1);
    }

    // Ordenamientos

    // Estados del sort
    // Esta cosa SOLO SE USA para que react haga el renderizado!
    const [sort, setSort] = useState("");

    function handleSort (event) {
        
        const { value } = event.target;

        dispatch(sortBy(value));
        // Indicacion para iniciar en la pagina 1
        setCurrentPage(1);
        setSort(`Ordered by ${value}`);
    }

    // Search bar

    // State search bar
    const [searchName, setSearchName] = useState("");

    function handleChangeSearchBar(event) {
        const { value } = event.target;
        
        setSearchName(value);
    }

    function handleClickSearchBar (event) {

        dispatch(getAllVideogames(searchName));

        setCurrentPage(1);
        setSearchName("");
        event.preventDefault();
    }


    useEffect(() => {
        
        dispatch(getAllVideogames());
        dispatch(getAllGenres());
        dispatch(getAllPlatforms());

    }, [dispatch]);

    
    return (
        <div>
            <button onClick={() => {
                dispatch(getAllVideogames());
                setCurrentPage(1);
                }}
            >Reset</button>
            <br />
            <br />

            <input type={"text"} placeholder={"Search bar..."} onChange={handleChangeSearchBar} value={searchName}></input>
            <button onClick={handleClickSearchBar}>Search</button>

            <br />
            <span>Origin data</span>
            <br />
            <select onChange={handleChangeOriginData}>
                <option value={"all"}>All</option>
                <option value={"database"}>Database</option>
                <option value={"api"}>API</option>
            </select>
            
            <br />
            <select onChange={handleChangeSelectGenre}>
                {allGenres && allGenres.map(genre => {
                    return <option key={genre.id} value={genre.name}>{genre.name}</option>
                })}
            </select>
            
            <select onChange={handleChangeSelectPlatform}>
                {allPlatforms && allPlatforms.map(platform => {
                    return <option key={platform.id} value={platform.name}>{platform.name}</option>
                })}
            </select>

            <br />
            <span>Sort Ascending</span>
            <select onChange={handleSort}>
                <option>Select option</option>
                <option value={"A - Z"}>A - Z</option>
                <option value={"ratingAsc"}>Rating</option>
                <option value={"releasedAsc"}>Released</option>
                <option value={"playtimeAsc"}>Playtime</option>
            </select>

            <br />
            <span>Sort Descending</span>
            <select onChange={handleSort}>
                <option>Select option</option>
                <option value={"Z - A"}>Z - A</option>
                <option value={"ratingDesc"}>Rating</option>
                <option value={"releasedDesc"}>Released</option>
                <option value={"playtimeDesc"}>Playtime</option>
            </select>

            <Pagination 
                videogamesPerPage={videogamePerPage}
                allVideogames={allVideogames.length}
                pagination={pagination}
            />
            {currentVideogames && currentVideogames.map(game => {
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