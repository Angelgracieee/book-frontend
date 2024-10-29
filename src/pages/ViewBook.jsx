// src/pages/ViewBook.js
import React from 'react';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails';

const ViewBook = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Book Details</h1>
      <BookDetails bookId={id} />
    </div>
  );
};

export default ViewBook;
