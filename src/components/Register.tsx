
import React, { useState } from 'react';
// import { makeStyles } from "@mui/material/styles";
import {Card, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import axios from "axios/index";
import axios from "axios";
import domain from "../domain";
import {useNavigate} from "react-router-dom";


const Register = () => {
    // const Register = ({ handleClose }) => {
    // const classes = useStyles();
    // create state variables for each input
    const [user, setUser] = React.useState<User>({    userId: 0,
        token:'',
        firstName:'',
        lastName:'',

        email: '',

        password:'',

        currentPassword:'',
        image_filename : '',
    })
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        axios.post(domain  + "/users/register", {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password,
                }

            )
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setUser(response.data)
                navigate('/users/'+response.data.userId)

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
        console.log(user.userId)
        // console.log(firstName, lastName, email, password);
        // handleClose();
    };
    if (errorFlag) {
        return (
            <div>

                <h1>Users</h1>
                <div style={{color: "red"}}>
                    {errorMessage}

                </div>

            </div>

        )
    } else {
        return (
            <div>
                <Container style={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Card style={{
                        display: "inline-grid",
                        minWidth: "500px",
                        minHeight: "400px",
                        width: "500px",
                        height: "550px"
                    }}>
                        <h1>Register</h1>
                        <Container style={{display: "inline-grid", width: "400px", height: "600px"}}>
                            <form
                                // className={classes.root}
                                onSubmit={handleSubmit}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="First Name"
                                    required
                                    value={firstName}
                                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setFirstName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Last Name"
                                    required
                                    value={lastName}
                                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLastName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                                />
                                <div>
                                    {/*<Button variant="contained" onClick={handleClose}>*/}
                                    {/*    Cancel*/}
                                    {/*</Button>*/}
                                    <Button style={{height: "55px"}} type="submit" variant="contained">Sign up</Button>

                                </div>
                            </form>
                        </Container>
                    </Card>
                </Container>
            </div>
        );
    }
};

export default Register;
