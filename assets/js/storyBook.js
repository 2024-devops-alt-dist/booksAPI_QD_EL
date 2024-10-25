import { AbstractAPI } from "./abstractAPI.js"
import { RecordQuery } from "./recordQuery.js";

export class StoryBook extends AbstractAPI{

    constructor() {
        super();
    }

    searchBooks(searchQuery) {
        const query = new RecordQuery();
        query.title = searchQuery;
        query.maxResult = "10";
        this.getBooks(query);
    }

    async getBooksDefault() {

        const query = new RecordQuery();
        query.category = "juvenile+fiction";
        query.maxResult = "20";

        this.getBooks(query);
    }

    async getBooks(query) {

        try {
            const searchQuery = query.concatQueries();
            const data = await this.fetchDataByQuery(searchQuery);
            this.displayBooks(data.items);

        } catch (error) {
            console.log("Erreur! le livre n'a pas pu être récupéré.", error);
        }
    }

    truncateByWords(text, wordLimit) {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    }


    displayBooks(books) {
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
            ? this.truncateByWords(book.volumeInfo.description, 20)
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
}


const book = new StoryBook();
book.getBooksDefault();

document.getElementById('searchButton').addEventListener('click', () => {
    const searchQuery = document.getElementById('searchInput').value;
    book.searchBooks(searchQuery);
});
