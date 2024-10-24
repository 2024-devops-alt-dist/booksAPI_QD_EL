import { apiKey } from './config.js';


/**
 * class abstraite qui sert d'abstraction à la methode 
 */
export class AbstractAPI {

    query;
    queryType = {
        title: "intitle:",
        author: "inauthor:",
        publisher: "inpublisher:",
        category: "subject:"
    }
    BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

    concatQueries(...queries) {
        return queries.join('+');
    }

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