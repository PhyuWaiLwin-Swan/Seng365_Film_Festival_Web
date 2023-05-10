
import React, { useState } from "react";
import {useSearchParams} from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    Switch,
    ToggleButton, ToggleButtonGroup,
    Typography
} from "@mui/material";
import axios from "axios";


const Search = () => {
    const [query, setQuery] = useState({
        q: "",
    });
    const [searhString,setSearchString] = useSearchParams();
    const [showAgeForm, setShowAgeForm] = useState(false);
    const [genre,setGenre] = useState<Array<Genre>>([]);
    const [ageStringState,setAgeStringState] = useState({
        G: false,
        PG: false,
        M: false,
        R13: false,
        R16: false,
        R18: false,
        TBC: false
    });

    React.useEffect(()=>{
        const getGenres = () => {
            axios.get("https://seng365.csse.canterbury.ac.nz/api/v1" + "/films/genres")
                .then((response) => {
                    setGenre(response.data)
                })

        }
        getGenres()
    },[setGenre])
    // console.log(genre)
    const genreList = Object.keys(genre).map((genre)=>{genreList[genre.name]});
    console.log(genreList);

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
        return (<div><input
            type="text"
            name="q"
            placeholder="Search..."
            value={query.q}
            onChange={handleInputChangeForQ}
        />
            <button onClick={handleSearch}>Search</button></div>)
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
        const handleToggle = () => {
            setShowAgeForm(!showAgeForm);
        };
        return (
            <div>
                <ToggleButton
                    value="check"
                    selected={showAgeForm}
                    onChange={handleToggle}
                >
                    Age Rating
                </ToggleButton>
                {showAgeForm && (
            <FormControl sx={{m: 3}} component="fieldset" variant="standard">
            <FormLabel component="legend">Assign responsibility</FormLabel>
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

    const handleSearch = () => {
        const queryParams = Object.entries(query)
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    // if the value is an array, we join its values with a comma
                    return `${key}=${value.join(",")}`;
                } else {
                    return `${key}=${value}`;
                }
            })
            .join("&");
        window.location.href = `/films?${queryParams}`;
        // Make API request using the apiUrl...
    };


    return (
        <div>

            <div>{searchQ()}</div>


            <div>{checkBoxForAgeString()}</div>
        </div>
    );
};

export default Search;