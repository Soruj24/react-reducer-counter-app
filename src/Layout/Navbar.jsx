import { Link } from "react-router-dom";
import { BiCart, BiUser } from "react-icons/bi";

const Navbar = () => {



    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        {/* Logo */}
                        <div>
                            <Link to="/" className="flex items-center py-5 px-2 text-gray-700">
                                <span className="font-bold text-2xl">MyShop</span>
                            </Link>
                        </div>
                        {/* Primary Nav */}
                        <div className="hidden md:flex items-center space-x-1">
                            <Link to="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                Home
                            </Link>
                            <Link to="/profile" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                Profile
                            </Link>
                            <Link to="/login" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                Login
                            </Link>
                            <Link to="/register" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                                Register
                            </Link>
                        </div>
                    </div>

                    {/* Secondary Nav */}
                    <div className="flex items-center space-x-1">
                        {/* Search Input */}
                       

                        {/* User Icon */}
                        <Link to="/profile" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                            <BiUser size={24} />
                        </Link>

                        {/* Cart Icon */}
                        <Link to="/cart" className="py-5 px-3 text-gray-700 hover:text-gray-900">
                            <BiCart size={24} />
                        </Link>
                    </div>

                    {/* Mobile Button */}
                    <div className="md:hidden flex items-center">
                        <button className="mobile-menu-button">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="mobile-menu hidden md:hidden">
                <Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-200">
                    Home
                </Link>
                <Link to="/profile" className="block py-2 px-4 text-sm hover:bg-gray-200">
                    Profile
                </Link>
                <Link to="/login" className="block py-2 px-4 text-sm hover:bg-gray-200">
                    Login
                </Link>
                <Link to="/register" className="block py-2 px-4 text-sm hover:bg-gray-200">
                    Register
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
