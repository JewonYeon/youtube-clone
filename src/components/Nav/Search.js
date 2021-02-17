import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: ''
    }
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  handleChangeSearch(e) {
    this.setState({ queryString: e.target.value })
  }

  render() {
    return (
      <div className="searchBarAll">
        <input className="searchInput" type="text" placeholder="검색" onChange={this.handleChangeSearch} />
        <button className="searchBtn" onClick={() => this.props.handleButtonClick(this.state.queryString)}>
          <i class="fas fa-search"></i>
        </button>
        <i class="fas fa-microphone"></i>
      </div>
    );
  }
}

export default Search;