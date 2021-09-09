$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);

  // TODO - Add code for edit & delete buttons
  $('#bookShelf').on('click', '.delete-button', removeBook);
  $('#bookShelf').on('click', '.edit-read-button', editBookRead);

}

function handleSubmit() {
  console.log('Submit button clicked.');
  let book = {};
  book.author = $('#author').val();
  book.title = $('#title').val();
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookToAdd,
    }).then(function(response) {
      console.log('Response from server.', response);
      refreshBooks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add book at this time. Please try again later.');
    });
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function(response) {
    console.log(response);
    renderBooks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}


// Displays an array of books to the DOM
function renderBooks(books) {
  $('#bookShelf').empty();

  for(let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
    $('#bookShelf').append(`
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isRead}</td>
        <td>
          <button 
            class="delete-button" 
            data-id="${book.id}"
          >
            Delete
          </button>
        </td>
        <td>
          <button
            class="edit-read-button"
            data-id="${book.id}"
          >
          Mark as Read
        </td>
      </tr>
    `);
  }
}

// Removes a book from the database
function removeBook() {
  const bookId = $(this).data('id');
  $.ajax({
    method: 'DELETE',
    url: `/books/${bookId}`
  }).then(function(response) {
    console.log('Book deleted');
    refreshBooks();
  }).catch(function(error) {
    alert('Uh-oh...');
    console.log('Error in DELETE:', error);
  });
}

// Marks a book as being read
function editBookRead() {
  const bookId = $(this).data('id');
  $.ajax({
    method: 'PUT',
    url: `/books/${bookId}`
  }).then(function(response) {
    console.log('Books marked as read');
    refreshBooks();
  }).catch(function(error) {
    alert('Oopsies...');
    console.log('Error in PUT:', error);
  });
}