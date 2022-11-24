import "./App.css";
import ListBooks from "./pages/ListBooks";
import SearchPage from "./pages/SearchPage";
import { Route, Routes } from "react-router-dom";
import React from "react";
import * as BooksAPI from "./BooksAPI";

function App() {
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

    return () => {
      setWantToRead([]);
      setCurrentlyReading([]);
      setRead([]);
    };
  }, []);

  const setBookShelf = (book, oldShelf, newShelf) => {
    BooksAPI.update(book, newShelf);
    if (newShelf === "currentlyReading") {
      setCurrentlyReading((prev) => [...prev, book]);
    }
    if (newShelf === "wantToRead") {
      setWantToRead((prev) => [...prev, book]);
    }
    if (newShelf === "read") {
      setRead((prev) => [...prev, book]);
    }
    if (oldShelf === "currentlyReading") {
      setCurrentlyReading((prev) => prev.filter((b) => b.id !== book.id));
    }
    if (oldShelf === "wantToRead") {
      setWantToRead((prev) => prev.filter((b) => b.id !== book.id));
    }
    if (oldShelf === "read") {
      setRead((prev) => prev.filter((b) => b.id !== book.id));
    }
  };
  return (
    <Routes className="app">
      <Route
        exact
        path="/"
        element={
          <ListBooks
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
            setBookShelf={setBookShelf}
          />
        }
      />
      <Route
        path="/search"
        element={<SearchPage setBookShelf={setBookShelf} />}
      />
    </Routes>
  );
}

export default App;
