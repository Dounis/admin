document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const predictionsContainer = document.querySelector('.row'); // Sélectionner le conteneur des prédictions
    const predictions = await fetchPredictions(token);

    predictions.forEach(prediction => {
        // Créer un nouvel élément de carte pour chaque prédiction
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-sm-4', 'col-12');
        
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'mb-4');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('card-img');

        const imgElement = document.createElement('img');
        imgElement.src = `data:image/jpeg;base64,${prediction.imageBase64}`;
        imgElement.classList.add('card-img-top', 'img-fluid');
        imgElement.alt = 'Image de la prédiction';

        imgDiv.appendChild(imgElement);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title', 'mb-3');
        cardTitle.textContent = `Prédiction : ${prediction.typeCarence}`;

        const userPara = document.createElement('p');
        userPara.classList.add('mb-3');
        userPara.textContent = `Utilisateur : ${prediction.utilisateurNom}`;

        const dateLink = document.createElement('a');
        dateLink.href = '#';
        dateLink.classList.add('card-link', 'text-success');
        dateLink.textContent = `Date : ${new Date(prediction.dateAnalyse).toLocaleDateString()}`;

        // Créer un conteneur pour le bouton de suppression
        const deleteButtonContainer = document.createElement('div');
        deleteButtonContainer.classList.add('delete-button-container');

        // Créer un bouton de suppression
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', async () => {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette prédiction ?')) {
                await deletePrediction(prediction.id, token);
                colDiv.remove(); // Retirer la carte du DOM après la suppression
            }
        });

        deleteButtonContainer.appendChild(deleteButton);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(userPara);
        cardBody.appendChild(dateLink);
        cardBody.appendChild(deleteButtonContainer); // Ajouter le conteneur du bouton à la carte

        cardDiv.appendChild(imgDiv);
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
        predictionsContainer.appendChild(colDiv);
    });

    async function fetchPredictions(token) {
        try {
            const response = await fetch('http://192.168.187.215:3000/api/predictions', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                alert("Erreur lors de la récupération des prédictions");
                return [];
            }
            return await response.json();
        } catch (error) {
            console.error('Erreur de connexion au serveur :', error);
            alert('Impossible de récupérer les prédictions');
            return [];
        }
    }

    async function deletePrediction(id, token) {
        try {
            const response = await fetch(`http://192.168.187.215:3000/api/predictions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                alert("Erreur lors de la suppression de la prédiction");
            }
        } catch (error) {
            console.error('Erreur de connexion au serveur :', error);
            alert('Impossible de supprimer la prédiction');
        }
    }
});
