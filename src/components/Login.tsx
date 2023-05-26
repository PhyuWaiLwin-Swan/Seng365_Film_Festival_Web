import React from "react";
import {Cabin, Delete, Edit, Visibility, VisibilityOff} from "@mui/icons-material";
import Container from "@mui/material/Container";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    FormControl,
    IconButton, InputAdornment, InputLabel, OutlinedInput,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import domain from "../domain";
import {useNavigate} from "react-router-dom";
import User from "./User";
import CSS from "csstype";
import {CheckLogInError} from "./Helper";
import AlertBar from "./alertBar";


const Login = () => {

    const navigate = useNavigate();
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false);

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
                CheckLogInError(response.status)
                navigate("/users/"+response.data.userId)

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
                CheckLogInError(error.response.status)
            })



    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
                        inputProps={{ pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_-]+@[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9-]+)+$" }}
                        helperText={"example: abc@email.com"}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                    />
                            <div>

                                <FormControl margin="normal" fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password *"
                                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                                        required
                                        inputProps={{
                                            pattern: '.{6,}',
                                            title: 'Password must be at least 6 characters long',
                                        }}
                                    />
                                </FormControl>
                            </div>

                    <Button type="submit" style={{height: "55px"}} variant="contained">Log in</Button>
                    </form>
                    {errorFlag && <AlertBar></AlertBar>
                    }
                </Container>
                </Card>
            </Container>
        </div>)
    }

        return (<div>{LoginPage()}</div>);


}

export default Login;

