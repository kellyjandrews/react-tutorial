import React from 'react';
import TitleBar from './title-bar';
import DataTable from './datatable';
import Pagination from './pagination';

import jQuery from 'jquery';
global.jQuery = jQuery;
import bootstrap from 'bootstrap';

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
