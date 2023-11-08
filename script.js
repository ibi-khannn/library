const myLibrary = [];
const containerDiv = document.querySelector(".container");
const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openButton.addEventListener("click", () => {
    modal.showModal();
})

closeButton.addEventListener("click", () => {
    modal.close();
})

function Book (name, author, pageCount, readStatus) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
}

Book.prototype.info = function () { 
    return this.name + "\n" + this.author + "\n" + this.pageCount + "\n" + this.readStatus + "\n";
}

function addBookToLibrary() {
    const bookOne = new Book ("Hero", "bookAuthor", "bookPageCount", "bookReadStatus");
    const bookTwo = new Book ("The Hobbit", "bookAuthor", "bookPageCount", "bookReadStatus");
    const bookThree = new Book ("Great Expectations", "bookAuthor", "bookPageCount", "bookReadStatus");
    const bookFour = new Book ("Famous Five", "bookAuthor", "bookPageCount", "bookReadStatus");
    myLibrary.push(bookOne);
    myLibrary.push(bookTwo);
    myLibrary.push(bookThree);
    myLibrary.push(bookFour);
}

addBookToLibrary();
displayBooks ();

function displayBooks () {
    let j = 0;
    for (i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        containerDiv.appendChild(bookCard);
        bookCard.textContent = myLibrary[i].info();
        const removeBookBtn = document.createElement("button");
        removeBookBtn.textContent = "Remove Book";
        removeBookBtn.style.marginTop = "7%";
        bookCard.appendChild(removeBookBtn);
        bookCard.setAttribute("data-index", i);
        removeBookBtn.addEventListener ("click", () => {
            const indexNumber =  bookCard.dataset.index;
            myLibrary.splice(indexNumber, 1);
            containerDiv.removeChild(bookCard);
            console.log(myLibrary);
            const allBookCards = document.querySelectorAll(".book-card");
            allBookCards.forEach((eachBook) => {
                eachBook.removeAttribute("data-index");
                eachBook.setAttribute("data-index", j);
                j++;
            })
            j = 0;
        })
    }
}