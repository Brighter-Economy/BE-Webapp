import { Outlet } from "react-router-dom";
import { ToastsProvider as BootstrapToastsProvider } from "react-bootstrap-toasts";
//components
import Navbar from "./components/Navbar";

function App() {
  return (
    <BootstrapToastsProvider toastContainerProps={{ position: `bottom-end` }}>
      <>
        <Navbar />
        <Outlet />
      </>
    </BootstrapToastsProvider>
  );
}

export default App;
