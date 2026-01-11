import BackButton from "../components/common/BackButton";

const NotFound = () => (
  <div className="p-10 text-center space-y-4">
    <h1 className="text-6xl font-bold">404</h1>
    <p>Page not found</p>
    <BackButton label="Go Back" />
  </div>
);

export default NotFound;