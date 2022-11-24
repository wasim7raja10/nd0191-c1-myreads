import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "../components/Book";

const SearchPage = ({ setBookShelf }) => {
  const [query, setQuery] = React.useState("");
  const [books, setBooks] = React.useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await BooksAPI.search(query);
      setBooks(books);
    };
    if (query) fetchBooks();
    else setBooks([]);
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
          {!query
            ? "Please enter a search term"
            : books.length > 0
            ? books.map((book) => (
                <Book key={book.id} book={book} onUpdateShelf={setBookShelf} />
              ))
            : "No results found"}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
