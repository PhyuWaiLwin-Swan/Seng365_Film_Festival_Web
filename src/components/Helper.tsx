import React from "react";

export const handleToggle = (state:any, setState: React.Dispatch<React.SetStateAction<any>>) => {
    setState(!state);

}
export const removeDuplicateFilms = (films: Film[]) => {
    const uniqueFilmSet = new Set();
    const uniqueFilms = films.filter((film) => {
        if (!uniqueFilmSet.has(film.filmId)) {
            uniqueFilmSet.add(film.filmId);
            return true;
        }
        return false;
    });
    return uniqueFilms;
};

export default {handleToggle,removeDuplicateFilms};