document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    // Récupérer les statistiques à partir des différentes fonctions de fetch
    const predictionsCount = await fetchPredictionsCount(token);
    const usersCount = await fetchUsersCount(token);
    const warnedUsersCount = await fetchWarnedUsersCount(token);

    // Mettre à jour les éléments HTML avec les vraies valeurs
    document.querySelector('.bg-primary h1').textContent = predictionsCount;
    document.querySelector('.bg-purple h1').textContent = usersCount;
    document.querySelector('.bg-warning h1').textContent = warnedUsersCount;

    // Mettre à jour le lien de la console de la base de données
    document.querySelector('.bg-violet').addEventListener('click', () => {
        window.location.href = 'https://console.firebase.google.com/project/predictiondb-26d61/firestore/databases/-default-/data/~2FPrediction~2FNfBS0FmLjj1Yz9eyrocC';
    });

    async function fetchPredictionsCount(token) {
        const response = await fetch('https://backend-cmui.onrender.com/api/predictions', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const predictions = await response.json();
        return predictions.length;
    }

    async function fetchUsersCount(token) {
        const response = await fetch('https://backend-cmui.onrender.com/api/utilisateurs', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const users = await response.json();
        return users.length;
    }

    async function fetchWarnedUsersCount(token) {
        const response = await fetch('https://backend-cmui.onrender.com/api/utilisateurs/avertis', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const warnedUsers = await response.json();
        return warnedUsers.length;
    }
});
