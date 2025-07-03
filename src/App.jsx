import React, { useEffect, useState } from 'react';
import News from './components/News';
import Blog from './components/Blog';

const App = () => {
  // State to toggle between showing News or Blog component
  const [showNews, setShowNews] = useState(true);

  // State to store list of blogs
  const [blogs, setBlogs] = useState([]);

  // Load blogs from localStorage when the component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('blogs')) || [];
    if (Array.isArray(saved)) setBlogs(saved); // Ensure saved value is an array
  }, []);

  // Save blogs to localStorage whenever the `blogs` state changes
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  // Handler to add a new blog to the state
  const handleCreateBlog = (newBlog) => {
    setBlogs(prev => [newBlog, ...prev]); // Add new blog at the top
  };

  // Handler to delete a blog by its index
  const handleDeleteBlog = (indexToDelete) => {
    setBlogs(prev => prev.filter((_, i) => i !== indexToDelete));
  };

  return (
    <div className="container">
      {/* Conditional rendering based on `showNews` state */}
      {showNews ? (
        // Show News component and pass relevant props
        <News
          onShowBlog={() => setShowNews(false)}   // Function to switch to Blog view
          blogs={blogs}                           // Pass current blogs for display
          onDeleteBlog={handleDeleteBlog}         // Pass delete handler
        />
      ) : (
        // Show Blog component and pass relevant props
        <Blog
          onBack={() => setShowNews(true)}        // Function to switch back to News view
          onCreateBlog={handleCreateBlog}         // Pass create handler
        />
      )}
    </div>
  );
};

export default App;
