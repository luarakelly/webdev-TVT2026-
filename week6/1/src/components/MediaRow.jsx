import { Link } from 'react-router';

const MediaRow = (props) => {
  const { item } = props;

  return (
    <tr>
      <td className="p-4 border border-gray-300 text-center">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-[260px] h-[200px] object-cover mx-auto"
        />
      </td>

      <td className="p-4 border border-gray-300 text-center">
        {item.username}
      </td>

      <td className="p-4 border border-gray-300 text-center">
        {item.title}
      </td>

      <td className="p-4 border border-gray-300 text-center">
        {item.description}
      </td>

      <td className="p-4 border border-gray-300 text-center">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>

      <td className="p-4 border border-gray-300 text-center">
        {item.filesize}
      </td>

      <td className="p-4 border border-gray-300 text-center">
        {item.media_type}
      </td>

      <td className="p-4 border border-gray-300 text-center">
        <Link
          to="/single"
          state={{ item }}
          className="bg-gray-700 text-white px-3 py-2 rounded hover:bg-gray-900"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default MediaRow;
