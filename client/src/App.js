
import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";

// Import routes
import LandingPage from "./components/Landing page/LandingPage.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import CreateVideogame from "./components/Create Videogame/CreateVideogame.jsx";
import DetailsVideogame from "./components/Details Videogame/DetailsVideogame.jsx";
import VideogameCards from "./components/Videogames Cards/VideogameCards.jsx";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/videogames' element={<MainPage />}>
          <Route index element={<VideogameCards />}></Route>
          <Route path=':idVideogame' element={<DetailsVideogame />}></Route>
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
