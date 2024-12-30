import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import TestPage from "./pages/TestPage.tsx";
import Auctions from "./pages/Auctions.tsx";
import Items from "./pages/Items.tsx";
import PlayerBalances from "./pages/PlayerBalances.tsx";
import ServerShops from "./pages/ServerShops.tsx";
import Settings from "./pages/Settings.tsx";

async function enableMocking() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/server.ts");
    return worker.start({ onUnhandledRequest: "bypass" });
  }
}

enableMocking().then(() => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: (
        <img
          src="https://http.cat/404"
          className="rounded mx-auto d-block mt-5"
        />
      ),
      children: [
        {
          path: "/",
          element: <TestPage />,
        },
        {
          path: "/auctions",
          element: <Auctions />,
        },
        {
          path: "/items",
          element: <Items />,
        },
        {
          path: "/players",
          element: <PlayerBalances />,
        },
        {
          path: "/servershops",
          element: <ServerShops />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
