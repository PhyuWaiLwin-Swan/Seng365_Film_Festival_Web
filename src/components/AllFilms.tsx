import axios from 'axios';
import Search from "./Search";
import React from "react";
import FilmList from "./FilmList";
import Films from "./Films";
const AllFilms = () =>{

        return (
            <div style={{padding: "20px"}}>
                <Search></Search>
                <Films></Films>
            </div>
        );

}
export default AllFilms;