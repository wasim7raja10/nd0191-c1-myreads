import "./App.css";
import { useState } from "react";
import ListBooks from "./pages/ListBooks";
import SearchPage from "./pages/SearchPage";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage />
      ) : (
        <ListBooks />
      )}
    </div>
  );
}

export default App;
