// Import express
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Library API 🚀");
});

// Sample book data
let books = [
  { id: 1, title: "Book One", author: "Author A" },
  { id: 2, title: "Book Two", author: "Author B" }
];

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Get single book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found ❌");
  res.json(book);
});

// Add new book (POST)
app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update book (PUT)
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found ❌");

  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

// Delete book
app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.send("Book deleted ✅");
});

// Start server
app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});
