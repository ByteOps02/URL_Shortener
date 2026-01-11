import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back", onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      ← {label}
    </button>
  );
};

export default BackButton;
