import {TextField} from "@mui/material";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import domain from "../domain";

interface filmProps{
    filmId : number
}
const CreateReview = (props:filmProps)=>{
    const [reviewRating, setReviewRating] = useState(1);
    const [reviewString,setReviewString] = useState ("");
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const submitCreateReview = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("here submit the review")
        axios.post(domain + "/films/"+props.filmId+"/reviews", {
                "rating": reviewRating,
                "review": reviewString
            }, {
                headers: {
                    'X-Authorization': localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            }

        )
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                console.log("here submit the review")
                alert(response.statusText)
                window.location.reload();


            }, (error) => {

            setErrorFlag(true)
            setErrorMessage(error.toString())
                alert(error.toString())
        })}

    return (
        <div >
            <form onSubmit = {submitCreateReview}>
                <h1> Create a review for the film</h1>
                <div className="eachBox">
                    <TextField
                        style={{ width: '100%' }}
                        id= "review_rating"
                        label="Rating (1 - 10 inclusive)"
                        defaultValue={1}
                        InputProps={{
                            readOnly: false,
                        }}
                        variant="standard"
                        onChange={(e)=>{setReviewRating(e.target.value? parseInt(e.target.value): 0)}}
                    />
                </div>
                <div className="eachBox">
                    <TextField
                        style={{ width: '100%' }}
                        id={'review_description'}
                        label="Review Comment"
                        defaultValue="" // Handle the case when description is null
                        InputProps={{
                            readOnly: false,
                        }}
                        variant="standard"
                        onChange={(e)=>{setReviewString(e.target.value)}}
                        />
                </div>
                <Button style={{ height: '55px' }} type="submit" variant="contained">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default CreateReview;