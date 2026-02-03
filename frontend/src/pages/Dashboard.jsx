import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Copy, Trash2, ExternalLink, Plus, TrendingUp, Link as LinkIcon, BarChart3, Loader2 } from "lucide-react";
import { createShortUrl, getUserUrls, deleteUrl } from "../services/url.service";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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
      setDeleteConfirm(null);
      toast.success("URL deleted!");
    } catch {
      toast.error("Failed to delete URL");
    }
  };

  return (
    <div className="h-[calc(100vh-52px)] bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4 flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER & STATS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your URLs</p>
          </div>
          
          {/* Stats - Horizontal Scrollable on Mobile */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            <StatItem icon={<LinkIcon className="w-5 h-5" />} label="Total" value={urls.length} />
            <StatItem icon={<TrendingUp className="w-5 h-5" />} label="Active" value={urls.length} />
            <StatItem icon={<BarChart3 className="w-5 h-5" />} label="Clicks" value="—" />
          </div>
        </div>

        {/* CREATE URL FORM */}
        <form onSubmit={submit} className="mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 transition-colors duration-300 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Enter your long URL here..."
                className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                disabled={loading}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-purple-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="inline">Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span className="inline">Shorten</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* URLS LIST - Scrollable */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-1 sm:pr-2">
            {urls.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-3 pb-4">
                {urls.map((url) => (
                  <URLCard
                    key={url.id}
                    url={url}
                    onCopy={copyToClipboard}
                    onDelete={() => setDeleteConfirm(url.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
};

/* ========== COMPONENTS ========== */

const StatItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 shrink-0 shadow-sm">
    <div className="text-purple-600 dark:text-purple-400">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
      <p className="text-lg font-bold text-gray-900 dark:text-white leading-none">{value}</p>
    </div>
  </div>
);

const URLCard = ({ url, onCopy, onDelete }) => {
  const shortUrl = `${import.meta.env.VITE_BACKEND_URL}/${url.shortCode}`;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-purple-300 dark:hover:border-purple-700 transition-all shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 truncate font-medium">
            {url.targetURL}
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onCopy(url.shortCode)}
              className="text-base font-bold text-purple-600 dark:text-purple-400 hover:underline"
              title="Click to copy"
            >
              /{url.shortCode}
            </button>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
          <button
            onClick={() => onCopy(url.shortCode)}
            className="flex-1 sm:flex-none justify-center px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-medium text-sm flex items-center gap-2 transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span className="sm:inline">Copy</span>
          </button>
          
          <button
            onClick={onDelete}
            className="flex-1 sm:flex-none justify-center px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 font-medium text-sm flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 sm:p-12 text-center h-full flex flex-col items-center justify-center">
    <div className="text-5xl mb-4">🔗</div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
      No links yet
    </h3>
    <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
      Create your first short link using the form above
    </p>
  </div>
);

const DeleteConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 max-w-sm w-full shadow-2xl transform transition-all">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Delete URL?
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        This action cannot be undone. The short link will stop working immediately.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default Dashboard;