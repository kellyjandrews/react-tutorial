import React from 'react';

class SearchBox extends React.Component{
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    this.props.onChange({searchTerm: e.target.value});
  }

  static filterData(data,filter) {
    return (
      data.filter(function(o) {
        return (
          Object.keys(o).some(function(v, i) {
            return o[v].includes(filter.toLowerCase());
          })
        )
      })
    );
  }

  render() {
    return (
      <span>
        <input type="text" className="form-control pull-right" placeholder="Search" onChange={this.handleKeyPress} value={this.props.searchTerm} />
      </span>
    );
  }

};

export default SearchBox;
