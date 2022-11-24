import React from "react";
import { Link } from "react-router-dom";

import Book from "../components/Book";
import { shelfNames, shelves } from "../data/shelves";

const ListBooks = ({ booksOnShelves, setBookShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <div key={shelf} className="bookshelf">
              <h2 className="bookshelf-title">{shelf}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksOnShelves
                    .filter((books) => books.shelf === shelfNames[shelf])
                    .map((books) => (
                      <Book
                        key={books.book.id}
                        book={books.book}
                        onUpdateShelf={setBookShelf}
                        currentShelf={books.shelf}
                      />
                    ))}
                </ol>
              </div>
            </div>
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
