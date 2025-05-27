import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 p-10">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-xl">Page Not Found</p>
      <button onClick={handleGoBack} className="btn btn-warning">Go Back</button>
    </div>
  );
}
