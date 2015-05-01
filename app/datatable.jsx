import React from 'react';

class DataTable extends React.Component{
  constructor(props){
    super(props)
  }

  static sortData(d,s) {
    var sortCol = Object.keys(s)[0];
    if (sortCol) {

    }

    var sorted = d.sort(function(a, b){
      if(a[sortCol] < b[sortCol]) return (s[sortCol] === "asc") ? -1 : 1;
      if(a[sortCol] > b[sortCol]) return (s[sortCol] === "asc") ? 1 : -1;
      return 0;
    })

    //console.log(d);
    return sorted;
  }

  handleClick(key,dir) {
    var sort = {};
    sort.sort = {};

    if (this.props.sort[key] !== dir) {
      sort.sort[key] = dir;
    }

    this.props.onChange(sort);
  }

  render() {

    var self = this;

    var order = this.props.cols.map(function(o) {
      return Object.keys(o)[0];
    });

    var width = 100/this.props.cols.length

    var dataRows = this.props.rows.map(function (row, key){
      return(
        <tr key={key}>
          {order.map(function(k) {
            return (
              <td key={k+"-"+key} width={width+"%"}>{row[k]}</td>
            )
          })}
        </tr>
      )
    });

    var dataHeaders = order.map(function(k,index) {

      var asc = "glyphicon glyphicon-triangle-top";
      var des = "glyphicon glyphicon-triangle-bottom";
      //console.log(self.props.sort);
      return (
        <th width={width+"%"} key={k} ref={k}>
          <div className="col-xs-11 row header">{self.props.cols[index][k]}</div>
          <div className="col-xs-1 pull-right text-right sorting">
            <i className={(self.props.sort[k] === "asc") ? asc + " on" : asc + " off"} onClick={self.handleClick.bind(self, k, "asc")} /><br />
            <i className={(self.props.sort[k] === "des") ? des + " on" : des + " off"} onClick={self.handleClick.bind(self, k, "des")} />
          </div>
        </th>
      )
    });

    return (
      <table className="table table-fixed table-bordered">
        <thead>
          <tr>
          {dataHeaders}
          </tr>
        </thead>
        <tbody>
          {dataRows}
        </tbody>
      </table>
    );
  }
};


DataTable.defaultProps = {
  sort: {}
}

export default DataTable;
