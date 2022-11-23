import "./App.css";
import ListBooks from "./pages/ListBooks";
import SearchPage from "./pages/SearchPage";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import React from "react";

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
  }, []);

  return (
    <Routes className="app">
      <Route
        exact
        path="/"
        element={
          <ListBooks
            wantToRead={wantToRead}
            currentlyReading={currentlyReading}
            read={read}
          />
        }
      />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
