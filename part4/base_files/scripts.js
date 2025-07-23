document.addEventListener('DOMContentLoaded', () => {
// on attend qye tiyt ke DOM (le contenu html de la page) soit chargé avant
// d'éxécuter le code à l'intérieur
    const loginForm = document.getElementById('login-form');
// on cherche ensuite notre id login-form dans la page login.html

    if (loginForm) {
// on vérifie si login form existe pour éviter une erreur
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Appel à la fonction de login
            await loginUser(email, password);
          });
    }
});

async function loginUser(email, password) {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();

            // Stocker le token JWT dans un cookie
            document.cookie = `token=${data.access_token}; path=/`;

            // Rediriger l'utilisateur vers index.html
            window.location.href = 'index.html';
        } else {
            // Afficher un message d'erreur
            alert('Login failed: ' + response.statusText);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
}
