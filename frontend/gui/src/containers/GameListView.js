import React from "react";

import Games from "../components/Game";

class GameList extends React.Component {
  render() {
    return (
      <Games
        data={this.props.data}
        onClick={this.props.onClick}
        favorites={this.props.favorites}
      />
    );
  }
}

export default GameList;
