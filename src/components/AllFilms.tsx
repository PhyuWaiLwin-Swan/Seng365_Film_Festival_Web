import axios from 'axios';
import Search from "./Search";
import React from "react";
import FilmList from "./FilmList";
import Films from "./Films";

/**
 * Display the search bar and all the film
 * @constructor
 */
const AllFilms = () =>{

        return (
            <div style={{padding: "20px"}}>
                <Search></Search>
                <Films></Films>
            </div>
        );

}
export default AllFilms;