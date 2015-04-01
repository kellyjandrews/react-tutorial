import React from 'react';

class TitleBar extends React.Component{
  render() {
    return (
      <div>
        <div className="col-md-6">
          <h2>My Contacts</h2>
        </div>
        <div className="col-md-6 searchBox">
          <input type="text" className="form-control pull-right" placeholder="Search" />
        </div>
      </div>
    );
  }
};

export default TitleBar;
