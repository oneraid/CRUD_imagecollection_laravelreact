import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Gabungkan CSS di sini
const styles = {
    dropzone: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        border: '2px dashed #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
    },
    previewImage: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    },
};

const UploadForm = () => {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // Check if file size is greater than 5MB
                setError('Maximum file size is 5MB');
                setImage(null);
                setPreview(null);
            } else {
                setImage(file);
                setPreview(URL.createObjectURL(file));
                setError(''); // Clear any previous error
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!image) {
            setError('Please upload an image.');
            return;
        }
    
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
            navigate('/home'); // Navigate to home page after successful upload
        } catch (error) {
            if (error.response) {
                // Log the full response from the server for debugging
                console.error('Error uploading file:', error.response);
                setError('Failed to upload. Please ensure all fields are correctly filled.');
            } else {
                console.error('Error:', error.message);
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <div className="max-w-4xl mx-auto">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2">
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" style={styles.dropzone} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className={styles.previewImage} />
                                    ) : (
                                        <>
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, JPEG(File MAX. 5MB)</p>
                                        </>
                                    )}
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
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
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadForm;
