import React, { useContext, useEffect, useState } from 'react';
import blogData from '../bolgData/blogData';
import BlogContext from '../context/BlogContext';
import UserContext from '../context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { Helmet } from 'react-helmet-async';
import BluetoBlack from './BluetoBlack';
import BlogReview from './BlogReview';
import Toblue from './Toblue';
import { showSuccess, showError, showInfo } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

export default function Blog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlogById } = useContext(BlogContext);
  const { user } = useContext(UserContext);

  const [blog, setBlog] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLocalBlog, setIsLocalBlog] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBlogById(id).then(fetchedBlog => {
      if (fetchedBlog && !fetchedBlog.error) {
        setBlog(fetchedBlog);
        setLikeCount(fetchedBlog.likes);
        if (user) {
          setIsLiked(fetchedBlog.likedBy.includes(user._id));
        }
      } else {
        const localBlog = blogData.find(blog => blog.id === parseInt(id));
        if (localBlog) {
          setBlog(localBlog);
          setIsLocalBlog(true);
        } else {
          showError("Blog Not Found!");
          navigate('/blog');
        }
      }
      setLoading(false);
    });
  }, [id, getBlogById, navigate, user]);

  const handleLikeDislike = async (action) => {
    if (!user) {
      showInfo(`Please log in to ${action === 'like' ? 'UpVote' : 'downvote'} the blog.`);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/blog/${id}/${action}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user._id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setLikeCount(data.likes);
        setIsLiked(action === 'like');
        showSuccess(`${action === 'like' ? 'Upvote' : 'DownVote'} Successful`);
      } else {
        showError(data.error || `Error ${action === 'like' ? 'liking' : 'unliking'} the blog.`);
      }
    } catch (error) {
      console.error("Error:", error);
      showError(`Failed to ${action === 'like' ? 'like' : 'unlike'} the blog.`);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!blog) {
    return <div>Blog Not Found!</div>;
  }

  return (
    <div className='rootClass'>
      <Helmet>
        <title>Prayatak - Blogs</title>
      </Helmet>
      <div className="blog-container">
        <div className="blog-content">
          <h1 className="blog-place-name">{blog.place}</h1>
          <h1 className="blog-header-text">{blog.title}</h1>
          <h1 className="blog-author">--- By {blog.author}</h1>
        </div>
        <div className="blog-image-container">
          <img src={blog.image} alt={blog.title} />
          <div className="blog-background-layer"></div>
          <div className="blog-background-layer1"></div>
        </div>
      </div>
      <div className="blog-container1">
        <p className="blog-text" dangerouslySetInnerHTML={{ __html: blog.body }} />
        {!isLocalBlog && (<div className="blog-fav-icons">
          <i
            className={`fa-regular fa-circle-up ${isLiked ? 'liked' : ''}`}
            onClick={() => handleLikeDislike('like')}
          ></i>
          <p className="blog-likeCount">{likeCount}</p>
          <i
            className={`fa-solid fa-circle-down ${!isLiked ? 'disliked' : ''}`}
            onClick={() => handleLikeDislike('dislike')}
          ></i>
        </div>)}
      </div>
      {!isLocalBlog && (
        <>
          <BluetoBlack />
          <BlogReview />
          <Toblue/>
        </>
      )}
    </div>
  );
}
