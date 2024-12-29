import mockPlayerData from "../assets/MOCK_PLAYER_DATA.json";
import BasicTable from "./BasicTable";

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

const PlayerBalancesTable = () => (
  <BasicTable
    headers={["Name", "UUID", "Balance", "Locked"]}
    rows={DataRows()}
  />
);

export default PlayerBalancesTable;
