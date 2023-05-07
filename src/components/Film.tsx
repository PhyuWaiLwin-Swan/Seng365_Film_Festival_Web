import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const Films = () => {
    const[films, setFilms] = React.useState < Array < Film >> ([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        const getFilms = () => {
            // console.log("Here")
            axios.get("https://seng365.csse.canterbury.ac.nz/api/v1" + "/films" )

                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("film is not found")
                    setFilms(response.data.films)
                    // console.log(response.data)

                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })}
        getFilms()

    }, [])



    const list_of_films = () => {
        console.log(films)
        return films.map((film: Film) =>
            <tr key={film.filmId}>
                <th scope="row">{film.filmId}</th>

                <td>{film.title}</td>
                <td>{film.rating}</td>
                <td>{film.releaseDate}</td>
                <td><Link to={"/films/" + film.filmId}>Go to
                    film</Link></td>

                {/*<td>*/}

                {/*    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#deleteUserModal">*/}
                {/*        Delete*/}
                {/*    </button>*/}
                {/*    <button type="button" className="btn btn-primary">Edit</button>*/}

                {/*</td>*/}

            </tr>
        )
    }




    if(errorFlag) {
        return (
            <div>error</div>
        )
    } else {
        return (
            <div>
                <h1>Films</h1>
                <table className="table">
                    <thead>

                    <tr>

                        <th scope="col">#</th>
                        <th scope="col">Film</th>
                        <th scope="col">link</th>
                        {/*<th scope="col">actions</th>*/}

                    </tr>

                    </thead>
                    <tbody>
                    {list_of_films()}

                    </tbody>

                </table>
            </div>
        )
    }

}

export default Films;