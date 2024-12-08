import axios from "axios";
import React, { useState } from "react";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import "./styles.css";

const BlogSearch = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleSearch = async () => {
    if (!searchQuery) {
      setError("Please enter a search query.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://blogsearch-backend.onrender.com/api/blogs?q=${searchQuery}`
      );
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch blogs. Please try again later.");
    }
    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        <button onClick={toggleTheme} className="theme-button">
          {darkMode ? <FaMoon size={30} /> : <FaSun size={30} />}
        </button>
      </div>
      <h1 className="title">Blogs</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <div className="search-icon" onClick={handleSearch}>
          <FaSearch />
        </div>
        <div className="filters-wrapper">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">Filters</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
          </select>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">Sort</option>
            <option value="Popularity">Popularity</option>
            <option value="Newest First">Newest First</option>
            <option value="Oldest">Oldest</option>
          </select>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">Topics</option>
            <option value="React">React</option>
            <option value="MERN">MERN</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Javascript">Javascript</option>
          </select>
        </div>
      </div>
      {/* {loading && <div className="skeleton"></div>} */}
      {error && <p className="error">{error}</p>}
      <div className="results">
        {blogs.length > 0
          ? blogs.map((blog, index) => (
              <div key={index} className="blog-item" data-aos="fade-up">
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <a href={blog.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))
          : !loading && (<div className="no-results">
          
          <p> Start Searching Blogs... </p>
          <FaSearch className="animated-search-icon" />
        </div>)}
      </div>
    </div>
  );
};

export default BlogSearch;
