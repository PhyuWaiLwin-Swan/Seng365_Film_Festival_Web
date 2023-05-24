import React from "react";
import {Cabin, Delete, Edit} from "@mui/icons-material";
import Container from "@mui/material/Container";
import {Card, CardActions, CardContent, CardMedia, IconButton, Paper, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import domain from "../domain";
import {useNavigate} from "react-router-dom";
import User from "./User";
import CSS from "csstype";


const Login = () => {

    const navigate = useNavigate();
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // e.preventDefault();
        axios.post(domain  + "/users/login", {
                "email": email,
                "password": password
            }
        )
            .then((response) => {

                setErrorFlag(false)
                setErrorMessage("")
                localStorage.setItem("token",response.data.token )
                localStorage.setItem("userId",response.data.userId )
                navigate("/users/"+response.data.userId)

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
            })



    };

    const LoginPage = () =>{
        return (<div>
            <Container style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card style={{ display:"inline-grid" , minWidth:"500px",minHeight:"400px", width:"500px", height:"450px"}} >
                    <h1>Log in</h1>
                <Container style={{ display:"inline-grid" , width:"400px", height:"300px"}} >
                    <form
                        // className={classes.root}
                        onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                    />
                    <Button type="submit" style={{height: "55px"}} variant="contained">Log in</Button>
                    </form>
                </Container>
                </Card>
            </Container>
        </div>)
    }

        return (<div>{LoginPage()}</div>);


}

export default Login;

