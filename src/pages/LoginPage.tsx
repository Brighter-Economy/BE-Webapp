import { useState } from "react";
import { Button } from "react-bootstrap";
import { get } from "../request";
import { useToasts } from "react-bootstrap-toasts";
import { UserAuthInfo } from "../components/types";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const serverIp: string = "smp.example.net";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex-row align-items-center mt-5">
        <div
          className="container rounded-4 shadow-lg border border-4 border-primary"
          style={{ width: 500 }}
        >
          <h1 className="display-3 text-center">Login</h1>
          <div className="">
            <img className="img-fluid" src="src/assets/ShopBlockIcon.png" />
          </div>
          <p className="fst-italic fs-5 text-secondary text-center">
            Server IP: {serverIp}
          </p>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              User
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Minecraft Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">
                Password
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="BrighterEconomy Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="">
              <Button
                className="btn-lg w-100 mb-3"
                onClick={() => auth(username, password)}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

async function auth(username: string, password: string) {
  const navigate = useNavigate();
  const toasts = useToasts();
  //Login Logic here
  let authString: string = Buffer.from(username + "=" + password).toString(
    "base64"
  );
  localStorage.setItem("user", authString);

  let r = await get("/user-info", (response) => response.json());
  if (!r) {
    toasts.show({
      headerContent: "Incorrect Username or Password",
      bodyContent:
        "Make sure you're using the correct username and set your password in game",
      toastProps: {
        bg: "warning",
      },
    });
    localStorage.removeItem("user");
  } else
    switch (r.type) {
      case "PLAYER":
        navigate(`/players/${r.uuid}`);
        break;
      case "ADMIN":
        navigate("/players");
        break;
    }
  console.log(username + ": " + password);
  console.log(authString);
}

export default LoginPage;
