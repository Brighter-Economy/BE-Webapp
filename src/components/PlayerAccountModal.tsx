import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface DataRowParameters {
  uuid: string;
  datetime: string;
  to: string;
  from: string;
  amount: string;
}

const DataRow: React.FC<DataRowParameters> = ({
  uuid,
  datetime,
  to,
  from,
  amount,
}) => (
  <tr>
    <th scope="row">
      <img
        className="rounded m-0 p-0"
        src={"https://mc-heads.net/avatar/" + uuid + "/24"}
      />
    </th>
    <th>{datetime}</th>
    <td>{to}</td>
    <td>{from}</td>
    <td>{amount}</td>
  </tr>
);

function PlayerAccountModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const uuid = "09cd3bc1-e1d5-4e08-8cb5-c7189ce7c082";
  const username = "CasualCynic";
  const balance = 919191;
  const locked = true;

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="mb-2"
        style={{
          backgroundColor: "#0d47a1",
          borderWidth: "0",
        }}
      >
        Player Account Modal Template
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
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
              <div className="input-group mb-2">
                <span className="input-group-text">Username</span>
                <input
                  type="input-group-text"
                  className="form-control"
                  disabled={true}
                  placeholder={username}
                />
              </div>
              <div className="d-flex mb-2">
                <div className="input-group me-2">
                  <span className="input-group-text">Balance</span>
                  <input
                    type="input-group-text"
                    className="form-control"
                    disabled={false}
                    placeholder={balance.toString()}
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
                    <th scope="col"></th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">To</th>
                    <th scope="col">From</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <DataRow
                    uuid="09cd3bc1-e1d5-4e08-8cb5-c7189ce7c082"
                    datetime="1735453443"
                    to="bright_spark"
                    from="CasualCynic"
                    amount="216"
                  />
                  <DataRow
                    uuid="09cd3bc1-e1d5-4e08-8cb5-c7189ce7c082"
                    datetime="1735457043"
                    to="bright_spark"
                    from="CasualCynic"
                    amount="572"
                  />
                  <DataRow
                    uuid="4adad317-d08b-412d-a75b-c2834386b088"
                    datetime="1735496643"
                    to="CasualCynic"
                    from="BrightSpark"
                    amount="1100"
                  />
                  <DataRow
                    uuid="09cd3bc1-e1d5-4e08-8cb5-c7189ce7c082"
                    datetime="1736058243"
                    to="bright_spark"
                    from="CasualCynic"
                    amount="612"
                  />
                  <DataRow
                    uuid="4adad317-d08b-412d-a75b-c2834386b088"
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
          <Button variant="danger" onClick={handleClose}>
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
    </>
  );
}

export default PlayerAccountModal;
