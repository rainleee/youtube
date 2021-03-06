import React, { memo, useRef } from 'react';
import styles from './search_header.module.css';

const SearchHeader = memo(({ onSearchVideo, onMainPage }) => {
  const searchInput = useRef();

  //search logic event
  const onSearchEvent = () => {
    const searchVal = searchInput.current.value;
    onSearchVideo(searchVal);
  };

  //search Enter event
  const onKeyPress = event => {
    if (event.key === 'Enter') onSearchEvent();
  };

  //search button click event
  const onClickSearch = () => {
    onSearchEvent();
  };

  //logoClick event
  const onClickMainPage = () => {
    onMainPage();
    searchInput.current.value = '';
  };

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <i className="fas fa-bars"></i>
      </div>
      <div className={styles.container}>
        <div className={styles.logo} onClick={onClickMainPage}>
          <img className={styles.logo__img} src="/images/logo.png" alt="logo" />
          <h1 className={styles.title}>YouTube</h1>
        </div>
        <div className={styles.search}>
          <input
            className={styles.search__query}
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
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className={styles.privacy__info}>
          <i className={`fas fa-bell ${styles.notice}`}></i>
          <i className={`fas fa-user-circle ${styles.profile}`}></i>
        </div>
      </div>
    </header>
  );
});

export default SearchHeader;
