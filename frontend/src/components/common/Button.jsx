import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary:
    "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const Button = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      disabled={disabled}
      className={`
        px-5 py-2.5 rounded-xl font-semibold transition
        focus:outline-none focus:ring-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
