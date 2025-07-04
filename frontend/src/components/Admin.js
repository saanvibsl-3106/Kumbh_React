import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loading from './Loading';
import ButtonSpinner from './ButtonSpinner';
import { showInfo, showConfirm, showSuccess, showError, showNetworkError } from '../utils/toast';

const API_URL = process.env.REACT_APP_API_URI || "http://localhost:8080";

function Admin() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingUserId, setDeletingUserId] = useState(null);
    const navigate = useNavigate();

    // Fetch users from the API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_URL}/users`, {
                    credentials: 'include'
                }); 
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        showConfirm(
            "Are you sure you want to delete this user? This action cannot be undone.",
            async () => {
                try {
                    setIsDeleting(true);
                    setDeletingUserId(id);
                    const response = await fetch(`${API_URL}/users/${id}`, {
                        method: 'DELETE',
                        credentials: 'include'
                    });
                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(result.message || 'Failed to delete user');
                    }

                    // Update the users list after successful deletion
                    setUsers(users.filter((user) => user._id !== id));
                    showSuccess('User deleted successfully');
                } catch (err) {
                    console.error('Error deleting user:', err.message);
                    if (err.message.includes('Network') || err.message.includes('fetch')) {
                        showNetworkError();
                    } else {
                        showError(err.message || 'Failed to delete user');
                    }
                    setError(err.message);
                } finally {
                    setIsDeleting(false);
                    setDeletingUserId(null);
                }
            },
            () => {
                showInfo('User deletion cancelled');
            }
        );
    };

    const onclick = () => {
        navigate('/admin-claimed');
    };

    return (
        <div className="admin-body">
            <div className="admin-sidebar">
                <button className="admin-sidebar-button active">Users</button>
                <button className="admin-sidebar-button" onClick={()=>{navigate('/finder')}}>Lost/Found Items</button>
                <button className="admin-sidebar-button" onClick={onclick}>Claimed Items</button>
                <button className="admin-sidebar-button" onClick={()=>{navigate('/admin-feedback')}}>Feedbacks</button>
            </div>

            <div className="admin-main-content">
                <h1 className="admin-main-title">Users</h1>
                {isLoading ? (
                    <div className="loading-center">
                        <Loading />
                    </div>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <table className="admin-data-table">
                        <thead>
                            <tr>
                                <th className="admin-table-header">Username</th>
                                <th className="admin-table-header">Contact Number</th>
                                <th className="admin-table-header">Email</th>
                                <th className="admin-table-header">Address</th>
                                <th className="admin-table-header">blogs</th>                                
                                <th className="admin-table-header">comments</th>                                
                                <th className="admin-table-header">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td className="admin-table-cell">{user.name}</td>
                                    <td className="admin-table-cell">{user.phoneNumber}</td>
                                    <td className="admin-table-cell">{user.email}</td>
                                    <td className="admin-table-cell">{user.address}</td>
                                    <td className="admin-table-cell"><Link to={`/blogs/${user._id}`}>View Blogs</Link></td>
                                    <td className="admin-table-cell"><Link to={`/usercomments/${user._id}`}>View Comments</Link></td>
                                    <td className="admin-table-cell">
                                        <button
                                            className="admin-delete-button"
                                            onClick={() => handleDelete(user._id)}
                                            disabled={isDeleting && deletingUserId === user._id}
                                            style={{position: 'relative'}}
                                        >
                                            {isDeleting && deletingUserId === user._id ? (
                                                <>
                                                    <span>Deleting...</span>
                                                    <ButtonSpinner variant="clip" position="inline" size={12} color="#fff" />
                                                </>
                                            ) : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Admin;
