const apiKey = '';

const url = 'https://www.googleapis.com/books/v1/volumes?q=books';

async function fetchData() {

    try {
        const response = await fetch("");
        console.log(response);

        const data = await res.json();
        console.table(data);
        title.textContent = data.title;
    } catch (error) {
        console.log("Erreur lors de la récupération des données", error);
    }
}

// const theme = 'science fiction'; // remplacer par ce que l'utilisateur a tapé
// const apiKey = ''; // Remplace par ta vraie clé API
// const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${theme}&key=`;

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.items); // Afficher ou traiter les livres récupéré
//   })
//   .catch(error => console.error('Erreur:', error));