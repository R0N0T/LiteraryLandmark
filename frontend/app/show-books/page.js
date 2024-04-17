'use client';
import { useState, useEffect } from 'react';
import styles from './ShowBooks.module.css'; // Import CSS module
import Link from 'next/link';
import DeleteBook from '../components/DeleteBook';

export default function ShowBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch('http://localhost:3001/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const newBooks = await response.json();
                setBooks(newBooks.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }
        fetchBooks();
    }, []);

    const handleEdit = (id) => {
        // Handle edit functionality
        console.log(`Editing book with id: ${id}`);
    };

    const handleView = (id) => {
        // Handle view functionality
        console.log(`Viewing book with id: ${id}`);
    };

    const handleDelete = (id) => {
        // Handle delete functionality
        console.log(`Deleting book with id: ${id}`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>List of Books</h1>
            <button className={`${styles.button} ${styles.addButton}`}>
                <Link href="/create-book">Add book</Link>
            </button>   
            <div className={styles.bookList}>
                {books.map((book, index) => (
                    <div key={index} className={styles.bookCard}>
                        <h2 className={styles.bookTitle}>{book.title}</h2>
                        <p className={styles.bookInfo}><strong>Author:</strong> {book.author}</p>
                        <p className={styles.bookInfo}><strong>Publish Year:</strong> {book.publishYear}</p>
                        <div className={styles.buttonGroup}>
                            <button className={`${styles.button} ${styles.editButton}`}>
                                <Link href={`/edit-book/${book._id}`}>
                                    Edit
                                </Link>
                            </button>
                            <DeleteBook id={book._id} />   
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
