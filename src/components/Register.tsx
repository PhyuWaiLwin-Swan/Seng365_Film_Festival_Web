
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
import AlertBar from "./alertBar";
import {CheckChangeUserDetailError, CheckGetUser, CheckLogInError, CheckRegisterError} from "./Helper";

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
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [imageFile, setImageFile] = useState<File | null>(null);


    React.useEffect(() => {

        if (! isRegisterUser) {
            axios.get(domain + "/users/" + localStorage.getItem("userId"), {
                headers: {
                    'X-Authorization': localStorage.getItem("token")
                }
            })

                .then((response) => {

                    setErrorFlag(false)
                    setErrorMessage("")
                    setUser(response.data)

                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                    const [status, message] = CheckGetUser(error.response.status);
                    localStorage.setItem("alertStateMessage",message );

                })
        }
    }, [isRegisterUser])

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
        e.preventDefault();
        if (isRegisterUser) {



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

                    if (imageFile !== null) {
                        axios.put(domain + '/users/' + response.data.userId + '/image', imageFile, {
                            headers: {
                                'X-Authorization': localStorage.getItem('token'),
                                'Content-Type': 'image/gif'
                            }
                        })
                            .then((response) => {
                                setErrorFlag(false);
                                setErrorMessage('');
                                axios.post(domain  + "/users/login", {
                                        "email": user.email,
                                        "password": user.password,
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
                                        CheckLogInError(error.response.status);
                                    })

                            })
                            .catch((error) => {
                                setErrorFlag(true);
                                setErrorMessage(error.toString());
                                const [status, message] = CheckRegisterError(error.response.status);
                                localStorage.setItem("alertStateMessage",message );
                            });
                    } else {
                        axios.post(domain  + "/users/login", {
                                "email": user.email,
                                "password": user.password,
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
                                const [status, message] = CheckRegisterError(error.response.status);
                                localStorage.setItem("alertStateMessage",message );
                            })
                    }


                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                    const [status, message] = CheckRegisterError(error.response.status);
                    localStorage.setItem("alertStateMessage",message );
                })
        } else {
            if (imageFile) {

                axios.put(domain + '/users/' + localStorage.getItem("userId") + '/image', imageFile, {
                    headers: {
                        'X-Authorization': localStorage.getItem('token'),
                        'Content-Type': 'image/jpeg',
                    }
                })
                    .then((response) => {
                        setErrorFlag(false)
                        setErrorMessage("")

                    }, (error) => {
                        setErrorFlag(true)
                        setErrorMessage(error.toString())
                        const [status, message] = CheckRegisterError(error.response.status);
                        localStorage.setItem("alertStateMessage",message );
                    })
            }
            var data;
            if(user.currentPassword !== ""){

                data = {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "password": user.password,
                    "currentPassword": user.currentPassword
                }
           }else {
                data = {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email
                }
            }
            alert(localStorage.getItem('token'))
            axios.patch(domain + "/users/"+localStorage.getItem("userId"), data, {
                headers: {
                    'X-Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setUser(response.data)
                    navigate('/users/' + localStorage.getItem("userId"))



                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                    const [status, message] = CheckChangeUserDetailError(error.response.status);
                    localStorage.setItem("alertStateMessage",message );
                })

        }
    }
    const [imageError, setImageError] = useState(false);

    const imageSrc = imageError ? defaultImage : `${domain}/${"users"}/${localStorage.getItem("userId")}/image`;
            return (
                <div style={{paddingTop:"70px"}}>
                            <Container
                                style={{
                                    display: 'inline-block',
                                    width: '600px',
                                    backgroundColor: 'white',
                                    border: '1px solid gray',
                                    borderRadius: '4px',
                                    padding: '60px',
                                    verticalAlign: 'middle',
                                }}
                            >
                                <h1>{header}</h1>
                                <form
                                    onSubmit={handleSubmit}>

                                    <div className="eachBox">
                                        <Card>
                                            <CardMedia
                                                className="app-img"
                                                component="img"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                image={imageFile ? URL.createObjectURL(imageFile) : imageSrc ||defaultImage}
                                                onError={() => setImageError(true)}
                                            />
                                        </Card>
                                    </div>

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
                                        label="First Name"
                                        required
                                        inputProps={{ maxLength: 64 }}
                                        helperText={"Maximum lenght 64 character"}
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
                                        inputProps={{ maxLength: 64 }}
                                        helperText={"Maximum lenght 64 character"}
                                        defaultValue={isRegisterUser ? '' : user.lastName}// Handle the case when description is null
                                        InputProps={{
                                            readOnly: false,
                                        }}
                                        value={user.lastName}
                                        onChange={(e) => setUser((prevUser) => ({ ...prevUser, lastName: e.target.value }))}
                                    />

                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Email"
                                        // type="email"
                                        inputProps={{ pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_-]+@[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9-]+)+$" }}
                                        helperText={"example: abc@email.com"}
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
                                        inputProps={{ pattern: "^.{6,}$" }}
                                        helperText={"At least 6 character long"}
                                        required
                                        value={user.password}
                                        onChange={(e) => setUser((prevUser) => ({ ...prevUser, password: e.target.value }))}
                                    />
                                    }
                                    {!isRegister &&
                                        <div>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            label="Current Password"
                                            type="password"
                                            inputProps={{ pattern: "^.{6,}$" }}
                                            helperText={"At least 6 character long"}
                                            onChange={(e) => setUser((prevUser) => ({ ...prevUser, currentPassword: e.target.value }))}
                                        />

                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                label="New Password"
                                                type="password"
                                                inputProps={{ pattern: "^.{6,}$" }}
                                                helperText={"At least 6 character long"}
                                                onChange={(e) => setUser((prevUser) => ({ ...prevUser, password: e.target.value }))}
                                            />

                                        </div>


                                    }

                                    <div>
                                        <Button style={{height: "55px"}} type="submit" variant="contained">{isRegister ? "Sign up":"Save"}</Button>

                                    </div>

                                    {errorFlag && <AlertBar></AlertBar>
                                    }
                                </form>
                            </Container>
                </div>
            );

    };
export default Register;
