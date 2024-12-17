//NAV BAR LOUISIANE
// **sous menu
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

// *barre de recherche
document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchBox = document.getElementById('search-box');
    const form = document.getElementById('searchForm');
    let filterType = 'all'; // Type de filtre par défaut

    // Ajoute un événement au clic sur l'icône de recherche
    searchIcon.addEventListener('click', () => {
        searchBox.classList.toggle('active'); // Ajoute ou supprime la classe active
        searchBox.focus(); // Focalise la barre de recherche pour permettre la saisie de texte
    });

    // Gestion de l'événement "keydown" sur la barre de recherche
    searchBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const searchQuery = searchBox.value.trim();
            if (searchQuery) {
                // Redirige vers la page des résultats avec la requête de recherche et le filtre
                window.location.href = `/html/resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
            }
        }
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche le rechargement de la page
        const searchQuery = searchBox.value.trim();
        if (searchQuery) {
            // Redirige vers la page des résultats avec la requête de recherche et le filtre
            window.location.href = `/html/resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
        }
    });
});

/************ API TMBD ************/
// API TMDB
const apiKey = 'abedd43cf8d6083e8a33eafb9cc8b3f4';
const query = 'Totally Spies';

// Sélectionner les éléments HTML où afficher les résultats
const synopsisElement = document.getElementById('synopsis');
const genresElement = document.getElementById('genres');
const yearElement = document.getElementById('year');
const runtimeElement = document.getElementById('runtime');
const seasonsElement = document.getElementById('seasons');
const loadingElement = document.getElementById('loading');


// 1. Rechercher la série "Totally Spies" par son nom
fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=fr-FR`)
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results.length > 0) {
            // Récupérer l'ID de la série
            const seriesId = data.results[0].id;

            // 2. Utiliser l'ID pour récupérer les détails de la série
            fetch(`https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}&language=fr-FR`)
                .then(response => response.json())
                .then(seriesDetails => {
                    // Supprimer le message de chargement
                    loadingElement.style.display = 'none';

                    // Afficher le synopsis et les genres
                    synopsisElement.textContent = seriesDetails.overview || "Aucun synopsis disponible.";
                    const genres = seriesDetails.genres.map(genre => genre.name).join(', ');
                    genresElement.textContent = genres || "Genres non disponibles.";

                    // Afficher l'année de création (first_air_date)
                    yearElement.textContent = seriesDetails.first_air_date ? seriesDetails.first_air_date.split('-')[0] : "Année non disponible.";

                    // Afficher la durée d'un épisode (episode_run_time)
                    const runtime = seriesDetails.episode_run_time.length > 0 ? `${seriesDetails.episode_run_time[0]} minutes` : "Durée non disponible.";
                    runtimeElement.textContent = runtime;

                    // Afficher le nombre de saisons (number_of_seasons)
                    seasonsElement.textContent = seriesDetails.number_of_seasons || "Nombre de saisons non disponible.";
                })
                .catch(error => {
                    loadingElement.textContent = "Erreur lors de la récupération des détails de la série.";
                    console.error('Erreur lors de la récupération des détails de la série:', error);
                });
        } else {
            loadingElement.textContent = "Aucune série trouvée avec ce nom.";
        }
    })
    .catch(error => {
        loadingElement.textContent = "Erreur lors de la recherche.";
        console.error('Erreur lors de la recherche:', error);
    });

// CARROUSSEL DE LOUISIANE
document.addEventListener('DOMContentLoaded', function () {
    const seriesContainer = document.getElementById('series-container');

    const genreMap = {
        16: 'Animation',
        35: 'Comédie',
        10759: 'Action & Adventure',
        18: 'Drame',
        10765: 'Science-Fiction & Fantastique',
    };

    const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&with_genres=16&first_air_date.gte=1970-01-01&first_air_date.lte=2010-12-31`;

    let allSeries = []; // Tableau pour stocker toutes les séries récupérées
    let currentIndex = 0; // Index courant pour le carrousel
    const itemsPerView = 5; // Nombre d'éléments à afficher

    // Fonction pour récupérer les séries
    function fetchShows() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                allSeries = data.results; // Stocke les séries récupérées
                initializeCarousel(); // Initialise le carrousel après récupération
                showCurrentItems(); // Affiche les premières séries
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des séries :', error);
            });
    }

    // Fonction pour afficher les séries dans le conteneur
    function showCurrentItems() {
        seriesContainer.innerHTML = ''; // Efface le conteneur avant d'ajouter de nouveaux éléments

        // Affiche les séries à partir de l'index courant
        for (let i = currentIndex; i < currentIndex + itemsPerView && i < allSeries.length; i++) {
            const show = allSeries[i];
            const item = document.createElement('div');
            item.classList.add('item');

            // Configure l'image de fond
            item.style.backgroundImage = show.backdrop_path
                ? `url(https://image.tmdb.org/t/p/w500${show.backdrop_path})`
                : 'url(https://via.placeholder.com/500x300?text=No+Image)';

            // Élément de contenu
            const bodyItem = document.createElement('div');
            bodyItem.classList.add('body-item');

            // Élément de corps 1 avec icône de lecture
            const bodyItem1 = document.createElement('div');
            bodyItem1.classList.add('body-item-1');
            bodyItem1.innerHTML = `<div class="play"><i class="fa-solid fa-play"></i></div>`;

            const contentWrapper = document.createElement('div');
            contentWrapper.classList.add('content-wrapper');

            // Titre de la série
            const title = document.createElement('div');
            title.classList.add('title', 'body-item-2');
            title.textContent = show.name;

            // Propriétés de la série
            const properties = document.createElement('div');
            properties.classList.add('properties', 'body-item-3');

            const genreNames = show.genre_ids.map(id => genreMap[id] || 'Inconnu').join(', ');
            const match = show.vote_average ? `${Math.round(show.vote_average * 10)}% Match` : 'N/A';
            const ageLimit = show.age_rating || '13+';
            const timeOrSeasons = show.runtime && show.runtime.length > 0 && show.runtime[0] > 0
                ? `${Math.floor(show.runtime[0] / 60)}h ${show.runtime[0] % 60}m`
                : `${show.number_of_seasons} saisons`;

            properties.innerHTML = `
                    <span class="match">${match}</span>
                    <span class="year">${show.first_air_date ? show.first_air_date.split('-')[0] : 'N/A'}</span>
                    <span class="age-limit">${ageLimit}</span>
                    <span class="time">${timeOrSeasons}</span>
                    <span class="genres">${genreNames}</span>
                `;

            // Ajout du titre et des propriétés dans le content-wrapper
            contentWrapper.appendChild(title);
            contentWrapper.appendChild(properties);

            // Ajouter les éléments au body-item
            bodyItem.appendChild(bodyItem1);
            bodyItem.appendChild(contentWrapper);
            item.appendChild(bodyItem);

            // Ajouter l'élément à la série
            seriesContainer.appendChild(item);
        }
    }

    // Fonction pour initialiser le carrousel
    function initializeCarousel() {
        const prevButton = document.querySelector('.arrow-left-series');
        const nextButton = document.querySelector('.arrow-right-series');

        if (!prevButton || !nextButton) {
            return; // Si les boutons ne sont pas trouvés, ne pas continuer
        }

        nextButton.addEventListener('click', () => {
            // Incrémente l'index courant tout en s'assurant qu'il ne dépasse pas le nombre total de séries
            if (currentIndex + itemsPerView < allSeries.length) {
                currentIndex += itemsPerView;
            } else {
                currentIndex = 0; // Revenir au début
            }
            showCurrentItems(); // Met à jour l'affichage
        });

        prevButton.addEventListener('click', () => {
            // Décrémente l'index courant tout en s'assurant qu'il ne devient pas négatif
            if (currentIndex - itemsPerView >= 0) {
                currentIndex -= itemsPerView;
            } else {
                currentIndex = Math.floor((allSeries.length - 1) / itemsPerView) * itemsPerView; // Retourner à la dernière page complète
            }
            showCurrentItems(); // Met à jour l'affichage
        });

        showCurrentItems(); // Afficher les éléments initiaux
    }

    fetchShows(); // Appeler la fonction pour récupérer les séries
});
