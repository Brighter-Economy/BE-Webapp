import React from "react";

interface BasicTableParams {
  headers: string[];
  rows: JSX.Element[];
}

const BasicTable: React.FC<BasicTableParams> = ({ headers, rows }) => (
  <table className="table table-dark table-hover rounded-2 overflow-hidden table-borderless">
    <thead>
      <tr>
        {headers.map((header) => (
          <th scope="col">{header}</th>
        ))}
      </tr>
    </thead>
    <tbody className="form-switch">{rows}</tbody>
  </table>
);

export default BasicTable;
