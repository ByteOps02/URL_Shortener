import { useState } from "react";
import { createShortUrl } from "../../services/url.service";

const UrlForm = ({ onCreated }) => {
  const [originalUrl, setOriginalUrl] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await createShortUrl({ originalUrl });
    onCreated(res.data);
    setOriginalUrl("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Paste long URL..."
        className="flex-1 p-3 rounded-lg border dark:bg-gray-800"
        required
      />
      <button className="px-5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
        Shorten
      </button>
    </form>
  );
};

export default UrlForm;
