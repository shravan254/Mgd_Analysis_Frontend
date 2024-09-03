import React from "react";
import Table from "react-bootstrap/Table";
// import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// import "../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

const Tables = ({ theadData, tbodyData }) => {
  console.log("inside table", theadData);
  console.log("inside table", tbodyData);
  return (
    <Table striped className="table-data border">
      <thead className="tableHeaderBGColor">
        <tr>
          {theadData.map((heading) => {
            return <th key={heading}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((row, index) => {
          return (
            <tr key={index}>
              {theadData.map((key, index) => {
                return <td key={row[key]}>{row[key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
    // <BootstrapTable data={tbodyData} />
    // <div>
    //   <h1>hello</h1>
    // </div>
  );
};

export default Tables;
