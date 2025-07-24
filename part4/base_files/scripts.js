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

// Verify user authentication
// -----------------------------------------------

function checkAuthentication() {
    const token = getCookie('token');
    const loginLink = document.getElementById('login-button');

    if (!token) {
        loginLink.style.display = 'block';
    } else {
        loginLink.style.display = 'none';
        // Fetch places data if the user is authenticated
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

// Retrieve location data:
// -----------------------------------------------

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


function displayPlaces(places) {
    const listContainer = document.querySelector('.place-det');
    listContainer.innerHTML = ''; // On vide la liste

    places.forEach(place => {
        const article = document.createElement('article');

        const title = document.createElement('h3')
        title.className = 'h3_top';
        title.innerHTML = `<strong>${place.title}</strong>`;
        article.appendChild(title);

        listContainer.appendChild(article);
    });
}
