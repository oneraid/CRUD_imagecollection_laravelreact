import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';

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
    <div className="container mx-auto">
      <h1 className="text-center text-white font-bold text-3xl mb-14 mt-5 sm:mt-0">
        Image Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-8">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            imgSrc={image.url}
            title={image.title}
            description={image.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
