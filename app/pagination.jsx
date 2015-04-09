import React from 'react';

class Pagination extends React.Component{
  constructor(props) {
    super(props);
    var pageOptions = function() {
      var result = new Array(Math.ceil(props.count / props.displayCount));
      var i = 0;
      var a = result.length;
      while(i < a){
        result[i] = i+1;
        i++;
      }
      return result;
    }();
    console.log(pageOptions);
    this.state = {
      itemStart: ((props.page - 1) * props.displayCount) + 1,
      itemEnd: props.page * props.displayCount,
      pageOptions: pageOptions
    }
  }
  updatePage(page) {
    this.props.callback({"page": page});
  }
  render() {
    return (
      <div className="well">
          <div className="row">
          <div className="col-md-6">
            <strong>{this.state.itemStart}</strong> - <strong>{this.state.itemEnd}</strong> items out of <strong>{this.props.count}</strong>
          </div>
          <div className="col-md-6">
            <div className="pageControls pull-right">
              <button className="btn btn-xs btn-default glyphicon glyphicon-triangle-left"></button>
              <DropDownMenu value={this.props.page} options={this.state.pageOptions} callback={this.updatePage} />
              <button className="btn btn-xs btn-default glyphicon glyphicon-triangle-right"></button>
            </div>
            <div className="itemOption pull-right">
              <DropDownMenu value={this.props.displayCount} options={[10,25]} />
            </div>
          </div>
          <div className="clearfix"></div>
          </div>
      </div>
    );
  }
};

class DropDownMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {currentValue: this.props.value};
  }
  handleClick(i) {
    this.props.callback(this.props.options[i]);
  }
  render() {
    var optionList = this.props.options.map( function (option, key) {
      return (
        <li key={key}><a onClick={this.handleClick.bind(this, key)} >{option}</a></li>
      )
    }, this)
    return(
      <div className="btn-group">
        <button type="button" className="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">
          {this.state.currentValue} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" role="menu">
          {optionList}
        </ul>
      </div>
    );
  }
};

// <button type="button" className="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">
//   {this.props.displayCount} <span className="caret"></span>
// </button>&nbsp;items/page&nbsp;&nbsp;&nbsp;|&nbsp;
// <ul className="dropdown-menu" role="menu">
//   <li><a href="#">10</a></li>
//   <li><a href="#">25</a></li>
// </ul>
// </div>

export default Pagination;
