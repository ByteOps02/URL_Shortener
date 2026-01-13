import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { createShortUrl, getUserUrls, deleteUrl } from "../services/url.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUserUrls()
      .then((res) => setUrls(res.data.codes || []))
      .catch(() => toast.error("Failed to load URLs"));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;

    setLoading(true);
    try {
      const res = await createShortUrl({ url: originalUrl });
      setUrls([res.data, ...urls]);
      setOriginalUrl("");
      toast.success("Short URL created!");
    } catch {
      toast.error("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (shortCode) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/${shortCode}`;
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = async (id) => {
    try {
      await deleteUrl(id);
      setUrls(urls.filter((url) => url.id !== id));
      toast.success("URL deleted successfully!");
    } catch {
      toast.error("Failed to delete URL");
    }
  };

  const handleBack = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <BackButton label="Logout & Back to Home" onClick={handleBack} />
        {/* HEADER */}
        <div className="mb-8 mt-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create, manage, and track your shortened URLs
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard title="Total URLs" value={urls.length} />
          <StatCard title="Active Links" value={urls.length} />
          <StatCard title="Clicks" value="—" />
        </div>

        {/* CREATE URL */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 border
                     border-gray-200 dark:border-gray-800
                     rounded-2xl p-6 shadow-sm mb-10"
        >
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
            Shorten a new URL
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              className="flex-1 px-4 py-3 rounded-xl border
                         bg-gray-50 dark:bg-gray-800
                         border-gray-300 dark:border-gray-700
                         focus:ring-2 focus:ring-blue-500 outline-none
                         dark:text-gray-200"
            />

            <button
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-blue-600
                         text-white font-semibold
                         hover:bg-blue-700 transition
                         disabled:opacity-60"
            >
              {loading ? "Shortening..." : "Shorten"}
            </button>
          </div>
        </motion.form>

        {/* URL LIST */}
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
            Your URLs
          </h2>

          {urls.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {urls.map((u) => (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-900
                             border border-gray-200 dark:border-gray-800
                             rounded-xl p-5 flex flex-col gap-3
                             transition-colors dark:hover:bg-gray-800"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 break-all">
                    {u.targetURL}
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}/${u.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      /{u.shortCode}
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(u.shortCode)}
                        className="text-sm px-3 py-1 rounded-lg
                                   bg-gray-100 dark:bg-gray-800
                                   dark:text-gray-300
                                   hover:bg-gray-200 dark:hover:bg-gray-700
                                   transition"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-sm px-3 py-1 rounded-lg
                                   bg-red-100 text-red-600
                                   dark:bg-red-900/50 dark:text-red-400
                                   hover:bg-red-200 dark:hover:bg-red-900
                                   transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* ---------- Components ---------- */

const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-900
                  border border-gray-200 dark:border-gray-800
                  rounded-xl p-5">
    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    <p className="text-2xl font-bold mt-1 dark:text-white">{value}</p>
  </div>
);

const EmptyState = () => (
  <div className="bg-white dark:bg-gray-900
                  border border-dashed border-gray-300 dark:border-gray-700
                  rounded-xl p-10 text-center">
    <p className="text-lg font-semibold mb-2 dark:text-white">
      No URLs yet
    </p>
    <p className="text-gray-500 dark:text-gray-400">
      Create your first short link using the form above.
    </p>
  </div>
);