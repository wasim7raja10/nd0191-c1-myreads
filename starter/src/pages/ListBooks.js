import React from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import * as BooksAPI from "../BooksAPI";

const listOfShelves = ["Currently Reading", "Want to Read", "Read"];

const ListBooks = () => {
  const [wantToRead, setWantToRead] = React.useState([]);
  const [currentlyReading, setCurrentlyReading] = React.useState([]);
  const [read, setRead] = React.useState([]);

  React.useEffect(() => {
    const getAllBooks = async () => {
      const allBooks = await BooksAPI.getAll();
      allBooks.forEach((books) => {
        if (books.shelf === "wantToRead") {
          setWantToRead((prev) => [...prev, books]);
        } else if (books.shelf === "currentlyReading") {
          setCurrentlyReading((prev) => [...prev, books]);
        } else if (books.shelf === "read") {
          setRead((prev) => [...prev, books]);
        }
      });
    };
    getAllBooks();
  }, []);
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
                      <Book key={book.id} book={book} />
                    ))}
                  </ol>
                )}
                {shelf === "Want to Read" && (
                  <ol className="books-grid">
                    {wantToRead.map((book) => (
                      <Book key={book.id} book={book} />
                    ))}
                  </ol>
                )}
                {shelf === "Read" && (
                  <ol className="books-grid">
                    {read.map((book) => (
                      <Book key={book.id} book={book} />
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
