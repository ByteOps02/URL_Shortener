import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { createShortUrlFree } from "../../services/url.service";
import { getOrCreateDeviceId, incrementFreeUses, getRemainingFreeUses } from "../../utils/device";
import { useNavigate } from "react-router-dom";

const FreeUrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const remainingUses = getRemainingFreeUses();

  const submit = async (e) => {
    e.preventDefault();
    
    if (!originalUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (remainingUses <= 0) {
      toast.error("You've used all 3 free shortens. Please sign up to continue!");
      navigate("/register");
      return;
    }

    setLoading(true);
    try {
      const deviceId = getOrCreateDeviceId();
      const res = await createShortUrlFree({ url: originalUrl, deviceId });
      
      incrementFreeUses();
      
      const shortUrl = `${import.meta.env.VITE_BACKEND_URL}/${res.data.shortCode}`;
      
      toast.success("URL shortened successfully!");
      
      // Show the result
      toast((t) => {
        const fullUrl = `${import.meta.env.VITE_BACKEND_URL}/${res.data.shortCode}`;
        return (
          <div className="space-y-2">
            <p className="text-sm font-medium">Short URL created:</p>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <a
                href={fullUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold flex-1 break-all text-sm"
              >
                {fullUrl}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(fullUrl);
                  toast.dismiss(t.id);
                  toast.success("Copied!");
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs whitespace-nowrap hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Free uses remaining: {getRemainingFreeUses()}/3
            </p>
          </div>
        );
      }, { duration: 5000 });
      
      setOriginalUrl("");

      // If this was the last free use, prompt signup
      if (getRemainingFreeUses() === 0) {
        setTimeout(() => {
          toast.error("Free shortens limit reached! Sign up/login for unlimited shortens.");
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.error || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm w-full max-w-md"
    >
      <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">
        Try for Free
      </h2>
      
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          ✨ <span className="font-semibold">{remainingUses} free shortens remaining</span>
          <br />
          <span className="text-xs">After 3 uses, sign up/login for unlimited access</span>
        </p>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <input
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://example.com/very-long-url"
          disabled={remainingUses <= 0}
          className="w-full px-4 py-3 rounded-xl border
                     bg-gray-50 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     focus:ring-2 focus:ring-blue-500 outline-none
                     dark:text-gray-200 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={loading || remainingUses <= 0}
          className="w-full px-6 py-3 rounded-xl bg-blue-600
                     text-white font-semibold
                     hover:bg-blue-700 transition
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {remainingUses <= 0
            ? "Sign up/Login to continue"
            : loading
            ? "Shortening..."
            : "Shorten URL"}
        </button>

        {remainingUses <= 0 && (
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full px-6 py-3 rounded-xl bg-green-600
                       text-white font-semibold
                       hover:bg-green-700 transition"
          >
            Sign up/Login
          </button>
        )}
      </form>
    </motion.div>
  );
};

export default FreeUrlShortener;
