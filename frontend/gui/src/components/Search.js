import { Input } from "antd";
import React, { Component } from "react";

class Search extends Component {
  state = {};
  render() {
    return (
      <Input placeholder="Game Name" onPressEnter={this.props.onPressEnter} />
    );
  }
}

export default Search;
