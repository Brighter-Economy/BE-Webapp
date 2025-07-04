import { useState } from "react";
import { Button, ToastContainer } from "react-bootstrap";
import "./ItemToolTip.css";
import "./SuggestedCommandToast.css";
import Toast from "react-bootstrap/Toast";

function SuggestedCommandToast() {
  const [showImageToast, setShowImageToast] = useState(false);
  const toggleShowImageToast = () => setShowImageToast(!showImageToast);
  const [showLocalToast, setShowLocalToast] = useState(false);
  const toggleShowLocalToast = () => setShowLocalToast(!showLocalToast);

  return (
    <>
      <Button onClick={toggleShowImageToast}>
        Toggle the Server Image Alert Toast
      </Button>
      <Button onClick={toggleShowLocalToast}>
        Toggle the Server Localization Alert Toast
      </Button>
      <ToastContainer className="posititon-static" position="bottom-end">
        <Toast show={showImageToast} onClose={toggleShowImageToast}>
          <Toast.Header className="toast-header">
            <img src="src/assets/alert.png" className="toast-img me-2" />
            <strong className="me-auto">Missing Item Images?</strong>
          </Toast.Header>
          <Toast.Body>
            Have you sent the client's data? Please execute{" "}
            <code>/be sendCLientData</code> to resolve this error
          </Toast.Body>
        </Toast>
        <Toast show={showLocalToast} onClose={toggleShowLocalToast}>
          <Toast.Header className="toast-header">
            <img src="src/assets/alert.png" className="toast-img me-2" />
            <strong className="me-auto">
              Missing Item Localization Names?
            </strong>
          </Toast.Header>
          <Toast.Body>
            Have you sent the client's data? Please execute{" "}
            <code>/be sendCLientData</code> to resolve this error.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default SuggestedCommandToast;
