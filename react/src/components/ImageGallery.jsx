import { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "./ImageCard";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/images", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-8">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            id={image.id}
            imgSrc={image.url}
            title={image.title}
            description={image.description}
            user={image.user} // Ensure this matches your API response structure
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
