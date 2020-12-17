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

Book.prototype.readSwap = function() {
    if (this.read) this.read = false;
    else this.read = true;
};

function addBookToLibrary(book) {
    library.push(book);
}

function renderLibraryCards() {
    library.forEach((book, index) => {
        const card = document.createElement('div');
        const cardButtonContainer = document.createElement('div');
        const titleAuthorSpan = document.createElement('span');
        const cardPages = document.createElement('h2');
        const cardRead = document.createElement('h2');
        const cardTitle = document.createElement('h1');
        const cardAuthor = document.createElement('h3');
        const deleteIcon = document.createElement('i');
        const readSwapIcon = document.createElement('i');

        card.classList.add('card');
        cardButtonContainer.classList.add('card-button-container');
        deleteIcon.classList.add('card-button', 'card-delete', 'fas', 'fa-times', 'fa-lg');
        readSwapIcon.classList.add('card-button', 'card-read-swap', 'fas', 'fa-book-open', 'fa-lg');
        titleAuthorSpan.classList.add('card-text', 'title-author-span');
        cardPages.classList.add('card-text', 'card-pages');
        cardRead.classList.add('card-text', 'card-read');
        cardTitle.classList.add('card-title');
        cardAuthor.classList.add('card-author');
        
        deleteIcon.setAttribute('data-id', index);
        readSwapIcon.setAttribute('data-id', index);

        cardTitle.innerHTML = book.title;
        cardAuthor.innerHTML = book.author;
        cardPages.innerHTML = `${book.pages} Pages`;
        cardRead.innerHTML = `${book.read ? 'Read' : 'Not Read'}`;

        mainContainer.append(card);
        card.append(cardButtonContainer, titleAuthorSpan, cardPages, cardRead);
        cardButtonContainer.append(deleteIcon, readSwapIcon);

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
}

function clearInputText(parentElement, classSelector) {
    let inputs = parentElement.querySelectorAll(classSelector);

    inputs.forEach(e => {
        if (e.type === 'text') {
            e.value = '';
        }
    });
}

function clearInputRadio(parentElement, classSelector) {
    let inputs = parentElement.querySelectorAll(classSelector);

    inputs.forEach(e => {
        if (e.checked) e.checked = false;
    });
}

function deleteLibraryItem(dataID) {
    library.splice(dataID, 1);
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
cancelBookButton.addEventListener('click', () => {
    clearInputText(addBookBox, '.add-book-text-input');
    clearInputRadio(addBookBox, '.add-book-radio-input');
    closeAddBookForm();
});

addBookButton.addEventListener('click', () => {
    submitAddBookForm();
    clearInputText(addBookBox, '.add-book-text-input');
    clearInputRadio(addBookBox, '.add-book-radio-input');
    clearLibraryCards();
    renderLibraryCards();
    closeAddBookForm();
});

document.addEventListener('click', e => {
    if (e.target.getAttribute('class') === 'card-button card-delete fas fa-times fa-lg') {
        deleteLibraryItem(e.target.getAttribute('data-id'));
        clearLibraryCards();
        renderLibraryCards();   
    }
    else if (e.target.getAttribute('class') === 'card-button card-read-swap fas fa-book-open fa-lg') {
        library[e.target.getAttribute('data-id')].readSwap();
        clearLibraryCards();
        renderLibraryCards();
    }
});

if (library.length === 0) {
    openAddBookForm();
}
else {
    renderLibraryCards();
}