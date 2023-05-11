import React from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import domain from "../domain";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

const User = (loginUser:User) => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User>({    userId: 0, token:"",
        firstName:'',
        lastName:'',

        email: '',

        password:'',

        currentPassword:'',
        image_filename : '',
    })
    // const [user, setUser] = React.useState < Array < User >> ([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        getUser()

    }, [setUser])
    const getUser = () => {
        axios.get(domain  + "/users/"+loginUser.userId,{
            headers: {
                'X-Authorization' : loginUser.token
            }
        })

            .then((response) => {

                setErrorFlag(false)
                setErrorMessage("")
                setUser(response.data)

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
            })


    }

    const deleteUser = (user: User) => {
        axios.delete(domain+'/users/' + user.userId)

            .then((response) => {

                navigate('/users')

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const UserObject = () => {
        return (<div style={{padding:"10px"}}>
            <Card sx={{ maxWidth: 400 }} >
                <CardActionArea component="a" href={`/films/${user.userId}`}>
                    <CardMedia
                        src={domain+`/films/${user.image_filename}/image` }
                        component="img"
                        height="140"
                        image= {user.image_filename}
                        alt=""
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Email : {user.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Full Name : {user.firstName} {user.lastName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>)
    }
    if (errorFlag) {
        return (
            <div>

                <h1>Users</h1>
                <div style={{ color: "red" }}>
                    {errorMessage}

                </div>

            </div>

        )
    } else {
        return (

            <div>

                <h1>Users</h1>
                <table className="table">
                    <thead>

                    <tr>

                        <th scope="col">#</th>
                        <th scope="col">username</th>
                        <th scope="col">link</th>
                        <th scope="col">actions</th>

                    </tr>

                    </thead>
                    <tbody>
                    {UserObject()}

                    </tbody>

                </table>

                <div className="modal fade" id="deleteUserModal" tabIndex={-1} role="dialog"
                     aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title" id="deleteUserModalLabel">Delete User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>

                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure that you want to delete this user?

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">

                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                        onClick={() => deleteUser(user)}>

                                    Delete User

                                </button>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="modal fade" id="deleteUserModal" tabIndex={-1} role="dialog"
                     aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h5 className="modal-title" id="deleteUserModalLabel">Delete User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>

                                </button>

                            </div>
                            <div className="modal-body">
                                Are you sure that you want to delete this user?

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">

                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal"
                                        onClick={() => deleteUser(user)}>

                                    Delete User

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        )

    }
}



export default User;