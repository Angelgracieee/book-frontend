// src/components/BookForm.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const BookForm = ({ bookId }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

    if (bookId) {
      const fetchBook = async () => {
        const response = await axios.get(`http://localhost:8000/api/books/${bookId}`);
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPublishedYear(book.published_year);
        setGenre(book.genre);
        setDescription(book.description);
      };

      fetchBook();
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = bookId ? 'put' : 'post';
    const url = bookId ? `http://localhost:8000/api/books/${bookId}` : 'http://localhost:8000/api/books';

    try {
      await axios[method](url, {
        title,
        author,
        published_year: publishedYear,
        genre,
        description,
      });
      navigate('/'); // Redirect to the home page after adding/updating
    } catch (error) {
      console.error('Error while saving the book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
      <input type="number" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} placeholder="Published Year" required />
      <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;
