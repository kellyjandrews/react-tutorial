import React from 'react';
import TitleBar from './title-bar';
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

    this.handlePagination = this.handlePagination.bind(this);
    this.paginateData = this.paginateData.bind(this);
    this.getStartEnd = this.getStartEnd.bind(this);

    var startEnd = this.getStartEnd(props);

    this.state = {
      count: props.data.length,
      data: this.paginateData(startEnd.itemStart, startEnd.itemEnd),
      displayCount: props.displayCount,
      itemStart: startEnd.itemStart,
      itemEnd: startEnd.itemEnd,
      page: props.page,
      pageOptions: this.getPageOptions(props.data.length, props.displayCount)
    };
  }

  handlePagination(setting) {
    var nextState = _.assign({}, this.state, setting);

    if (nextState.displayCount != this.state.displayCount) {
      nextState.pageOptions = this.getPageOptions(this.props.data.length, nextState.displayCount);

      var that = this;
      nextState.pageOptions.every(function(option){
        if (that.state.itemStart < option * nextState.displayCount) {
          nextState.page = option;
          return false;
        } else {
          return true;
        }
      });
    }

    nextState = _.assign(nextState, this.getStartEnd(nextState));
    nextState.data = this.paginateData(nextState.itemStart, nextState.itemEnd);

    this.setState(nextState);
  }

  getStartEnd(state) {
    var highestItem = state.page * state.displayCount;
    var result = {};
    result.itemStart = ((state.page - 1) * state.displayCount) + 1;
    result.itemEnd = (highestItem <= this.props.data.length) ? highestItem : this.props.data.length;
    return result;
  }

  getPageOptions(count, displayCount) {
    var options = new Array(Math.ceil(count / displayCount));
    var i = 0;
    var a = options.length;
    while(i < a){
      options[i] = i+1;
      i++;
    }
    return options;
  }

  paginateData(start, end) {
    return this.props.data.slice(start - 1, end);
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
            count={this.state.count}
            page={this.state.page}
            displayCount={this.state.displayCount}
            itemStart = {this.state.itemStart}
            itemEnd = {this.state.itemEnd}
            pageOptions = {this.state.pageOptions}
            displayCountOptions = {this.props.displayCountOptions}
            onChange={this.handlePagination}
          />
      </div>
    );
  }
};

DataGrid.defaultProps = {
  displayCount: 10,
  page: 1,
  displayCountOptions : [10,25],
}

React.render(<DataGrid data={Data} />, document.getElementById('dataGrid'));
