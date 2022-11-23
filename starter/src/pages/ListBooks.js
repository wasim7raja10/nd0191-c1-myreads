import React from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";

const listOfShelves = ["Currently Reading", "Want to Read", "Read"];

const ListBooks = ({ wantToRead, currentlyReading, read }) => {
  if (
    wantToRead.length === 0 &&
    currentlyReading.length === 0 &&
    read.length === 0
  ) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {listOfShelves.map((shelf) => (
            <div className="bookshelf" key={shelf}>
              <h2 className="bookshelf-title">{shelf}</h2>
              <div className="bookshelf-books">
                {shelf === "Currently Reading" && (
                  <ol className="books-grid">
                    {currentlyReading.map((book) => (
                      <Book book={book} />
                    ))}
                  </ol>
                )}
                {shelf === "Want to Read" && (
                  <ol className="books-grid">
                    {wantToRead.map((book) => (
                      <Book book={book} />
                    ))}
                  </ol>
                )}
                {shelf === "Read" && (
                  <ol className="books-grid">
                    {read.map((book) => (
                      <Book book={book} />
                    ))}
                  </ol>
                )}
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
