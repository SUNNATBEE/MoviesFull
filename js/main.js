const elMovieList = document.querySelector(".js-movie-list");
const elMovieForm = document.querySelector(".movie__form");
const elMovieInput = document.querySelector(".movie__search");
const elSelect = document.querySelector(".form__select");
const sortDomSelect = document.querySelector(".sort__select");

// bookmarks 
const elBookmarkList = document.querySelector(".bookmark__list");
const bookmarksArray = [];   
const bookmarkCount = document.querySelector(".number-moves");
const bookmarkStar = document.querySelector(".add-favorite-btn");

// Get modal Elements from dom

const modalMoviesTitle = document.querySelector(".modal__title");
const modalMoviesIframe = document.querySelector(".modal__iframe");
const modalMoviesRatong = document.querySelector(".modal__rating");
const modalMoviesYear = document.querySelector(".modal__year");
const modalMoviesTime = document.querySelector(".modal__time");
const modalMoviesDecs = document.querySelector(".modal__categories");
const modalMoviesSummary = document.querySelector(".modal__summary");
const modalMoviesLink = document.querySelector(".modal__link");
const modal = document.querySelector(".modal");
const elMinInput = document.querySelector(".min-input-year");
const elMaxInput = document.querySelector(".max-input-year");

// Get modal Elements from dom

// get select category
const ganreArray = [];
function selectMovie(selectName) {
    selectName.forEach((item) => {
        item.Categories.split("|").forEach((renderCategory) => {
            if (!ganreArray.includes(renderCategory)) {
                ganreArray.push(renderCategory);
            }
            ganreArray.sort();
        });
    });
}

// RenderSelect
function select() {
    const newFragment = document.createDocumentFragment();
    ganreArray.forEach((item) => {
        const newOption = document.createElement("option");
        newOption.value = item;
        newOption.textContent = item;
        newFragment.appendChild(newOption);
    });
    elSelect.appendChild(newFragment);
}

// sort select

function sortSelect(moviesSort , getValue){
    if(getValue == "a-z"){
        moviesSort.sort((a,b) => {
            if(a.Title > b.Title){
                return 1
            }else if (a.Title < b.Title){
                return -1;
            }else{
                return 0;
            }
        })
    } if (getValue == "z-a"){
        moviesSort.sort((a,b) =>{
            if (a.Title > b.Title) {
                return -1;
            } else if (a.Title < b.Title) {
                return 1;
            } else {
                return 0;
            }
        })
    } if(getValue === "10-1") {
        moviesSort.sort((a, b) => b.imdb_rating - a.imdb_rating);
    }``
    if (getValue === "1-10") {
        moviesSort.sort((a, b) => a.imdb_rating - b.imdb_rating);
    }
    
    if (getValue === "2018-2000") {
        moviesSort.sort((a, b) => b.movie_year - a.movie_year);
    }
    
    if (getValue === "2000-2018") {
        moviesSort.sort((a, b) => a.movie_year - b.movie_year);
    }
    
}

// Get time 
function getTime(time) {
    
    const hour = Math.floor(time / 60);
    const minut = Math.floor(time % 60);
    
    return `${hour} hs ${minut} min`
    
}
// Get time 


// Render movies
function renderMovie(movie, regex = ""){
    elMovieList.innerHTML = ""
    const elMovieTemplate = document.querySelector(".movie__template").content;
    const movieFragment = document.createDocumentFragment();
    movie.forEach(item => {
        
        const elMovieClone = elMovieTemplate.cloneNode(true);
        // if(bookmarkStar.includes(item.id)){
        // }else{
        // }
        elMovieClone.querySelector(".add-favorite-btn").dataset.favoriteId = item.imdb_id;
        elMovieClone.querySelector(".movie__img").src = `https://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;
        elMovieClone.querySelector(".movie__img").alt = item.Title;
        
        if(regex.source != "(?:)" && regex){
            elMovieClone.querySelector(".movie__title").innerHTML = String(item.Title).replace(regex, `<mark class="text-bg-warning rounded">${regex.source.toLowerCase()}</mark>`);
        }else{
            elMovieClone.querySelector(".movie__title").innerHTML = String(item.Title);
        }
        elMovieClone.querySelector(".movie__rating").textContent = item.imdb_rating;
        elMovieClone.querySelector(".movie__year").textContent = item.movie_year;
        elMovieClone.querySelector(".movie__time").textContent = getTime(item.runtime);
        elMovieClone.querySelector(".movie__description").textContent = item.Categories.split("|").join(" ");
        elMovieClone.querySelector(".movies__btn").dataset.movieId = item.imdb_id;
        
        
        
        
        movieFragment.appendChild(elMovieClone)
    });
    
    elMovieList.appendChild(movieFragment)
}
// Render movies

// Render modal
function renderModal(modalInfo){
    modalMoviesTitle.textContent = modalInfo.Title;
    modalMoviesIframe.src = `https://www.youtube-nocookie.com/embed/${modalInfo.ytid}`;
    modalMoviesRatong.textContent = modalInfo.imdb_rating;
    modalMoviesYear.textContent = modalInfo.movie_year;
    modalMoviesTime.textContent = getTime(modalInfo.runtime);
    modalMoviesDecs.textContent = modalInfo.Categories.split("|").join(" ");
    modalMoviesSummary.textContent = modalInfo.summary;
    modalMoviesLink.href = ``
}
// Render modal

// Render bookmark
function renderBookmark(bookmark,node){
    elBookmarkList.innerHTML = "";
    const elMovieTemplate = document.querySelector(".movie__template").content;
    const movieFragment = document.createDocumentFragment();
    bookmarkCount.textContent = bookmark.length;
    
    bookmark.forEach(item => {
        
        const elMovieClone = elMovieTemplate.cloneNode(true);
        elMovieClone.querySelector(".movie__img").src = `https://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;
        elMovieClone.querySelector(".movie__img").alt = item.Title;
        elMovieClone.querySelector(".movie__title").textContent = String(item.Title);
        elMovieClone.querySelector(".movie__rating").textContent = item.imdb_rating;
        elMovieClone.querySelector(".movie__year").textContent = item.movie_year;
        elMovieClone.querySelector(".movie__time").textContent = getTime(item.runtime);
        elMovieClone.querySelector(".movie__description").textContent = item.Categories.split("|").join(" ");
        elMovieClone.querySelector(".movies__btn").dataset.movieId = item.imdb_id;
        elMovieClone.querySelector(".js-delete-bookmark").dataset.deleteID = item.imdb_id;
        elMovieClone.querySelector(".add-favorite-btn").classList.add("visually-hidden");
        elMovieClone.querySelector(".js-delete-bookmark").classList.remove("visually-hidden");
        movieFragment.appendChild(elMovieClone)
    });
    
    node.appendChild(movieFragment)
}
// Render bookmark


// Listen list for modal
elMovieList.addEventListener("click" , (evt) => {
    if(evt.target.matches(".movies__btn")){
        const modalBtn = evt.target.dataset.movieId;
        const modalFindMovie = movies.find(modal => modal.imdb_id === modalBtn);
        renderModal(modalFindMovie)
    }
    if(evt.target.matches(".add-favorite-btn")){
        const favoriteBtn = evt.target.dataset.favoriteId;
        const favoriteFind = movies.find(item => item.imdb_id == favoriteBtn);
        const dat  = evt.target 
        dat.classList.add("favorited");
        if(!bookmarksArray.includes(favoriteFind)){
            bookmarksArray.push(favoriteFind);
            renderBookmark(bookmarksArray,elBookmarkList);                
        }
    }
    
})

elBookmarkList.addEventListener("click" , (evt) => {
    if(evt.target.matches(".js-delete-bookmark")){
        const deleteBookmark = evt.target.dataset.deleteID;
        const findDeleteBookmark = bookmarksArray.findIndex(item => item.imdb_id == deleteBookmark);
        bookmarksArray.splice(findDeleteBookmark, 1)
        renderBookmark(bookmarksArray, elBookmarkList);
        const dat = document.querySelector(".favorited")
        dat.classList.remove("favorited")
    }
})
// Listen list for modal


// Listen modal for scr InnerHTML
modal.addEventListener("hide.bs.modal", function(){
    modalMoviesIframe.src = "";
});
// Listen modal for scr InnerHTML


elMovieForm.addEventListener("submit" , function(evt){
    evt.preventDefault()
    const inputValue = elMovieInput.value.trim();
    const regexValu = new RegExp(inputValue , "gi");
    const sortValue = sortDomSelect.value.trim()
    
    const seacrMovie = movies.filter(item => {
        return String(item.Title).match(regexValu) && (elSelect.value == "all" || item.Categories.includes(elSelect.value));
    })
    if(seacrMovie.length > 0){
        sortSelect(seacrMovie , sortValue);
        renderMovie(seacrMovie, regexValu);
    }else{
        elMovieList.innerHTML = "Movie not found"
    }
})

selectMovie(movies)
select()
renderMovie(movies.slice(0,20));

// const changingElements = movies.map(item => {
//     return {
//       title: item.Title.toString,
//       categories: item.Categories.split("|"),
//       imdb_id:`https://www.imdb.com/title/${item.imdb_id}`,
//       ytid: `https://www.youtube-nocookie.com/embed${item.ytid}`
//       img_max:
//     };
// }) 

// console.log(changingElements);