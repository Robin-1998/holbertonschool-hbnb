//----------------------------- TASK1 --------------------------------------

//----------------------------------------------------------------------
// Configurer l'écouteur d'événements pour le formulaire de connexion :
// ---------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
// on attend qye tiyt ke DOM (le contenu html de la page) soit chargé avant
// d'éxécuter le code à l'intérieur
    const loginForm = document.getElementById('login-form');
// on cherche ensuite notre id login-form dans la page login.html

    if (loginForm) {
// on vérifie si login form existe pour éviter une erreur
        loginForm.addEventListener('submit', async (event) => {
            // On empêche le comportement par défaut du formulaire (qui rechargerait la page)
            event.preventDefault();

            // On récupère la valeur entrée dans le champ "email"
            const email = document.getElementById('email').value;

            // On récupère la valeur entrée dans le champ "password"
            const password = document.getElementById('password').value;

            // On appelle une fonction pour envoyer les données de login au serveur
            await loginUser(email, password);
          });
    }
    // APPEL À LA FONCTION QUI VÉRIFIE LE TOKEN
    checkAuthentication();
});

// ---------------------------------------------------------------------
// Faire une requête AJAX à l'API + Gérer la réponse de l'API
// ---------------------------------------------------------------------

// Fonction qui envoie l'email et le mot de passe au serveur pour se connecter
async function loginUser(email, password) {
    try {
        // On envoie une requête HTTP POST à notre API Flask pour tenter de se connecter
        const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
            method: 'POST', // méthode HTTP : POST (envoi de données)
            headers: {
                'Content-Type': 'application/json' // On précise qu'on envoie du JSON
            },
            // On convertit les données (email et password) en JSON avant de les envoyer
            body: JSON.stringify({ email, password })
        });

        // Si la réponse du serveur est OK (code 200)
        if (response.ok) {
            // On lit les données retournées (normalement le token JWT)
            const data = await response.json();

            // On stocke le token JWT dans un cookie nommé "token"
            // Cela permettra d’authentifier l’utilisateur plus tard
            document.cookie = `token=${data.access_token}; path=/`;

            // Une fois connecté, on redirige l’utilisateur vers la page d’accueil
            window.location.href = 'index.html';
        } else {
            // Si la réponse n’est pas OK, on affiche une alerte avec le message d’erreur
            alert('Login failed: ' + response.statusText);
        }
    } catch (error) {
        // Si une erreur s’est produite pendant la requête (ex: serveur éteint)
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
}

//----------------------------- TASK2 --------------------------------------

//----------------------------------------------------------------------
// Verify user authentication
// ---------------------------------------------------------------------

function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-button');

    if (!token) {
        loginLink.style.display = 'block';
    } else {
        loginLink.style.display = 'none';
        fetchPlaces(token);
    }
}

function getCookie(name) {
     const cookies = document.cookie.split(';');
     for (let cookie of cookies) {
          cookie = cookie.trim();
          if (cookie.startsWith(name + '=')) {
             return cookie.substring(name.length + 1);
          }
     }
    return null;
}
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication(); // Appel de la vérification d'authentification à chaque chargement de page
});

// ---------------------------------------------------------------
// Récupérer les données des lieux :
// ---------------------------------------------------------------

async function fetchPlaces(token) {
    try {
        const response = await fetch('http://localhost:5000/api/v1/places/', { // Remplacez par l’URL réelle
            method: 'GET',    
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Inclusion du jeton JWT
            }
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json(); // Parse la réponse JSON
        displayPlaces(data); // Appel de la fonction pour afficher les lieux
    } catch (error) {
        console.error('Erreur lors de la récupération des lieux :', error);
    }
}

// ----------------------------------------------------------------------
// Liste des lieux à peupler
// ----------------------------------------------------------------------

function displayPlaces(places) {
    const listContainer = document.getElementById('places-list');
    listContainer.innerHTML = ''; // On vide la liste

    places.forEach((place, index) => {
        const article = document.createElement('article');
        article.className = 'place-card';
        article.setAttribute('data-price', place.price);

        const imagePaths = {
          "Minas Tirith": 'images/minas_tirith.jpg',
          "Gouffre de Helm": 'images/gouffre_helm.jpg'
        }

        const img = document.createElement('img')
        img.src = imagePaths[place.title] || 'images/default.jpg';
        img.alt = 'Photo of a villa';
        img.className = 'img_card_index';
        article.appendChild(img);

        const title = document.createElement('h3')
        title.textContent = place.title;
        article.appendChild(title);

        const paragraphe = document.createElement('p')
        paragraphe.textContent = place.description
        article.appendChild(paragraphe);

        const price = document.createElement('p')
        price.className = 'leprix';
        price.textContent = `${place.price} € per night`;
        article.appendChild(price);

        const latitude = document.createElement('p')
        latitude.textContent = `latitude: ${place.latitude}°`;
        article.appendChild(latitude);

        const longitude = document.createElement('p')
        longitude.textContent = `longitude: ${place.longitude}°`;
        article.appendChild(longitude);

        const legrosbouton = document.createElement('button')
        legrosbouton.textContent = `View Details`;
        legrosbouton.setAttribute('data-id', place.id);
        
        article.appendChild(legrosbouton);

        legrosbouton.addEventListener('click', () => {
          const placeId = legrosbouton.getAttribute('data-id');
          window.location.href = `place.html?id=${placeId}`;
        })


        listContainer.appendChild(article);
    });
}

// ----------------------------------------------------------------------
// Implémenter le filtrage côté client
// ----------------------------------------------------------------------

const priceFilter = document.getElementById('price-filter');

// On crée une liste d'options de filtre de prix : "Tous", 10, 50, 100
const prices = ['all', 10, 50, 100];

  prices.forEach(price => {
    const option = document.createElement('option');
    // On définit sa valeur (ce qui sera récupéré lors de la séléction)
    option.value = price;
    // Si la valeur est "all", on affiche "Tous" dans le texte de l'option
    if (price === 'all') {
      option.textContent = 'all';
    } else {
    // Sinon, on affiche directement le nombre (ex: 10, 50, 100)
      option.textContent = price;
    }
    priceFilter.appendChild(option);
});

// on ajoute un écouteur d'évènement à la liste déroulante avec l'id price-filter
// change se déclenche quand l'utilisateur choisit une nouvelle valeur dans la liste (10, 50, 100 ou "Tous")
document.getElementById('price-filter').addEventListener('change', (event) => {
    const selectedPrice = event.target.value;
    // on récupère toutes les cartes de lieu qui sont affichés
    const places = document.querySelectorAll('.place-card');

    // et pour chaque lieu
    places.forEach(place => {
      // on récupère l'élément contenant la classe leprix
        const priceText = place.getElementsByClassName('leprix')[0];
        // on récupère ensuite le prix qu'on stocke dans une variable.
        // Par exemple 100
        const raw = priceText.textContent;
        // On extrait le nombre et on le convertit en nombre flottant en enlevant le signe € ou autre caractère
        const price = parseFloat(raw);

        // Si tous est séléctionné OU que le prix est inférieur ou égal à celui choisi
        if (selectedPrice === 'all' || price <= parseFloat(selectedPrice)) {
        // si tout est présent ou si le prix est inférieur ou égal par exemple à 100
        // alors on retourne les carte correspondante à l'aide de css
            place.style.display = '';
        // mais à l'inverse si ce le prix n'est pas bon alors on affiche rien
        } else {
            place.style.display = 'none';
        }
    });
});
