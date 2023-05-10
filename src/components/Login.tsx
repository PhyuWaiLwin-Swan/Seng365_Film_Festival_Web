import React from "react";
import {Cabin} from "@mui/icons-material";
import Container from "@mui/material/Container";
import {Card, Paper, TextField} from "@mui/material";
import Button from "@mui/material/Button";


const Login = () => {


    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");


    const LoginPage = () =>{
        return (<div>
            <Container style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card style={{ display:"inline-grid" , minWidth:"500px",minHeight:"400px", width:"500px", height:"450px"}} >
                    <h1>Log in</h1>
                <Container style={{ display:"inline-grid" , width:"400px", height:"300px"}} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                    />
                    <Button style={{height: "55px"}} variant="contained">Log in</Button>
                </Container>
                </Card>
            </Container>
        </div>)
    }





















    return(<div>{LoginPage()}</div>);

}

export default Login;