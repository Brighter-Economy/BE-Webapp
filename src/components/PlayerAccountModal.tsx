import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { PlayerAccount, Transaction } from "./types";
import BasicTable from "./BasicTable";

interface DataRowParameters {
  transaction: Transaction;
}

const DataRow: React.FC<DataRowParameters> = ({ transaction }) => (
  <tr>
    <td>
      <i className="bi bi-arrow-left-right"></i>
      <span className="fst-italic">{" " + transaction.type}</span>
    </td>
    <td>{new Date(transaction.timestamp * 1000).toLocaleString()}</td>
    <td>{transaction.uuidTo}</td>
    <td>{transaction.uuidFrom}</td>
    <td>{transaction.money}</td>
  </tr>
);

interface PlayerAccountModalParams {
  shouldShow: () => boolean;
  onClose: () => void;
  playerAccount: () => PlayerAccount;
}

const PlayerAccountModal: React.FC<PlayerAccountModalParams> = ({
  shouldShow,
  onClose,
  playerAccount,
}) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>();

  const { uuid, username, money, locked } = playerAccount();

  const updateTransactions = async () => {
    const transactionsJson = await fetch(
      "/api/transactions/" + uuid + "?limit=5&sort=desc"
    ).then((response) => response.json());
    setTransactions(transactionsJson);
  };

  useEffect(() => {
    updateTransactions();
  }, [uuid]);

  const TransactionRows = () =>
    transactions?.map((transaction) => (
      <DataRow key={transaction.id} transaction={transaction} />
    )) ?? [];

  return (
    <Modal
      show={shouldShow()}
      onHide={onClose}
      backdrop="static"
      keyboard={true}
      className="modal-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="rounded shadow d-flex">
          <div className="w-100 ms-2">
            <div className="d-flex">
              <img
                src={"https://mc-heads.net/head/" + uuid}
                className="rounded pe-4"
              />
              <div className="my-auto">
                <div className="input-group mb-2">
                  <span className="input-group-text">UUID</span>
                  <input
                    type="input-group-text"
                    className="form-control"
                    disabled={true}
                    placeholder={uuid}
                  />
                </div>
                <div className="d-flex mb-2">
                  <div className="input-group">
                    <span className="input-group-text">Username</span>
                    <input
                      type="input-group-text"
                      className="form-control"
                      disabled={true}
                      placeholder={username}
                    />
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <div className="input-group me-2">
                    <span className="input-group-text">Balance</span>
                    <input
                      type="input-group-text"
                      className="form-control"
                      disabled={false}
                      placeholder={money.toString()}
                    />
                  </div>
                  <div className="input-group">
                    <div className="input-group-text">
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        value=""
                        checked={locked}
                      />
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Locked"
                      disabled={true}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    variant="primary"
                    className="w-100"
                    style={{ backgroundColor: "#0d47a1", borderWidth: "0" }}
                    onClick={() => navigate("/" + uuid)}
                  >
                    Open Player Details
                  </Button>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <h5 className="me-auto align-bottom">
                <i>Last 5 Transactions</i>
              </h5>
            </div>
            <BasicTable
              headers={["Type", "Timestamp", "To", "From", "Amount"]}
              rows={TransactionRows()}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          style={{
            backgroundColor: "#0d47a1",
            borderWidth: "0",
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlayerAccountModal;
