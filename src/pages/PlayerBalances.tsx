function PlayerBalances() {
  return (
    <>
      <div className="p-3">
        <table className="table table-dark table-hover rounded-2 overflow-hidden table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">UUID</th>
              <th scope="col">Balance</th>
              <th scope="col">Locked</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">MrNotCheaterMan5000</th>
              <td>1a929c7f-2b3f-4fc2-a55c-664610cfa0de</td>
              <td>$9999999</td>
              <td>True</td>
            </tr>
            <tr>
              <th scope="row">citizenlapis</th>
              <td>37f4e3a6-e4c3-47d6-8265-99d110eff1b5</td>
              <td>$321</td>
              <td>False</td>
            </tr>
            <tr>
              <th scope="row">smirkbucket</th>
              <td>9785db9e-5a3f-43a8-b578-a2af6d99d034</td>
              <td>$1537</td>
              <td>False</td>
            </tr>
            <tr>
              <th scope="row">capitalistsintense</th>
              <td>66e2ffe0-6b65-49ca-bdc7-745387b90c6d</td>
              <td>$13</td>
              <td>True</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PlayerBalances;
