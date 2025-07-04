import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BlogContext from '../context/BlogContext';
import UserContext from '../context/UserContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loading from './Loading';
import { Helmet } from 'react-helmet-async';
import { showSuccess, showError, showWarning, showInfo, showDeleteConfirm, showLoading, dismissToast } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

function UserBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        place: '',
        photo: null,
        description: ''
    });
    const { blogs, userBlogs, getBlogs, createBlogs, getBlogsofUser, updateBlog } = useContext(BlogContext);
    const { user } = useContext(UserContext);
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [filteredBlogs, setFilteredBlogs] = useState(id === '1' ? blogs : userBlogs);
    const [loading, setLoading] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const [editingBlogId, setEditingBlogId] = useState(null);

    const openForm = () => {
        if (!user) {
            showInfo("Login to Create a Blog");
            navigate('/login');
        }
        setIsFormOpen(true);
        setEditingBlogId(null);
        setFormData({
            title: '',
            place: '',
            photo: null,
            description: '',
        });
    };

    const closeForm = () => setIsFormOpen(false);

    const truncateText = (text, length = 750) => {
        return text.length > length ? text.slice(0, length) + '...' : text;
    };

    const fetchBlogs = useCallback(async () => {

        await getBlogs();
        setLoading(false);
    }, [getBlogs]);
    const fetchBlogsofUser = useCallback(async () => {

        await getBlogsofUser(id);
        setLoading(false);
    }, [getBlogsofUser]);

    useEffect(() => {

        if (id === "1") {
            fetchBlogs();
        } else {
            fetchBlogsofUser();
        }
    }, [id, fetchBlogs, fetchBlogsofUser]);



    useEffect(() => {
        setFilteredBlogs(id === '1' ? blogs : userBlogs);
    }, [blogs, userBlogs]);

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

    const handleFormChange = (e) => {
        const { name, value, files } = e.target || {};
        if (files) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0]
            }));
        } else if (name === 'description') {
            updateDescription(value);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const updateDescription = (text) => {
        const wordCount = text.trim().split(/\s+/).length;
        setSubmitDisabled(wordCount < 800);
        setFormData((prevData) => ({
            ...prevData,
            description: text
        }));
    };

    const onClick = () => {
        if (isSubmitDisabled) {
            showWarning("Blog length must be at least 800 words.");
            return;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingBlogId) {
            setSubmitDisabled(false);
        }
        if (!isSubmitDisabled) {
            try {
                setLoadingSubmit(true); 
                const { title, place, description, photo } = formData;
                const userName = user?.name || 'Author Name';

                if (editingBlogId) {
                    await updateBlog(editingBlogId, title, place, description, photo, userName);
                    showSuccess('Blog updated successfully.');
                } else {
                    await createBlogs(title, place, description, photo, userName);
                    showSuccess('Blog created successfully.');
                }

                setFormData({ title: '', place: '', photo: null, description: '' });
                closeForm();
                if (id === '1') {
                    fetchBlogs();
                } else {
                    fetchBlogsofUser();
                }
            } catch (error) {
                console.error('Error creating/updating blog:', error);
                showError('Failed to save blog. Please try again.');
            } finally {
                setLoadingSubmit(false); 
            }
        } else {
            showWarning("Blog length must be at least 800 words.");
        }
    };


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const editBlog = (blogId) => {
        const blog = filteredBlogs.find((b) => b._id === blogId);
        if (blog) {
            setEditingBlogId(blogId);
            setFormData({
                title: blog.title,
                place: blog.place,
                description: blog.body,
                photo: null,
            });
            setIsFormOpen(true);
        }
    };

    const deleteBlog = async (blogId) => {
        const blogToDelete = blogs.find(blog => blog._id === blogId);
        showDeleteConfirm(
            blogToDelete?.title || "this blog",
            async () => {
                const loadingToast = showLoading('Deleting blog...');
                try {
                    const url = `${API_URL}/blog/${blogId}`;
                    const response = await fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    });

                    if (response.ok) {
                        dismissToast(loadingToast);
                        showSuccess('Blog deleted successfully');
                        fetchBlogsofUser();
                    } else {
                        const error = await response.json();
                        console.error('Error deleting Blog:', error.error);
                        dismissToast(loadingToast);
                        showError('Failed to delete blog. Please try again.');
                    }
                } catch (error) {
                    console.error('Error deleting Blog:', error);
                    dismissToast(loadingToast);
                    showError('Failed to delete blog. Please try again.');
                }
            },
            () => {
                showInfo('Blog deletion cancelled');
            }
        );
    };


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const filtered = blogs.filter(blog =>
            blog.place.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlogs(filtered);
    };

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredBlogs(blogs);
        } else {
            const filtered = blogs.filter(blog =>
                blog.place.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBlogs(filtered);
        }
    }, [searchTerm, blogs]);

    if (loading) {
        return <Loading/>;
    }

    return (
        <div className='userblog-body'>
            <Helmet>
                <title>Prayatak - User Blogs</title>
            </Helmet>
            <div className="user-blog-header">
                <button className="btn-primary lost-btn" onClick={openForm}>
                    Create Blog
                </button>
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        name="search"
                        className="input-search"
                        placeholder="Search by Place"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="mg-5 btn-primary lost-btn">
                        Search
                    </button>
                </form>
            </div>

            {isFormOpen && (
                <div className="unique-report-form active">
                    <button className="unique-close-button" onClick={closeForm}>&times;</button>
                    <h2>{editingBlogId ? 'Edit Blog' : 'Create new Blog'}</h2>
                    <form className="unique-form" onSubmit={handleSubmit}>
                        <input
                            className="unique-input"
                            type="text"
                            name="title"
                            placeholder="Give title in about 20 words"
                            required
                            value={formData.title}
                            onChange={handleFormChange}
                        />
                        <input
                            className="unique-input"
                            type="text"
                            name="place"
                            placeholder="About which Place You are Writing?"
                            required
                            value={formData.place}
                            onChange={handleFormChange}
                        />
                        <input
                            className="unique-input"
                            type="file"
                            name="photo"
                            accept="image/*"
                            required={!editingBlogId}
                            onChange={handleFormChange}
                        />
                        <ReactQuill
                            className="unique-input blog-input-desc"
                            theme="snow"
                            placeholder="Enter your blog here in a minimum of 800 words..."
                            value={formData.description}
                            onChange={updateDescription}
                            required
                        />
                        <button
                            className="btn-primary lost-btn new-btn"
                            type="submit"
                            disabled={loadingSubmit}
                        >
                            {loadingSubmit ? 'Submitting...' : editingBlogId ? 'Update' : 'Submit'}
                        </button>
                    </form>

                </div>
            )}

            <section className="showcase" id="explore-places">
                <h1 className="heading-blog">{id === '1' ? "User's Experience --> " : "Your Blogs --> "}</h1>
                <div className="container">
                    {filteredBlogs.length === 0 ? (
                        <p>No blogs found </p>
                    ) : (
                        filteredBlogs.map((blog, index) => {
                            const isRow1 = width <= 1200 || index % 2 === 0;
                            return (
                                <div className={`row ${isRow1 ? 'row1' : 'row2'}`} key={blog._id}>
                                    <div className="img-box">
                                        <img src={blog.image} alt="Blog Illustration" />
                                    </div>
                                    <div className="text-box">
                                        <div className="number-background">
                                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                        </div>
                                        <div className="shift">
                                            <div className="line-text line-blog">
                                                <span className="line"></span>
                                                <span className="guide-title">{blog.place}</span>
                                            </div>
                                            <h2 className="lg-heading">
                                                {blog.title}
                                                {id != '1' && (
                                                    <>
                                                        <i
                                                            className="fa-regular fa-pen-to-square user-blog-icons"
                                                            onClick={() => editBlog(blog._id)}
                                                        ></i>
                                                        <i
                                                            className="user-blog-icons fa-regular fa-trash-can"
                                                            onClick={() => deleteBlog(blog._id)}
                                                        ></i>
                                                    </>
                                                )}
                                            </h2>
                                            <div className="author guide-title">
                                                --- By {blog.author || "Unknown"}
                                            </div>
                                            <p
                                                className="text-gray blog-body"
                                                dangerouslySetInnerHTML={{ __html: truncateText(blog.body) }}
                                            />
                                            <div className="read-btn">
                                                <Link to={`/blog/${blog._id}`} className="btn btn-secondary">
                                                    {"Read More "}
                                                </Link>
                                                <Link to={`/blog/${blog._id}`}>
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>

        </div>
    );
}

export default UserBlog;
