import React from "react";
import { Link } from "react-router-dom";

import BookShelf from "../components/BookShelf";
import { shelves } from "../data/shelves";

const ListBooks = ({ booksOnShelves, setBookShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <BookShelf
              key={shelf}
              shelf={shelf}
              booksOnShelves={booksOnShelves}
              setBookShelf={setBookShelf}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to={"/search"}>Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
