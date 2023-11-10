const myLibrary = [];
const containerDiv = document.querySelector(".container");
const openButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");
const submitBtn = document.querySelector("#submit-button");
let bookCounter = 0; // to keep track of how many book objects have been created

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

submitBtn.addEventListener("click", () => {
    const bookName = document.querySelector("#book-name").value;
    const authorName = document.querySelector("#author-name").value;
    const bookPages = document.querySelector("#page-count").value;
    const bookStatus = document.getElementsByName("read-status");
    let bookRead;
    
    for (i = 0; i < bookStatus.length; i++) {
        if (bookStatus[i].checked) {
            bookRead = bookStatus[i].value;
        }
    }
    
    const bookObject = new Book (bookName, authorName, bookPages, bookRead);
    myLibrary.push(bookObject);
    displayBooks();
    bookCounter++;
    
})

Book.prototype.info = function () { 
    return this.name + "\n" + this.author + "\n" + this.pageCount; // using this keyword to access the properties in the current object
}

Book.prototype.status = function () { // created separate method so that the read status can be toggled on the browser using textContent in toggleReadStatus button
    return this.readStatus;
}

function displayBooks () {
    let j = 0;
    
    for (let i = bookCounter; i < myLibrary.length; i++) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        containerDiv.appendChild(bookCard);
        bookCard.textContent = myLibrary[i].info();
        const readBook = document.createElement("p");
        readBook.textContent = myLibrary[i].status();
        readBook.style.margin = "0px";
        bookCard.appendChild(readBook);
        const removeBookBtn = document.createElement("button");
        removeBookBtn.textContent = "Remove Book";
        removeBookBtn.style.marginTop = "7%";
        bookCard.appendChild(removeBookBtn);
        const toggleReadStatus = document.createElement("button");
        toggleReadStatus.textContent = "Change Read Status";
        toggleReadStatus.style.marginTop = "7%";
        bookCard.appendChild(toggleReadStatus);
        bookCard.setAttribute("data-index", i);
        
        removeBookBtn.addEventListener ("click", () => {
            const indexNumber =  bookCard.dataset.index;
            myLibrary.splice(indexNumber, 1); // remove that card object from the myLibrary array when pressed
            containerDiv.removeChild(bookCard);
            console.log(myLibrary);
            const allBookCards = document.querySelectorAll(".book-card");
            allBookCards.forEach((eachBook) => {
                eachBook.removeAttribute("data-index");
                eachBook.setAttribute("data-index", j);
                j++;
            })
            j = 0; // set j = 0 once again so that when the remove button is pressed then the data-index is reassigned again after removal
            bookCounter = bookCounter - 1; // decrements bookcounter by 1 when Remove Button is clicked so that New books can keep being added

        })
        
        toggleReadStatus.addEventListener ("click", () => {
            const indexNumber = bookCard.dataset.index;
            
            if (myLibrary[indexNumber].readStatus == "Yes") { // change read status of the clicked book object
                myLibrary[indexNumber].readStatus = "No";
            }
            else if (myLibrary[indexNumber].readStatus == "No") {
                myLibrary[indexNumber].readStatus = "Yes";
            }

            readBook.textContent = myLibrary[indexNumber].status(); // change the read status on the browser

            console.log(myLibrary);
        })
    }
}