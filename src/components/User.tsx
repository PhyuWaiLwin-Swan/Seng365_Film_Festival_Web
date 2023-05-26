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

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
            })

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
                    <Typography gutterBottom variant="h6" component="div">
                        Full Name : {user.firstName} {user.lastName}
                    </Typography>
                </CardContent>
                <div style={{padding:"20px"}}>
                <Button style={{height: "55px"}} variant="contained" onClick={handleEditEventOfUser}>Edit</Button>
                </div>
            </Card>
        </div>)
    }

        return (<Container style={{display: 'inline-block', padding: "10px", verticalAlign: 'middle'}}>
                <div style={{display: 'inline-block', padding: "10px"}}>
                    {UserObject()}
                </div>
            </Container>
        )

}


export default User;


