import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { Search as SearchIcon } from "@styled-icons/fa-solid";

export default connectSearchBox(
    ({ refine, currentRefinement, className, onFocus }) => (
        <form className={className} onSubmit={handleSubmit}>
            <input
                className="SearchInput"
                type="text"
                placeholder="Søg"
                aria-label="Search"
                onChange={(e) => refine(e.target.value)}
                value={currentRefinement}
                onFocus={onFocus}
            />
            <SearchIcon className="SearchIcon" />
        </form>
    )
);

function handleSubmit(e) {
    console.log("in submit");
    e.preventDefault();
}
