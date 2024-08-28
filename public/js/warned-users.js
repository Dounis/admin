document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const usersTableBody = document.getElementById('usersAvertisTableBody');
    const deleteAllWarningsButton = document.getElementById('deleteAllWarnings');

    let users = await fetchAvertisUsers(token);
    displayAvertisUsers(users);

    deleteAllWarningsButton.addEventListener('click', async () => {
        if (confirm('Voulez-vous vraiment supprimer tous les avertissements ?')) {
            await deleteAllWarnings(token);
            users = await fetchAvertisUsers(token);
            displayAvertisUsers(users);
        }
    });

    async function fetchAvertisUsers(token) {
        const response = await fetch('http://192.168.187.215:3000/api/utilisateurs/avertis', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }

    function displayAvertisUsers(users) {
        usersTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.utilisateurNom}</td>
                <td>${user.utilisateurEmail}</td>
                <td>${new Date(user.dateEnvoi).toLocaleDateString()}</td>
                <td>${user.message}</td>
            `;
            usersTableBody.appendChild(row);
        });
    }

    async function deleteAllWarnings(token) {
        await fetch('http://192.168.187.215:3000/api/utilisateurs/avertis/supprimer', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
});
