import { apiKey } from './config.js';


document.getElementById('searchButton').addEventListener('click', () => {
  const searchQuery = document.getElementById('searchInput').value;
  searchBooks(searchQuery);
});

// const url = `https://www.googleapis.com/books/v1/volumes?q=books&key=${apiKey}`;
const url = `https://www.googleapis.com/books/v1/volumes?q=subject:juvenile+fiction&key=${apiKey}&maxResults=20`;

async function fetchData() {

    try {
        const response = await fetch(url);
        // console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

        const data = await response.json();
        // console.table(data);
        // console.log(data)

        displayBooks(data.items)
        
    } catch (error) {
        console.log("Erreur lors de la récupération des données", error);
    }
}

fetchData();

function displayBooks(books) {
  const categoryWrapper = document.getElementById('categoryWrapper2');

  categoryWrapper.innerHTML = '';

  books.forEach(book => {
      const bookCard = document.createElement('div');

      bookCard.className = 'musicPlayerStoryBookCard2 dropShadow';
      bookCard.style.backgroundColor = '#FFE485'; 

      const idBook = book.id;
      const bookImage = book.volumeInfo.imageLinks?.smallThumbnail; // utiliser thumbnail pour les grandes images 
      const bookTitle = book.volumeInfo.title || 'Titre inconnu';
      const bookAuthor = book.volumeInfo.authors 
      ? book.volumeInfo.authors[0] 
      : 'Auteur inconnu';
      const bookDescription = book.volumeInfo.description 
      ? truncateByWords(book.volumeInfo.description, 20)
      : 'Description non disponible';

      bookCard.innerHTML = `
          <a href="bookPage.html?id=${idBook}">
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

async function searchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=10`;
  

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      displayBooks(data.items);
      console.log(data)
  } catch (error) {
      console.log("Erreur lors de la récupération des données", error);
  }
}

