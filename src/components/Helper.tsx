import React from "react";
import {Alert, AlertTitle} from "@mui/material";

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

export const MyComponent= ( message:string)=> {
    return (
        <Alert severity="info">
            <AlertTitle>Alert message</AlertTitle>
            This is an alert — <strong>{message}</strong>
        </Alert>
    );
}
export const showAlert = (message:string) => {
    return (dispatch: (arg0: { type: string; payload?: string; }) => void) => {
        dispatch({ type: 'SHOW_ALERT', payload: message });

        setTimeout(() => {
            dispatch({ type: 'HIDE_ALERT' });
        }, 3000); // Adjust the duration (in milliseconds) as per your requirement
    };
};

export const CanNotCreateFilm = "Can not Create Film! \n" +
    " The provided information is not Correct. \n" +
    ""


export default {MyComponent,handleToggle,removeDuplicateFilms,showAlert};