
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";

// Import routes
import LandingPage from "./components/Landing page/landingPage.jsx";
import Home from "./components/Home/home.jsx";
import CreateVideogame from "./components/Create Videogame/createVideogame.jsx";
import DetailsVideogame from "./components/Details Videogame/detailsVideogame.jsx";
import VideogameCards from "./components/Videogames Cards/videogameCards.jsx";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/videogames' element={<Home />}>
          <Route index element={<VideogameCards />}></Route>
          <Route path='idVideogame' element={<DetailsVideogame />}></Route>
          <Route path='create' element={<CreateVideogame />}></Route>
        </Route>
        <Route path='*' element=
        {<h1>There's nothing here!</h1>}
        ></Route>
      </Routes>
      
    </div>
  );
}

export default App;
