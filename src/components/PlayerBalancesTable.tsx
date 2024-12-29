import mockPlayerData from "../assets/MOCK_PLAYER_DATA.json";

interface DataRowParameters {
  name: string;
  uuid: string;
  balance: string;
  locked: boolean;
}

const DataRow: React.FC<DataRowParameters> = ({
  name,
  uuid,
  balance,
  locked,
}) => (
  <tr>
    <th scope="row">{name}</th>
    <td>{uuid}</td>
    <td>{balance}</td>
    <td>
      <input
        className="form-check-input mx-auto"
        type="checkbox"
        role="switch"
        value=""
        disabled
        checked={locked}
      />
    </td>
  </tr>
);

const DataRows = () =>
  mockPlayerData.map((element) => {
    return (
      <DataRow
        name={element.username}
        uuid={element.uuid}
        balance={element.money.toString()}
        locked={element.locked}
      />
    );
  });

function PlayerBalancesTable() {
  return (
    <>
      <table className="table table-dark table-hover rounded-2 overflow-hidden table-borderless">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">UUID</th>
            <th scope="col">Balance</th>
            <th scope="col">Locked</th>
          </tr>
        </thead>
        <tbody className="form-switch">
          <DataRows />
        </tbody>
      </table>
    </>
  );
}

export default PlayerBalancesTable;
