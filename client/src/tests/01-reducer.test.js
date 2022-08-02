import * as React from "react";
import { create } from "react-test-renderer";

import {
   MemoryRouter,
   Routes,
   Route,
 } from "react-router-dom";
import MainPage from "../components/MainPage/MainPage.jsx";
import LandingPage from "../components/Landing page/LandingPage.jsx";

import rootReducer from "../redux/reducer";
import { 
   GET_ALL_VIDEOGAMES, 
   GET_VIDEOGAME_DETAIL } from "../redux/actions";

import * as data from "../../db.json";

describe("My app", () => {
   it("Renderiza LandingPage correctamente", () => {
     let renderer = create(
       <MemoryRouter initialEntries={["/"]}>
         <Routes>
            <Route path='/' element={<LandingPage />}></Route>
         </Routes>
       </MemoryRouter>
     );
 
     expect(renderer.toJSON()).toMatchSnapshot();
   });

   it("Renderiza la pagina principal correctamente", () => {
      let renderer = create(
         <MemoryRouter initialEntries={["/videogames"]}>
           <Routes>
              <Route path='/videogames' element={<MainPage />}></Route>
           </Routes>
         </MemoryRouter>
       );
   
       expect(renderer.toJSON()).toMatchSnapshot();
   });

 });

 describe("Reducer", () => {
   const state = {
      videogames: [],
      videogamesCopy: [],
      videogameDetails: {},
      createVideogameResponse: {},
      allGenres: [],
      allPlatforms: []
   }

   it("Deberia retornar el estado inicial si no se pasa un type valido", () => {
      expect(rootReducer(undefined, [])).toEqual({
         videogames: [],
         videogamesCopy: [],
         videogameDetails: {},
         createVideogameResponse: {},
         allGenres: [],
         allPlatforms: []
      });
   })

   it("Deberia guardar en nuestro state los videojuegos obtenidos en el back", () => {
      const result = rootReducer(state, {
         type: GET_ALL_VIDEOGAMES,
         payload: data.videogames
      });

      expect(result).not.toEqual(state);
      expect(result).toEqual({
         videogames: data.videogames,
         videogamesCopy: data.videogames,
         videogameDetails: {},
         createVideogameResponse: {},
         allGenres: [],
         allPlatforms: []
      })
   });

   it('Debería guardar en nuestro state el product obtenido de nuestro llamado al back cuando action type es "GET_VIDEOGAME_DETAIL"', () => {
      const result = rootReducer(state, {
         type: GET_VIDEOGAME_DETAIL,
         payload: data.videogames[0],
      });
      // Acuerdense que el state inicial no tiene que mutar!
      expect(result).not.toEqual(state);
      expect(result).toEqual({
         videogames: [],
         videogamesCopy: [],
         videogameDetails: data.videogames[0],
         createVideogameResponse: {},
         allGenres: [],
         allPlatforms: []
      });
   });
 })