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
    this.state = {data: props.data};
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
          <Pagination />
      </div>
    );
  }
};

React.render(<DataGrid data={Data} />, document.getElementById('dataGrid'));
