import React, { useState, useEffect } from 'react';
import Weather from './weather';
import Calender from './calender';
import './news.css';
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import axios from 'axios';
import NewsModal from './NewsModal';
import Bookmark from './Bookmark';
import Blogmodals from './Blogmodals';

const Categories = {
  general: 'General',
  sports: 'Sports',
  business: 'Business',
  world: 'World',
  nation: 'Nation',
  technology: 'Technology',
  entertainment: 'Entertainment',
  science: 'Science',
  health: 'Health',
};

const News = ({ onShowBlog, blogs, onDeleteBlog }) => {
  const [headlines, setHeadlines] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  // Load and save bookmarks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(saved.map(b => ({ ...b, image: b.image || noImg })));
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&country=in&apikey=67b19629d0239a9fafab93e10787ff93`;
      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&country=in&apikey=67b19629d0239a9fafab93e10787ff93`;
      }
      try {
        const response = await axios.get(url);
        const articles = response.data.articles.map(a => ({
          ...a,
          image: a.image || noImg,
        }));
        setHeadlines(articles[0]);
        setNews(articles.slice(1, 7));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput('');
  };

  const toggleBookmark = (article) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.title === article.title);
      return exists ? prev.filter(b => b.title !== article.title) : [...prev, article];
    });
  };

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">news & blogs</h1>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search news..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </header>

      <div className="news-content">
        <div className="navbar">
          <div className="User" onClick={onShowBlog}>
            <img src={userImg} alt="user" />
            <p>Pclub Blogs</p>
          </div>
          <nav className="Categories">
            {Object.keys(Categories).map(category => (
              <a href="#" key={category} onClick={(e) => handleCategoryClick(e, category)}>
                {Categories[category]}
              </a>
            ))}
            <a href="#" onClick={() => setShowBookmarksModal(true)}>
              bookmark <i className="fa-regular fa-bookmark"></i>
            </a>
          </nav>
        </div>

        <div className="news-section">
          {headlines && (
            <div className="headline" onClick={() => setSelectedArticle(headlines) || setShowModal(true)}>
              <img src={headlines.image} alt={headlines.title} />
              <h2>
                {headlines.title}
                <i
                  className={`fa-${bookmarks.some(b => b.title === headlines.title) ? 'solid' : 'regular'} fa-bookmark bookmark`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(headlines);
                  }}
                ></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, i) => (
              <div key={i} className="new-grid-item" onClick={() => setSelectedArticle(article) || setShowModal(true)}>
                <img src={article.image} alt={article.title} />
                <h3>
                  {article.title}
                  <i
                    className={`fa-${bookmarks.some(b => b.title === article.title) ? 'solid' : 'regular'} fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(article);
                    }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>

        <NewsModal show={showModal} article={selectedArticle} onClose={() => setShowModal(false)} />
        <Bookmark
          show={showBookmarksModal}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarksModal(false)}
          onSelectArticle={(a) => {
            setSelectedArticle(a);
            setShowModal(true);
          }}
          onDeleteBookmark={toggleBookmark}
        />

        <div className="my-blog">
          <h1 className="my-blogs-heading">BLOGS</h1>
          <div className="blog-posts">
            {blogs.map((blog, i) => (
              <div key={i} className="blog-post" onClick={() => setSelectedPost(blog) || setShowBlogModal(true)}>
                <img src={blog.image || noImg} alt={blog.title} />
                <h3>{blog.title}</h3>
                <button
                  className="delete-post"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteBlog(i);
                  }}
                >
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            ))}
          </div>
          {showBlogModal && selectedPost && (
            <Blogmodals show={showBlogModal} blog={selectedPost} onClose={() => setShowBlogModal(false)} />
          )}
        </div>

        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>

      <footer className="news-footer">THANK YOU 🙏</footer>
    </div>
  );
};

export default News;
