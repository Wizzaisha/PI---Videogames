import React from "react";

function Pagination ({ videogamesPerPage, allVideogames, pagination }) {
    // Arreglo de numeros con la cantidad de paginas necesarias
    const pageNumbers = [];

    // Se obtienen los numeros que va a tener la pagina, basado en la cantidad total de videojuegos y los videojuegos por pagina
    // se hace ceil para acercarlo a su entero mas proximo
    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i);
    };

    return (
        <nav>
            {pageNumbers && pageNumbers.map(number => (
                <button key={number} onClick={() => pagination(number)}>{number}</button>
            ))}
        </nav>
    )
}



export default Pagination;