import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
// import '../../util/searchAnim'

import './index.scss'

const Result = ({search, getSongAudio}) => {
    return (
        <div className="result">
            {
                search.songs.map((song, index) => {
                    return (
                        <div className="result-box" key={index} onClick={() => getSongAudio(song._id)}>
                            <img src={`/image/poster/${song.poster}`} />
                            <p>{song.songName}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

const SearchBox = ({handleSearch, search, getSongAudio}) => {

    const handleSearchUI = e => {
        let btnClose = document.querySelector('.close');
        let searching = document.querySelector('.search');
        let searchIcon = document.querySelector('.search-icon');
        if(!e.currentTarget.classList.contains('searching')) {
            searching.classList.add('searching');
            searchIcon.classList.add('search-icon-active');
            btnClose.style.display = 'block';
        }
    }
    
    const closeSearchUI = e => {
        let searching = document.querySelector('.search');
        let searchIcon = document.querySelector('.search-icon');
        e.currentTarget.style.display = 'none';
        searching.classList.remove("searching");
        searchIcon.classList.remove('search-icon-active');
    }

    function debounced(func, wait) {
        let timeout;
        
        return function() {
            let context = this,
                args = arguments;
            
            let executeFunction = function() {
                func.apply(context, args);
            }

            clearTimeout(timeout);
            timeout = setTimeout(executeFunction, wait);
        }
    }

    const handleOnSearch = debounced(function(e) {

        console.log(e.target.value);
        if(e.target.value.trim().length !== 0) {
            handleSearch(e.target.value);
        }
    }, 500);
    
    return (
        <div className="search">
          <div className="close" onClick={closeSearchUI}>&#10005;</div>
          <div className="search-box">
            <input type="text" className="search-input" required onChange={e => { e.persist(); handleOnSearch(e); }}/>
            <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchUI}/>
          </div>
          <Result search={search} getSongAudio={getSongAudio}/>
        </div>
    )
}

export default SearchBox