import React from 'react';

const Navbar = props => {

    const onSubmitForSearch = event => {
        event.preventDefault();
        const searchVal = event.target[0].value;
        searchVal && props.onSearchVideo(searchVal);
    }

    return (
        <form className="search-form" onSubmit={onSubmitForSearch}>
            <input type="text" className="search-box" />
            <button><i className="fas fa-search"></i></button>
        </form >
    )
};

export default Navbar;