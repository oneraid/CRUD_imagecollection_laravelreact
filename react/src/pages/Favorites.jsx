// Favorites.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard";

const Favorites = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/myBookmarks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBookmarks(response.data); // Assuming the API returns an array of bookmarks
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []); // Empty dependency array means it runs once when component mounts

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-5">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookmarks.map((bookmark) => (
          <ImageCard
            key={bookmark.id} // Ensure each ImageCard has a unique key
            id={bookmark.image_id}
            imgSrc={bookmark.image.url} // Assuming `image` has a `url` property
            title={bookmark.image.title} // Assuming `image` has a `title` property
            description={bookmark.image.description} // Assuming `image` has a `description` property
            user={bookmark.image.user} // Pass the `user` object from `image`
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
