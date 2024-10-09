import axios from "axios";
import React, { useEffect, useState } from "react";

const PlaylistCard = ({ playlist, index, onDelete }) => {
  const [image, setImage] = useState("");
  const name = playlist.name;
  const description = playlist.description || "No description available";
  const owner = playlist.owner?.display_name || "Unknown";
  const link = playlist.external_urls?.spotify;

  useEffect(() => {
    const fetchImage = async () => {
      const rep = await axios.get(
        "https://pixabay.com/api/?key=46402025-d2ca0fb209fdc6963db08274a&q=music&image_type=photo"
      );
      setImage(rep.data.hits[index].largeImageURL);
    };
    fetchImage();
  }, [index]);

  const handleDelete = () => {
    if (onDelete) {
      alert(
        "We can't delete the playlist at the moment. We'll try to add it in future updates"
      );
      onDelete(playlist.id);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: name,
          text: `Check out this playlist by ${owner}: ${description}`,
          url: link,
        })
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert(
        "Sharing is not supported on this browser. Copy this link: " + link
      );
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-2xl overflow-hidden relative'>
      <button
        onClick={handleDelete}
        className='absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition'
        aria-label='Delete Playlist'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-trash-2'
        >
          <path d='M3 6h18' />
          <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
          <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
          <line x1='10' x2='10' y1='11' y2='17' />
          <line x1='14' x2='14' y1='11' y2='17' />
        </svg>
      </button>
      <button
        onClick={handleShare}
        className='absolute top-2 left-2 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition'
        aria-label='Share Playlist'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M22 12l-6-6v4H2v4h14v4l6-6z' />
        </svg>
      </button>
      <div className='p-4'>
        <img src={image} alt={name} className='w-full h-48 object-cover' />
        <h2 className='text-xl text-center font-bold text-gray-800 truncate'>
          {name}
        </h2>
        <p className='text-sm text-gray-600 mt-2 line-clamp-2'>{description}</p>
        <p className='text-sm text-gray-500 mt-4'>By {owner}</p>
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full text-center'
        >
          Open in Spotify
        </a>
      </div>
    </div>
  );
};

export default PlaylistCard;
