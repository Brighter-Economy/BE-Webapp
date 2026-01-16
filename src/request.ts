import { useToasts } from "react-bootstrap-toasts";
import { useNavigate } from "react-router";

export async function get<T>(
  url: string,
  onSuccess: (response: Response) => T
): Promise<T | undefined> {
  const headers = new Headers();
  addAuthHeader(headers);

  return fetch(url, { headers })
    .catch((reason) => {
      console.log(`Error making request to '${url}': ${reason}`);
      return undefined;
    })
    .then((response) => {
      if (response && response.ok) {
        return onSuccess(response);
      } else {
        handleErrors(response);
        return undefined;
      }
    });
}

function addAuthHeader(headers: Headers) {
  let user = localStorage.getItem("user");
  if (user) {
    headers.append("Authorization", `Basic ${user}`);
  }
}

function handleErrors(response: Response | undefined) {
  if (!response) {
    return;
  }
  const navigate = useNavigate();
  const toast = useToasts();
  const code = response.status;
  switch (code) {
    case 401: // Not authorized
      localStorage.removeItem("user");
      navigate("/login");
      toast.danger({
        headerContent: "Error",
        bodyContent: "You are not authenticated, please log in",
      });
      break;
    case 403: // No permission
      toast.warning({
        headerContent: "Warning",
        bodyContent: "You do not have permission to do that",
      });
  }
}
