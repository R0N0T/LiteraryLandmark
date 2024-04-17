'use client'
// BookForm.js

import React, { useState } from 'react';
import styles from './BookForm.module.css'; // Import CSS module

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
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Book</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="author" className={styles.label}>Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="publishYear" className={styles.label}>Publish Year:</label>
          <input
            type="number"
            name="publishYear"
            value={book.publishYear}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <button type="button" onClick={handleSave} className={styles.button}>Save Book</button>
      </form>
    </div>
  );
}
