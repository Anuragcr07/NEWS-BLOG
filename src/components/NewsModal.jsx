import React from 'react';
import './newsModal.css';
import './Modal.css';

const NewsModal = ({ show, article, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {article ? (
          <>
            <img src={article.image || 'https://via.placeholder.com/600'} alt={article.title} className="modal-image" />
            <h2 className="modal-title">{article.title}</h2>
            <p className="modal-source">Source: {article.source?.name || 'Unknown Source'}</p>
            <p className="modal-date">
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'No Date Available'}
            </p>
            <p className="modal-content-text">{article.content || 'No content available.'}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-link">
              Read more
            </a>
          </>
        ) : (
          <p>No article selected.</p>
        )}
      </div>
    </div>
  );
};

export default NewsModal;
