import { useEffect, useState } from "react";
import BasicTable from "./BasicTable";
import PlayerAccountModal from "./PlayerAccountModal";

interface PlayerAccount {
  uuid: string;
  username: string;
  locked: boolean;
  money: number;
}

const emptyPlayerAccount = {
  uuid: "",
  username: "",
  locked: false,
  money: 0,
};

interface DataRowParameters {
  playerAccount: PlayerAccount;
  onClick: () => void;
}

const DataRow: React.FC<DataRowParameters> = ({ playerAccount, onClick }) => (
  <tr onClick={onClick}>
    <td>
      <img
        className="rounded m-0 p-0 me-2"
        src={"https://mc-heads.net/avatar/" + playerAccount.uuid + "/24"}
      />
      {playerAccount.username}
    </td>
    <td>{playerAccount.uuid}</td>
    <td>{playerAccount.money.toString()}</td>
    <td>
      <input
        className="form-check-input mx-auto ms-2"
        type="checkbox"
        role="switch"
        value=""
        disabled
        checked={playerAccount.locked}
      />
    </td>
  </tr>
);

const PlayerBalancesTable = () => {
  const [playerAccounts, setPlayerAccounts] = useState<PlayerAccount[]>([]);
  const [selectedPlayerAccount, setSelectedPlayerAccount] =
    useState<PlayerAccount>(emptyPlayerAccount);
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);

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
        key={element.uuid}
        playerAccount={element}
        onClick={() => {
          setSelectedPlayerAccount(element);
          setShouldShowModal(true);
        }}
      />
    ));

  return (
    <>
      <PlayerAccountModal
        shouldShow={() => shouldShowModal}
        onClose={() => setShouldShowModal(false)}
        playerAccount={() => selectedPlayerAccount}
      />
      <BasicTable
        headers={["Name", "UUID", "Balance", "Locked"]}
        rows={DataRows()}
      />
    </>
  );
};

export default PlayerBalancesTable;
