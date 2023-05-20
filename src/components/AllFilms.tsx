import axios from 'axios';
import Search from "./Search";
import React from "react";
import FilmList from "./FilmList";
const AllFilms = () =>{

        return (
            <div style={{padding: "20px"}}>
                <Search></Search>
                <FilmList></FilmList>
            </div>
        );

}
export default AllFilms;