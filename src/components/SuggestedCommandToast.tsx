import { Button } from "react-bootstrap";
//import "./SuggestedCommandToast.css";
import { useToasts } from "react-bootstrap-toasts";

function SuggestedCommandToast() {
  const toasts = useToasts();

  return (
    <>
      <Button
        onClick={() =>
          toasts.show({
            headerContent: "This is a Test",
            bodyContent: "Toast body content.",
            toastProps: {
              bg: "secondary",
            },
          })
        }
      >
        Toggle the Server Image Alert Toast
      </Button>
    </>
  );
}

export default SuggestedCommandToast;
