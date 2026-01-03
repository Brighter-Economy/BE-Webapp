import { useNavigate } from "react-router-dom";

export function get<T>(
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
  const code = response.status;
  switch (code) {
    case 401: // Not authorized
      navigate("/login");
      // TODO: Display toast with not authenticated
      break;
    case 403: // No permission
    // TODO: Display toast with permission error
  }
}
