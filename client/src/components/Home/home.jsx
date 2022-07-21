
import { Outlet } from "react-router-dom";

function Home () {


    return (
        <div>
            <p>Header</p>
            <p>Nav bar</p>

            <Outlet />
        </div> 
    )
}


export default Home;