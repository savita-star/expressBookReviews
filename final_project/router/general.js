const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({books});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.json(books);
 // return res.status(300).json({message: "Yet to be implemented"});
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbnum = req.params.isbn;
 let filterByisbn = books.filter((book) => book.isbn == isbnum);
  return res.status(300).json({filterByisbn});
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let filteredBooks = books.filter((book) => book.author === author);
  return res.status(200).json({ filteredBooks });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filterBookByTitle = books.filter((book) => book.title === title);
  return res.status(200).json({filterBookByTitle});
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  // Extract ISBN from request parameters
  const isbn = req.params.isbn;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
      res.json({
          isbn: isbn,
          reviews: book.reviews
      });
  } else {
      // Send a 404 response if the book is not found
      res.status(404).json({
          message: 'Reviews not found for the given ISBN.'
      });
  }
});
module.exports.general = public_users;
