import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blogData from '../bolgData/blogData';


export default function Showcase() {
  const [width, setWidth] = useState(window.innerWidth); // Initialize width state
  const truncateText = (text, length = 750) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  };
  // Update width state on window resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <section className="showcase" id="explore-places">
      <div className="container">
        <h1 className="showcase-heading"><i class="fa-solid fa-arrow-right"></i> Places to Visit</h1>
        {blogData.map((blog, index) => (
          <div className={`row ${width <= 1200 ? ('row1') : (index % 2 === 0 ? 'row1' : 'row2')}`} key={blog.id}>
            <div className="img-box">
              <img src={blog.image} alt={blog.place} />
            </div>
            <div className="text-box">
              <div className="number-background">{blog.number}</div>
              <div className="shift">
                <div className="line-text line-blog">
                  <span className="line"></span>
                  <span className="guide-title">{blog.place}</span>
                </div>
                <h2 className="lg-heading">{blog.title}</h2>
                <p className="text-gray blog-body" dangerouslySetInnerHTML={{ __html: truncateText(blog.body) }} />
                <div className="read-btn">
                  <Link to={`/blog/${blog.id}`} className="btn btn-secondary">
                    {"Read More "}
                  </Link>
                  <Link to={`/blog/${blog.id}`}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
