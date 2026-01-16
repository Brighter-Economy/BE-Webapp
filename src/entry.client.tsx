import React, { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

async function enableMocking() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/server.ts");
    return worker.start({ onUnhandledRequest: "bypass" });
  }
}

enableMocking().then(() => {
  startTransition(() => {
    hydrateRoot(
      document,
      <React.StrictMode>
        <HydratedRouter />
      </React.StrictMode>
    );
  });
});
