import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ImageDetail = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/images/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setImage(response.data);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [id]);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto text-white">
      <h1 className="text-3xl font-bold my-8">{image.title}</h1>
      <img src={image.url} alt={image.title} className="w-full rounded-lg mb-4" />
      <p>{image.description}</p>
    </div>
  );
};

export default ImageDetail;
