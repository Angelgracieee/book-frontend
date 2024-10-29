// src/pages/EditBook.js
import React from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';

const EditBook = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Book</h1>
      <BookForm bookId={id} />
    </div>
  );
};

export default EditBook;
