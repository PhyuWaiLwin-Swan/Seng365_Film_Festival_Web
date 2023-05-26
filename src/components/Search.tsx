
import React, { useState } from "react";
import {useSearchParams} from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton, RadioGroup,
    Switch, TextField,
    ToggleButton, ToggleButtonGroup,
    Typography
} from "@mui/material";
import Radio from '@mui/material/Radio';
import axios from "axios";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import domain from "../domain";
import {forEach} from "react-bootstrap/ElementChildren";
import FilmList from "./FilmList";


const Search = () => {
    const [query, setQuery] = useState({
        q: "",
    });
    const [searhString,setSearchString] = useSearchParams();
    const [showAgeForm, setShowAgeForm] = useState(false);
    const [showSortingForm, setShowSortingForm] = useState(false);

    const [showGenreForm, setShowGenreForm] = useState(false);
    const [genre,setGenre] = useState<Array<Genre>>([]);
    const genreList = genre.map(obj=>obj.name);
    type CheckedGenres = {
        [key: string]: boolean;
    }
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const [checkedGenres, setCheckedGenres] = useState<CheckedGenres>(
        genreList.reduce((acc, curr) => ({ ...acc, [curr]: false }), {})
    );
    const [ageStringState,setAgeStringState] = useState({
        G: false,
        PG: false,
        M: false,
        R13: false,
        R16: false,
        R18: false,
        TBC: false
    });

    const [sortingState,setSortingState] = useState("");

    const handleSearch = () => {
        let queryParams ="";
        if (query.q.trim() !== "") {
            queryParams = "q="+query.q.trim();
        }
        Object.keys(ageStringState).forEach((key) => {
            if (ageStringState[key as keyof typeof ageStringState]) {
                queryParams += "&ageRatings=" + key;
            }
        });
        Object.keys(checkedGenres).forEach((key) => {
            if (checkedGenres[key as keyof typeof checkedGenres]) {
                const genreId = genre.find((g) => g.name === key)?.genreId;
                if (genreId) {
                    queryParams += "&genreIds=" + genreId;
                }
            }
        });
        if(sortingState != ""){
            queryParams += "&sortBy=" + sortingState;
        }
        if (queryParams!== ""){
            if (queryParams.startsWith("&"))
            {queryParams= queryParams.substring(1,)}
            queryParams="?"+queryParams
        }
        localStorage.setItem("searchString", queryParams)
        window.location.href = `/films${queryParams}`;


    };

    const handleReset = () => {
        localStorage.setItem("searchString","");
        window.location.href = `/films`;
    }

    const GenreCheckboxes = () =>{
        const handleCheckboxChange = (event: { target: { name: any; checked: any; }; }) => {
            const { name, checked } = event.target;
            setCheckedGenres({ ...checkedGenres, [name]: checked });
        };

        return (
            <Container style={{display:"inline-grid"}}>
                <ToggleButton
                    value="check"
                    selected={showGenreForm}
                    onChange={(event,newState)=>handleToggle(showGenreForm,setShowGenreForm)}
                >
                    Genre
                </ToggleButton>
                {showGenreForm && (
                    <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                        <FormLabel component="legend">Choose Genre</FormLabel>
                        <FormGroup>
                            {genre.map(obj => (
                                <FormControlLabel
                                    key={obj.name}
                                    control={
                                        <Checkbox
                                            checked={checkedGenres[obj.name] || false}
                                            onChange={handleCheckboxChange}
                                            name={obj.name}
                                        />
                                    }
                                    label={obj.name}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>)}
            </Container>
        );
    }

    React.useEffect(()=>{
        const getGenres = () => {
            axios.get(domain+ "/films/genres")
                .then((response) => {
                    setGenre(response.data)
                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })

        }
        getGenres()
    },[setGenre])

    const handleInputChangeForQ = (e: { target: { value: any; }; }) => {
        // @ts-ignore
        const { name, value } = e.target;
        searhString.set("q", value);
        setSearchString(searhString)
        setQuery((prevQuery) => ({ ...prevQuery, [name]: value }));

    };
    const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>, state: any, setState: React.Dispatch<React.SetStateAction<any>>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };
    const searchQ = () => {
        return (<div style={{display: "inline-flex"}}>
            <TextField style={{height: "55px",width:"300px"}}
                type="text"
                name="q"
                placeholder="Search..."
                value={query.q}
                onChange={handleInputChangeForQ}
            />
            <Button style={{height: "55px",width:"85px",paddingLeft:"10px", paddingRight:"10px"}}
                variant="contained"
                onClick={handleSearch}>
                Search
            </Button>
            <Button style={{height: "55px",width:"85px",paddingLeft:"10px", paddingRight:"10px"}}
                    variant="contained"
                    onClick={handleReset}>
                Reset
            </Button>


        </div>)
    }
    const handleToggle = (state:any,setState: React.Dispatch<React.SetStateAction<any>>) => {
        setState(!state);

    }
    const checkBoxForGenre = () => {

        checkBoxForGenre()

    }
    const  checkBoxForAgeString = () => {
        const {G, PG, M, R13, R16, R18, TBC} = ageStringState
        const checkboxes = [
            { name: "G", label: "G", checked: G },
            { name: "PG", label: "PG", checked: PG },
            { name: "M", label: "M", checked: M },
            { name: "R13", label: "R13", checked: R13 },
            { name: "R16", label: "R16", checked: R16 },
            { name: "R18", label: "R18", checked: R18 },
            { name: "TBC", label: "TBC", checked: TBC },
        ];

        return (
            <div style={{display:"inline-grid"}}>
                <ToggleButton
                    value="check"
                    selected={showAgeForm}
                    onChange={(event,newState)=>handleToggle(showAgeForm,setShowAgeForm)}
                >
                    Age Rating
                </ToggleButton>
                {showAgeForm && (
            <FormControl sx={{m: 3}} component="fieldset" variant="standard">
            <FormLabel component="legend">Choose Age Rating</FormLabel>
            <FormGroup>
                {checkboxes.map((checkbox) => (
                    <FormControlLabel
                        key={checkbox.name}
                        control={
                            <Checkbox
                                checked={checkbox.checked}
                                onChange={(event) => handleStateChange(event, ageStringState, setAgeStringState)}
                                name={checkbox.name}
                            />
                        }
                        label={checkbox.label}
                    />
                ))}
            </FormGroup></FormControl>)}
            </div>)
    }
    const  checkBoxForSorting = () => {

        return (

            <div style={{display:"inline-grid"}}>
                <ToggleButton
                    value="check"
                    selected={showSortingForm}
                    onChange={(event,newState)=>handleToggle(showSortingForm,setShowSortingForm)}
                >
                    Sort by
                </ToggleButton>
                {showSortingForm && (

                    <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                        <FormLabel component="legend">Choose sort by</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={(event) => setSortingState(event.target.value)}
                >
                    <FormControlLabel value="ALPHABETICAL_ASC" control={<Radio />} label="Alphabetical ascending order" />
                    <FormControlLabel value="ALPHABETICAL_DESC" control={<Radio />} label="Alphabetical descending order" />
                    <FormControlLabel value="RELEASED_ASC" control={<Radio />} label="Release date ascending order" />
                    <FormControlLabel value="RELEASED_DESC" control={<Radio />} label="Release date descending order" />
                    <FormControlLabel value="RATING_ASC" control={<Radio />} label="Rating ascending order" />
                    <FormControlLabel value="RATING_DESC" control={<Radio />} label="Rating descending order" />
                    <FormControlLabel value="" control={<Radio />} label="None of them" />

                </RadioGroup>
            </FormControl>
                    )
                }
            </div>


                    )
    }



        return (
            <div>

                <Container>{searchQ()}</Container>


                <div style={{display: "flex"}}>
                    <div>{checkBoxForAgeString()}</div>
                    <div>{GenreCheckboxes()}</div>
                    <div>{checkBoxForSorting()}</div>
                </div>
            </div>
        );

};

export default Search;