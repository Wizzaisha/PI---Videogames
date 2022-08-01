import s from "./LandingPage.module.css";


const { Link } = require("react-router-dom");


function LandingPage () {


    return (
        <div className={s.landingPageCover}>
            
            <div className={s.items}>
                <h1 className={s.landTitle}>Videogames page</h1>
                <p className={s.landText}>Find your next adventure here!</p>
                <Link to={"/videogames"}><button className={s.landButton}>To main page</button></Link>
            </div>
            
        </div>
    )
}


export default LandingPage;