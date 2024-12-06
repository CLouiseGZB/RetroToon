///////////////////////////nav/////////////////////////////////
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

/////////////////////////mode enfant ////////////////////////

    function modeEnfant() {
        if (document.body.classList.contains('mode-enfant')) {
            // Si on est en mode Enfant, on demande le mot de passe pour passer au mode Adulte
            demanderMotDePasse();
        } else {
            // Sinon, on active directement le mode Enfant
            activerModeEnfant();
        }
    }

    function activerModeEnfant() {
        document.body.classList.add('mode-enfant');
   /*      document.querySelector('button').textContent = "Cliquez ici pour passer en mode Adulte"; */
    }

     // Fonction pour désactiver le mode Enfant (et donc passer en mode Adulte)
     function desactiverModeEnfant() {
        document.body.classList.remove('mode-enfant');
     /*    document.querySelector('button').textContent = "Cliquez ici pour passer en mode Enfant"; */
    }

    // Fonction pour demander le mot de passe
    function demanderMotDePasse() {
        const motDePasseCorrect = localStorage.getItem('password'); /*placez par le mot de passe souhaité*/
        const motDePasse = prompt("Veuillez entrer votre mot de passe pour passer en mode Adulte :");

        if (motDePasse === motDePasseCorrect) {
            desactiverModeEnfant();
            alert('Le mode adulte est maintenant activé. Cliquez sur OK pour continuer ');
            window.location.href = 'http://RetroToon/html/index.html'; 
        } else if (motDePasse !== null) { // Si l'utilisateur n'annule pas l'invite
            alert("Oups... Votre mot de passe est incorrect.");
        }
    }

//fonction pour la connexion 
  function sendLoginForm()
  {
      const formulaire = document.getElementById("loginForm");
      const champs = formulaire.elements;
      const data = {};
      for (const champ of champs) {
        data[champ.name] = champ.value;
      }

      fetch('/public/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          if (data.token)
          {
              if (readCookie('auth-token-vod')==null) 
              {
                  createCookie('auth-token-vod',data.token,2);
              }
              console.log('on change de page ')
              window.location.href = "/private/accueil";
          }
          else if (data.status==404)
          {
              alert("pas d'utilisateur avec ce couple identifiant / mot de passe");
          }
      })
      .catch(error => console.error('err : '+error));
  }

  //+ d'infos sur les cookies en javascript : https://www.quirksmode.org/js/cookies.html
  function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days2460601000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }


    //fonction 
    function videoUpload() {
        const input = document.getElementById('upload-video');
        const file = input.files[0];
        if (file) {
            console.log(`Fichier sélectionné : ${file.name}`);
            // Ajoutez ici la logique supplémentaire de traitement du fichier, si nécessaire
        }
    }