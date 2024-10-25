import { AbstractAPI } from './abstractAPI.js'


/**
 * Objet qui permet de retrouver la data souhaité pour la bookPage
*/
export class DetailBook extends AbstractAPI {

    constructor() {
        super();
    }

    
    /**
     * récupère le livre souhaité et retourne les infos voulues
     */
    async getBook(id) {

        try {
            const data = await this.fetchDataById(id);
            console.log(data);
            return data.volumeInfo;

        } catch (error) {
            console.log("Erreur! le livre n'a pas pu être récupéré.", error);
        }
    }

    /**
     * @param {String} id - id du volume qu'on souhaite récupéré
     * 
     * affiche à l'écran les informations du volume dont l'id est passé en argument
    */
    displayBook(id) {
        
        this.getBook(id)
            .then((data) => { 
                if (!data) { throw new Error("Soucis lors de la récupération de la data. Fin du programme."); }
                
                const { title, publisher, publishedDate, imageLinks, authors, description } = data;
                const image = imageLinks ?  imageLinks.smallThumbnail : "../../assets/img/no-image.png";
                const desc = description ? description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam eligendi officiis aliquam at vero in!";

                const main = document.getElementById("bodyBookPage");
                main.innerHTML = `
                    <section class="backgroundBookPage" style="--bg-image: url(${image});">
                    <div class="LinldAndBookCover" style="--bg-image: url(${image});"></div>
                        <section class="bookPagePresentation">
                            <div class="bookPageSummury">
                                <div class="bookPageTitles">
                                <h1 class="bookPageTitle">${title}</h1>
                                <h2 class="bookPageAuthor">${authors}</h2>
                                    <h3 class="bookPageTime">${publishedDate} . ${publisher}</h3>
                                    </div>
                                <div class="bookPageIcons">
                                    <img class="bookmarkIcon" src="assets/img/bookmark.svg" alt="bookmark icon to favorite the book">
                                    <img class="menuIcon" src="assets/img/menu.svg" alt="menu icon to learn more">
                                </div>
                            </div>
                            <p class="bookPageText">${desc}</p>
                            <section class="bookPageButtons">
                                <button class="borrowButton">BORROW</button>
                                <a href="./audioBook-page.html">
                                    <button class="iconButton"><img class="iconsBookPage" src="assets/img/music2.svg" alt="Music notes to listen the book"></button>
                                </a>
                                <button class="iconButton"><img class="iconsBookPage" src="assets/icons/star.svg" alt="White star to put the book in favorite"></button>
                                </section>
                        </section>
                        </section>`;

                    }).catch(error => console.error('Erreur:', error));
    }

}


document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
        const book = new DetailBook();
        book.displayBook(id);
    } else {
        console.error("ID du livre manquant dans l'URL.");
    }
});