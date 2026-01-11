import { motion } from "framer-motion";

const Input = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <motion.input
        whileFocus={{ scale: 1.01 }}
        className={`
          w-full px-4 py-2.5 rounded-xl border
          bg-white dark:bg-gray-700
          border-gray-300 dark:border-gray-600
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          outline-none transition
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
