import React from 'react';
import './Modal.css';
import './Bookmark.css';

const Bookmark = ({ show, bookmarks, onClose, onDeleteBookmark, onSelectArticle }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <span className="close-button" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </span>
      <h2 className="bookmarks-heading">Bookmarked News</h2>
      <div className="bookmarks-list">
        {bookmarks.length === 0 ? (
          <p className="empty-message">No bookmarks added yet.</p>
        ) : (
          bookmarks.map((bookmark, index) => (
            <div key={index} className="bookmark-item">
              <img src={bookmark.image} alt="Bookmark" onClick={() => onSelectArticle(bookmark)} />
              <h3 onClick={() => onSelectArticle(bookmark)}>{bookmark.title}</h3>
              <span className="delete" onClick={() => onDeleteBookmark(bookmark)}>
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookmark;
