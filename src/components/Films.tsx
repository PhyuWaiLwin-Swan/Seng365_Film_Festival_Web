import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import FilmListObject from "./FilmListObject";
const Film = () => {
    const[film, setFilm] = React.useState <  Film > ()
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        const getFilm = () => {
            // console.log("Here")
            axios.get("https://seng365.csse.canterbury.ac.nz/api/v1" + "/films/8" )

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



    // const list_of_films = () => {
    //     console.log(films)
    //     return films.map((film: Film) =>
    //         <tr key={film.filmId}>
    //             <th scope="row">{film.filmId}</th>
    //
    //             <td>{film.title}</td>
    //             <td>{film.rating}</td>
    //             <td>{film.releaseDate}</td>
    //             <td><Link to={"/films/" + film.filmId}>Go to
    //                 film</Link></td>
    //
    //         </tr>
    //     )
    // }




    if(errorFlag) {
        return (
            <div>error</div>
        )
    } else {
        // return (
        //     // <FilmListObject key={film?.filmId+ film?.title} film={film} />
        //     // <div>
        //     //     <h1>Films</h1>
        //     //     <table className="table">
        //     //         <thead>
        //     //
        //     //         <tr>
        //     //
        //     //             <th scope="col">#</th>
        //     //             <th scope="col">Film</th>
        //     //             <th scope="col">link</th>
        //     //             {/*<th scope="col">actions</th>*/}
        //     //
        //     //         </tr>
        //     //
        //     //         </thead>
        //     //         <tbody>
        //     //         {list_of_films()}
        //     //
        //     //         </tbody>
        //     //
        //     //     </table>
        //     // </div>
        // )
    }

}

export default Film;