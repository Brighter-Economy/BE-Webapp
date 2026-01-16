import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";
import "../css/styles.css";
import { ToastsProvider } from "react-bootstrap-toasts";
import Navbar from "./components/Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BE-Web Portal</title>
        <Meta />
        <Links />
      </head>
      <body style={{ backgroundColor: "#212121" }}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <ToastsProvider toastContainerProps={{ position: `bottom-end` }}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ToastsProvider>
  );
}

export function links() {
  return [
    {
      rel: "icon",
      type: "image/png",
      href: "src/assets/ShopBlockIcon_small.png",
    },
  ];
}

export function ErrorBoundary() {
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
