import { useEffect, useState } from "react";
import BasicTable from "./BasicTable";
import PlayerAccountModal from "./PlayerAccountModal";
import { PlayerAccount } from "./types";

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

interface PlayerBalancesTableProps {
  searchQuery: string;
  isLocked: boolean;
}

const PlayerBalancesTable: React.FC<PlayerBalancesTableProps> = ({
  searchQuery,
  isLocked,
}) => {
  const [playerAccounts, setPlayerAccounts] = useState<PlayerAccount[]>([]);
  const [selectedPlayerAccount, setSelectedPlayerAccount] =
    useState<PlayerAccount | null>(null);
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

  const filteredPlayerAccounts = playerAccounts.filter((account) => {
    const matchesSearch = account.username
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase());
    const matchesLocked = !isLocked || account.locked;

    return matchesSearch && matchesLocked;
  });

  const DataRows = () =>
    filteredPlayerAccounts.map((element) => (
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
        onClose={() => {
          setShouldShowModal(false);
          setTimeout(() => setSelectedPlayerAccount(null), 150);
        }}
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
