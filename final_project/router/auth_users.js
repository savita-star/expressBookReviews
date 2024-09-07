const express = require("express");
const jwt = require("jsonwebtoken");
//const session = require("express-session");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  return users.find((user) => user.username === username) ? true : false;
};

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
};

//only registered users can login
regd_users.post("/login", (req,res) => {
  console.log(req);
  let user = req.body.username;
  let pass = req.body.password;
  if(!authenticatedUser(user,pass)){
      return res.status(403).json({message:"User not authenticated"})
  }

  let accessToken = jwt.sign({
      data: user
  },'access',{expiresIn:60*60})
  req.session.authorization = {
      accessToken
  }
  res.send("User logged in Successfully")
});
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
