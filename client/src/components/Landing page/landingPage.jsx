const { Link } = require("react-router-dom");


function LandingPage () {


    return (
        <div>
            <p>Landing Page</p>
            <Link to={"/videogames"}><button>To main page</button></Link>
        </div>
    )
}


export default LandingPage;