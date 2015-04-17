import React from 'react';
import SearchBox from './searchbox';
import DataTable from './datatable';
import Pagination from './pagination';
import _ from 'lodash';

import jQuery from 'jquery';
global.jQuery = jQuery;
import bootstrap from 'bootstrap';

import Data from '../data.js'

class DataGrid extends React.Component{
  constructor(props) {
    super(props);

    this.handleData = this.handleData.bind(this);

    this.state = {
      page: this.props.page,
      displayCount: this.props.displayCount,
      searchTerm: props.searchTerm
    };

  }

  handleData(setting) {
    this.setState(setting);
  }

  render() {

    var filteredData = SearchBox.filterData(this.props.data, this.state.searchTerm);
    var paginated = Pagination.pageData(filteredData, this.state);

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>My Contacts</h2>
          </div>
          <div className="col-md-6 searchBox">
            <SearchBox onChange={this.handleData} searchTerm={this.state.searchTerm} />
          </div>
        </div>
        <div className="dataTable">
          <DataTable rows={paginated.paginatedData}/>
        </div>
          <Pagination
            paginatedProps={paginated.paginatedProps}
            onChange={this.setState}
          />
      </div>
    );
  }
};

DataGrid.defaultProps = {
  data: [],
  displayCount: 10,
  page: 1,
  searchTerm: ""
}

React.render(<DataGrid data={Data} />, document.getElementById('dataGrid'));
