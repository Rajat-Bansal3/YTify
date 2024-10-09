import axios from "axios";
import React, { useEffect, useState } from "react";
import PlaylistCard from "../../components/PlaylistCard";
import { useNavigate } from "react-router-dom";
import OverlayPlaylistsForm from "../../components/OverlayPlaylistsComp";

const Profile = () => {
  const nav = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleDelete = (id) => {
    setPlaylists(playlists.filter((playlist) => playlist.id !== id));
  };

  const fetchPlayLists = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/yt-to-spot/get-playlists",
        { withCredentials: true }
      );
      setPlaylists(res.data.playlists.items);
    } catch (error) {
      if (error.status === 401) {
        nav("/");
      }
      console.error("Error fetching playlists:", error);
    }
  };

  useEffect(() => {
    fetchPlayLists();
  }, []);

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mx-auto p-6 flex flex-col justify-center items-center min-w-full min-h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold text-gray-800 mb-8 text-center'>
        Your Playlists
      </h1>
      <div className='flex justify-center mb-6'>
        <form className='relative w-full max-w-md'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full bg-gray-200 border border-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition'
            placeholder='Search for playlists...'
          />
          <button
            type='submit'
            className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 hover:text-gray-700'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M11.742 10.743A5.257 5.257 0 1010 15.257a5.257 5.257 0 001.742-4.514zm4.62 4.619a7.5 7.5 0 10-1.414-1.414 7.5 7.5 0 001.414 1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </form>
      </div>
      <button
        onClick={toggleOverlay}
        className='m-4 flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition max-w-lg'
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
          className='mr-2'
        >
          <path d='M5 12h14' />
          <path d='M12 5v14' />
        </svg>
        Create New Playlists
      </button>

      <OverlayPlaylistsForm isOpen={isOverlayOpen} onClose={toggleOverlay} />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4'>
        {filteredPlaylists.length > 0 ? (
          filteredPlaylists.map((playlist, index) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              index={index}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className='text-center text-gray-500 col-span-full'>
            No playlists available. Try linking your Spotify account.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
