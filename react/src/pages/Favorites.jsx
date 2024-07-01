import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCard from '../components/ImageCard';

const Favorites = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/myBookmarks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookmarks(response.data); // Assuming the API returns an array of bookmarks
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, []); // Empty dependency array means it runs once when component mounts

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-5">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks.map(bookmark => (
          <ImageCard
            key={bookmark.id} // Ensure each ImageCard has a unique key
            id={bookmark.id}
            imgSrc={bookmark.url}
            title={bookmark.title}
            description={bookmark.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
