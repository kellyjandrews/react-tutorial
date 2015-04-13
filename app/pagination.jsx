import React from 'react';

class Pagination extends React.Component{
  constructor(props) {
    super(props);
    this.state = this.buttonStates(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.buttonStates(nextProps));
  }

  buttonStates(props) {
    var buttonStates = {prev: true, next: true};
    if (props.page === props.pageOptions[0]) {
      buttonStates.prev = false;
    }

    if (props.page === props.pageOptions[props.pageOptions.length - 1]) {
      buttonStates.next = false;
    }

    return buttonStates;
  }

  updateSettings(type, value) {
    var setting = {};
    setting[type] = value
    this.props.onChange(setting);
  }

  render() {
    return (
      <div className="well">
          <div className="row">
          <div className="col-md-6">
            <strong>{this.props.itemStart}</strong> - <strong>{this.props.itemEnd}</strong> items out of <strong>{this.props.count}</strong>
          </div>
          <div className="col-md-6">
            <div className="pageControls pull-right">
              <button className="btn btn-xs btn-default glyphicon glyphicon-triangle-left" onClick={this.updateSettings.bind(this,"page",this.props.page - 1)} disabled={!this.state.prev} />
              <DropDownMenu value={this.props.page} options={this.props.pageOptions} ref="page" onChange={this.updateSettings.bind(this, "page")} />
              <button className="btn btn-xs btn-default glyphicon glyphicon-triangle-right" onClick={this.updateSettings.bind(this,"page", this.props.page + 1)} disabled={!this.state.next} />
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

class DropDownMenu extends React.Component {
  handleClick(key) {
    this.props.onChange(this.props.options[key]);
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
          {this.props.value} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" role="menu">
          {optionList}
        </ul>
      </div>
    );
  }
};

export default Pagination;
