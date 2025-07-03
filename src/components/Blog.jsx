import React, { useState } from 'react';
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import './Blog.css';

const Blog = ({ onBack, onCreateBlog }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCreatePost = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      image : image || noImg,
      title,
      content,
    };
    onCreateBlog(newBlog);
    setImage(null);
    setTitle('');
    setContent('');
    setShowForm(false);
  };

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="User" />
      </div>
      <div className="blogs-right">
        {showForm ? (
          <div className="blogs-right-form">
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="img-upload">
                <label htmlFor="file-upload" className="upload-label">
                  <i className="bx bx-upload"> Upload Image</i> 
                </label>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>

              {/* Preview image */}
              {image && <img src={image} alt="Preview" className="image-preview" />}

              <input
                type="text"
                placeholder="Add Title"
                className="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Add Text"
                className="text-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        ) : (
          <button className="post-btn" onClick={handleCreatePost}>
            Create New Post
          </button>
        )}

        <button className="blogs-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-left"></i>
        </button>
      </div>
    </div>
  );
};

export default Blog;
