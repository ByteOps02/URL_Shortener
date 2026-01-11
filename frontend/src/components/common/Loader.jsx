import { motion } from "framer-motion";

const Loader = ({ fullScreen = false }) => (
  <div className={`flex justify-center items-center ${fullScreen ? "min-h-screen" : ""}`}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full"
    />
  </div>
);

export default Loader;
