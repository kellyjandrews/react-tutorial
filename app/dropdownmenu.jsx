import React from 'react';

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

export default DropDownMenu;
