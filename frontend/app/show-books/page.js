'use client'
import { useState, useEffect } from 'react';

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

    return (
        <>
            <h1>List of Books</h1>
            {books.map((book, index) => (
                <div key={index}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.publishYear}</p>
                </div>
            ))}
        </>
    );
}
