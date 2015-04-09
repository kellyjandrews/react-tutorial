import React from 'react';
import TitleBar from './title-bar';
import DataTable from './datatable';
import Pagination from './pagination';

import jQuery from 'jquery';
global.jQuery = jQuery;
import bootstrap from 'bootstrap';

import Data from '../data.js'

class DataGrid extends React.Component{
  constructor(props) {
    super(props);
    this.state = {data: props.data, displayCount: 10, page: 1};
  }
  paginationHandler() {
    console.log(this);
  }
  render() {
    return (
      <div>
        <div className="row">
          <TitleBar />
        </div>
        <div className="dataTable">
          <DataTable rows={this.state.data}/>
        </div>
          <Pagination
            count={this.state.data.length}
            page={this.state.page}
            displayCount={this.state.displayCount}
            callback={this.paginationHandler}
          />
      </div>
    );
  }
};

React.render(<DataGrid data={Data} />, document.getElementById('dataGrid'));
