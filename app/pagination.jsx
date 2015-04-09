import React from 'react';

class Pagination extends React.Component{
  render() {
    return (
      <div className="well">
          <div className="row">
          <div className="col-md-6">
            <strong>1</strong> - <strong>2</strong> items
            <div className="btn-group itemOption">
              <button type="button" className="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">
                10 <span className="caret"></span>
              </button>&nbsp;items
              <ul className="dropdown-menu" role="menu">
                <li><a href="#">10</a></li>
                <li><a href="#">25</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="pageControls pull-right">
              <button className="btn btn-xs btn-default glyphicon glyphicon-triangle-left"></button>
              <div className="btn-group">
                <button type="button" className="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">
                  1 <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                </ul>
              </div>
              <button className="btn btn-xs btn-default glyphicon glyphicon-triangle-right"></button>
            </div>
          </div>
          <div className="clearfix"></div>
          </div>
      </div>
    );
  }
};

export default Pagination;
