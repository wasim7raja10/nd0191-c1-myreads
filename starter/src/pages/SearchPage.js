import React from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "../BooksAPI";
import Book from "../components/Book";

const SearchPage = ({ booksOnShelves, setBookShelf }) => {
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);

    if (e.target.value) {
      BooksAPI.search(e.target.value).then((res) => {
        if (res.error) {
          setSearchResults([]);
        } else {
          res.forEach((book) => {
            const bookOnShelf = booksOnShelves.find(
              (books) => books.book.id === book.id
            );
            if (bookOnShelf) {
              book.shelf = bookOnShelf.shelf;
            } else {
              book.shelf = "none";
            }
          });
          setSearchResults(res);
        }
      });
    }

    if (!e.target.value) {
      setSearchResults([]);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/"}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {!query
            ? "Search for Books"
            : !searchResults.length
            ? "No result found"
            : searchResults.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onUpdateShelf={setBookShelf}
                  currentShelf={book.shelf}
                />
              ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
