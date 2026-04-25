import { useState, useEffect } from 'react';
import MediaRow from '../components/MediaRow';
import { fetchData } from '../utils/fetchData';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
      const userUrl = import.meta.env.VITE_AUTH_API + '/users/';

      const media = await fetchData(mediaUrl);

      const mediaWithUsers = await Promise.all(
        media.map(async (item) => {
          const user = await fetchData(userUrl + item.user_id);

          return {
            ...item,
            username: user.username,
          };
        })
      );

      setMediaArray(mediaWithUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">My Media</h2>

      <table className="w-full border-collapse bg-white text-black">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 border border-gray-300">Thumbnail</th>
            <th className="p-4 border border-gray-300">User</th>
            <th className="p-4 border border-gray-300">Title</th>
            <th className="p-4 border border-gray-300">Description</th>
            <th className="p-4 border border-gray-300">Created</th>
            <th className="p-4 border border-gray-300">Size</th>
            <th className="p-4 border border-gray-300">Type</th>
            <th className="p-4 border border-gray-300">Action</th>
          </tr>
        </thead>

        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
