import React from 'react';
import SearchBox from './searchbox';
import DataTable from './datatable';
import Pagination from './pagination';
import _ from 'lodash';
global._ = _;
import jQuery from 'jquery';
global.jQuery = jQuery;
import bootstrap from 'bootstrap';



import Data from '../data.js'

class DataGrid extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      page: props.page,
      displayCount: props.displayCount,
      searchTerm: props.searchTerm,
      sort: props.sort
    };

  }

  render() {
    console.log("rendering");

    var filteredData = SearchBox.filterData(this.props.data, this.state.searchTerm);
    var sortedData = DataTable.sortData(filteredData, this.state.sort);
    var paginated = Pagination.pageData(sortedData, this.state);

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>My Contacts</h2>
          </div>
          <div className="col-md-6 searchBox">
            <SearchBox onChange={this.setState.bind(this)} searchTerm={this.state.searchTerm} />
          </div>
        </div>
        <div className="dataTable">
          <DataTable
            rows={paginated.paginatedData}
            cols={[{"lastName":"Last Name"},{"city":"City"}]}
            onChange={this.setState.bind(this)}
            sort={this.state.sort}
          />
        </div>
          <Pagination
            paginatedProps={paginated.paginatedProps}
            onChange={this.setState.bind(this)}
          />
      </div>
    );
  }
};

DataGrid.defaultProps = {
  data: [],
  displayCount: 10,
  page: 1,
  searchTerm: "",
  sort: {}
}

React.render(<DataGrid data={Data} />, document.getElementById('dataGrid'));
