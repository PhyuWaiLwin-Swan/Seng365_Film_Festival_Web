
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
    console.log(imageFile !== null)
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

                    if (imageFile !== null) {
                        axios.put(domain + '/users/' + response.data.userId + '/image', imageFile, {
                            headers: {
                                'X-Authorization': localStorage.getItem('token'),
                                'Content-Type': 'image/gif'
                            }
                        })
                            .then((response) => {
                                setErrorFlag(false);
                                setErrorMessage('');axios.post(domain  + "/users/login", {
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
                                    })

                            })
                            .catch((error) => {
                                setErrorFlag(true);
                                setErrorMessage(error.toString());
                            });
                    }


                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })

        } else {
            alert("image is ")
            alert(localStorage.getItem('token'))
            if (imageFile !== null) {
                alert(domain + '/users/' + user.userId + '/image')

                axios.put(domain + '/users/' + localStorage.getItem("userId") + '/image', imageFile, {
                    headers: {
                        'X-Authorization': localStorage.getItem('token'),
                        'Content-Type': 'image/jpeg',
                    }
                })
                    .then((response) => {
                        setErrorFlag(false)
                        setErrorMessage("")
                        alert("image is successfully")
                        // navigate('/films/' + response.data.filmId)

                    }, (error) => {
                        alert(error.toString())
                        setErrorFlag(true)
                        setErrorMessage(error.toString())
                    })
                alert("image is do nothing")
            }
            axios.patch(domain + "/users/"+userId, {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
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
                    console.log("try to upload image")

                    // navigate('/users/' + response.data.userId)

                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
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
                                            {/*<CardMedia*/}
                                            {/*    className="app-img"*/}
                                            {/*    component="img"*/}
                                            {/*    image={imageFile ? URL.createObjectURL(imageFile) : defaultImage}*/}
                                            {/*    alt={imageFile ? 'Uploaded' : 'Default'}*/}
                                            {/*/>*/}
                                            <CardMedia
                                                // src={imageSrc || defaultImage}
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
                                        value={user.password}
                                        onChange={(e) => setUser((prevUser) => ({ ...prevUser, password: e.target.value }))}
                                    />
                                    }

                                    <div>
                                        <Button style={{height: "55px"}} type="submit" variant="contained">{isRegister ? "Sign up":"Save"}</Button>

                                    </div>
                                </form>
                            </Container>
                </div>
            );

    };
export default Register;
