'use client'

import React, { useState, useEffect } from 'react';
import styles from './EditBook.module.css';

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
    <div className={styles.container}> {/* Apply container class */}
      <h2 className={styles.title}>Edit Book</h2> {/* Apply title class */}
      <form>
        <div className={styles.formGroup}> {/* Apply formGroup class */}
          <label htmlFor="title" className={styles.inputLabel}>Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={book.title}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.formGroup}> {/* Apply formGroup class */}
          <label htmlFor="author" className={styles.inputLabel}>Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            value={book.author}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.formGroup}> {/* Apply formGroup class */}
          <label htmlFor="publishYear" className={styles.inputLabel}>Publish Year:</label>
          <input
            type="number"
            name="publishYear"
            id="publishYear"
            value={book.publishYear}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>
        <button type="button" onClick={handleSave} className={styles.submitButton}>Save Changes</button> {/* Apply submitButton class */}
      </form>
    </div>
  );
}
