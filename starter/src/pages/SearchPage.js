import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "../components/Book";

const SearchPage = () => {
  const [query, setQuery] = React.useState("");
  const [books, setBooks] = React.useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query) {
      BooksAPI.search(query)
        .then((books) => {
          setBooks(books);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query]);

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
          {books.error
            ? "No books found"
            : books.map((book) => <Book key={book.id} book={book} />)}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
