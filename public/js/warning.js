document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userIdToWarn');

    const form = document.querySelector('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const warningText = document.getElementById('warning-text').value;
        
        if (title && warningText) {
            const response = await fetch(`https://backend-cmui.onrender.com/api/utilisateurs/${userId}/avertir`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, message: warningText }),
            });

            if (response.ok) {
                alert('Avertissement envoyé avec succès');
                window.location.href = 'users.html';  // Rediriger vers la page des utilisateurs après l'envoi
            } else {
                alert('Erreur lors de l\'envoi de l\'avertissement');
            }
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
});
