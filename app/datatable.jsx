import React from 'react';

class DataTable extends React.Component{
  render() {
    var dataRows = this.props.rows.map(function (row, key){
      return(
        <tr key={key}>
          <td className="col-xs-6">{row.firstName}</td>
          <td className="col-xs-6">{row.lastName}</td>
        </tr>
      )
    });
    return (
      <table className="table table-fixed table-bordered">
        <thead>
          <tr>
            <th className="col-xs-6">First Name</th>
            <th className="col-xs-6">Last Name</th>
          </tr>
        </thead>
        <tbody>
          {dataRows}
        </tbody>
      </table>
    );
  }
};

export default DataTable;
