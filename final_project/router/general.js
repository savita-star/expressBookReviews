const express = require("express");
const bodyParser = require("body-parser");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const app = express();
app.use(bodyParser.json());

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  if (isValid(username)) {
    return res.status(400).json({ error: "Username already exists." });
  }
  if(username && password) {
    users.push({"username": username, "password": password});
  }
  return res.status(201).json({ message: "User registered successfully." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  res.json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbnum = req.params.isbn;
  let filterByisbn = users.filter((book) => book.isbn == isbnum);
  return res.status(300).json({ filterByisbn });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let filteredBooks = users.filter((book) => book.author === author);
  return res.status(200).json({ filteredBooks });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  let filterBookByTitle = users.filter((book) => book.title === title);
  return res.status(200).json({ filterBookByTitle });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  // Extract ISBN from request parameters
  const isbn = req.params.isbn;
  console.log(isbn);
  if (!isbn) {
    return res.status(400).json({ message: "ISBN parameter is required." });
  }
  const book = users.find((b) => b.isbn === isbn);
  console.log("Book found:", book);
  if (book) {
    res.json({
      isbn: isbn,
      reviews: book.reviews,
    });
  } else {
    // Send a 404 response if the book is not found
    res.status(404).json({
      message: "Reviews not found for the given ISBN.",
    });
  }
});
module.exports.general = public_users;
