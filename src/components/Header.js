import React from 'react';
import Search from './Search';

class Header extends React.Component {
  render() {
    return (
      <div className="row header">
        <div className="header_left">
          <h3> Movie Catelog </h3>
        </div>

        <div className="header_center">
          <Search onChange={this.props.onChange}/>
        </div>

        <div className="header_right">
          <img src="img/user.png" alt="user_image"/> Alexander 
        </div>

        <div className="fix"></div>
      </div>
    );
  }
}

export default Header;
