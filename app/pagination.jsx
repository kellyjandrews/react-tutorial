import React from 'react';
import DropDownMenu from './dropdownmenu';

class Pagination extends React.Component{
  constructor(props) {
    super(props);
  }

  updateSettings(type, value) {
    var setting = {};
    setting[type] = value
    this.props.onChange(setting);
  }

  static pageData(o) {
    let requires = ['data', 'page', 'displayCount'];
    if (!requires.every(function(p) { return p in o; })) {
      throw new Error("Pagination.pageData() expects an object with the properties 'data', 'page', 'displayCount'. Ensure the proper data is being passed.");
    }

    return new PagedData(o);

  }

  static getCurrentPage(next, last) {
    let page = next.page;
    let requires = ['data', 'page', 'displayCount'];
    if (!requires.every(function(p) { return p in next; }) ||
        !requires.every(function(p) { return p in last; })
       ) {
      throw new Error("Pagination.currentPage() expects two objects with the properties 'data', 'page', 'displayCount'. Ensure the proper data is being passed.");
    }

    if (next.data.length != last.data.length) {
      page = 1;
    }
    if (next.displayCount != last.displayCount) {
      let currStart = PagedData.getStart(last.data.length, last.page, last.displayCount);
      var i = 1;
      while(currStart > i*next.displayCount) { i++; };
      page = i;
    }

    return page
  }

  render() {
    var prev = this.props.page === this.props.paginatedProps.pageOptions[0];
    var next = this.props.page === this.props.paginatedProps.pageOptions[this.props.paginatedProps.pageOptions.length - 1];
    return (
      <div className="well">
          <div className="row">
          <div className="col-md-6">
            <strong>{this.props.paginatedProps.itemStart}</strong> - <strong>{this.props.paginatedProps.itemEnd}</strong> items out of <strong>{this.props.paginatedProps.total}</strong>
          </div>
          <div className="col-md-6">
            <div className="pageControls pull-right">
              <button className="btn btn-xs btn-default glyphicon glyphicon-triangle-left" onClick={this.updateSettings.bind(this,"page",this.props.page - 1)} disabled={prev} />
              <DropDownMenu value={this.props.page} options={this.props.paginatedProps.pageOptions} ref="page" onChange={this.updateSettings.bind(this, "page")} />
              <button className="btn btn-xs btn-default glyphicon glyphicon-triangle-right" onClick={this.updateSettings.bind(this,"page", this.props.page + 1)} disabled={next} />
            </div>
            <div className="itemOption pull-right">
              <DropDownMenu value={this.props.displayCount} options={this.props.displayCountOptions} ref="displayCount" onChange={this.updateSettings.bind(this, "displayCount")} />
            </div>
          </div>
          <div className="clearfix"></div>
          </div>
      </div>
    );
  }
};

Pagination.defaultProps = {
  displayCountOptions : [10,25]
}

class PagedData {
  constructor(o) {
    var r = {paginatedProps:{}, paginatedData:[]};

    r.paginatedProps.total = o.data.length;
    r.paginatedProps.itemStart = PagedData.getStart(r.paginatedProps.total, o.page, o.displayCount);
    r.paginatedProps.itemEnd = PagedData.getEnd(r.paginatedProps.total, o.page, o.displayCount);
    r.paginatedProps.pageOptions = PagedData.getPageOptions(r.paginatedProps.total, o.displayCount);
    r.paginatedData = PagedData.splitData(o.data, r.paginatedProps.itemStart, r.paginatedProps.itemEnd);

    return Object.freeze(r);
  }
  static splitData(d, s, e) {
    return d.slice(s - 1, e);
  }
  static getStart(c, p, d) {
    return (c > 0) ? ((p - 1) * d) + 1 : 0;
  }
  static getEnd(c, p, d) {
    var h = p * d;
    return (h <= c) ? h : c;
  }
  static getPageOptions(c, d) {
    var o = new Array(Math.ceil(c / d));
    var i = 0;
    var a = o.length;
    while(i < a){
      o[i] = i+1;
      i++;
    }
    return o;
  }
}

export default Pagination;
