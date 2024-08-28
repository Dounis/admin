document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const usersTableBody = document.getElementById('usersTableBody');
    const searchInput = document.getElementById('search');

    let users = await fetchUsers(token);
    displayUsers(users);

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredUsers = users.filter(user => user.email.toLowerCase().includes(searchTerm));
        displayUsers(filteredUsers);
    });

    async function fetchUsers(token) {
        const response = await fetch('http://192.168.187.215:3000/api/utilisateurs', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }

    function displayUsers(users) {
        usersTableBody.innerHTML = '';
        users.forEach((user, index) => {
            // Exclure l'utilisateur avec l'email "apprediction24@gmail.com"
            if (user.email.toLowerCase() !== "apprediction24@gmail.com") {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td> <!-- Numéro d'utilisateur incrémenté -->
                    <td>${user.nom} ${user.prenom}</td> <!-- Nom complet -->
                    <td>${user.email}</td>
                    <td>${user.fonction}</td> <!-- Fonction de l'utilisateur -->
                    <td>
                        <button onclick="deleteUser('${user.id}')" class="btn btn-danger">Supprimer</button>
                        <button onclick="warnUser('${user.id}')" class="btn btn-warning">Avertir</button>
                    </td>
                `;
                usersTableBody.appendChild(row);
            }
        });
    }
});

async function deleteUser(id) {
    const token = localStorage.getItem('authToken');
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
        await fetch(`http://192.168.187.215:3000/api/utilisateurs/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        location.reload();
    }
}

async function warnUser(id) {
    const token = localStorage.getItem('authToken');
    localStorage.setItem('userIdToWarn', id);
    window.location.href = 'warning.html';
}
