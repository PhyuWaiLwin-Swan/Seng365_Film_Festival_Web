import axios from 'axios';
import React from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import FilmListObject from "./FilmListObject";
import {
    CardMedia,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    TableBody,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    ToggleButton,
    FormControl,
    FormLabel, FormGroup, FormControlLabel, Checkbox
} from "@mui/material";
import FilmProfile from "./FilmProfile";
import domain from "../domain";
import Button from "@mui/material/Button";
import GetImage from "./Getimage";
import handleToggle from "./Helper";
import FilmList from "./FilmList";

const EachFilm =() => {
    const {id} = useParams();
    // const navigate = useNavigate();
    const [oneFilm, setOneFilm] = React.useState<Film>(

        {
            description: "",
            filmId : 0,

        title : "",
        directorFirstName: "",

        directorLastName: "",
        releaseDate : "",
        image_filename : "",
        runtime : 0,
        directorId : 0,
        genreId : 0,
        rating : "",
        ageRating: ""}
        )
    const[reviews, setReviews] = React.useState<Array<Review>>([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const token = localStorage.getItem("token")
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

    const [openEditDialog, setOpenEditDialog] = React.useState(false)
    const navigate = useNavigate();
    React.useEffect(() => {
        const getOneFilm = () => {
            axios.get(domain+"/films/"+id)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setOneFilm(response.data)
                }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
                })
             }
        getOneFilm()
         }, [id])

    React.useEffect(() => {
        const getReviews = () => {
            axios.get(domain+"/films/"+id+"/reviews")
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setReviews(response.data)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        getReviews()
    }, [id])

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };
    const handleDeleteDialogOpen = () => {

        setOpenDeleteDialog(true);
    };
    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
    };
    const handleEditDialogOpen = () => {
        //////////////////////////////////////////////////////////////////////////////////////
        setOpenEditDialog(true);
        localStorage.setItem("editFilmId",oneFilm.filmId.toString());
        window.location.href = "/edit";
    };
    const deleteFilm = () => {
        axios.delete(domain + '/films/' + oneFilm.filmId,

            {
                headers: {
                    'X-Authorization': token
                }
            }

        )

            .then((response) => {

                navigate('/films')

            }, (error) => {

                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const editFilm =() => {
        axios.patch(domain + '/films/' + oneFilm.filmId,{
            headers: {
                'X-Authorization': token
            },
            data: {
                oneFilm
            }
        })
    }


    const DeleteDialog = (header:string, body:string) => {

        return (<Dialog
            open={openDeleteDialog}
            onClose={handleDeleteDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {header}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteDialogClose}>Disagree</Button>
                <Button onClick={deleteFilm} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>)
    }

    const EditDialog = (header:string, body:string) => {

        return (<Dialog
            open={openEditDialog}
            onClose={handleEditDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {header}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditDialogClose}>Disagree</Button>
                <Button onClick={editFilm} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>)
    }

    const list_of_review = () => {
        return reviews.map((review: Review) =>
        <TableRow
            key={review.reviewerId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="center" valign="middle">
                <div style={{width: "40px", height: "40px", padding: "5px"}}>
                <GetImage type="users" id={review.reviewerId} />
                </div>



            </TableCell>

            <TableCell align="right">{review.reviewerFirstName}</TableCell>
            <TableCell align="right">{review.reviewerLastName}</TableCell>
            <TableCell align="right">{review.rating}</TableCell>
            <TableCell align="right">{review.review}</TableCell>
        </TableRow>
        )
    }

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
        return (<Container style={{display: 'inline-block', padding: "10px", verticalAlign: 'middle'}}>
                <div style={{display: 'inline-block', padding: "10px"}}>
                    <FilmProfile key={oneFilm.filmId + oneFilm.title} film={oneFilm}/>
                </div>
                {(oneFilm.directorId.toString() === localStorage.getItem("userId")) && (
                    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
                    <div>
                        <Button style={{height: "55px", width: "85px", paddingLeft: "10px", paddingRight: "10px"}}
                                variant="contained"
                                onClick={handleDeleteDialogOpen}>
                            Delete
                        </Button>
                        <div>{DeleteDialog("Delete Film", "Are you sure that you want to delete a film?")}</div>
                    </div>
                        <div>
                            <Button style={{height: "55px", width: "85px", paddingLeft: "10px", paddingRight: "10px"}}
                                    variant="contained"
                                    onClick={handleEditDialogOpen}>
                                Edit
                            </Button>
                        </div>

                    </Container>
                )}

                <div style={{display: 'inline-block', padding: "10px"}}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <h4>Total Review : {reviews.length}</h4>
                                <TableRow>
                                    <TableCell align="left">Profile picture</TableCell>
                                    <TableCell align="right">Reviewer First Name</TableCell>
                                    <TableCell align="right">Reviewer Last Name</TableCell>
                                    <TableCell align="right">Rating</TableCell>
                                    <TableCell align="right">Review</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list_of_review()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </Container>

        )
    }
}

export default EachFilm;