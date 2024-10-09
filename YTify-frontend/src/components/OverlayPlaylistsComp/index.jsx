import axios from "axios";
import React, { useState } from "react";

const OverlayPlaylistsForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    private: false,
    public: true,
    collaborative: false,
    url: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    const res = await axios.post(
      "http://localhost:3000/yt-to-spot/create-playList",
      {
        name: formData.name,
        public: formData.public,
        description: formData.description,
        url: formData.url,
      },
      { withCredentials: true }
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative'>
        <button
          onClick={() => onClose()}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          Create New Playlist
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Playlist Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              value={formData.name}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder='Enter playlist name'
              required
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={formData.description}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder='Enter playlist description'
              rows='3'
              required
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='url'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              YouTube Playlist URL
            </label>
            <textarea
              name='url'
              id='url'
              value={formData.url}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder='Enter YouTube playlist link'
              rows='2'
              required
            />
          </div>

          {/* Checkboxes for privacy, public, and collaboration settings */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Playlist Settings
            </label>

            <div className='flex items-center mb-3'>
              <input
                type='checkbox'
                name='private'
                id='private'
                checked={formData.private}
                onChange={handleInputChange}
                className='h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-green-500'
              />
              <label htmlFor='private' className='ml-2 text-sm text-gray-700'>
                Private
              </label>
            </div>

            <div className='flex items-center mb-3'>
              <input
                type='checkbox'
                name='public'
                id='public'
                checked={formData.public}
                onChange={handleInputChange}
                className='h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-green-500'
              />
              <label htmlFor='public' className='ml-2 text-sm text-gray-700'>
                Public
              </label>
            </div>

            <div className='flex items-center'>
              <input
                type='checkbox'
                name='collaborative'
                id='collaborative'
                checked={formData.collaborative}
                onChange={handleInputChange}
                className='h-5 w-5 text-green-500 border-gray-300 rounded focus:ring-green-500'
              />
              <label
                htmlFor='collaborative'
                className='ml-2 text-sm text-gray-700'
              >
                Collaborative
              </label>
            </div>
          </div>

          <button
            type='submit'
            className='w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition'
          >
            Create Playlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default OverlayPlaylistsForm;
