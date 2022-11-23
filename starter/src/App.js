import "./App.css";
import ListBooks from "./pages/ListBooks";
import SearchPage from "./pages/SearchPage";
import { Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Routes className="app">
      <Route exact path="/" element={<ListBooks />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
