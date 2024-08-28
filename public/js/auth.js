document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const email = document.getElementById('email').value; // Récupère l'email par son identifiant correct
    const password = document.getElementById('password').value; // Récupère le mot de passe par son identifiant correct

    try {
        const response = await fetch('http://192.168.187.215:3000/api/auth/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, motDePasse: password })
        });

        const data = await response.json();

        if (response.ok) {
            // Sauvegarde du token dans le localStorage
            localStorage.setItem('authToken', data.token);
            window.location.href = 'dashboard.html'; // Redirection vers la page de dashboard
        } else {
            alert('Erreur: ' + data.message);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la tentative de connexion.');
    }
});
