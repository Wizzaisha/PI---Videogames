import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "./VideogameCard";
import { 
    getAllVideogames, 
    getAllGenres, 
    getAllPlatforms, 
    filterBy,
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

    // State para checboxes de genre
    const [checkedGenre, setCheckedGenre] = useState([]);

    // State para checkboxes de platforms
    const [checkedPlatform, setCheckedPlatform] = useState([]);

    // Filtrado por genero

    function handleChangeSelectGenre (value) {
        // Primero se recibe el valor que se paso por el onChange
        // y se busca el indice actual del elemento que haya en el array
        const currentIndex = checkedGenre.indexOf(value);

        // se trae el estado anterior del checked
        const newChecked = [...checkedGenre];

        // Se establece esta condicion
        if (currentIndex === -1) {
            // Si no esta el valor se añade al array del estado
            newChecked.push(value);

            dispatch(filterBy({genres: newChecked, platforms: checkedPlatform}));
        } else {
            // Si esta se hace un filtro con splice!
            newChecked.splice(currentIndex, 1);

            dispatch(filterBy({genres: newChecked, platforms: checkedPlatform}));
        }

        // Se añade la el listado de los valores previos modificados!
        setCheckedGenre(newChecked);
        
        setCurrentPage(1);

    }

    // Filtrado por plataforma
    
    function handleChangeSelectPlatform (value) {
        
        const currentIndex = checkedPlatform.indexOf(value);

        const newChecked = [...checkedPlatform];

        if (currentIndex === -1) {
            newChecked.push(value);

            dispatch(filterBy({genres: checkedGenre, platforms: newChecked}));
        } else {
            newChecked.splice(currentIndex, 1);
            
            dispatch(filterBy({genres: checkedGenre, platforms: newChecked}));
        }

        setCheckedPlatform(newChecked);
        

        setCurrentPage(1);

    }
    
    // Filtrado de datos por origen

    function handleChangeOriginData (event) {
        const { value } = event.target;

        dispatch(filterByOrigin(value));

        setCurrentPage(1);
    }

    function handleResetFilter (event) {
        
        setCheckedGenre([]);
        setCheckedPlatform([]);

        dispatch(getAllVideogames());
        setCurrentPage(1);

        event.preventDefault();
    }

    // Ordenamientos

    // Estados del sort
    // Esta cosa SOLO SE USA para que react haga el renderizado!
    const [sort, setSort] = useState("");

    function handleSort (event) {
        
        const { value } = event.target;

        if (value !== "default") {
            dispatch(sortBy(value));
            // Indicacion para iniciar en la pagina 1
            setCurrentPage(1);
            setSort(`Ordered by ${value}`);
        }

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
            
            {allGenres && allGenres.map((genre) => {
                return (
                    <div key={genre.id}>
                        <label>{genre.name}</label>
                        <input
                            type={"checkbox"}
                            onChange={() => handleChangeSelectGenre(genre.name)}
                            checked={checkedGenre.indexOf(genre.name) === - 1 ? false : true}
                        ></input>
                    </div>
                )
            })}

            <br />
            
            {allPlatforms && allPlatforms.map((platform) => {
                return (
                    <div key={platform.id}>
                        <label>{platform.name}</label>
                        <input
                            type={"checkbox"}
                            onChange={() => handleChangeSelectPlatform(platform.name)}
                            checked={checkedPlatform.indexOf(platform.name) === -1 ? false : true}
                        ></input>

                    </div>
                )
            })}
            <button onClick={handleResetFilter}>Remove filters</button>
            <br />
            <span>Sort Ascending</span>
            <select onChange={handleSort}>
                <option value={"default"}>Select option</option>
                <option value={"A - Z"}>A - Z</option>
                <option value={"ratingAsc"}>Rating</option>
                <option value={"releasedAsc"}>Released</option>
                <option value={"playtimeAsc"}>Playtime</option>
            </select>

            <br />
            <span>Sort Descending</span>
            <select onChange={handleSort}>
                <option value={"default"}>Select option</option>
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
                        genres={game.genres}
                        platforms={game.platforms}
                    />
                )
            })}
        </div>
    )
}


export default VideogameCards;