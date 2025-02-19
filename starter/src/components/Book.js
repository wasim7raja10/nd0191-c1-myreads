import React, { useState } from "react";

const Book = ({ book, onUpdateShelf, currentShelf }) => {
  const [shelf, setShelf] = useState(currentShelf);

  const handleChange = (e) => {
    onUpdateShelf(book, e.target.value);
    setShelf(e.target.value);
  };

  return (
    <li key={book?.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book?.imageLinks?.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select onChange={handleChange} value={shelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book?.title}</div>
        <div className="book-authors">{book?.authors}</div>
      </div>
    </li>
  );
};

export default Book;
