import React from "react";
import Book from "./Book";
import { shelfNames } from "../data/shelves";

const BookShelf = ({ shelf, booksOnShelves, setBookShelf }) => {
  return (
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
  );
};

export default BookShelf;
