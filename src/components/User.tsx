import React from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import domain from "../domain";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Typography} from "@mui/material";
import CSS from "csstype";
import FilmProfile from "./FilmProfile";
import GetImage from "./Getimage";
import Button from "@mui/material/Button";

const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User>({
        userId: 0, token: "",
        firstName: '',
        lastName: '',

        email: '',

        password: '',

        currentPassword: '',
        image_filename: '',
    })
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    React.useEffect(() => {
        loadUser()
    })
    // const [user, setUser] = React.useState < Array < User >> ([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const deleteUser = (user: User) => {
        axios.delete(domain + '/users/' + user.userId)

            .then((response) => {

                navigate('/users')

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }
    const loadUser = () => {
        axios.get(domain + "/users/" + userId, {
            headers: {
                'X-Authorization': token
            }
        })

            .then((response) => {

                setErrorFlag(false)
                setErrorMessage("")
                setUser(response.data)
                console.log(response.data)

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
                console.log(error)
            })

        console.log(user)
        const userCardStyles: CSS.Properties = {
            display: "inline-block",
            height: "328px",
            width: "300px",
            margin: "10px",
            padding: "0px"
        }


    }
    const handleEditEventOfUser = () =>{
        navigate("edit")

    }
    const UserObject = () => {
        return (<div style={{padding: "10px"}}>
            <Card sx={{maxWidth: 400}}>
                <GetImage type="users" id={parseInt(localStorage.getItem("userId")!)} />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Email : {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Full Name : {user.firstName} {user.lastName}
                    </Typography>
                </CardContent>
                <Button style={{height: "55px"}} variant="contained" onClick={handleEditEventOfUser}>Edit</Button>

            </Card>
        </div>)
    }



        //     return (
        //
        //         <div>
        //
        //             <h1>Users</h1>
        //             <table className="table">
        //                 <thead>
        //
        //                 <tr>
        //
        //                     <th scope="col">#</th>
        //                     <th scope="col">username</th>
        //                     <th scope="col">link</th>
        //                     <th scope="col">actions</th>
        //
        //                 </tr>
        //
        //                 </thead>
        //                 <tbody>
        //                 {UserObject()}
        //
        //                 </tbody>
        //
        //             </table>
        //
        //             <div className="modal fade" id="deleteUserModal" tabIndex={-1} role="dialog"
        //                  aria-labelledby="deleteUserModalLabel" aria-hidden="true">
        //                 <div className="modal-dialog" role="document">
        //                     <div className="modal-content">
        //                         <div className="modal-header">
        //
        //                             <h5 className="modal-title" id="deleteUserModalLabel">Delete User</h5>
        //                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        //                                 <span aria-hidden="true">&times;</span>
        //
        //                             </button>
        //
        //                         </div>
        //                         <div className="modal-body">
        //                             Are you sure that you want to delete this user?
        //
        //                         </div>
        //                         <div className="modal-footer">
        //                             <button type="button" className="btn btn-secondary" data-dismiss="modal">
        //
        //                                 Close
        //                             </button>
        //                             <button type="button" className="btn btn-primary" data-dismiss="modal"
        //                                     onClick={() => deleteUser(user)}>
        //
        //                                 Delete User
        //
        //                             </button>
        //
        //                         </div>
        //
        //                     </div>
        //
        //                 </div>
        //
        //             </div>
        //
        //         </div>
        //
        //     )
        //
        // }

        return (<Container style={{display: 'inline-block', padding: "10px", verticalAlign: 'middle'}}>
                <div style={{display: 'inline-block', padding: "10px"}}>
                    {UserObject()}
                </div>
            </Container>
        )

}


export default User;


