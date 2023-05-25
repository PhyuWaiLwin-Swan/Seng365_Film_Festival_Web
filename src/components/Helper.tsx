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
export const CheckRegisterError = (status:number): [string, string] => {

    switch (status) {
        case 201:
            return ["success", "It is successfully created"]
            break;
        case 400:
            return ["error", "Bad Request. Invalid information"]
        case 403:
            return ["error", "Forbidden. Email already in use"]
        case 500:
            return ["error", "Internal Server Error"]
        default:
            return ["error", "Unknow Error"]
    }
}

export const CheckLogInError =  (status:number)=> {
    var alertStatemessage = "";
    switch (status) {
        case 200:
            alertStatemessage = "Successfully login";
            break;
        case 400:
            alertStatemessage = "Bad Request. Invalid information";
           break
        case 401:
            alertStatemessage = "Not Authorised. Incorrect email/password";
            break
        case 500:
            alertStatemessage = "Internal Server Error";
            break
        default:
            alertStatemessage = "Unknow Error";
            break
    }
    localStorage.setItem("alertStateMessage",alertStatemessage );
}
export const CheckLogOutError = (status:number): [string, string] => {

    switch (status) {
        case 200:
            return ["success", "Successfully logout"]
            break;
        case 401:
            return ["error", "Unauthorized. Cannot log out if you are not authenticated"]
        case 500:
            return ["error", "Internal Server Error" ]
        default:
            return ["error", "Unknow Error" ]
    }
}
export const CheckGetUser = (status:number): [string, string] => {
    switch (status) {
        case 200:
            return ["success", "Successfully Retrieve user detail"]
            break;
        case 404:
            return ["error", "Not Found. No user with specified ID"]
        case 500:
            return ["error", "Internal Server Error" ]
        default:
            return ["error", "Unknow Error" ]
    }
}
export const CheckChangeUserDetailError = (status:number): [string, string] => {

    switch (status) {
        case 201:
            return ["success", "It is successfully changed"]
            break;
        case 401:
            return ["error", "Unauthorized or Invalid currentPassword"]
        case 400:
            return ["error", "Bad Request. Invalid information"]
        case 403:
            return ["error", "Forbidden. This is not your account, or the email is already in use, or identical current and new passwords"]
        case 404:
            return ["error", "NotFound"]
        case 500:
            return ["error", "Internal Server Error" ]
        default:
            return ["error", "Unknow Error" ]
    }
}
export const CheckGetFilm = (status:number): [string, string] => {
    switch (status) {
        case 200:
            return ["success", "Successfully retrieve film"]
            break;
        case 400:
            return ["error", "Bad Request"]
        case 500:
            return ["error", "Internal Server Error"]
        default:
            return ["error", "Unknow Error"]
    }
}
export const CheckAddNewFilm = (status:number): [string, string] => {

    switch (status) {
        case 201:
            return ["success", "It is successfully created"]
            break;
        case 401:
            return ["error", "Unauthorized"]
        case 400:
            return ["error", "Bad Request. Invalid information"]
        case 403:
            return ["error", "Forbidden. Film title is not unique, or cannot release a film in the past"]
        case 500:
            return ["error", "Internal Server Error"]
        default:
            return ["error", "Unknow Error"]
    }
}
export const CheckRetrieveFilm = (status:number): [string, string] => {
    switch (status) {
        case 200:
            return ["success", "Successfully Retrieved"]
            break;
        case 404:
            return ["error", "Not Found. No film with id"]
        case 500:
            return ["error", "Internal Server Error"]
        default:
            return ["error", "Unknow Error"]
    }
}
export const CheckEditFilm = (status:number): [string, string] => {

    switch (status) {
        case 200:
            return ["success", "It is successfully changed"]
            break;
        case 401:
            return ["error", "Unauthorized"]
        case 400:
            return ["error", "Bad Request. Invalid information"]
        case 403:
            return ["error", "Forbidden. Only the director of an film may change it, cannot change" +
            " the releaseDate since it has already passed," +
            " cannot edit a film that has a review placed, or cannot release a film in the past"]
        case 404:
            return ["error", "Not Found. No film found with id"]
        case 500:
            return ["error", "Internal Server Error"]
        default:
            return ["error", "Unknow Error"]
    }
}
export const CheckDeleteFilm = (status:number): [string, string] => {

    switch (status) {
        case 200:
            return ["success", "It is successfully deleted"]
            break;
        case 401:
            return ["error", "Unauthorized"]
        case 403:
            return ["error", "Forbidden. Only the director of an film may change it"]
        case 500:
            return ["error", "Internal Server Error"]
        default:
            return ["error", "Unknow Error"]
    }
}
export const CheckCreateReview = (status:number): [string, string] => {

    switch (status) {
        case 201:
            return ["success", "It is successfully created"]
            break;
        case 400:
            return ["error", "data/review must NOT have fewer than 1 characters"]
        case 401:
            return ["error", "Unauthorized"]
        case 403:
            return ["error", "Forbidden. Cannot review your own film, or cannot post a review on a film that has not yet releas"]
        case 404:
            return ["error", "Not Found. No film found with id"]
        case 500:
            return ["error", "Internal Server Error"]
        default:
            return ["error", "Unknow Error"]
    }
}
export default {MyComponent,CheckGetUser,CheckCreateReview,handleToggle,removeDuplicateFilms,CheckLogInError,CheckChangeUserDetailError,CheckEditFilm,CheckRegisterError};