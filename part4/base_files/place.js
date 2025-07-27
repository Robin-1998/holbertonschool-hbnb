// Task 3 Place
// -----------------------------------------------------------

// -----------------------------------------------------------
// Obtenir l'ID de lieu à partir de l'URL
// -----------------------------------------------------------

function getPlaceIdFromURL() {
  const placeID = new URLSearchParams(window.location.search).get('id');
  return placeID;
  // on récupère juste la valeur de l'id car window.location.search seul donne
  // tout le contenu de l'id ex (?id=123&foo=bar)
// Autre exemple :
//const params = new URLSearchParams("?id=123&foo=bar");

// console.log(params.get('id'));   // Affiche : "123"
// console.log(params.get('foo'));  // Affiche : "bar"
// console.log(params.has('id'));   // Affiche : true
}

// -----------------------------------------------------------
// Vérifier l'authentification de l'utilisateur (coté place)
// -----------------------------------------------------------

function checkAuthentication() {
    const token = getCookie('token');
    const addReviewSection = document.getElementById('add-review');
    const loginLink = document.getElementById('login-button');
    const placeId = getPlaceIdFromURL();

    if (token) {
        // Utilisateur connecté : afficher le formulaire + cacher "login"
        if (addReviewSection) addReviewSection.style.display = 'block';
        if (loginLink) loginLink.style.display = 'none';
        fetchPlaceDetails(token, placeId);
    } else {
        // Utilisateur non connecté : cacher le formulaire + afficher "login"
        if (addReviewSection) addReviewSection.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
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

// -----------------------------------------------------------
// Détails du lieu de récupération
// -----------------------------------------------------------

async function fetchPlaceDetails(token, placeId) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/places/${placeId}`, { // Remplacez par l’URL réelle
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
        displayPlaceDetails(data); // Appel de la fonction pour afficher les lieux
    } catch (error) {
        console.error('Erreur lors de la récupération des lieux :', error);
    }
}

function displayPlaceDetails(place,) {
    // Clear the current content of the place details section
    // Create elements to display the place details (name, description, price, amenities and reviews)
    // Append the created elements to the place details section
    const listContainer = document.getElementById('place-details');
    listContainer.innerHTML = ''; // On vide la liste

      const header = document.createElement('header');
      const headling = document.createElement('h1')
      headling.textContent = 'List of Places';
      header.appendChild(headling);

      const div = document.createElement('div');
      div.className = 'place-det'

      const article = document.createElement('article');
      article.setAttribute('article-price', place.price);
      div.appendChild(article);

      const title = document.createElement('h3')
      title.className = 'h3_top'
      title.textContent = place.title
      div.appendChild(title)

      const secund_div = document.createElement('div')
      secund_div.className = 'place-info'

      const titre_description = document.createElement('p')
      titre_description.textContent= 'Description: '
      secund_div.appendChild(titre_description)
      titre_description.style.fontWeight = 'bold';
      
      const description = document.createElement('p')
      description.textContent = place.description
      secund_div.appendChild(description)

      if (place.owner) {
        const email = document.createElement('p');
        email.textContent = `Email: ${place.owner.email}`;
        secund_div.appendChild(email);

        const host = document.createElement('p');
        host.textContent = `Host: ${place.owner.first_name} ${place.owner.last_name}`;
        secund_div.appendChild(host);
      } else {
          const noOwner = document.createElement('p');
          noOwner.textContent = "Owner info not available.";
          secund_div.appendChild(noOwner);
      }

      const price = document.createElement('p')
      price.textContent = `Price per night: ${place.price} €`;
      secund_div.appendChild(price)

      const titre_amenities = document.createElement('p')
      titre_amenities.textContent = 'Amenities: '
      secund_div.appendChild(titre_amenities)

      const amenities = document.createElement('p')
      amenities.textContent = place.name
      secund_div.appendChild(amenities)

    if (Array.isArray(place.amenities) && place.amenities.length > 0) {
        place.amenities.forEach(amenity => {
            const amenityItem = document.createElement('p');
            amenityItem.textContent = `- ${amenity.name}`;
            secund_div.appendChild(amenityItem);
        });
    } else {
        const noAmenity = document.createElement('p');
        noAmenity.textContent = 'No amenities listed.';
        secund_div.appendChild(noAmenity);
    }

      listContainer.appendChild(header);
      listContainer.appendChild(div);
      listContainer.appendChild(secund_div)
    };
