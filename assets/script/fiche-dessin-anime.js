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
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page
        const searchQuery = searchBox.value.trim();
        if (searchQuery) {
            // Redirige vers la page des résultats avec la requête de recherche et le filtre
            window.location.href = `/html/resultas-barre-de-recherche.html?query=${encodeURIComponent(searchQuery)}&filter=${filterType}`;
        }
    });
});

//LECTEUR VIDÉO  MORGANE
//initialisation des valeurs 
const video = document.getElementById('my-video');
const playPauseButton = document.getElementById('play-pause-btn');
const forwardButton = document.getElementById('btn-en-avant');
const rewindButton = document.getElementById('btn-en-arriere');
const progressBar = document.getElementById('progress-bar');
const videoCurrentTime = document.getElementById('current-time');
const videoDuration = document.getElementById('duration-time');
const fullScreenButton = document.getElementById('full-screen');
const muteButton = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
const videoContainer = document.getElementById('video-container');
const videoControlsContainer = document.getElementById('video-controls-container');
const titleOnVideoContainer = document.getElementById('title-video-container');
const thumbSlider = document.getElementById('thumb-slider');
const favoriteButton = document.getElementById('favorite-button');
const likeButton = document.getElementById('like-button');
const frame = document.getElementById('frame-video-title-controls');

//fonction pour initialiser le player 
document.addEventListener('DOMContentLoaded', () => {
    playPauseButton.addEventListener('click', playPause);
    progressBar.addEventListener('change', updateProgress);
    video.addEventListener('timeupdate', videoTimeUpdate);
    fullScreenButton.addEventListener('click', openFullScreen);
    muteButton.addEventListener('click', muteUnmute);
    volumeSlider.addEventListener('change', setVolume);
    thumbSlider.addEventListener('input', videoTimeUpdate);
})

/********* RIGHT CONTROLS *********/
//BOUTON PAUSE ET PLAY 
function playPause() {
    if (video.paused) {
        video.play();
        playPauseButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        video.pause();
        playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

//BOUTON 10SEC EN AVANT 
forwardButton.addEventListener('click', function () {
    video.currentTime += 10;
});

//BOUTON 10SEC EN ARRIÈRE
rewindButton.addEventListener('click', function () {
    video.currentTime -= 10;
});

//BARRE DE PROGRESSION
function videoTimeUpdate() {
    if (video.duration) {
        //calculer le pourcentage de progression
        let newTime = (video.currentTime / video.duration) * 100;

        //mettre a jour la barre de progression et le slider
        progressBar.style.width = newTime + '%';
        thumbSlider.value = newTime;

        //CURRENT PLAY TIME : on calcule le temps de la vidéo ici
        let currentMinutes = Math.floor(video.currentTime / 60);
        let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(video.duration / 60);
        let durationSeconds = Math.floor(video.duration - durationMinutes * 60);
        if (currentSeconds < 10) { currentSeconds = `0${currentSeconds}`; }
        if (durationSeconds < 10) { durationSeconds = `0${durationSeconds}`; }
        if (currentMinutes < 10) { currentMinutes = `0${currentMinutes}`; }
        if (durationMinutes < 10) { durationMinutes = `0${durationMinutes}`; }

        videoCurrentTime.innerHTML = currentMinutes + " : " + currentSeconds;
        videoDuration.innerHTML = durationMinutes + " : " + durationSeconds;
    }
}

//MISE À JOUR DU TEMPS ÉCOULÉ SUR LA VIDÉO
function updateProgress() {
    const progressPercentage = video.duration * (progressBar.value / 100);
    video.currentTime = progressPercentage;
    console.log(video.duration);
    console.log(progressBar.value);
}


// Permet de cliquer sur la barre pour changer l'avancement de la vidéo
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * video.duration;
    video.currentTime = seekTime;
});

// Permet de cliquer n'importe où sur la barre et déplacer le thumb slider
progressBar.addEventListener('click', (e) => {
    const totalWidth = progressBar.clientWidth;  // Largeur totale du slider
    const clickX = e.offsetX;  // Position du clic par rapport à l'input
    const percent = (clickX / totalWidth) * 100;  // Calcul du pourcentage cliqué

    // Ajuste la valeur du slider et de la vidéo en fonction du clic
    progressBar.value = percent;
    const seekTime = (percent / 100) * video.duration;
    video.currentTime = seekTime;
});

/********* LEFT CONTROLS *********/
// VIDEO EN PLEIN ECRAN OU EN PETIT ECRAN: 
function openFullScreen() {
    if (fullScreenButton.innerHTML == '<i class="fa-solid fa-expand"></i>') {
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (videoContainer.webkitRequestFullscreen) { /*Pour Safari*/
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) { /*Pour internet explorer*/
            videoContainer.msRequestFullscreen();
        }
        fullScreenButton.innerHTML = '<i class="fa-solid fa-compress"></i>';
    }
    else if (fullScreenButton.innerHTML == '<i class="fa-solid fa-compress"></i>') {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscren) {
            document.webkitExitFullscren();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fullScreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
}

//MUTE ET UNMUTE
function muteUnmute() {
    if (video.muted) {
        video.muted = false;
        muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>'; /*= volume activé */

    } else {
        video.muted = true;
        muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; /* = volume coupé*/

    }
}

//REGLAGE DU VOLUME
function setVolume() {
    video.volume = volumeSlider.value / 100;

    if (volumeSlider.value == 0) {
        video.muted = true; // Mute si le volume est à zéro
        muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'; /*= unmute*/
    } else if (volumeSlider.value > 0 && volumeSlider.value < 50) {
        video.muted = false; // Unmute si le volume est supérieur à zéro
        muteButton.innerHTML = '<i class="fa-solid fa-volume-low"></i>'; /*= mute*/
    } else {
        muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }

}


//FRAME QUI CONTIENT LES CONTROLS ET TITRE, EST CACHÉE LORS DU PASSAGE DE LA SOURIS
videoContainer.addEventListener('mouseover', () => {
    frame.style.opacity = 1;
})

videoContainer.addEventListener('mouseleave', () => {
    frame.style.opacity = 0;
})

// FRAME QUI DISPARAIT AU BOUT DE TROIS SECONDES QUAND ON EST PLEIN ÉCRAN
let controlsTimeout;
let mouseMoveTimeout;
// Afficher les contrôles lorsque la souris bouge sur la vidéo
videoContainer.addEventListener('mousemove', () => {
    clearTimeout(controlsTimeout);
    clearTimeout(mouseMoveTimeout);

    frame.style.opacity = 1; // Afficher les contrôles

    // Cacher les contrôles si la souris ne bouge plus après 2 secondes
    mouseMoveTimeout = setTimeout(() => {
        frame.style.opacity = 0;
    }, 3000);
});


/************ FAVORITE AND LIKE SECTION ************/
// BOUTON COEUR
let favorite = false;
favoriteButton.addEventListener('click', () => {
    favorite = !favorite;

    if (favorite) {
        //afficher l'icone "favoris" (coeur plein)
        favoriteButton.innerHTML = '<p>Favoris <i class="fi fi-sr-heart"></i></p>';
        favoriteButton.style = 'color: #EB7A57';
    } else {
        //afficher l'icone "favoris" (coeur vide)
        favoriteButton.innerHTML = '<p>Favoris <i class="fi fi-rr-heart"></i></p>';
        favoriteButton.style = 'color: #FFFAE0';

    }
});

// BOUTON POUCE LEVÉ
let liked = false; // Suivre l'état du "like"
likeButton.addEventListener('click', () => {
    liked = !liked; // Bascule entre like/unlike

    if (liked) {
        // Afficher l'icône "like" (pouce levé plein)
        likeButton.innerHTML = '<p>Like <i class="fi fi-sr-feedback-review"></i></p>';
        likeButton.style = 'color: #EB7A57';
    } else {
        // Afficher l'icône "unlike" (pouce levé vide)
        likeButton.innerHTML = '<p>Like <i class="fi fi-tr-feedback-review"></i></p>';
        likeButton.style = 'color: #FFFAE0';

    }
});

/************ COMMENTAIRES ************/
//envoi des commentaires
const inputUser = document.getElementById('input-user');
const containerGeneralComment = document.getElementById('comment-container')
const submitButton = document.getElementById('submit');
let userCommentRow = document.getElementById('user-comment-row');

/************ AJOUT D'UN COMMENTAIRE A LA BOITE DE COMMENTAIRES + VERIFICATION ************/

function addComment() {

    let comment = document.createElement('p');
    comment.classList.add('commentaire');

    if (inputUser.value.trim() == "" || inputUser.value == null) {
        alert("Laissez un commentaire !");
        return false;
    } else {

        comment.innerHTML = inputUser.value;

        containerGeneralComment.appendChild(userCommentRow);
        containerGeneralComment.appendChild(comment);


        /************ BOUTON QUI SUPPRIME INDIVIDUELLEMENT LES COMMENTAIRES ************/

        let aSupprimer = document.createElement('span');
        aSupprimer.classList.add('btn-a-supprimer');

        aSupprimer.innerHTML = '<i class="fa-solid fa-trash"></i>';

        aSupprimer.style = 'color: #FACA78; font-size: 20px; cursor: pointer; margin-left: 10px;';

        comment.appendChild(aSupprimer);

        aSupprimer.addEventListener("click", function (event) {
            event.stopPropagation();
            userCommentRow.remove();
            comment.remove();
        });
    }
}

submitButton.addEventListener("click", addComment);

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
