import React from 'react';

const Navbar = (props) => (
    //form 이벤트 다듬기
    //css postCss로 모듈화하기, 
    //검색버튼 아이콘 다듬기
    <form>
        <input type="text" className="search-box" />
        <i className="fas fa-search"></i>
    </form>
);

export default Navbar;