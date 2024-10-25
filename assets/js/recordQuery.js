
export class RecordQuery {

    #title;
    #author;
    #category;
    #isbn;
    #maxResult;

    constructor() {}

    static queryType = {
        title: "intitle:",
        author: "inauthor:",
        category: "subject:",
        isbn: "isbn:"
    }

    
    concatQueries() {
        
        return [this.#title, this.#author, this.#category, this.#isbn, this.#maxResult]
            .filter(Boolean)
            .join('+');
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        this.#title = RecordQuery.queryType.title + newTitle;
    }

    get author() {
        return this.#author;
    }

    set author(newAuthor) {
        this.#author = RecordQuery.queryType.author + newAuthor;
    }

    get category() {
        return this.#category;
    }

    set category(newCategory) {
        this.#category = RecordQuery.queryType.category + newCategory;
    }

    get isbn() {
        return this.#isbn;
    }

    set isbn(newIsbn) {
        this.#isbn = RecordQuery.queryType.isbn + newIsbn;
    }

    get maxResult() {
        return this.#maxResult;
    }

    set maxResult(newMaxResult) {
        this.#maxResult = "&maxResults=" + newMaxResult;
    }
}