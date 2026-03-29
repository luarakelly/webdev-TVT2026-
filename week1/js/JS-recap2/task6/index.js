function movie() {
    let movieTitle = prompt("Enter the movie title:");
    let movieDetails = prompt("Enter the movie details:");
    let movieRating = prompt("Enter the movie rating (scale of 1-5):");

    let movie = {
        title: movieTitle,
        details: movieDetails,
        rating: parseFloat(movieRating)
    };
    return movie;
};

function addMovies() {
    let movies = [];

    let moviesAmount = parseInt(prompt("How many movies do you want to add?"));
    for ( let movieIndex = 0; movieIndex < moviesAmount; movieIndex++) {
        movies.push(movie());
    }
    return movies; 
};

function displayMovies(movies) {
    // Sort movies by rating in descending order
    let sortedMovies = movies.sort((movieA, movieB) => movieB.rating - movieA.rating);

    document.getElementById('movieRatings').innerHTML = `
    <ul> 
        ${sortedMovies.map(movie => `
            <li> Title: ${movie.title}, </li>
            <li> Description: ${movie.details},  </li>
            <li> Rating: ${movie.rating} </li>
            <br>
            `
        ).join('')}
    </ul>
    `;
}

// Main program
let movies = addMovies();
displayMovies(movies);