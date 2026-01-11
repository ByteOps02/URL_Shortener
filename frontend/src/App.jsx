import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
