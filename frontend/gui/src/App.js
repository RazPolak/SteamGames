import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { createBrowserHistory } from "history";

import CustomLayout from "./containers/Layout";
import GameList from "./containers/GameListView";
import Search from "./components/Search";
import Register from "./components/Register";
import Login from "./components/Login";

const cookies = new Cookies();
const customHistory = createBrowserHistory();

class App extends Component {
  state = {
    games: [],
    favorites: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/games/").then(res => {
      this.setState({
        games: res.data
      });
      console.log("Inside compoDidMount");
    });

    if (cookies.get("jwt_access") != null) {
      this.getFavorites();
    }
  }
  render() {
    return (
      <Router history={customHistory}>
        <Route exact={true} path="/" render={() => <this.home />} />
        <Route exact={true} path="/register" render={() => <this.register />} />
        <Route exact={true} path="/signin" render={() => <this.signIn />} />
        <Route
          exact={true}
          path="/favorites"
          render={() => <this.favorites />}
        />
      </Router>
    );
  }

  signIn = () => {
    return (
      <div className="App">
        <CustomLayout>
          <Login onSubmit={this.loginHandler} />
        </CustomLayout>
      </div>
    );
  };

  loginHandler = values => {
    const username = values.userName;
    const password = values.password;
    axios
      .post("http://localhost:8000/api/accounts/token/", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res.data.access);
        const jwt_access = res.data.access;
        const jwt_refresh = res.data.refresh;

        cookies.set("jwt_access", jwt_access);
        cookies.set("jwt_refresh", jwt_refresh);

        console.log(this.props.history);
      })
      .then(() => {
        this.getFavorites();
      })
      .catch(err => {
        console.log(err);
      });
  };

  register = () => {
    return (
      <div className="App">
        <CustomLayout>
          <Register onSubmit={this.submitForm} />
        </CustomLayout>
      </div>
    );
  };

  submitForm = values => {
    const email = values.email;
    const username = values.nickname;
    const password = values.password;
    console.log(email, username, password);

    axios
      .post("http://127.0.0.1:8000/api/accounts/register/", {
        email: email,
        username: username,
        password: password
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  home = () => {
    console.log("home", this.state);
    return (
      <div className="App">
        <CustomLayout>
          <Search onPressEnter={this.searchHandler} />
          <GameList
            data={this.state.games}
            onClick={this.likeHandler}
            favorites={this.state.favorites}
          />
        </CustomLayout>
      </div>
    );
  };

  searchHandler = props => {
    console.log("inside onSearch", props.target.value);
    axios
      .get("http://127.0.0.1:8000/api/games/", {
        params: {
          title: props.target.value
        }
      })
      .then(res => {
        this.setState({
          games: res.data
        });
        console.log(res.data);
      });
  };

  favorites = () => {
    return (
      <div className="App">
        <CustomLayout>
          <GameList
            data={this.state.favorites}
            onClick={this.likeHandler}
            favorites={this.state.favorites}
          />
        </CustomLayout>
      </div>
    );
  };

  getFavorites = () => {
    console.log("inside getFavorites");
    const USER_TOKEN = cookies.get("jwt_access");
    const authStr = "Bearer ".concat(USER_TOKEN);
    axios
      .get("http://localhost:8000/api/accounts/favorites/", {
        headers: { Authorization: authStr }
      })
      .then(res => {
        this.setState({
          favorites: res.data
        });
        console.log(this.state);
      })
      .catch(error => {
        console.log(error);
      });
  };

  likeHandler = e => {
    let item = e.currentItem;
    let favs = this.state.favorites;
    const USER_TOKEN = cookies.get("jwt_access");
    const authStr = "Bearer ".concat(USER_TOKEN);

    // Checks if item is already in favorites
    debugger;
    if (!favs.some(e => e.title === item)) {
      axios
        .post(
          "http://localhost:8000/api/accounts/favorites/add/",
          {
            title: item
          },
          { headers: { Authorization: authStr } }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    } else {
      axios
        .post(
          "http://localhost:8000/api/accounts/favorites/remove/",
          {
            title: item
          },
          { headers: { Authorization: authStr } }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  };
}

export default App;
