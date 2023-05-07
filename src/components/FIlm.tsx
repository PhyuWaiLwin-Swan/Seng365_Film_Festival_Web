import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
const Films= () => {
    const[films, setFilms] = React.useState < Array < Film >> ([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        getFilms()

    }, [])

    const getFilms = () => {
        axios.get(process.env.REACT_DOMAIN + "/films" )

            .then((response) => {

                setErrorFlag(false)
                setErrorMessage("")
                setFilms(response.data)

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
            })}

    const list_of_users = () => {
        return films.map((film: Film) =>
            <tr key={film.film_id}>
                <th scope="row">{film.film_title}</th>
                <td>{film.film_description}</td>
                <td><Link to={"/films/" + film.film_id}>Go to
                    user</Link></td>

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
                <h1>Users</h1>
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
                    {list_of_users()}

                    </tbody>

                </table>
            </div>
        )
    }

}

export default Films;