const mainContainer = document.querySelector('#main-container');
const navBar = document.querySelector('#nav');
const addButton = document.querySelector('#add-button');
const addBookContainer = document.querySelector('#add-book-container');
const addBookBox = document.querySelector('#add-book-box');
const addBookButton = document.querySelector('#add-book-button');
const cancelBookButton = document.querySelector('#cancel-book-button');
const inputTitle = addBookBox.querySelector('#input-title');
const inputAuthor = addBookBox.querySelector('#input-author');
const inputPages = addBookBox.querySelector('#input-pages');
const bookReadBools = document.getElementsByName('read-bool');

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

function renderLibraryCards() {
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

function clearLibraryCards() {
    while(mainContainer.lastElementChild) {
        mainContainer.removeChild(mainContainer.lastElementChild);
    }
}

function openAddBookForm() {
    addBookContainer.classList.remove('hidden');
    addBookBox.classList.remove('hidden');

    navBar.classList.add('add-book-blur');
    mainContainer.classList.add('add-book-blur');
}

function closeAddBookForm() {
    addBookContainer.classList.add('hidden');
    addBookBox.classList.add('hidden');

    navBar.classList.remove('add-book-blur');
    mainContainer.classList.remove('add-book-blur');
}

function submitAddBookForm() {
    let readBool;

    bookReadBools.forEach(e => {
        if (e.checked) {
            readBool = Boolean(parseInt(e.value));
        }
    });

    let newBook = new Book(inputTitle.value, inputAuthor.value, parseInt(inputPages.value), readBool);
    addBookToLibrary(newBook);
    console.table(library);
}

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary(theHobbit);
let aGameOfThrones = new Book('A Game of Thrones', 'George R.R. Martin', 798, true);
addBookToLibrary(aGameOfThrones);
let paradiseLost = new Book('Paradise Lost', 'John Milton', 353, false);
addBookToLibrary(paradiseLost);
let horns = new Book('Horns', 'Joe Hill', 329, true);
addBookToLibrary(horns);

addButton.addEventListener('click', openAddBookForm);
cancelBookButton.addEventListener('click', closeAddBookForm);
addBookButton.addEventListener('click', () => {
    submitAddBookForm();
    clearLibraryCards();
    renderLibraryCards();
    closeAddBookForm();
});

renderLibraryCards();