import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import domain from "../domain";
import axios from "axios";
import Getimage from "./Getimage";
import GetImage from "./Getimage";
const pages = ['Film'];
const settings = ['Profile','Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLoadUser = () => {
        navigate("/users/"+userId)
    }

    const handleLoadLoginPage = () => {
        window.location.href = `/users/login`;
    }
    const handleLoadOut = () => {
        localStorage.clear()
        axios.post(domain + "/users/logout", {
            headers: {
                'X-Authorization': token
            }
        })

            .then((response) => {

                setErrorFlag(false)
                setErrorMessage("")
                console.log(response.data)

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
                console.log(error)
            })
        window.location.href = `/films`;
    }

    const handleLoadRegisterPage = () => {
        navigate("/users/register")
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        localStorage.setItem("searchString","");
        window.location.href = `/films`;
    };

    const handleCreateFilmMenu = () =>{
        setAnchorElNav(null);
        window.location.href = `/films/create`;
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/films"
                            sx={{
                                mr: 6,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Film Festival
                        </Typography>
                        {token !== null && (
                            <Typography

                                        component="a"
                                        href="/films/create"
                                        textAlign="center"
                                        sx={{
                                            mr: 2,
                                            display: {xs: 'none', md: 'flex'},
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.0rem',
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}>Create Film</Typography>
                        )



                        }
                        <Typography

                            component="a"
                            href="/films"
                            textAlign="center"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.0rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>Film</Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>

                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    {localStorage.getItem("userId") !== null ? (
                                        <div style={{width: "40px", height: "40px", padding: "5px"}}><GetImage type="users" id={parseInt(localStorage.getItem("userId")!)} />
                                        </div>
                                    ) : (
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    )}

                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                {token !== null &&


                                    <><MenuItem key="userPageItem" onClick={() => {
                                        handleCloseUserMenu();
                                        handleLoadUser();
                                    }}>
                                        {/*<Link to="/profile">*/}
                                        <Typography textAlign="center">Profile</Typography>
                                    </MenuItem>
                                        <MenuItem key="logOutItem" onClick={() => {
                                            handleCloseUserMenu();
                                            handleLoadOut();
                                        }}>
                                            <Typography textAlign="center">Log out</Typography>
                                        </MenuItem></>
                                }
                                {token == null &&
                                    <>
                                        <MenuItem key="loginItem" onClick={() => {
                                            handleCloseUserMenu();
                                            handleLoadLoginPage();
                                        }}>
                                            {/*<Link to="/profile">*/}
                                            <Typography textAlign="center">Log in</Typography>
                                        </MenuItem>
                                        <MenuItem key="registerItem" onClick={() => {
                                            handleCloseUserMenu();
                                            handleLoadRegisterPage();
                                        }}>
                                            {/*<Link to="/profile">*/}
                                            <Typography textAlign="center">Register</Typography>
                                        </MenuItem></>
                                }
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
}
export default ResponsiveAppBar;
