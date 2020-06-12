const libraryList = document.getElementById('library-list');
let myLibrary = [
    {
        "title" : "Lord of the Rings",
        "author" : "J.R.R. Tolkein",
        "readStatus" : "Read",
    },
    {
        "title" : "Dune",
        "author" : "Frank Herbert",
        "readStatus" : "Read",
    }];

function Book(title, author, readStatus) {
  this.title = title;
  this.author = author;
  this.readStatus = readStatus;
}
function deleteBookFromLibrary(title) {
    //Confirm the users action
    if (confirm('Are you sure?')) {
        //Find the index of the title
        var pos = myLibrary.findIndex(obj => obj.title == title);
        //Remove the object
        myLibrary.splice(pos,1);
        //Update the Display
        render();
    };
}
function updateReadStatus(title, author, readStatus){
    //Find the index of the title
    var pos = myLibrary.findIndex(obj => obj.title == title);
    //Remove the object
    myLibrary.splice(pos,1);
    //Toggle the readStatus
    newReadStatus = (readStatus === "Read") ? "Unread" : "Read";
    //Create a new book
    let book = new Book(title, author, newReadStatus);
    //Append it to the list
    myLibrary.splice(pos,0,book);
    //Update the Display
    render();
}
//Display book list in HTML
function render() {
    const html = myLibrary.map(book => `
        <tr class="default">
        <th scope="row">${book.title}</th>
        <td>${book.author}</td>
        <td onclick="updateReadStatus('${book.title}', '${book.author}', '${book.readStatus}')">${book.readStatus}</td>
        <td>
            <button class="btn btn-danger my-2 my-sm-0" onclick="deleteBookFromLibrary('${book.title}')">Delete Book</button>
        </td>
        </tr>
        `).join('');
    libraryList.innerHTML = html;
}
//Open and Close Modal Form
var modal = document.getElementById("add-book-modal");
var btn = document.getElementById("add-book-button");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
  }
span.onclick = function() {
modal.style.display = "none";
}
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
    }
}
//Add book to library
var addBookToLibrary = document.getElementById("execute-add-book");
addBookToLibrary.onclick = function() {
    //Pull the book title from the input
    let title = document.getElementById("new-title").value;
    //Pull the author from the input
    let author = document.getElementById("new-author").value;
    //Create Variable for Read Status
    let readStatus ="Unread";
    let book = new Book(title, author, readStatus);
    myLibrary.push(book);
    //Update the Display
    modal.style.display = "none";
    document.getElementById("new-title").value = "";
    document.getElementById("new-author").value = "";
    render();
}
const search = document.getElementById('search');
const searchBooks = searchText => {
    let matches = myLibrary.filter(book => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return book.title.match(regex) || book.author.match(regex);
    });
    if (searchText.length < 1){
        matches = [];
        render();
    }
    outputHtml(matches);
};
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(book => `
            <tr class="default">
            <th scope="row">${book.title}</th>
            <td>${book.author}</td>
            <td onclick="updateReadStatus('${book.title}', '${book.author}', '${book.readStatus}')">${book.readStatus}</td>
            <td>
                <button class="btn btn-danger my-2 my-sm-0" onclick="deleteBookFromLibrary('${book.title}')">Delete Book</button>
            </td>
            </tr>
        `).join('');
        libraryList.innerHTML = html;
    }
}
search.addEventListener('input', () => searchBooks(search.value));