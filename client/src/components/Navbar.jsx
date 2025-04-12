// components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            Team Generator
          </Link>
          <div className="space-x-4">
            <Link to="/players" className="hover:text-blue-200">
              Players
            </Link>
            <Link to="/players/new" className="hover:text-blue-200">
              Add Players
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
