import { useState } from "react";
import PlayerBalancesTable from "../components/PlayerBalancesTable";

function PlayerBalances() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  return (
    <>
      <div className="pt-3 ps-3 pe-3 d-flex">
        <div className="container-fluid">
          <h1 className="display-6 w-100">Player Information</h1>
          <div className="form-check form-switch me-3 w-100">
            <input
              type="checkbox"
              className="form-check-input"
              id="lockedFilter"
              checked={isLocked}
              onChange={(e) => setIsLocked(e.target.checked)}
            />
            <span>Show Locked Accounts</span>
          </div>
        </div>
        <div className="d-flex ms-3 my-auto container-fluid">
          <div
            className="input-group input-group ms-auto me-3"
            style={{ height: 50 }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="User Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="input-group-text" id="basic-addon2">
              <i className="bi bi-search" />
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary ms-auto"
            style={{
              backgroundColor: "#0d47a1",
              borderWidth: "0",
              height: 50,
            }}
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="p-3">
        <PlayerBalancesTable searchQuery={searchQuery} isLocked={isLocked} />
      </div>
    </>
  );
}

export default PlayerBalances;
