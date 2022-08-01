
import { Link, Outlet } from "react-router-dom";
import s from "./MainPage.module.css";

function MainPage () {


    return (
        <div className={s.mainPageContainer}>

            <div className={s.headerContainer}>
                <h2 className={s.navHeadTitle}>Videogames API</h2>
                <p className={s.navHeadText}>Find in our catalog your favorities videogames for your next adventure!</p>
                <div className={s.navBar}>
                    <Link to={"/videogames"}><button className={s.navHeadLink}>Home</button></Link>
                    <Link to={"/videogames/create"}><button className={s.navHeadLink}>Create Videogame</button></Link>
                </div>
            </div>
            <Outlet />
        </div> 
    )
}


export default MainPage;