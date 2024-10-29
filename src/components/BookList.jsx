// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  // Fetch books on component mount
  useEffect(() => {
      const fetchBooks = async () => {
          try {
              const response = await axios.get('http://localhost:8000/api/books');
              setBooks(response.data);
          } catch (error) {
              console.error('Error fetching books:', error);
          }
      };
      fetchBooks();
  }, []);


  const handleDelete = async (id) => {
    console.log(`Attempting to delete book with ID: ${id}`); // Log the book ID
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
        try {
            const response = await axios.delete(`http://localhost:8000/api/books/${id}`);
            console.log('Delete response:', response.data); // Log the response

            // Update local state to reflect deletion
            setBooks((prevBooks) => {
                const updatedBooks = prevBooks.filter(book => book.id !== id);
                console.log('Updated books after deletion:', updatedBooks); // Log updated state
                return updatedBooks;
            });
        } catch (error) {
            console.error('Error deleting the book:', error.response ? error.response.data : error.message);
        }
    }
};



  return (
    <div>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/view/${book.id}`}>{book.title}</Link>
            <Link to={`/edit/${book.id}`}> Edit </Link>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/add">Add New Book</Link>
    </div>
  );
};

export default BookList;
