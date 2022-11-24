import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./pages/ListBooks";
import SearchPage from "./pages/SearchPage";

function App() {
  const [booksOnShelves, setBooksOnShelves] = React.useState([]);

  React.useEffect(() => {
    const getAllBooks = async () => {
      const allBooks = await BooksAPI.getAll();
      allBooks.forEach((books) => {
        setBooksOnShelves((booksOnShelves) => [
          ...booksOnShelves,
          { book: books, shelf: books.shelf },
        ]);
      });
    };
    getAllBooks();
    return () => {
      setBooksOnShelves([]);
    };
  }, []);

  const setBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      const newBooksOnShelves = booksOnShelves.map((books) => {
        if (books.book.id === book.id) {
          books.shelf = shelf;
        }
        return books;
      });
      setBooksOnShelves(newBooksOnShelves);
      if (!booksOnShelves.find((books) => books.book.id === book.id)) {
        setBooksOnShelves((booksOnShelves) => [
          ...booksOnShelves,
          { book: book, shelf: shelf },
        ]);
      }
    });
  };

  return (
    <Routes className="app">
      <Route
        exact
        path="/"
        element={
          <ListBooks
            booksOnShelves={booksOnShelves}
            setBookShelf={setBookShelf}
          />
        }
      />
      <Route
        path="/search"
        element={
          <SearchPage
            booksOnShelves={booksOnShelves}
            setBookShelf={setBookShelf}
          />
        }
      />
    </Routes>
  );
}

export default App;
