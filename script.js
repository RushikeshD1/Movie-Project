const searchMovies = document.getElementById('movie-search');
const movieContainer = document.getElementById('movie-container')
const pagination = document.getElementById('pagination');


const API_KEY = `f928b7fa`;
const BASE_URL = ` http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`;

const debounce = (fn, delay)=>{
    let timer;
    return function(){        
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        },delay)
    }
}

async function fetchMovies(page = 1){
    const response  = await fetch(`${BASE_URL}&s=${searchMovies.value}&page=${page}`);
    const data = await response.json();
    console.log(data);
    const {Search, Response, totalResults} = data

    Response === 'False' ? responseFalse() : displayMovieContainer(Search, totalResults, page)
}

function responseFalse(){
    movieContainer.innerHTML = `
    <h1>No movie found for your search "${searchMovies.value}"</h1>
    `
}

function displayMovieContainer(Search, totalResults, page){
    movieContainer.innerHTML = "";

    Search.forEach((movie) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src = "${movie.Poster}"/>
            <div class = "card-body">
                <h2><span>Movie Name : </span>${movie.Title}</h2>
                <p><span>Year :</span> ${movie.Year}</p>                
            </div>
        `
        movieContainer.appendChild(card)
    });
    displayPagination(totalResults, page)     
    

}

// let curentPage = 1;

const displayPagination = (totalResults, curentPage) =>{

    const totalpage = Math.ceil(totalResults/10);
    pagination.className = 'pigi'
    pagination.innerHTML = `
    <button ${curentPage === 1 ? "disabled" : ""} onclick="fetchMovies(${curentPage -1 })">Previous</button>
    <span>${curentPage} 0f ${totalpage}</span>
    <button ${curentPage === totalpage ? "disabled" : "" } onclick="fetchMovies(${curentPage +1 })">Next</button>
    `
}


const debouncedFunction = debounce(fetchMovies, 1000);

searchMovies.addEventListener('input', event => {
    debouncedFunction(); 
});