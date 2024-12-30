import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <img
        src="https://http.cat/404"
        className="rounded-4 mx-auto d-block mt-5 shadow"
      />
      <button
        onClick={handleGoBack}
        className="btn btn-danger mx-auto d-block mt-5 shadow"
        type="button"
      >
        Go Back From Whence Thy Came!!
      </button>
    </div>
  );
}

export default ErrorPage;
