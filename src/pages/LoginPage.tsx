import { Button } from "react-bootstrap";

function LoginPage() {
  const serverIp: string = "smp.example.net";
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
              />
            </div>
            <div className="">
              <Button className="btn-lg w-100 mb-3">Login</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
