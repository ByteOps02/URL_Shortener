import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === "light") return "☀️";
    if (theme === "dark") return "🌙";
    return "🖥️";
  };

  // Show back button everywhere except Home


  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white dark:bg-gray-900
                 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">


          <Link
            to="/"
            className="text-xl font-extrabold text-blue-600 tracking-tight"
          >
            Shortify
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="
              w-10 h-10 flex items-center justify-center
              rounded-full
              bg-gray-100 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              hover:ring-2 hover:ring-blue-500/30
              transition
            "
            title="Toggle theme"
          >
            {getThemeIcon()}
          </motion.button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="font-medium text-gray-700 dark:text-gray-300
                           hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-blue-600 text-white
                           font-semibold hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                {user.name}
              </span>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="px-4 py-2 rounded-full bg-red-500 text-white
                           hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
