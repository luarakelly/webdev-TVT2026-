import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  const item = state.item;

  return (
    <>
      <h2>{item.title}</h2>

      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls width="100%">
          <source src={item.filename} type={item.media_type} />
        </video>
      )}

      <p>{item.description}</p>
      <p>Owner: {item.username}</p>

      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
};

export default Single;
