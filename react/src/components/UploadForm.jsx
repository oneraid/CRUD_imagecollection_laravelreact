import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

const UploadForm = () => {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('description', description);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://127.0.0.1:8000/api/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data); // Handle response from backend
            // Optionally, navigate to another page or reset form fields
        } catch (error) {
            if (error.response) {
                // Handle server-side validation errors
                console.error('Error uploading file:', error.response.data);
                setError('Failed to upload. Please ensure all fields are correctly filled.');
            } else {
                console.error('Error:', error.message);
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Navbar user={user} />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        {error && <div className="alert alert-warning">{error}</div>}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Title"
                                className="input input-bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Description"
                                className="input input-bordered"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input
                                type="file"
                                className="file-input file-input-bordered"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        {preview && (
                            <div className="form-control mt-6">
                                <img src={preview} alt="Preview" className="max-w-xs rounded-lg" />
                            </div>
                        )}
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadForm;
