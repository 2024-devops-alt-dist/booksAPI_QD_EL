import { AbstractAPI } from './abstractAPI.js'

/**
 * Objet qui permet de retrouver la data souhaité pour la bookPage
 */
export class DetailBook extends AbstractAPI {

    constructor() {
        super();
    }

    // TODO: add get book feature
    getBook(name) {
        return;
    }
    
    async getBooks() {

        const theme = this.queryType.author + "keyes";
        const title = this.queryType.title + "flowers";
        this.query = this.concatQueries(theme, title);
        
        const data = await super.fetchData();
        console.log(data ? data : "Erreur");
    }
}