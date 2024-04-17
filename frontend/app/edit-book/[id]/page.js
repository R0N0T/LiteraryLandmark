'use client'
import React, { useState, useEffect } from 'react';

export default function EditBook({ params }) {
  const bookId = params.id;
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: '',
  });
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3001/books/${bookId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      console.log('Book updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Publish Year:</label>
          <input
            type="number"
            name="publishYear"
            value={book.publishYear}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" onClick={handleSave}>Save Changes</button>
      </form>
    </div>
  );
}
