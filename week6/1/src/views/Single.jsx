import { useLocation, useNavigate } from 'react-router';

const Single = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const item = state.item;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{item.title}</h2>

      <div className="mb-4">
        {item.media_type.startsWith('image') ? (
          <img
            src={item.filename}
            alt={item.title}
            className="w-full max-h-[500px] object-contain rounded"
          />
        ) : (
          <video controls className="w-full max-h-[500px]">
            <source src={item.filename} type={item.media_type} />
          </video>
        )}
      </div>

      <p className="mb-2">{item.description}</p>

      <p className="mb-4 text-gray-600">
        Owner: <span className="font-semibold">{item.username}</span>
      </p>

      <button
        onClick={() => navigate(-1)}
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        Go back
      </button>
    </div>
  );
};

export default Single;
