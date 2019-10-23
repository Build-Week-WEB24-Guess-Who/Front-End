import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = (e, credentials) => {
    e.preventDefault();
    // login to retreive the JWT token
    // add the token to localStorage
    // route to /protected (whatever landing page)
    axiosWithAuth()
      // base of '/api/login' inside axiosWithAuth in utils folder
      .post("/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload) ; console.log(res, "this");
        // this.props.history.push("/protected");
        console.log("wooooooowwwww", res)
      })
      .catch(err => console.log(err.response));
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.login(e, this.state.credentials)}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;