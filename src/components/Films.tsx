import React, { useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import FilmListObject from "./FilmListObject";
import domain from "../domain";
import search from "./Search";
import FilmList from "./FilmList";
import AlertBar from "./alertBar";

/**
 * all films page which include the search bar and the film list
 * @constructor
 */
const Films = () => {
    const [films, setFilms] = React.useState<Array<Film>>([]);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const getFilms = async () => {
        let requestLink;
        if (localStorage.getItem("searchString") != null) {
            requestLink = domain + "/films" + localStorage.getItem("searchString");
        } else {
            requestLink = domain + "/films";
        }

        try {
            const response = await axios.get(requestLink);
            setErrorFlag(false);
            setErrorMessage("film is not found");
            const filmsJSON = JSON.stringify(response.data.films);
            localStorage.setItem("films", filmsJSON);
            setFilms(response.data.films);
        } catch (error) {
            setErrorFlag(true);
            // @ts-ignore
            setErrorMessage(error);
        }
    };

    useEffect(() => {
        getFilms();
    }, []); // Removed setFilms from the dependency array


    return (<div>{errorFlag && <div>{errorMessage}</div>

        }<FilmList />

    </div>
    );

};

export default Films;