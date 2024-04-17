import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import cors from "cors";
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send(`Hello world from port ${PORT}`);
});

app.get("/books", async (req, res) => {
    try {
      const books = await Book.find();
      return res.status(200).json({
        count: books.length,
        data: books
      });
    }
    catch(error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  }
  catch(error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/books", async (req, res) => { 
    try {
      if(!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send("All fields are required");
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
      return res.status(201).send(book);
    }
    catch(error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
});

app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      console.log(req.body);
      return res.status(400).send("All fields are required");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, newBook);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if(!book) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send("Book deleted successfully");
  }
  catch(error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
}); 

mongoose.connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => { 
    console.error("Error connecting to MongoDB:", error); 
  });

