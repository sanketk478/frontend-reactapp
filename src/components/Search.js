import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <form>
        <input className="search_box" type='text' placeholder="search Movies" onChange={this.props.onChange} />
      </form>
    );
  }
}

export default Search;
