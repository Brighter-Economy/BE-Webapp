import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { PlayerAccount, Transaction } from "./types";
import BasicTable from "./BasicTable";
import ErrorPage from "../pages/ErrorPage";

interface DataRowParameters {
  transaction: Transaction;
}

interface TypeDisplayParameters {
  typeName: string;
}

const TypeDisplay: React.FC<TypeDisplayParameters> = ({ typeName }) => {
  if (typeName === "MODIFY") {
    return (
      <>
        <i className="bi bi-pencil-fill" />
        <span className="fst-italic">{" MODIFY"}</span>
      </>
    );
  } else if (typeName === "TRANSFER") {
    return (
      <>
        <i className="bi bi-arrow-left-right" />
        <span className="fst-italic">{" TRANSFER"}</span>
      </>
    );
  } else if (typeName === "PURCHASE") {
    return (
      <>
        <i className="bi bi-bank2" />
        <span className="fst-italic">{" PURCHASE"}</span>
      </>
    );
  }
};

const DataRow: React.FC<DataRowParameters> = ({ transaction }) => {
  if (transaction.nameFrom) {
    return (
      <tr>
        <td>
          <TypeDisplay typeName={transaction.type} />
        </td>
        <td>{new Date(transaction.timestamp * 1000).toLocaleString()}</td>
        <td>{transaction.nameFrom}</td>
        <td>{transaction.nameTo}</td>

        <td>{transaction.money}</td>
      </tr>
    );
  } else {
    return (
      <tr className="table-warning">
        <td>
          <TypeDisplay typeName={transaction.type} />
        </td>
        <td>{new Date(transaction.timestamp * 1000).toLocaleString()}</td>
        <td>{transaction.nameTo}</td>
        <td>
          <span className="fst-italic">{"SERVER"}</span>
        </td>
        <td>{transaction.money}</td>
      </tr>
    );
  }
};

interface PlayerAccountModalParams {
  shouldShow: () => boolean;
  onClose: () => void;
  playerAccount: () => PlayerAccount | null;
}

const PlayerAccountModal: React.FC<PlayerAccountModalParams> = ({
  shouldShow,
  onClose,
  playerAccount,
}) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>();

  const account = playerAccount();

  const updateTransactions = async () => {
    if (account?.uuid) {
      const transactionsJson = await fetch(
        `/api/accounts/${account!!.uuid}/transactions?limit=5&sort=desc`
      ).then((response) => response.json());
      setTransactions(transactionsJson);
    } else {
      setTransactions([]);
    }
  };

  const handleUUIDRedirect = (uuid: string) => {
    fetch("/api/accounts/" + uuid)
      .catch((err) => {
        console.log(err);
        return <ErrorPage />;
      })
      .then((response) => {
        console.log(response);
        navigate("/players/" + uuid);
      });
  };

  useEffect(() => {
    updateTransactions();
  }, [account]);

  const TransactionRows = () =>
    transactions?.map((transaction) => (
      <DataRow key={transaction.id} transaction={transaction} />
    )) ?? [];

  const onModalClose = () => {
    onClose();
    setTransactions(undefined);
  };

  return (
    <Modal
      show={shouldShow()}
      onHide={onModalClose}
      backdrop="static"
      keyboard={true}
      className="modal-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{account?.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="rounded shadow d-flex">
          <div className="w-100 ms-2">
            <div className="d-flex">
              <img
                src={"https://mc-heads.net/head/" + account?.uuid}
                className="rounded pe-4"
              />
              <div className="my-auto">
                <div
                  className="input-group mb-2"
                  onClick={() => {
                    if (account) {
                      navigator.clipboard.writeText(account!!.uuid);
                    }
                  }}
                >
                  <span className="input-group-text">UUID</span>
                  <input
                    type="input-group-text"
                    className="form-control"
                    disabled={true}
                    placeholder={account?.uuid}
                  />
                  <span className="input-group-text">
                    <i className="bi bi-clipboard2" />
                  </span>
                </div>
                <div
                  className="d-flex mb-2"
                  onClick={() => {
                    if (account) {
                      navigator.clipboard.writeText(account!!.username);
                    }
                  }}
                >
                  <div className="input-group">
                    <span className="input-group-text">Username</span>
                    <input
                      type="input-group-text"
                      className="form-control"
                      disabled={true}
                      placeholder={account?.username}
                    />
                    <span className="input-group-text">
                      <i className="bi bi-clipboard2" />
                    </span>
                  </div>
                </div>
                <div className="d-flex mb-2">
                  <div
                    className="input-group me-2"
                    onClick={() => {
                      if (account) {
                        navigator.clipboard.writeText(
                          account!!.money.toString()
                        );
                      }
                    }}
                  >
                    <span className="input-group-text">Balance</span>
                    <input
                      type="input-group-text"
                      className="form-control"
                      disabled={false}
                      placeholder={account?.money.toString()}
                    />
                    <span className="input-group-text">
                      <i className="bi bi-clipboard2" />
                    </span>
                  </div>
                  <div className="input-group">
                    <div className="input-group-text">
                      <input
                        className="form-check-input mt-0"
                        type="checkbox"
                        value=""
                        checked={account?.locked}
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
                    onClick={() => {
                      if (account) {
                        handleUUIDRedirect(account!!.uuid);
                      }
                    }}
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
              headers={["Type", "Timestamp", "From", "To", "Amount"]}
              rows={TransactionRows()}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onModalClose}>
          Close
        </Button>
        <Button variant="primary">Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlayerAccountModal;
