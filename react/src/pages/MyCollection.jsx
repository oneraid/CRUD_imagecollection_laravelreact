import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyCollection = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/myimages', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setImages(response.data);
      } catch (error) {
        console.error('Error fetching user images:', error);
      }
    };

    fetchUserImages();
  }, []);

  const handleDelete = async (imageId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.delete(`http://127.0.0.1:8000/api/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Remove the deleted image from the state
      setImages(images.filter(image => image.id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleEdit = (imageId) => {
    navigate(`/edit-image/${imageId}`);
  };

  return (
    <div >
      <div className='max-w-7xl mx-auto'>
        <h1 className="text-2xl font-bold mt-10">My Collection</h1>
        <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
          {images.map(image => (
            <div key={image.id} className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure><img src={`${image.url}`} alt={image.title} /></figure>
              <div className="card-body">
                <h2 className="card-title">{image.title}</h2>
                <p>{image.description}</p>
                <span>Created on: {new Date(image.created_at).toLocaleDateString()}</span>
                
                <div className="card-actions justify-end">
                  <button onClick={() => handleEdit(image.id)} className="btn btn-primary">Edit</button>
                  <button onClick={() => handleDelete(image.id)} className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCollection;
