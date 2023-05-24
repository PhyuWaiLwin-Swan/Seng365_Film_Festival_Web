
import React, { createContext, useContext, useState } from 'react';
// import { makeStyles } from "@mui/material/styles";
import {Card, CardMedia, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import axios from "axios/index";
import axios from "axios";
import domain from "../domain";
import {useNavigate} from "react-router-dom";
import defaultImage from "../default-image.png";
// import { showAlert } from './alert/alertActions';
// import {AlertContext,AlertProvider} from "./alertContext";
import {AlertContext} from "./alertContext"
// import {showAlert} from "./Helper";
import { useDispatch } from 'react-redux';

interface RegisterProps {
    isRegister:boolean;
    header:string
}


const Register: React.FC<RegisterProps> = ({ isRegister,header}) => {

    const userId = parseInt(localStorage.getItem("userId")!)
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
    const { alert, showAlert } = useContext(AlertContext)!;



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
                })
        }
    }, [])

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Use optional chaining
        if (file) {
            setImageFile(file);
        }
    };
    showAlert("This is an error message", "error");
    const handleRemoveImage =  () => {
        showAlert("This is an error message", "error");
        setImageFile(null);


    }
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        showAlert('submit the changes!',"good");
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
                                    })


                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })

        } else {
            // if (imageFile !== null) {
            //
            //     axios.put(domain + '/users/' + localStorage.getItem("userId") + '/image', imageFile, {
            //         headers: {
            //             'X-Authorization': localStorage.getItem('token'),
            //             'Content-Type': 'image/jpeg',
            //         }
            //     })
            //         .then((response) => {
            //             setErrorFlag(false)
            //             setErrorMessage("")
            //
            //         }, (error) => {
            //             setErrorFlag(true)
            //             setErrorMessage(error.toString())
            //         })
            // }
            // axios.patch(domain + "/users/"+localStorage.getItem("userId"), {
            //     "firstName": user.firstName,
            //     "lastName": user.lastName,
            //     "email": user.email,
            // }, {
            //     headers: {
            //         'X-Authorization': localStorage.getItem('token'),
            //         'Content-Type': 'application/json'
            //     }
            // })
            //     .then((response) => {
            //         setErrorFlag(false)
            //         setErrorMessage("")
            //
            //     }, (error) => {
            //
            //         setErrorFlag(true)
            //         setErrorMessage(error.toString())
            //     })
            //
            // // window.location.href = ("/users/"+localStorage.getItem("userId"))
            // navigate("/users/"+localStorage.getItem("userId") )

            if (imageFile !== null) {

                const imageRequest = axios.put(domain + '/users/' + localStorage.getItem("userId") + '/image', imageFile, {
                    headers: {
                        'X-Authorization': localStorage.getItem('token'),
                        'Content-Type': 'image/jpeg',
                    }
                });

                const patchRequest = axios.patch(domain + "/users/"+localStorage.getItem("userId"), {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                }, {
                    headers: {
                        'X-Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });

                Promise.all([imageRequest, patchRequest])
                    .then((responses) => {
                        // Both requests were successful
                        setErrorFlag(false);
                        setErrorMessage("");
                        // Navigate to the next page

                    }, (error) => {
                        // At least one of the requests failed
                        setErrorFlag(true);
                        setErrorMessage(error.toString());
                    });
                navigate("/users/"+localStorage.getItem("userId"));
            } else {
                axios.patch(domain + "/users/"+localStorage.getItem("userId"), {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                }, {
                    headers: {
                        'X-Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                })
                    .then((responses) => {
                        // Both requests were successful
                        setErrorFlag(false);
                        setErrorMessage("");

                        showAlert("created","success")
                        // Navigate to the next page
                        navigate("/users/"+localStorage.getItem("userId"));
                    }, (error) => {
                        // At least one of the requests failed
                        setErrorFlag(true);
                        setErrorMessage(error.toString());
                    });
            }

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
                                    {alert && (
                                        <div className={`alert ${alert.severity}`}>
                                            {alert.message}
                                        </div>
                                    )}
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
