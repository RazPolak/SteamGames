import { Button, Icon } from "antd";
import React, { Component } from "react";

class Likebtn extends Component {
  state = {
    isLiked: false
  };

  isLiked = props => {
    let currentGame = this.props.currentItem;
    let favorites = this.props.favorites;
    console.log("like Constructor", props);
    for (let index = 0; index < favorites.length; index++) {
      console.log(currentGame, favorites[index].title);
      if (currentGame === favorites[index].title) {
        this.state = {
          isLiked: true
        };
        break;
      } else {
        this.state = {
          isLiked: false
        };
      }
    }
  };

  render() {
    console.log("inside like ", this);
    this.isLiked(this.props);
    return (
      <Button
        type={this.state.isLiked ? "primary" : "dashed"}
        onClick={e => this.props.onClick(this.props)}
      >
        <Icon type="heart" theme="twoTone" />
      </Button>
    );
  }
}

export default Likebtn;
