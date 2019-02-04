import { search } from "../actions/searchActions";

window.onload = function() {
    let searchBox = document.querySelector('.search-box');
    let searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('focus', function(){
        console.log('focus', searchBox);
        searchBox.classList.add('search-box-focus');
    });

    searchInput.addEventListener('focusout', function() {
        console.log('unfocus');
        searchBox.classList.remove('search-box-focus');
    })
}
