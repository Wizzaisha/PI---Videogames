import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getAllGenres, getAllPlatforms } from "../../redux/actions/index.js";

function CreateVideogame () {


    // State del input dinamico
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        background_image: "",
        playtime: "",
        genres: [],
        platforms: []
    });

    // State de errores
    const [error, setError] = useState({});

    // State checked otra plataforma
    const [checkedOther, setCheckedOther] = useState(false);

    // Estado para añadir otros valores
    const [otherPlatform, setOtherPlatform] = useState({
        name: ""
    });
    
    // Use dispatch y use selectors
    const allGenres = useSelector(state => state.allGenres);
    const allPlatforms = useSelector(state => state.allPlatforms);
    // const createVgResponse = useSelector(state => state.createVideogameResponse);
    const dispatch = useDispatch();

    // Use effect para obtener todos los genres y platforms del back

    useEffect(() => {

        dispatch(getAllGenres());
        dispatch(getAllPlatforms());
        
    }, [dispatch]);


    // Manejo de algunos errores comunes
    const handleRequireError = (value, name) => {
        if (value.length === 0) {
            setError({
                ...error,
                [name]: "This field must be filled!" });
            
        } else {
            setError(prevVal => {
                const copy = {...prevVal};

                delete prevVal[name];

                return copy;
            });
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
                } 
                // Con esta cosa (regular expression) se puede analizar si un numero tiene 2 decimales!
                else if (!/^\d*(\.\d{0,2})?$/.test(value)) {
                    setError({
                        ...error,
                        [name]: "The value must have 2 decimal places or less"
                        });
                    
                }
                else if (value.length === 0) {
                    handleRequireError(value, name);
                    
                } else {
                    setError(prevVal => {
                        const copy = {...prevVal};
        
                        delete prevVal[name];
        
                        return copy;
                    });
                    
                };
                break;
            case "background_image":
                const urlRegExp = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
                if (value.length === 0) {
                    handleRequireError(value, name);
                    
                } else if (!urlRegExp.test(value)) {setError({
                        ...error,
                        [name]: "This field must be a valid URL link"
                    });
                    
                } else { 
                    setError(prevVal => {
                        const copy = {...prevVal};
        
                        delete prevVal[name];
        
                        return copy;
                    });
                }; 
                break;
            case "playtime":
                if (!/^\d*(\.\d{0})?$/.test(value)) {
                    setError({
                        ...error,
                        [name]: "This field allows only round numbers"
                    });
                    
                } else {
                    setError(prevVal => {
                        const copy = {...prevVal};
        
                        delete prevVal[name];
        
                        return copy;
                    });
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
    function handleChangeGenre(event) {
        
        const { value, checked } = event.target;
        
        // Primero se llama el valor iniciarl del input (en este caso genres arr vacio)
        const { genres } = input;

        if (checked) {
            setInput({
                ...input,
                genres: [...genres, {name: value}]
            })
        } else {
            setInput({
                ...input,
                genres: genres.filter(genre => genre.name !== value)
            })
        }
        
    };

    // Platform change
    function handleChangePlatform(event) {
        const { value, checked } = event.target;

        const { platforms } = input;

        if (checked) {
            setInput({
                ...input,
                platforms: [...platforms, {name: value}]
            });
        } else {
            setInput({
                ...input,
                platforms: platforms.filter(platform => platform.name !== value)
            })
        }
        
    }

    // Other input change
    function activateOther(){

        setCheckedOther(!checkedOther);
        
    }

    function handleOtherValue(event) {
        const { value } = event.target;

        handleInputErrors("otherPlatform", value);

        setOtherPlatform({name: value});

    }

    function handleOtherPlatformClick(event) {

        const { platforms } = input;

        setInput({
            ...input,
            platforms: [...platforms, otherPlatform]
        });

        setOtherPlatform({
            name: ""
        });
        

        event.preventDefault();
    }


    function handleClick(event){
        
        dispatch(createVideogame(input));

        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            background_image: "",
            playtime: "",
            genres: [],
            platforms: []
        });

        setCheckedOther(false);

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
                    value={input.released}  
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
                    value={input.rating} 
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
                    value={input.background_image}
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
                    value={input.playtime}
                    placeholder={"Hours of playtime"}
                    onChange={handleChange}
                ></input>
                {error.playtime ? <span>{error.playtime}</span> : null}

                <br />
                <br />

                {/* Genres array selection*/}
                <label>Genres:</label>
                <br />
                {input.genres.length === 0 ? <span>You must select at least 1 genre</span> : null}
                <br />
                {allGenres && allGenres.slice(1).map(genre => {
                    return (
                        <div key={genre.id}>
                            <label>{genre.name}</label>
                            <input 
                                type={"checkbox"}
                                onChange={handleChangeGenre}
                                value={genre.name} 
                                name={genre.name}   
                            ></input>
                        </div>
                    )
                })}
                
                <br />



                {/* Platforms array selection*/}
                <label>Platforms:</label>
                <br />
                {allPlatforms && allPlatforms.slice(1).map(platform => {
                    return (
                        <div key={platform.id}>
                            <label>{platform.name}</label>
                            <input 
                                type={"checkbox"}
                                onChange={handleChangePlatform}
                                value={platform.name}
                                name={platform.name}    
                            ></input>
                        </div>
                    )
                })}
                <br />
                <label>¿Add other type of platform?</label>
                <input type={"checkbox"} checked={checkedOther} name={"other"} onChange={activateOther}></input>
                <br />
                <input 
                    disabled={checkedOther ? null : true} 
                    value={otherPlatform.name} 
                    onChange={handleOtherValue}
                    placeholder="Add other platform"
                ></input>
                <br />
                
                <button onClick={handleOtherPlatformClick}>Add</button>

                <br />
                <br />
                <button onClick={handleClick} disabled={Object.entries(error).length === 0 && input.platforms.length > 0 && input.genres.length > 0 ? null : true}><span>Send</span></button>
                
            </form>
        </div>
    )
}


export default CreateVideogame;