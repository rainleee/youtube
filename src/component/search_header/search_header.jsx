import React, { useRef } from 'react';
import styles from './search_header.module.css';

const SearchHeader = ({ onSearchVideo }) => {
    const searchInput = useRef();


    const onSearchEvent = () => {
        const searchVal = searchInput.current.value;
        onSearchVideo(searchVal);
    }

    const onKeyPress = event => {
        if (event.key === 'Enter') onSearchEvent();
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo} >
                <img className={styles.img} src="/images/logo.png" alt="logo" />
                <h1 className={styles.title}>Youtube</h1>
            </div>
            <input className={styles.input} type="text" placeholder="검색" ref={searchInput} onKeyPress={onKeyPress} />
            <button className={styles.button} type="submit">
                <i className="fas fa-search"></i>
            </button>
        </header>
    )
};

export default SearchHeader;