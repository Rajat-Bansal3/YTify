import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const CreatePlaylists = () => {
  const reg = async () => {
    const res = (window.location.href =
      "http://localhost:3000/spot-auth/register");
    console.log("kasd");
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500'>
      <img
        src='https://images.unsplash.com/photo-1512048564360-1e85aa764d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fG11c2ljJTIwaGFybW9ueXxlbnwwfHx8fDE2ODg0OTg4MjE&ixlib=rb-4.0.3&q=80&w=1080'
        alt='Music Background'
        className='absolute inset-0 object-cover w-full h-full opacity-30'
      />
      <div className='relative z-10 text-center text-white mb-8'>
        <h1 className='text-5xl font-bold'>Welcome to Your Playlist Creator</h1>
        <p className='mt-4 text-lg'>
          Create, manage, and share your favorite playlists seamlessly!
        </p>
        <p className='mt-2 text-md italic'>
          Convert YouTube music to Spotify playlists with 80% accuracy using AI!
        </p>
      </div>
      <button
        onClick={reg}
        className='bg-white text-green-500 px-6 py-3 rounded-lg shadow-lg hover:bg-green-100 transition duration-300 ease-in-out transform hover:scale-105'
      >
        Click to Register
      </button>

      {/* Feature Cards Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 px-4'>
        <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
          <h2 className='text-xl font-bold'>Create Playlist</h2>
          <p className='mt-2 text-gray-600'>
            Easily create your own playlists and organize your favorite songs.
          </p>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
          <h2 className='text-xl font-bold'>AI Song Identification</h2>
          <p className='mt-2 text-gray-600'>
            Leverage AI to find and convert songs from YouTube to Spotify
            accurately.
          </p>
        </div>
        <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
          <h2 className='text-xl font-bold'>Share with Friends</h2>
          <p className='mt-2 text-gray-600'>
            Share your playlists with friends and discover new music together.
          </p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className='flex space-x-4 mt-6'>
        <a href='#' className='text-white hover:text-green-300'>
          <FaFacebook size={24} />
        </a>
        <a href='#' className='text-white hover:text-green-300'>
          <FaTwitter size={24} />
        </a>
        <a href='#' className='text-white hover:text-green-300'>
          <FaInstagram size={24} />
        </a>
      </div>

      <footer className='absolute bottom-4 text-white'>
        <p>© {new Date().getFullYear()} YTify. All Rights Reserved.</p>
        <div className='mt-2'>
          <a href='#' className='text-gray-300 hover:text-white mx-2'>
            Privacy Policy
          </a>
          |
          <a href='#' className='text-gray-300 hover:text-white mx-2'>
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
};

export default CreatePlaylists;
