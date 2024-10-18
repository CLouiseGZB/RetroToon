const API_KEY = 'abedd43cf8d6083e8a33eafb9cc8b3f4';


// **********************Carrousel Top 10
let currentIndex = 0;  // Index actuel de la première slide visible
const slidesToShow = 5;  // Nombre de slides visibles simultanément
let totalSlides = 0;  // Initialisé à 0 jusqu'à ce que les slides soient ajoutées

// Fonction pour mettre à jour la position du carrousel (sans animation de glissement)
function updateCarouselPosition() {
    const carouselContainer = document.querySelector('.carousel-container');
    const slideWidth = document.querySelector('.carousel-slide').offsetWidth;  // Largeur d'un slide
    carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Ajouter un event listener sur le bouton "prev"
document.querySelector('.prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex = Math.max(currentIndex - slidesToShow, 0);  // Déplacer vers l'arrière de 5 slides, sans dépasser le début
        updateCarouselPosition();  // Mettre à jour la position du carrousel
    }
});

// Ajouter un event listener sur le bouton "next"
document.querySelector('.next').addEventListener('click', () => {
    if (currentIndex < totalSlides - slidesToShow) {
        currentIndex = Math.min(currentIndex + slidesToShow, totalSlides - slidesToShow);  // Avancer de 5 slides, sans dépasser la fin
        updateCarouselPosition();  // Mettre à jour la position du carrousel
    }
});

// Fonction pour récupérer le top 10 des séries animées entre 1970 et 2010 depuis l'API TMDB
function fetchTopAnimatedSeries() {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&first_air_date.gte=1970-01-01&first_air_date.lte=2010-12-31&sort_by=popularity.desc&language=fr-FR&page=1`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data.results.slice(0, 10);  // Prendre les 10 meilleures séries
        })
        .catch(error => console.error('Erreur lors de la récupération des séries :', error));
}

// Fonction pour mettre à jour le carrousel avec les données de l'API
function updateCarousel(top10) {
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.innerHTML = '';  // Vider le carrousel

    top10.forEach((serie, index) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');

        // Générer le contenu de chaque slide
        slide.innerHTML = `
            <img src="/assets/images/${index + 1}.png" alt="Numéro ${index + 1}" class="number-image">
            <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="${serie.name}" class="main-image">
        `;

        // Ajouter le slide dans le conteneur du carrousel
        carouselContainer.appendChild(slide);
    });

    // Mettre à jour le total des slides après l'ajout
    totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentIndex = 0;  // Réinitialiser l'index au début
    updateCarouselPosition();  // Initialiser la position
}

// Charger les données de TMDB à l'ouverture de la page
document.addEventListener('DOMContentLoaded', () => {
    fetchTopAnimatedSeries().then(top10 => updateCarousel(top10));
});