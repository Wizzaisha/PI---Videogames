import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getAllGenres, getAllPlatforms } from "../../redux/actions/index.js";

function CreateVideogame () {


    // State del input dinamico
    const [input, setInput] = useState({
        name: "",
        description: "",
        genres: [],
        platforms: []
    });

    // State de errores
    const [error, setError] = useState({});

    // State para el manejo de genres
    const [genreText, setGenreText] = useState("");
    const [genres, setGenres] = useState([]);

    // State para el manejo de platforms
    const [platformText, setPlatformText] = useState("");
    const [platforms, setPlatforms] = useState([]);

    // Show span (ver genres y platforms activos)
    const [showSpan, setShowSpan] = useState({
        genre: false,
        platform: false
    });


    // State para deshabilidad o habilitar el botton de enviar
    const [toggleButton, setToggleButton] = useState(true);

    // Use dispatch y use selectors
    const allGenres = useSelector(state => state.allGenres);
    const allPlatforms = useSelector(state => state.allPlatforms);
    // const createVgResponse = useSelector(state => state.createVideogameResponse);
    const dispatch = useDispatch();

    // Use effect para obtener todos los genres y platforms del back

    useEffect(() => {
        let mounted = true;
        if (mounted){
            dispatch(getAllGenres());
            dispatch(getAllPlatforms());
        }

        return () => mounted = false;
    }, [dispatch]);


    // Manejo de algunos errores comunes
    const handleRequireError = (value, name) => {
        if (value.length === 0) {
            setError({
            ...error,
            [name]: "This field must be filled!" });
            setToggleButton(true);
        } else {
            setError({
            ...error,
            [name]: "" });
            setToggleButton(false);
        };
    };

    // Function para el manejo de errores del input
    const handleInputErrors = (name, value) => {
        switch(name) {
            case "name":
                handleRequireError(value, name);
                break;
            case "description":
                handleRequireError(value, name);
                break;
            case "released":
                handleRequireError(value, name);
                break;
            case "rating":
                if (value < 0 || value > 5) { 
                    setError({
                    ...error,
                        [name]: "The value must be between 0.0 and 5.0"
                        });
                    setToggleButton(true);
                } 
                // Con esta cosa (regular expression) se puede analizar si un numero tiene 2 decimales!
                else if (!/^\d*(\.\d{0,2})?$/.test(value)) {
                    setError({
                        [name]: "The value must have 2 decimal places or less"
                        });
                    setToggleButton(true);
                }
                else if (value.length === 0) {
                    handleRequireError(value, name);
                    setToggleButton(true);
                } else {
                    setError({
                        ...error,
                        [name]: ""
                    });
                    setToggleButton(false);
                };
                break;
            case "background_image":
                const urlRegExp = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
                if (value.length === 0) {
                    handleRequireError(value, name);
                    setToggleButton(true);
                } else if (!urlRegExp.test(value)) {setError({
                        ...error,
                        [name]: "This field must be a valid URL link"
                    });
                    setToggleButton(true);
                } else { 
                    setError({
                        ...error,
                        [name]: ""
                    });
                    setToggleButton(false);
                }; 
                break;
            case "playtime":
                if (!/^\d*(\.\d{0})?$/.test(value)) {
                    setError({
                        ...error,
                        [name]: "This field allows only round numbers"
                    });
                    setToggleButton(true);
                } else {
                    setError({
                        ...error,
                        [name]: ""
                    });
                    setToggleButton(false);
                };
                break;
            default:
                return "That prop does not exist.";
        }
    }

    // Manjeo de los cambios en el formulario

    function handleChange(event){

        const { name, value } = event.target;

        handleInputErrors(name, value);

        setInput({
            ...input,
            [name]: value
        });
    };

    // Genre change
    function handleGenre(event) {
        const value = event.target.value;
        const findExistGenre = genres.find(element => element.name === value);
        
        if (findExistGenre) {
            setError({
                ...error,
                genres: "The genre already exist!, please select other." 
            });
            setToggleButton(true);
        } else {
            setError({
                ...error,
                genres: "" 
            });
            setGenreText(value);
            setToggleButton(false);
            setGenres([...genres, {name: value}]);
        }

    };

    // Genre button
    function handleGenreButton(event){
        
        setInput({
            ...input,
            genres
        });

        setShowSpan({
            ...showSpan,
            genre: true
        });

        event.preventDefault();
    };

    // Platform change
    function handlePlatform(event) {
        const value = event.target.value;
        const findExistPlatform = platforms.find(element => element.name === value);
        
        if (findExistPlatform) {
            setError({
                ...error,
                platforms: "The platform already exist!, please select other one." 
            });
            setToggleButton(true);
        } else {
            setError({
                ...error,
                platforms: "" 
            });
            setPlatformText(value);
            setToggleButton(false);
            setPlatforms([...platforms, {name: value}]);
        }
        
    }

    // Platform button
    function hanldePlatformsButton(event) {
        setInput({
            ...input,
            platforms
        });
        setShowSpan({
            ...showSpan,
            platform: true
        });

        event.preventDefault();
    };

    // Clear genre and platform input
    function onFocusClear() {
        setGenreText("");
        setPlatformText("");
    };

    function handleClick(event){
        dispatch(createVideogame(input));

        setInput({
            name: "",
            description: "",
            genres: [],
            platforms: []
        });

        setShowSpan({
            genre: false,
            platform: false
        });

        setGenres([]);
        setPlatforms([]);
        
        
        event.preventDefault();
    };
    
    return (
        <div>
            <form>

                {/* Name text*/}
                <label>Name:</label>
                <br />
                <input 
                    name="name"
                    onChange={handleChange}
                    value={input.name}
                    placeholder={"Videogame Name"}
                />
                {error.name ? <span>{error.name}</span> : null}

                <br />
                <br />

                {/* Description text area*/}
                <label>Description:</label>
                <br />
                <textarea 
                    name="description" 
                    value={input.description} 
                    onChange={handleChange}
                    placeholder={"Videogame Description"}
                    rows="4"
                    cols="50"
                ></textarea>
                {error.description ? <span>{error.description}</span> : null}

                <br />
                <br />

                {/* Released date*/}
                <label>Released:</label>
                <br />
                <input 
                    name="released"
                    type={"date"}  
                    onChange={handleChange}
                ></input>
                {error.released ? <span>{error.released}</span> : null}
                <br />
                <br />
                
                {/* Rating number 0 - 5*/}
                <label>Rating:</label>
                <br />
                <input 
                    name="rating"
                    type={"number"} 
                    placeholder={"0.0 - 5.0"} 
                    onChange={handleChange}
                ></input>
                {error.rating ? <span>{error.rating}</span> : null}

                <br />
                <br />
                
                {/* Image string/url*/}
                <label>Image:</label>
                <br />
                <input 
                    name="background_image"
                    type={"url"}
                    placeholder={"https://example.com"} 
                    onChange={handleChange}
                ></input>
                {error.background_image ? <span>{error.background_image}</span> : null}

                <br />
                <br />
                
                {/* Playtime number (hours)*/}
                <label>Playtime:</label>
                <br />
                <input 
                    name="playtime"
                    type={"number"}
                    placeholder={"Hours of playtime"}
                    onChange={handleChange}
                ></input>
                {error.playtime ? <span>{error.playtime}</span> : null}

                <br />
                <br />

                {/* Genres array selection*/}
                <label>Genres:</label>
                <br />
                <input 
                    list="searchGenre"
                    type={"input"}
                    value={genreText} 
                    onChange={handleGenre}
                    onFocus={onFocusClear}
                    placeholder={"Select an option"}
                ></input>
                <datalist id="searchGenre">
                    {allGenres && allGenres.map(genre => <option key={genre.id}>{genre.name}</option>)}
                </datalist>
                <button onClick={handleGenreButton}><span>Add</span></button>
                <br />
                {error.genres ? <span>{error.genres}</span> : null}
                {showSpan.genre ? <h3>Genres added: </h3> : null}
                {showSpan.genre && input.genres ? input.genres.map((genre, index) => {
                    return (
                        <span key={index}>{genre.name}</span>
                    )
                }) : null}
                <br />
                
                {/* Platforms array selection*/}
                <label>Platforms:</label>
                <br />
                <input 
                    name="platforms"
                    list="searchPlatforms" 
                    value={platformText} 
                    onChange={handlePlatform}
                    onFocus={onFocusClear}
                    placeholder={"Select an option"}
                ></input>
                <datalist id="searchPlatforms">
                    {allPlatforms && allPlatforms.map(platform => {
                        return <option key={platform.id}>{platform.name}</option>
                    })}
                </datalist>
                <button onClick={hanldePlatformsButton}><span>Add</span></button>
                <br />
                {error.platforms ? <span>{error.platforms}</span> : null}
                {showSpan.platform ? <h3>Platforms added: </h3> : null}
                {showSpan.platform && input.platforms ? input.platforms.map((platform, index) => {
                    return (
                        <span key={index}>{platform.name}</span>
                    )
                }) : null}
                <br />

                <button onClick={handleClick} disabled={toggleButton ? true : ""}><span>Send</span></button>
                
            </form>
        </div>
    )
}


export default CreateVideogame;