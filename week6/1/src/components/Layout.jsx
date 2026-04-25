import { Link, Outlet } from 'react-router';

const Layout = () => {
  return (
    <div>
      <nav>
        <ul className="flex justify-end bg-gray-800 m-0 p-0 list-none">
          <li>
            <Link
              to="/"
              className="block text-white text-center p-4 hover:bg-gray-900"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block text-white text-center p-4 hover:bg-gray-900"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              className="block text-white text-center p-4 hover:bg-gray-900"
            >
              Upload
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
