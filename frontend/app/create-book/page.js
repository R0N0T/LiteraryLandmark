'use client'
import React, { useState, useEffect } from 'react';

export default function BookForm() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSave = async () => {
    if (book.title && book.author && book.publishYear) {
      try {
        const response = await fetch('http://localhost:3001/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book),
        });
        const data = await response.json();
        console.log('Book saved successfully:', data);
        // Clear form fields
        setBook({
          title: '',
          author: '',
          publishYear: '',
        });
      } catch (error) {
        console.error('Error saving book:', error);
      }
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
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
        <button type="button" onClick={handleSave}>Save Book</button>
      </form>
    </div>
  );
}
