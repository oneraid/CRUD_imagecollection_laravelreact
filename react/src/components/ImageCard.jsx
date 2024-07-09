import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Heart, Bookmark, Share2, MessageCircle } from "react-feather";
import axios from "axios";

const ImageCard = ({ imgSrc, title, description, id, user }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarksCount, setBookmarksCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const fetchImageStats = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/images/${id}/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { likesCount, bookmarksCount, userLiked, isBookmarked } =
          response.data;
        setLikesCount(likesCount);
        setBookmarksCount(bookmarksCount);
        setLiked(userLiked);
        setBookmarked(isBookmarked);
      } catch (error) {
        console.error("Error fetching image stats:", error);
      }
    };

    fetchImageStats();
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/images/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLiked(true);
      setLikesCount(likesCount + 1);
    } catch (error) {
      console.error("Error liking image:", error);
    }
  };

  const handleUnlike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/images/${id}/unlike`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLiked(false);
      setLikesCount(likesCount - 1);
    } catch (error) {
      console.error("Error unliking image:", error);
    }
  };

  const handleBookmark = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/images/${id}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookmarked(true);
      setBookmarksCount(bookmarksCount + 1);
    } catch (error) {
      console.error("Error bookmarking image:", error);
    }
  };

  const handleUnbookmark = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/images/${id}/unbookmark`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookmarked(false);
      setBookmarksCount(bookmarksCount - 1);
    } catch (error) {
      console.error("Error unbookmarking image:", error);
    }
  };

  return (
    <Link
      to={`/image/${id}`}
      className="relative max-w-md overflow-hidden rounded-2xl shadow-lg group"
    >
      <div className="absolute top-4 left-4 flex items-center z-10">
        <div>
          <div className="avatar w-10 h-10 rounded-full overflow-hidden mr-3">
            <img
              src={
                user.pictures
                  ? `http://127.0.0.1:8000/photos_profile/${user.pictures}`
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              }
              alt={user.name}
            />
          </div>
        </div>
        <h4
          className="text-sm font-bold text-white mb-2"
          style={{
            textShadow: "1px 1px 2px black",
            textStroke: "10px black",
          }}
        >
          {user.name}
        </h4>
      </div>
      <img
        src={imgSrc}
        alt={title}
        className="transition-transform group-hover:scale-110 duration-400 w-full"
      />
      <div className="absolute inset-0 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="p-6 text-white bg-gradient-to-b from-black/60 to-transparen pt-20">
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="hidden md:block">{description}</p>
        </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex justify-between text-white">
        <div className="space-x-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              liked ? handleUnlike() : handleLike();
            }}
          >
            <Heart fill={liked ? "red" : "none"} />
          </button>
          <span>{likesCount}</span>
          <button onClick={(e) => e.preventDefault()}>
            <MessageCircle />
          </button>
          <button onClick={(e) => e.preventDefault()}>
            <Share2 />
          </button>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              bookmarked ? handleUnbookmark() : handleBookmark();
            }}
          >
            <Bookmark fill={bookmarked ? "yellow" : "none"} />
          </button>
          <span>{bookmarksCount}</span>
        </div>
      </div>
    </Link>
  );
};

ImageCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    pictures: PropTypes.string,
  }).isRequired,
};

export default ImageCard;
