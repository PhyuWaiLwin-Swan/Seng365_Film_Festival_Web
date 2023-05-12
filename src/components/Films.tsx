import React from "react";
import axios from "axios";
import {Link, useSearchParams} from "react-router-dom";
import FilmListObject from "./FilmListObject";
import domain from "../domain";
import search from "./Search";
const Films = () => {
    const[film, setFilm] = React.useState <  Film > ()
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [searchString, setSearchString] = useSearchParams();
    const [searchState, setSearchState] = React.useState(false);

    React.useEffect(() => {
        const getFilm = () => {
            // console.log("Here")
            axios.get(domain+ "/films"+ search)

                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("film is not found")
                    setFilm(response.data)
                    console.log(response.data)

                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })}
        getFilm()
    }, [])



    if(errorFlag) {
        return (
            <div>error</div>
        )
    } else {

    }

}

export default Films;