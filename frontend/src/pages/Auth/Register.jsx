import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { registerUser } from "../../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../components/common/BackButton";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(form);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed"
      );
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
          Create your account 🚀
        </h2>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          Sign up to start shortening URLs
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {/* First Name */}
          <input
            placeholder="First name"
            required
            className="w-full px-4 py-3 rounded-xl border
                       bg-gray-50 dark:bg-gray-700
                       border-gray-300 dark:border-gray-600
                       focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) =>
              setForm({ ...form, firstname: e.target.value })
            }
          />
          {/* Last Name */}
          <input
            placeholder="Last name"
            required
            className="w-full px-4 py-3 rounded-xl border
                       bg-gray-50 dark:bg-gray-700
                       border-gray-300 dark:border-gray-600
                       focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) =>
              setForm({ ...form, lastname: e.target.value })
            }
          />
          {/* Email */}
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
          {/* Password */}
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
          {/* Submit */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white
                       font-semibold hover:bg-blue-700 transition
                       disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
