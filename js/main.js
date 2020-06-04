const libraryList = document.getElementById('library-list');
let myLibrary = [
    {
        "title" : "Lord of the Rings",
        "author" : "J.R.R. Tolkein",
        "readStatus" : true,
    },
    {
        "title" : "Dune",
        "author" : "Frank Herbert",
        "readStatus" : true,
    }];

function Book(title, author, readStatus) {
  this.title = title;
  this.author = author;
  this.readStatus = readStatus;
}

function addBookToLibrary() {
  //Create Variable for Title
  let title = 0;
  //Create Variable for Author
  let author = 0;
  //Create Variable for Read Status
  let readStatus = false;
  //Prompt for Title
  title = prompt('What is the title of the book?')
  //Prompt for Author
  author = prompt('Who wrote the book?')
  //Prompy for Read Status
  readStatus = confirm('Have you read the book?')
  //Append to the Array
  let book = new Book(title, author, readStatus);
  myLibrary.push(book);
  //Update the Display
  render();
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
    newReadStatus = (readStatus === true) ? false : true;
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
    <div class="card card-body mb-1">
        <h4>${book.title} by ${book.author}, Read = ${book.readStatus}</h4>
        <button class="btn btn-primary btn-xs" onclick="updateReadStatus('${book.title}', '${book.author}', ${book.readStatus})">Read/Unread</button>
        <button class="btn btn-danger btn-xs" onclick="deleteBookFromLibrary('${book.title}')">Delete Book</button>
    </div>
    `).join('');
    libraryList.innerHTML = html;
}