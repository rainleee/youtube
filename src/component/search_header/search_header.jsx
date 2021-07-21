import React from 'react';
import styles from './search_header.module.css';

const SearchHeader = props => {

    const onSubmitForSearch = event => {
        event.preventDefault();
        const searchVal = event.target[0].value;
        searchVal && props.onSearchVideo(searchVal);
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo} >
                <img className={styles.img} src="/images/logo.png" alt="logo" />
                <h1 className={styles.title}>Youtube</h1>
            </div>
            <input className={styles.input} type="text" placeholder="검색" />
            <button className={styles.button} type="submit">
                <i className="fas fa-search"></i>
            </button>
        </header>
    )
};

export default SearchHeader;