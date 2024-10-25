import { apiKey } from './config.js';


/**
 * class abstraite qui sert d'abstraction à la récupération de la donnée
 * respectant les principes d'abstraction et encapsulaption du OOP
 */
export class AbstractAPI {

    queryType = {
        title: "intitle:",
        author: "inauthor:",
        publisher: "inpublisher:",
        category: "subject:"
    }
    BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

    /**
     * 
     * @param {String} complement - récupère la donnée 
     * @returns 
     */
    async #fetchData(complement) {
        
        try {
            console.log(this.BASE_URL + complement);
            const response = await fetch(this.BASE_URL + complement);
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.log("Erreur lors de la récupération des données", error);
        }
    }
    
    async fetchDataByQuery(query="") {
        return await this.#fetchData("?q=" + query + "&key=" + apiKey);
    }
    
    async fetchDataById(id) {

        if (!id) {
            console.error("Erreur : ID manquant.");
            return null;
        }
        return await this.#fetchData("/" + id);
    }
    
    concatQueries(queries) {

        query = [];
        for (let q in queries) {
            if (q) { query.push(this.queryType[q] + queries[q])}
        }

        return query.join('+');
    }

}