import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getAllGenres, getAllPlatforms } from "../../redux/actions/index.js";
import { useNavigate } from "react-router-dom";
import s from "./CreateVidegogame.module.css";

function CreateVideogame () {

    // Use dispatch y use selectors
    let allGenres = useSelector(state => state.allGenres);
    allGenres = allGenres.slice(1);
    let allPlatforms = useSelector(state => state.allPlatforms);
    allPlatforms = allPlatforms.slice(1);

    // Use navigate
    let navigate = useNavigate();

    const dispatch = useDispatch();

    // Use effect para obtener todos los genres y platforms del back

    useEffect(() => {

        dispatch(getAllGenres());
        dispatch(getAllPlatforms());
        
    }, [dispatch]);

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

    // State para genre checkboxes
    const [checkedGenre, setCheckedGenre] = useState([]);

    // State para platforms checkboxes
    const [checkedPlatform, setCheckedPlatform] = useState([]);

    // State checked otra plataforma
    const [checkedOther, setCheckedOther] = useState(false);

    // Estado para añadir otros valores
    const [otherPlatform, setOtherPlatform] = useState({
        name: ""
    });
    
    // Manejo de algunos errores comunes
    const handleRequireError = (value, name) => {
        
        if (value.length === 0) {
            setError({
                ...error,
                [name]: "This field must be filled!" });
            
        } else {
            setError(prevVal => {
                const copy = {...prevVal};
                
                delete copy[name];
                
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
        
                        delete copy[name];
        
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
        
                        delete copy[name];
        
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
        
                        delete copy[name];
        
                        return copy;
                    });
                };
                break;
            case "otherPlatform":
                handleRequireError(value, name);
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
    function handleChangeGenre(value) {

        const currentIndex = checkedGenre.indexOf(value);
        const newChecked = [...checkedGenre];
        
        const { genres } = input;

        if(currentIndex === -1) {
            newChecked.push(value);
            setInput({
                ...input,
                genres: [...genres, {name: value}]
            });
        } else {
            newChecked.splice(currentIndex, 1);
            setInput({
                ...input,
                genres: genres.filter(genre => genre.name !== value)
            });
        }

        setCheckedGenre(newChecked);

    };

    // Platform change
    function handleChangePlatform(value) {

        const currentIndex = checkedPlatform.indexOf(value);
        const newChecked = [...checkedPlatform];
        
        const { platforms } = input;

        if(currentIndex === -1) {
            newChecked.push(value);
            setInput({
                ...input,
                platforms: [...platforms, {name: value}]
            });
        } else {
            newChecked.splice(currentIndex, 1);
            setInput({
                ...input,
                platforms: platforms.filter(platform => platform.name !== value)
            });
        }

        setCheckedPlatform(newChecked);
        
    }

    // Other input change
    function activateOther(){

        setCheckedOther(!checkedOther);
        
    }

    // Manejo del valor de la nueva plataforma
    function handleOtherValue(event) {
        const { value } = event.target;

        handleInputErrors("otherPlatform", value);

        setOtherPlatform({name: value});

    }

    // Button para añadir nueva plataforma
    function handleOtherPlatformClick(event) {

        const { platforms } = input;

        setInput({
            ...input,
            platforms: [...platforms, otherPlatform]
        });

        alert(`Platform ${otherPlatform.name} has been added successfully.`);

        setOtherPlatform({
            name: ""
        });
        
        
        event.preventDefault();
    }

    // Manejo del submit del formulario
    function handleSubmit(event){
        event.preventDefault();
        
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

        setCheckedGenre([]);

        setCheckedPlatform([]);
        
        alert("Videogame added successfully");
        navigate("/videogames");

    };
    
    return (
        <div className={s.formContaier}>
            <form onSubmit={handleSubmit} className={s.form}>
                <div className={s.titleForm}>
                    <h3>Add your videogame here!</h3>
                </div>
                <div className={s.formInfo}>


                    {/* Name text*/}
                    <div className={s.nameInfo}>
                        <p>Name:</p>
                        <input 
                            name="name"
                            onChange={handleChange}
                            value={input.name}
                            placeholder={"Videogame Name"}
                        />
                        {error.name ? <p className={s.errorInfo}>{error.name}</p> : null}
                    </div>
                    
                    {/* Description text area*/}
                    <div className={s.descriptionInfo}>
                        <p>Description:</p>
                        <textarea 
                            name="description" 
                            value={input.description} 
                            onChange={handleChange}
                            placeholder={"Videogame Description"}
                            rows="4"
                            cols="50"
                        ></textarea>
                        {error.description ? <p className={s.errorInfo}>{error.description}</p> : null}
                    </div>


                    {/* Released date*/}
                    <div className={s.releasedInfo}>
                        <p>Released:</p>
                        <input 
                            name="released"
                            type={"date"}
                            value={input.released}  
                            onChange={handleChange}
                        ></input>
                        {error.released ? <p className={s.errorInfo}>{error.released}</p> : null}
                    </div>

                    {/* Rating number 0 - 5*/}
                    <div className={s.ratingInfo}>
                        <p>Rating:</p>
                        <input 
                            name="rating"
                            type={"number"}
                            value={input.rating} 
                            placeholder={"0.0 - 5.0"} 
                            onChange={handleChange}
                        ></input>
                        {error.rating ? <p className={s.errorInfo}>{error.rating}</p> : null}
                    </div>

                    {/* Image string/url*/}
                    <div className={s.imageInfo}>
                        <p>Image:</p>
                        <input 
                            name="background_image"
                            type={"url"}
                            value={input.background_image}
                            placeholder={"https://example.com"} 
                            onChange={handleChange}
                        ></input>
                        {error.background_image ? <p className={s.errorInfo}>{error.background_image}</p> : null}
                    </div>
                    
                    {/* Playtime number (hours)*/}
                    <div className={s.playtimeInfo}>
                        <p>Playtime:</p>
                        <input 
                            name="playtime"
                            type={"number"}
                            value={input.playtime}
                            placeholder={"Hours of playtime"}
                            onChange={handleChange}
                        ></input>
                        {error.playtime ? <p className={s.errorInfo}>{error.playtime}</p> : null}
                    </div>

                    {/* Genres array selection*/}
                    <div className={s.genresInfo}>
                        <p>Genres:</p>
                        {input.genres.length === 0 ? <p className={s.errorInfo}>You must select at least 1 genre</p> : null}
                        {allGenres && allGenres.map((genre) => {
                            return (
                                <div key={genre.id} className={s.genreAndPlatContainer}>
                                    <label>{genre.name}</label>
                                    <input 
                                        type={"checkbox"}
                                        onChange={() => handleChangeGenre(genre.name)}
                                        checked={checkedGenre.indexOf(genre.name) === -1 ? false : true}
                                    ></input>
                                </div>
                            )
                        })}
                    </div>

                    {/* Platforms array selection*/}
                    <div className={s.platformsInfo}>
                        <p>Platforms:</p>
                        {allPlatforms && allPlatforms.map((platform, index) => {
                            return (
                                <div key={platform.id} className={s.genreAndPlatContainer}>
                                    <label>{platform.name}</label>
                                    <input 
                                        type={"checkbox"}
                                        onChange={() => handleChangePlatform(platform.name)}
                                        checked={checkedPlatform.indexOf(platform.name) === -1 ? false : true }    
                                    ></input>
                                </div>
                            )
                        })}
                        <div className={s.otherPlatformInfo}>
                            <div className={s.otherPlatText}>
                                <p>¿Add other type of platform?</p>
                                <input type={"checkbox"} checked={checkedOther} name={"other"} onChange={activateOther}></input>
                            </div>
                            <input 
                                type={"text"}
                                disabled={checkedOther ? null : true} 
                                value={otherPlatform.name} 
                                onChange={handleOtherValue}
                                placeholder="Add other platform"
                            ></input>

                            <button 
                                type="button" 
                                onClick={handleOtherPlatformClick}
                                disabled={!checkedOther || otherPlatform.name.length === 0 ? true : null}
                            >Add</button>
                            {error.otherPlatform ? <p className={s.errorInfo}>{error.otherPlatform}</p> : null}
                        </div>

                    </div>
                    
                </div>
                
                <div className={s.submitButton}>
                    <input 
                        type={"submit"} 
                        disabled={Object.entries(error).length === 0 && input.platforms.length > 0 && input.genres.length > 0 ? null : true}
                        value="Submit"
                    ></input> 
                </div>
            </form>
        </div>
    )
}


export default CreateVideogame;