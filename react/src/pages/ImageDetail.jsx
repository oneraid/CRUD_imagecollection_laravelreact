import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaBookmark, FaDownload } from 'react-icons/fa';

const ImageDetail = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [bookmarksCount, setBookmarksCount] = useState(0);

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

    const fetchLikesAndBookmarks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const likesResponse = await axios.get(`http://127.0.0.1:8000/api/images/${id}/likesCount`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLikesCount(likesResponse.data.likesCount);

        const bookmarksResponse = await axios.get(`http://127.0.0.1:8000/api/images/${id}/bookmarksCount`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookmarksCount(bookmarksResponse.data.bookmarksCount);

        const isLikedResponse = await axios.get(`http://127.0.0.1:8000/api/images/${id}/isLiked`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLiked(isLikedResponse.data.userLiked);

        const isBookmarkedResponse = await axios.get(`http://127.0.0.1:8000/api/images/${id}/isBookmarked`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookmarked(isBookmarkedResponse.data.isBookmarked);
      } catch (error) {
        console.error('Error fetching likes or bookmarks:', error);
      }
    };

    fetchImage();
    fetchLikesAndBookmarks();
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/images/${id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLiked(true);
      setLikesCount(likesCount + 1);
    } catch (error) {
      console.error('Error liking image:', error);
    }
  };

  const handleUnlike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/images/${id}/unlike`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLiked(false);
      setLikesCount(likesCount - 1);
    } catch (error) {
      console.error('Error unliking image:', error);
    }
  };

  const handleBookmark = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/api/images/${id}/bookmark`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookmarked(true);
      setBookmarksCount(bookmarksCount + 1);
    } catch (error) {
      console.error('Error bookmarking image:', error);
    }
  };

  const handleUnbookmark = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/images/${id}/unbookmark`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookmarked(false);
      setBookmarksCount(bookmarksCount - 1);
    } catch (error) {
      console.error('Error unbookmarking image:', error);
    }
  };

  const handleDownload = () => {
    window.location.href = image.url; // Redirect to image URL for download
  };

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card bg-gray-800 shadow-2xl mt-20 mx-4 md:mx-auto md:max-w-4xl">
      <figure>
        <img src={image.url} alt={image.title} className="pt-10 w-11/12 h-full object-cover" />
      </figure>
      <div className="card-body">
        <div className="card-actions justify-center space-x-4">
          <button 
            onClick={liked ? handleUnlike : handleLike} 
            className="btn btn-primary flex items-center space-x-1">
            <FaHeart className={`text-lg ${liked ? 'text-red-500' : 'text-white'}`} />
            <span>{likesCount}</span>
          </button>
          <button 
            onClick={handleDownload} 
            className="btn btn-secondary flex items-center space-x-1">
            <FaDownload className="text-lg text-white" />
            <span>Download</span>
          </button>
          <button 
            onClick={bookmarked ? handleUnbookmark : handleBookmark} 
            className="btn btn-accent flex items-center space-x-1">
            <FaBookmark className={`text-lg ${bookmarked ? 'text-yellow-500' : 'text-white'}`} />
            <span>{bookmarksCount}</span>
          </button>
        </div>
          <h2 className="card-title text-3xl">{image.title}</h2>
          <p>{image.description}</p>
          <p className="text-sm">Uploaded by: {image.uploaded_by}</p>
          <p className="text-sm mb-4">Created on: {new Date(image.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ImageDetail;
