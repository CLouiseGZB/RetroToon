
// **********************sous menu
document.addEventListener('DOMContentLoaded', () => {
    const accountToggle = document.getElementById('accountToggle');
    const accountSubMenu = document.getElementById('accountSubMenu');

    accountToggle.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le lien de naviguer
        accountSubMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        // Cacher le sous-menu si on clique en dehors de l'élément ou du sous-menu
        if (!accountToggle.contains(e.target) && !accountSubMenu.contains(e.target)) {
            accountSubMenu.classList.remove('active');
        }
    });
});
;
// ***********barre de recherche
// document.addEventListener('DOMContentLoaded', () => {
//     const searchIcon = document.querySelector('.search-icon');
//     const searchBox = document.getElementById('search-box');
//     // const filterAllButton = document.getElementById('filter-all');
//     // const filterAnimationButton = document.getElementById('filter-animation');
//     // const filterMoviesButton = document.getElementById('filter-movies');
//     let filterType = 'all'; // Type de filtre par défaut

//     // Bascule la visibilité de la barre de recherche lors du clic sur l'icône
//     searchIcon.addEventListener('click', () => {
//         searchBox.classList.toggle('active'); // Ajoute ou supprime la classe active
//         searchBox.focus(); // Focalise la barre de recherche pour permettre la saisie de texte
//     });

//     // Gère l'événement "Enter" pour déclencher la recherche avec le filtre actuel
//     searchBox.addEventListener('keydown', (event) => {
//         if (event.key === 'Enter') {
//             event.preventDefault(); // Empêche le rechargement de la page
//             const searchQuery = searchBox.value.trim(); // Récupère la valeur de la barre de recherche
//             if (searchQuery) {
//                 // Redirige vers la page des résultats avec la requête de recherche et le filtre
//                 window.location.href = `resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
//             }
//         }
//     });

//     document.addEventListener('DOMContentLoaded', () => {
//         const searchIcon = document.querySelector('.search-icon');
//         const searchBox = document.getElementById('search-box');
//         const form = document.getElementById('searchForm');
//         let filterType = 'all'; // Type de filtre par défaut
    
//         // Ajoute un événement au clic sur l'icône de recherche
//         searchIcon.addEventListener('click', () => {
//             searchBox.classList.toggle('active'); // Ajoute ou supprime la classe active
//             searchBox.focus(); // Focalise la barre de recherche pour permettre la saisie de texte
//         });
    
//         // Gestion de l'événement "keydown" sur la barre de recherche
//         searchBox.addEventListener('keydown', (event) => {
//             if (event.key === 'Enter') {
//                 event.preventDefault();
//                 const searchQuery = searchBox.value.trim();
//                 if (searchQuery) {
//                     // Redirige vers la page des résultats avec la requête de recherche et le filtre
//                     window.location.href = `/html/resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
//                 }
//             }
//         });
    
//         // Gestion de la soumission du formulaire
//         form.addEventListener('submit', function(event) {
//             event.preventDefault(); // Empêche le rechargement de la page
//             const searchQuery = searchBox.value.trim();
//             if (searchQuery) {
//                 // Redirige vers la page des résultats avec la requête de recherche et le filtre
//                 window.location.href = `/html/resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
//             }
//         });
//     });
    

//     // Événements de clic sur les boutons de filtre
//     filterAllButton.addEventListener('click', () => {
//         applyFilter('all');
//     });

//     filterAnimationButton.addEventListener('click', () => {
//         applyFilter('animation');
//     });

//     filterMoviesButton.addEventListener('click', () => {
//         applyFilter('movies');
//     });
// });



// // Événements de soumission et de recherche
//     // Gestion des filtres pour la recherche
//     function applyFilter(newFilterType) {
//         filterType = newFilterType;
//         const searchQuery = searchBox.value.trim(); // Récupère la valeur actuelle de la barre de recherche
//         if (searchQuery) {
//             // Redirige vers la page des résultats avec la requête de recherche et le filtre appliqué
//             window.location.href = `/html/resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
//         }
//     }


// input.addEventListener('keyup', event => {
//     if (event.key === 'Enter') {
//         const searchQuery = input.value.trim();
//         search(searchQuery);
//     }
// });





// // Charger les résultats lorsque la page est chargée
window.addEventListener('load', loadResults);


// **************Mode enfant
function modeEnfant() {
    // Basculer entre le mode Enfant et Adulte en ajoutant ou supprimant la classe 'mode-enfant'
    document.body.classList.toggle('mode-enfant');
}

// ***********API TMDB**************
// *************************Pages séries
// Clé API pour accéder à l'API de The Movie Database (TMDB)





// **********Page films****************
const API_KEY = 'abedd43cf8d6083e8a33eafb9cc8b3f4';

// Variables pour les filtres et la pagination
let selectedGenreFilm = '';  // Genre secondaire sélectionné
let selectedAnneeFilm = '';   // Plage d'années sélectionnée
let currentPageFilm = 1;      // Page actuelle
let totalPagesFilm = 1;       // Nombre total de pages

const containerFilms = document.getElementById('films');

// URL de base pour récupérer les films d'animation
const apiUrlBaseFilms = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16&primary_release_date.gte=1970-01-01&primary_release_date.lte=2010-12-31&language=fr`;

// Fonction pour récupérer les films avec les filtres sélectionnés
function fetchFilms(page = 1) {
    let apiUrl = `${apiUrlBaseFilms}&page=${page}`;

    // Ajouter le genre sélectionné s'il existe (exclut les genres non-animation)
    if (selectedGenreFilm) {
        apiUrl += `&with_genres=16,${selectedGenreFilm}`; // Genre d'animation + genre secondaire
    }

    // Ajouter les filtres d'année
    if (selectedAnneeFilm) {
        const [startYear, endYear] = selectedAnneeFilm.split(',');
        apiUrl += `&primary_release_date.gte=${startYear}&primary_release_date.lte=${endYear}`;
    }

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            return response.json();
        })
        .then(data => {
            // Mettre à jour le nombre total de pages
            totalPagesFilm = data.total_pages;
            currentPageFilm = page; // Mettre à jour la page actuelle

            const filmsList = data.results.map(film => {
                return {
                    title: film.title,
                    year: film.release_date ? film.release_date.split('-')[0] : 'Année inconnue',
                    affiche: film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : 'https://via.placeholder.com/500x750?text=Image+non+disponible',
                    popularity: film.popularity,
                    tmdbId: film.id
                };
            });

            // Afficher les cartes des films
            displayFilms(filmsList);

            // Mettre à jour l'affichage de la pagination
            updatePagination();
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des films:', error);
            containerFilms.innerHTML = '<p>Erreur lors de la récupération des films.</p>';
        });
}

// Fonction pour afficher les films
function displayFilms(films) {
    // Trier les films par popularité (décroissant)
    const sortedFilms = films.sort((a, b) => b.popularity - a.popularity);

    // Afficher les cartes des films
    containerFilms.innerHTML = ''; // Vider le conteneur avant d'ajouter les nouvelles cartes
    sortedFilms.forEach(film => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${film.affiche}" alt="${film.title}">
            <div>
                <p>${film.title}</p>
                <p>${film.year}</p>
            </div>
        `;
        containerFilms.appendChild(card);
    });
}

// Mettre à jour l'affichage de la pagination
function updatePagination() {
    document.getElementById('current-page-films').textContent = `Page ${currentPageFilm}`;
    document.getElementById('prev-page-films').disabled = currentPageFilm === 1;
    document.getElementById('next-page-films').disabled = currentPageFilm === totalPagesFilm;
}

// Événements pour les filtres
document.getElementById('filter-all').addEventListener('click', () => {
    selectedGenreFilm = ''; // Réinitialiser à une option par défaut
    selectedAnneeFilm = ''; // Réinitialiser à une option par défaut
    currentPageFilm = 1; // Réinitialiser à la première page
    fetchFilms(currentPageFilm); // Afficher tous les films
});

document.getElementById('filter-genre').addEventListener('change', (event) => {
    selectedGenreFilm = event.target.value; // Met à jour le genre sélectionné
    currentPageFilm = 1; // Réinitialiser à la première page
    fetchFilms(currentPageFilm); // Afficher les films filtrés
});

document.getElementById('filter-annees').addEventListener('change', (event) => {
    selectedAnneeFilm = event.target.value; // Met à jour l'année sélectionnée
    currentPageFilm = 1; // Réinitialiser à la première page
    fetchFilms(currentPageFilm); // Afficher les films filtrés
});

// Événements pour la pagination
document.getElementById('prev-page-films').addEventListener('click', () => {
    if (currentPageFilm > 1) {
        currentPageFilm--;
        fetchFilms(currentPageFilm); // Afficher la page précédente
    }
});

document.getElementById('next-page-films').addEventListener('click', () => {
    if (currentPageFilm < totalPagesFilm) {
        currentPageFilm++;
        fetchFilms(currentPageFilm); // Afficher la page suivante
    }
});

// Appeler la fonction pour charger et afficher les films d'animation au chargement de la page
fetchFilms(currentPageFilm);












// Filtre barre de recherche avec tmdb
const form = document.getElementById('searchForm');
const input = document.getElementById('search-box'); // Petite barre de recherche
// const largeSearchBox = document.getElementById('large-search-box');
const results = document.getElementById('results');
const filterAllButton = document.getElementById('filter-all');
const filterAnimationButton = document.getElementById('filter-animation');
const filterMoviesButton = document.getElementById('filter-movies');
// const largeSearchButton = document.getElementById('large-search-button'); // Nouveau bouton de recherche pour la grande barre

let _imageBaseUrl, _imageSizes;
let filterType = 'all'; // Type de filtre par défaut

// Obtenez les configurations d'image au chargement de la page
fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    _imageBaseUrl = data.images.base_url;
    _imageSizes = data.images.poster_sizes;
  })
  .catch(error => console.error('Erreur lors de la récupération des configurations :', error));

  document.addEventListener('DOMContentLoaded', () => {
    const query = new URLSearchParams(window.location.search).get('query');
    const filter = new URLSearchParams(window.location.search).get('filter') || 'all'; // Par défaut 'all'

    if (query) {
        search(query, filter);
    }
});

// Fonction pour effectuer une recherche
function search(query) {
    if (query) {
        results.innerHTML = ''; // Nettoyer les résultats précédents
        searchMovies(query);
        searchTVShows(query);
    }
}

// Fonction pour rechercher les films
function searchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR&include_adult=false`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (filterType === 'movies' || filterType === 'all') {
                showMovies(data.results);
            }
        })
        .catch(error => console.error('Erreur lors de la recherche de films :', error));
}

// Fonction pour rechercher les séries TV
function searchTVShows(query) {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR&include_adult=false`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (filterType === 'animation' || filterType === 'all') {
                showTVShows(data.results);
            }
        })
        .catch(error => console.error('Erreur lors de la recherche de séries :', error));
}

// Afficher les films en fonction du filtre
function showMovies(movies) {
    let filteredMovies = movies.filter(movie => movie.genre_ids.includes(16)); // Genre 16 est Animation

    // Filtrer les films en fonction de l'année
    filteredMovies = filteredMovies.filter(movie => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear >= 1970 && releaseYear <= 2010;
    });

    // Afficher les films en fonction du filtre
    if (filterType === 'movies') {
        results.innerHTML = buildResultsHeader('Films', filteredMovies.length);
        results.innerHTML += filteredMovies.map(buildMovieElement).join('');
    } else if (filterType === 'all') {
        results.innerHTML += filteredMovies.map(buildMovieElement).join('');
    }
}

// Afficher les séries TV en fonction du filtre
function showTVShows(tvShows) {
    let filteredTVShows = tvShows.filter(show => show.genre_ids.includes(16)); // Genre 16 est Animation

    // Filtrer les séries TV en fonction de l'année
    filteredTVShows = filteredTVShows.filter(show => {
        const firstAirYear = new Date(show.first_air_date).getFullYear();
        return firstAirYear >= 1970 && firstAirYear <= 2010;
    });

    // Afficher les séries TV en fonction du filtre
    if (filterType === 'animation') {
        results.innerHTML = buildResultsHeader('Animation', filteredTVShows.length);
        results.innerHTML += filteredTVShows.map(buildTVShowElement).join('');
    } else if (filterType === 'all') {
        results.innerHTML += filteredTVShows.map(buildTVShowElement).join('');
    }
}

// Construire l'en-tête des résultats
function buildResultsHeader(type, count) {
    let headerText = `${count} résultats pour "${type}"`;
    return `
        <div class="results-header">
            <h2>${headerText}</h2>
        </div>
    `;
}

// Construire un élément pour un film
function buildMovieElement(movie) {
    const posterPath = movie.poster_path ? getMoviePoster(movie.poster_path) : 'https://via.placeholder.com/200x300?text=No+Image';
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Année inconnue';

    return `<li>
        <article class="movie">
            <header class="movie-header">
                <h3 class="movie-title">${movie.title}</h3>
                <span class="movie-year">${releaseYear}</span>
            </header>
            <figure class="movie-poster"><img src="${posterPath}" alt="${movie.title} Poster"></figure>
            <p class="movie-overview">${movie.overview || 'Aucune description disponible.'}</p>
        </article>
    </li>`;
}

// Construire un élément pour une série TV
function buildTVShowElement(tvShow) {
    const posterPath = tvShow.poster_path ? getMoviePoster(tvShow.poster_path) : 'https://via.placeholder.com/200x300?text=No+Image';
    const firstAirYear = tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : 'Année inconnue';

    return `<li>
        <article class="tv-show">
            <header class="tv-show-header">
                <h3 class="tv-show-title">${tvShow.name}</h3>
                <span class="tv-show-year">${firstAirYear}</span>
            </header>
            <figure class="tv-show-poster"><img src="${posterPath}" alt="${tvShow.name} Poster"></figure>
            <p class="tv-show-overview">${tvShow.overview || 'Aucune description disponible.'}</p>
        </article>
    </li>`;
}

// Construire l'URL de l'image du film
function getMoviePoster(imagePath) {
    if (!_imageBaseUrl || !_imageSizes || _imageSizes.length === 0) {
        return 'https://via.placeholder.com/200x300?text=No+Image';
    }
    return `${_imageBaseUrl}${_imageSizes[2]}${imagePath}`; // Utiliser la taille d'image par défaut
}


// Charger les résultats basés sur la requête URL
function loadResults() {
    const query = getQueryParam('query');
    if (query) {
        search(query);
    }
}

// *************************barre de recherche
document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchBox = document.getElementById('search-box');
    const filterAllButton = document.getElementById('filter-all');
    const filterAnimationButton = document.getElementById('filter-animation');
    const filterMoviesButton = document.getElementById('filter-movies');
    let filterType = 'all'; // Type de filtre par défaut

    // Bascule la visibilité de la barre de recherche lors du clic sur l'icône
    searchIcon.addEventListener('click', () => {
        searchBox.classList.toggle('active'); // Ajoute ou supprime la classe active
        searchBox.focus(); // Focalise la barre de recherche pour permettre la saisie de texte
    });

    // Gère l'événement "Enter" pour déclencher la recherche avec le filtre actuel
    searchBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Empêche le rechargement de la page
            const searchQuery = searchBox.value.trim(); // Récupère la valeur de la barre de recherche
            if (searchQuery) {
                // Redirige vers la page des résultats avec la requête de recherche et le filtre
                window.location.href = `resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
            }
        }
    });

    // Gestion des filtres pour la recherche
    function applyFilter(newFilterType) {
        filterType = newFilterType;
        const searchQuery = searchBox.value.trim(); // Récupère la valeur actuelle de la barre de recherche
        if (searchQuery) {
            // Redirige vers la page des résultats avec la requête de recherche et le filtre appliqué
            window.location.href = `resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
        }
    }

    // Événements de clic sur les boutons de filtre
    filterAllButton.addEventListener('click', () => {
        applyFilter('all');
    });

    filterAnimationButton.addEventListener('click', () => {
        applyFilter('animation');
    });

    filterMoviesButton.addEventListener('click', () => {
        applyFilter('movies');
    });
});


// Événements de soumission et de recherche
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-id');
    const input = document.getElementById('search-input-id');

    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault(); // Empêche le rechargement de la page par défaut
            const searchQuery = input.value.trim();
            if (searchQuery) {
                // Redirige vers la page des résultats en ajoutant la requête de recherche à l'URL
                window.location.href = `resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}`;
            }
        });
    }
});



input.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        const searchQuery = input.value.trim();
        search(searchQuery);
    }
});

largeSearchBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        const searchQuery = largeSearchBox.value.trim();
        search(searchQuery);
    }
});

largeSearchButton.addEventListener('click', () => {
    const searchQuery = largeSearchBox.value.trim();
    search(searchQuery);
});

// Événements de clic sur les boutons de filtre
filterAllButton.addEventListener('click', () => {
    filterType = 'all';
    const searchQuery = largeSearchBox.value.trim() || input.value.trim();
    search(searchQuery);
});

filterAnimationButton.addEventListener('click', () => {
    filterType = 'animation';
    const searchQuery = largeSearchBox.value.trim() || input.value.trim();
    search(searchQuery);
});

filterMoviesButton.addEventListener('click', () => {
    filterType = 'movies';
    const searchQuery = largeSearchBox.value.trim() || input.value.trim();
    search(searchQuery);
});

// Charger les résultats lorsque la page est chargée
window.addEventListener('load', loadResults);


