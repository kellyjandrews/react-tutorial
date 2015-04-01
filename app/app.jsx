import React from 'react';
import TitleBar from './title-bar';
import DataTable from './datatable';
import Pagination from './pagination';


class DataGrid extends React.Component{
  render() {
    return (
      <div>
        <div className="row">
          <TitleBar />
        </div>
        <div className="dataTable">
          <DataTable />
        </div>
          <Pagination />
      </div>
    );
  }
};

React.render(<DataGrid />, document.getElementById('dataGrid'));
