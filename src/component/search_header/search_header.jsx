import React, { memo, useRef } from "react";
import styles from "./search_header.module.css";

const SearchHeader = memo(({ onSearchVideo, onMainPage }) => {
  const searchInput = useRef();

  //search logic event
  const onSearchEvent = () => {
    const searchVal = searchInput.current.value;
    onSearchVideo(searchVal);
  };

  //search Enter event
  const onKeyPress = event => {
    if (event.key === "Enter") onSearchEvent();
  };

  //search button click event
  const onClickSearch = () => {
    onSearchEvent();
  };

  //logoClick event
  const onClickMainPage = () => {
    onMainPage();
    searchInput.current.value = "";
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={onClickMainPage}>
          <img className={styles.img} src="/images/logo.png" alt="logo" />
          <h1 className={styles.title}>Youtube</h1>
        </div>
        <div className={styles.search}>
          <input
            className={styles.input}
            type="text"
            placeholder="검색"
            ref={searchInput}
            onKeyPress={onKeyPress}
          />
          <button
            className={styles.button}
            type="submit"
            onClick={onClickSearch}
          >
            <i className={`fas fa-search ${styles.searchBtn}`}></i>
          </button>
        </div>
        <div className={styles.profile}>
          <i className={`fas fa-user-circle ${styles.user}`}></i>
        </div>
      </div>
    </header>
  );
});

export default SearchHeader;
