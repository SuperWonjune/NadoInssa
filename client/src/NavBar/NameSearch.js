import React from 'react';

class NameSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSearch(event) {
    window.location =  '/' + this.state.value;
  }

  handleKeyPress(event) {
    if(event.keyCode===13){
      window.location =  '/' + this.state.value;
    } 
  }

  render() {
    return (
      <div className="form-inline">
      <input
            type="search"
            onKeyDown={this.handleKeyPress}
            className="form-control mr-sm-2"
            placeholder="검색"
            value={this.state.value}
            onChange={this.handleChange} 
        />
        <button onClick={() => {this.handleSearch()}} 
                className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
       </div>
    );
  }
}

export default NameSearch;