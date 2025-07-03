import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../css/styles.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import HomePage from "./pages/HomePage.tsx";
import PlayerDetails from "./pages/PlayerDetails.tsx";
import Auctions from "./pages/Auctions.tsx";
import Items from "./pages/Items.tsx";
import PlayerBalances from "./pages/PlayerBalances.tsx";
import ServerShops from "./pages/ServerShops.tsx";
import Settings from "./pages/Settings.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Kitty from "./pages/Kitty.tsx";
import LoginPage from "./pages/LoginPage.tsx";

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
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
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
        {
          path: "/kitty",
          element: <Kitty />,
        },
        {
          path: "/players/:uuid",
          Component: PlayerDetails,
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
