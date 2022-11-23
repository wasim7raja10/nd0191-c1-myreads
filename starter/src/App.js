import "./App.css";
import { useState } from "react";
import ListBooks from "./pages/ListBooks";
import SearchPage from "./pages/SearchPage";
import { Route, Routes } from "react-router-dom";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <Routes className="app">
      <Route exact path="/" element={<ListBooks />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
