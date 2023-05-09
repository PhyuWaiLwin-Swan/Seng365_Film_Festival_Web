import React, { useState } from "react";

const SearchBox = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
        </form>
    );
};

export default SearchBox;