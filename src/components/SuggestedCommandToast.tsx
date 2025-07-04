import { useState } from "react";
import { Button, ToastContainer } from "react-bootstrap";
import "./SuggestedCommandToast.css";
import Toast from "react-bootstrap/Toast";

function SuggestedCommandToast() {
  const [showImageToast, setShowImageToast] = useState(false);
  const toggleShowImageToast = () => setShowImageToast(!showImageToast);

  return (
    <>
      <Button onClick={toggleShowImageToast}>
        Toggle the Server Image Alert Toast
      </Button>
      <ToastContainer className="posititon-static" position="bottom-end">
        <Toast bg="danger" show={showImageToast} onClose={toggleShowImageToast}>
          <Toast.Header>
            <img src="src/assets/alert.png" className="toast-img me-2" />
            <strong className="me-auto">Missing Item Images or Names?</strong>
          </Toast.Header>
          <Toast.Body className="d-inline-flex">
            <div>
              Have you sent the client's data? Please execute{" "}
              <code className="toast-code">/be sendClientData</code> to resolve
              this error
            </div>
            <Button
              variant="secondary"
              className="justify-content-end"
              onClick={() =>
                navigator.clipboard.writeText("/be sendClientData")
              }
            >
              <i className="bi bi-clipboard-fill" />
            </Button>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default SuggestedCommandToast;
