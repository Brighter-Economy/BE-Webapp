import PlayerBalancesTable from "../components/PlayerBalancesTable";

function PlayerBalances() {
  return (
    <>
      <div className="pt-3 ps-3 pe-3 d-flex">
        <h1 className="display-6">Player Information</h1>
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
