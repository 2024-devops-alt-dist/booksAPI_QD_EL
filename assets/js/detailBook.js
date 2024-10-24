// import { DataFetcher } from './script.js'
import { apiKey } from './config.js';


class DataFetcher {

    query;
    BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

    async fetchData() {

        try {
            const response = await fetch(this.BASE_URL + this.query + '&key=' + apiKey);
            const data = await response.json();
            return data;

        } catch (error) {
            console.log("Erreur lors de la récupération des données", error);
        }
    } 

}

export class DetailBook extends DataFetcher {

    constructor() {
        super();
        super.query = "";
    }

    // TODO: add get book feature
    getBook(name) {
        return;
    }
    
    async getBooks() {

        const theme = "science fiction"
        this.query = `subject:${theme}`
        console.log(this.query);
        
        const data = await super.fetchData();
        console.log(data ? data : "Erreur");
    }
}

// async function fetchData() {

//     try {
//         const response = await fetch("");
//         console.log(response);

//         const data = await res.json();
//         console.table(data);
//         title.textContent = data.title;
//     } catch (error) {
//         console.log("Erreur lors de la récupération des données", error);
//     }
// }