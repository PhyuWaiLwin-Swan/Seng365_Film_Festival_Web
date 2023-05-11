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
    Container
} from "@mui/material";
import FilmProfile from "./FilmProfile";
import domain from "../domain";

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
    React.useEffect(() => {
        const getOneFilm = () => {
            axios.get(domain+"/films/"+id)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setOneFilm(response.data)
                console.log(response.data.film);
                console.log(response.data);
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
                    console.log(response.data.film);
                    console.log(response.data);
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        getReviews()
    }, [id])



    const list_of_review = () => {
        console.log(reviews)
        return reviews.map((review: Review) =>
        <TableRow
            key={review.reviewerId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="center" valign="middle">
                <CardMedia
                        component="img"
                        src={domain+`/users/${review.reviewerId}/image`}
                        alt=""
                        style={{ width: "30px", height: "30px", margin: 0, padding: 0}}
                    />
            </TableCell>

            <TableCell align="right">{review.reviewerFirstName}</TableCell>
            <TableCell align="right">{review.reviewerLastName}</TableCell>
            <TableCell align="right">{review.rating}</TableCell>
            <TableCell align="right">{review.review}</TableCell>
        </TableRow>
        )
    }


    return (<Container style={{display: 'inline-block', padding: "10px",verticalAlign: 'middle'}} >
            <div style={{display: 'inline-block', padding: "10px"}}>
                <FilmProfile key={oneFilm.filmId + oneFilm.title} film={oneFilm}/>
            </div>
            <div style={{display: 'inline-block', padding: "10px"}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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

export default EachFilm;