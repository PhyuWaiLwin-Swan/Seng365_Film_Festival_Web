
import React, { useState } from 'react';
// import { makeStyles } from "@mui/material/styles";
import {Card, CardMedia, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import axios from "axios/index";
import axios from "axios";
import domain from "../domain";
import {useNavigate} from "react-router-dom";
import defaultImage from "../default-image.png";

interface RegisterProps {
    isRegister:boolean;
    userId: number;
    header:string
}
const Register: React.FC<RegisterProps> = ({ isRegister,userId ,header}) => {

    const [user, setUser] = React.useState<User>({
        userId: userId || 0,
        token: '',
        firstName: '',
        lastName: '',

        email: '',

        password: '',

        currentPassword: '',
        image_filename: '',
    })
    const [isRegisterUser, setIsRegisterUser] = useState(isRegister);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [imageFile, setImageFile] = useState<File | null>(null);


    React.useEffect(() => {

        if (! isRegisterUser) {
            axios.get(domain + "/users/" + userId, {
                headers: {
                    'X-Authorization': localStorage.getItem("token")
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
        }
    }, [userId])

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Use optional chaining
        if (file) {
            setImageFile(file);
        }
    };
    const handleRemoveImage =  () => {
        setImageFile(null);


    }
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        if (isRegisterUser) {
            e.preventDefault();


            axios.post(domain + "/users/register", {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "password": user.password,
                }
            )
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setUser(response.data)
                    localStorage.setItem("userId",response.data.userId)
                    localStorage.setItem("token", response.data.token)
                    navigate('/users/' + response.data.userId)

                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })

        } else {
            axios.patch(domain + "/users/register", {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "password": user.password,
            }, {
                headers: {
                    'X-Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setUser(response.data)
                    navigate('/users/' + response.data.userId)

                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
    }

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
                            width: "500px",
                        }}>
                            <h1>{header}</h1>
                            <Container style={{display: "inline-grid", width: "400px"}}>
                                <form
                                    // className={classes.root}
                                    onSubmit={handleSubmit}>

                                    <div className="eachBox">
                                        <Card>
                                            <CardMedia
                                                className="app-img"
                                                component="img"
                                                image={imageFile ? URL.createObjectURL(imageFile) : defaultImage}
                                                alt={imageFile ? 'Uploaded' : 'Default'}
                                            />
                                        </Card>
                                    </div>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="First Name"
                                        required
                                        defaultValue={isRegisterUser ? '' : user.firstName}// Handle the case when description is null
                                        InputProps={{
                                            readOnly: false,
                                        }}
                                        value={user.firstName}
                                        onChange={(e) => setUser((prevUser) => ({ ...prevUser, firstName: e.target.value }))}
                                    />

                                    <div>{user.firstName}</div>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Last Name"
                                        required
                                        defaultValue={isRegisterUser ? '' : user.lastName}// Handle the case when description is null
                                        InputProps={{
                                            readOnly: false,
                                        }}
                                        value={user.lastName}
                                        onChange={(e) => setUser((prevUser) => ({ ...prevUser, lastName: e.target.value }))}
                                    />
                                    <div style={{ padding: '10px' }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleImageUpload(event)}
                                        />

                                        {imageFile && <Button onClick={handleRemoveImage}>Remove Image</Button>}
                                    </div>

                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        required
                                        defaultValue={isRegisterUser ? '' : user.email}// Handle the case when description is null
                                        InputProps={{
                                            readOnly: false,
                                        }}
                                        value={user.email}
                                        onChange={(e) => setUser((prevUser) => ({ ...prevUser, email: e.target.value }))}
                                    />
                                    {isRegister &&
                                        <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                                    />
                                    }

                                    <div>
                                        {/*<Button variant="contained" onClick={handleClose}>*/}
                                        {/*    Cancel*/}
                                        {/*</Button>*/}
                                        <Button style={{height: "55px"}} type="submit" variant="contained">{isRegister ? "Sign up":"Save"}</Button>

                                    </div>
                                </form>
                            </Container>
                        </Card>
                    </Container>
                </div>
            );

    };
export default Register;
