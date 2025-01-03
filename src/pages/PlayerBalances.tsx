import PlayerBalancesTable from "../components/PlayerBalancesTable";

function PlayerBalances() {
  return (
    <>
      <div className="pt-3 ps-3 pe-3 d-flex">
        <h1 className="display-6 w-100">Player Information</h1>
        <div className="input-group input-group me-3">
          <input
            type="text"
            className="form-control"
            placeholder="User Search"
          />
          <span className="input-group-text" id="basic-addon2">
            <i className="bi bi-search" />
          </span>
        </div>
        <button type="button" className="btn btn-primary ms-auto">
          Refresh
        </button>
      </div>
      <div className="p-3">
        <PlayerBalancesTable />
      </div>
    </>
  );
}

export default PlayerBalances;
