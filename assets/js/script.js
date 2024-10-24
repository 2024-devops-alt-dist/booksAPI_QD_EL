import { apiKey } from './config.js';
import { DetailBook } from './detailBook.js';


const book = new DetailBook();
book.getBooks();



// const theme = 'science fiction'; // remplacer par ce que l'utilisateur a tapé
// // const apiKey = ''; // Remplace par ta vraie clé API
// // const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${theme}&key=`;








// const url = `https://www.googleapis.com/books/v1/volumes?q=books&key=${apiKey}`;
const url = `https://www.googleapis.com/books/v1/volumes?q=roman+pour+enfant&key=${apiKey}`;

async function fetchData() {

    try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

        const data = await response.json();
        // console.table(data);
        console.log(data)

        displayBooks(data.items)
        
    } catch (error) {
        console.log("Erreur lors de la récupération des données", error);
    }
}

fetchData();

function displayBooks(books) {
  const categoryWrapper = document.getElementById('categoryWrapper2');

  books.forEach(book => {
      const bookCard = document.createElement('div');

      bookCard.className = 'musicPlayerStoryBookCard2 dropShadow';
      bookCard.style.backgroundColor = '#FFE485'; 

      const bookImage = book.volumeInfo.imageLinks?.smallThumbnail; // utiliser thumbnail pour les grandes images 
      const bookTitle = book.volumeInfo.title || 'Titre inconnu';
      const bookAuthor = book.volumeInfo.authors 
      ? book.volumeInfo.authors[0] 
      : 'Auteur inconnu';
      const bookDescription = book.volumeInfo.description 
      ? truncateByWords(book.volumeInfo.description, 20)
      : 'Description non disponible';

      bookCard.innerHTML = `
          <a href="#">
          <img src="${bookImage}" style="width: 100%; height: 193px; object-fit: cover; border-top-left-radius: 5px; border-top-right-radius: 5px;" alt="${bookTitle}">
          <div class="musicPlayerStoryBookText">
              <h3>${bookTitle}</h3>
              <p>${bookDescription}</p>
              <span>${bookAuthor}</span>
          </div>
          </a>
      `;

      categoryWrapper.appendChild(bookCard);
  });
}

function truncateByWords(text, wordLimit) {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
}

// const theme = 'science fiction'; // remplacer par ce que l'utilisateur a tapé
// // const apiKey = ''; // Remplace par ta vraie clé API
// // const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${theme}&key=`;

// fetch(url + `subject:${theme}&key=` + apiKey)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.items); // Afficher ou traiter les livres récupéré
//   })
//   .catch(error => console.error('Erreur:', error));