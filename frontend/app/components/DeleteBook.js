import styles from './DeleteBook.module.css';
export default function DeleteBook({ id }) {
    async function deleteBook() {
        try {
            await fetch(`http://localhost:3001/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <button className={styles.deleteButton  } onClick={deleteBook}>Delete</button>
    );
}
