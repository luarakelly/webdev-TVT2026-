import {useState, useEffect} from 'react';
import MediaRow from '../components/MediaRow';
import {fetchData} from '../utils/fetchData';

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

  console.log(mediaArray);

  return (
    <>
      <h2>My Media</h2>

      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
