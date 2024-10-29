// src/components/BookDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams(); // Get the book ID from the URL

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>; // Show loading state

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Published Year:</strong> {book.published_year}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default BookDetails;
