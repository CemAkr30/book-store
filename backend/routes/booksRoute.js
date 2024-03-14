import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    console.log(request.body);
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields : title, author, publishYear",
      });
    }

    const book = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const createdBook = await Book.create(book);

    return response.status(201).send(createdBook);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

router.get("/", async (request, response) => {
  const books = await Book.find({}).sort({ createdAt: -1 });
  return response.status(200).json({
    count: books.length,
    data: books,
  });
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).send({
        message: "Not have a book",
      });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields : title, author, publishYear",
      });
    }

    const { id } = request.params;

    const updateBook = await Book.findByIdAndUpdate(id, request.body);

    if (!updateBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const deleteBook = await Book.findByIdAndDelete(id);

    if (!deleteBook) {
      return response.status(404).send({
        mesage: "Book not found",
      });
    }

    return response.status(200).send({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({
      message: error.message,
    });
  }
});

export default router;
