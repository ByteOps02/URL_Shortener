import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { loginUser } from "../../services/auth.service";
import { setToken } from "../../utils/token";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(form);



      // 🔥 SUPPORT MULTIPLE BACKEND RESPONSE FORMATS
      const token =
        res.data?.token ||
        res.data?.data?.token ||
        res.data?.accessToken;

      if (!token) {
        throw new Error("Invalid login response format");
      }

      setToken(token);
      setUser({ loggedIn: true });

      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      console.error("LOGIN ERROR FULL:", err);
      console.error("LOGIN ERROR RESPONSE:", err?.response);

      if (err?.response?.status === 404) {
        toast.error("Login endpoint not found. Is the backend server running?");
      } else {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Invalid email or password";
        
        toast.error(
          typeof errorMessage === "string"
            ? errorMessage
            : JSON.stringify(errorMessage)
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="absolute top-24 left-4">
        <BackButton />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-800
                   rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center">
          Welcome back 👋
        </h2>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          Login to manage your URLs
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full px-4 py-3 rounded-xl border
                       bg-gray-50 dark:bg-gray-700
                       border-gray-300 dark:border-gray-600
                       focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl border
                         bg-gray-50 dark:bg-gray-700
                         border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2
                         text-sm text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white
                       font-semibold hover:bg-blue-700 transition
                       disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
