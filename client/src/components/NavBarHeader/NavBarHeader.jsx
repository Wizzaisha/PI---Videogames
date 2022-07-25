
import { Link, Outlet } from "react-router-dom";


function NavBarHeader () {


    return (
        <div>
            <h1>Videogames PI</h1>
            <p>Author: Wizz</p>
            <Link to={"/videogames"}>Home</Link>
            <Link to={"/videogames/create"}>Create Videogame</Link>

            <Outlet />
        </div> 
    )
}


export default NavBarHeader;