const mainContainer = document.querySelector('#main-container');
const addButton = document.querySelector('#add-button');

let library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(book) {
    library.push(book);
}

function renderLibrary() {
    library.forEach(book => {
        let card = document.createElement('div');
        let titleAuthorSpan = document.createElement('span');
        let cardPages = document.createElement('h2');
        let cardRead = document.createElement('h2');
        let cardTitle = document.createElement('h1');
        let cardAuthor = document.createElement('h3');

        card.classList.add('card');
        titleAuthorSpan.classList.add('card-text', 'title-author-span');
        cardPages.classList.add('card-text', 'card-pages');
        cardRead.classList.add('card-text', 'card-read');
        cardTitle.classList.add('card-title');
        cardAuthor.classList.add('card-author');

        cardTitle.innerHTML = book.title;
        cardAuthor.innerHTML = book.author;
        cardPages.innerHTML = `${book.pages} Pages`;
        cardRead.innerHTML = `${book.read ? 'Read' : 'Not Read'}`;

        mainContainer.append(card);
        card.append(titleAuthorSpan, cardPages, cardRead);
        titleAuthorSpan.append(cardTitle, cardAuthor);
    });
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary(theHobbit);
let aGameOfThrones = new Book('A Game of Thrones', 'George R.R. Martin', 798, true);
addBookToLibrary(aGameOfThrones);
let paradiseLost = new Book('Paradise Lost', 'John Milton', 353, false);
addBookToLibrary(paradiseLost);
let horns = new Book('Horns', 'Joe Hill', 329, true);
addBookToLibrary(horns);

renderLibrary();