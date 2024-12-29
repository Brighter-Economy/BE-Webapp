import { useEffect, useState } from "react";
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

interface PlayerAccount {
  uuid: string;
  username: string;
  locked: boolean;
  money: number;
}

const PlayerBalancesTable = () => {
  const [playerAccounts, setPlayerAccounts] = useState<PlayerAccount[]>([]);

  const updatePlayerAccounts = async () => {
    const accountsJson = await fetch("/api/accounts").then((response) =>
      response.json()
    );
    setPlayerAccounts(accountsJson);
  };

  useEffect(() => {
    updatePlayerAccounts();
  }, []);

  const DataRows = () =>
    playerAccounts.map((element) => (
      <DataRow
        name={element.username}
        uuid={element.uuid}
        balance={element.money.toString()}
        locked={element.locked}
      />
    ));

  return (
    <BasicTable
      headers={["Name", "UUID", "Balance", "Locked"]}
      rows={DataRows()}
    />
  );
};

export default PlayerBalancesTable;
