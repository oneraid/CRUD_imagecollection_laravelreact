import React from 'react';
import PropTypes from 'prop-types';
import { Heart, Bookmark, Share2, MessageCircle } from "react-feather";

const ImageCard = ({ imgSrc, title, description }) => {
  return (
    <div className="relative max-w-md overflow-hidden rounded-2xl shadow-lg group">
      <img src={imgSrc} alt={title} className="transition-transform group-hover:scale-110 duration-400 w-full" />
      
      <div className="absolute inset-0 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="p-6 text-white bg-gradient-to-b from-black/60 to-transparent">
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="hidden md:block">{description}</p>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6 flex justify-between text-white">
        <div className="space-x-4">
          <button>
            <Heart />
          </button>
          <button>
            <MessageCircle />
          </button>
          <button>
            <Share2 />
          </button>
        </div>
        <div>
          <button>
            <Bookmark />
          </button>
        </div>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ImageCard;
