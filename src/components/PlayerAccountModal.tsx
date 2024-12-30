import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface DataRowParameters {
  datetime: string;
  to: string;
  from: string;
  amount: string;
}

const DataRow: React.FC<DataRowParameters> = ({
  datetime,
  to,
  from,
  amount,
}) => (
  <tr>
    <td>{datetime}</td>
    <td>{to}</td>
    <td>{from}</td>
    <td>{amount}</td>
  </tr>
);

interface PlayerAccountModalParams {
  shouldShow: () => boolean;
  onClose: () => void;
  playerAccount: () => {
    uuid: string;
    username: string;
    money: number;
    locked: boolean;
  };
}

const PlayerAccountModal: React.FC<PlayerAccountModalParams> = ({
  shouldShow,
  onClose,
  playerAccount,
}) => {
  const { uuid, username, money, locked } = playerAccount();

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
          <img
            src={"https://mc-heads.net/body/" + uuid}
            className="p-2 rounded"
          />
          <div className="w-100 ms-2">
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
            <div className="d-flex">
              <h5 className="me-auto align-bottom">
                <i>Last 5 Transactions</i>
              </h5>
              <span className="ms-auto align-bottom text-secondary">
                <i>{uuid}</i>
              </span>
            </div>
            <table className="table table-dark table-hover rounded-2 overflow-hidden">
              <thead>
                <tr>
                  <th scope="col">Timestamp</th>
                  <th scope="col">To</th>
                  <th scope="col">From</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <DataRow
                  datetime="1735453443"
                  to="bright_spark"
                  from="CasualCynic"
                  amount="216"
                />
                <DataRow
                  datetime="1735457043"
                  to="bright_spark"
                  from="CasualCynic"
                  amount="572"
                />
                <DataRow
                  datetime="1735496643"
                  to="CasualCynic"
                  from="bright_spark"
                  amount="1100"
                />
                <DataRow
                  datetime="1736058243"
                  to="bright_spark"
                  from="CasualCynic"
                  amount="612"
                />
                <DataRow
                  datetime="1738131843"
                  to="CasualCynic"
                  from="bright_spark"
                  amount="516"
                />
              </tbody>
            </table>
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
          Understood
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlayerAccountModal;
