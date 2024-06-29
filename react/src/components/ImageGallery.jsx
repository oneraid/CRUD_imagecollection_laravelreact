import { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/images', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
      {images.map((image) => (
        <div key={image.id} className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure><img src={`http://127.0.0.1:8000/images/${image.url}`} alt={image.title} /></figure>
          <div className="card-body">
            <h2 className="card-title">{image.title}</h2>
            <p>{image.description}</p>
            <p>Upload by: {image.user ? image.user.name : 'Unknown'}</p>
            <span>Created on: {new Date(image.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
