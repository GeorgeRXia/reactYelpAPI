class SignUp extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: ""

    }
    this.updateUserName = this.updateUserName.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.signUp = this.signUp.bind(this)
  }
  render() {
    return (
      <div>

        <h1 className="header-form">Sign Up</h1>

        <div className="form">
          Username:
        </div>
        <div className="form-input">
        <input onChange={this.updateUserName} className="form-input"/>
        </div>
        <div className="form">
          Password:</div>
          <div className="form-input">
        <input onChange={this.updatePassword} />
      </div>
        <button onClick={this.signUp}>
          Sign Up</button>
      </div>
    )

  }
  updateUserName(event) {
    this.setState({username: event.target.value})

  }
  updatePassword(event) {
    this.setState({password: event.target.value})

  }
  signUp() {
    let username = this.state.username;
    let password = this.state.password;
    axios.get("/signup", {
      params: {
        username: username,
        password: password

      }

    }).then(function(response) {
      console.log(response);

    })

  }
}

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: ""

    }

  }
  render() {
    return (
      <div>
        <h1 className="header-form">
          Login
        </h1>
        <form action="/login" method="post">

          <div className="form">Username:
          </div><input name="username"/>
          <div className="form">Password:
          </div><input name="password"/>
          <input type="submit"/>
        </form>
      </div>
    )

  }

}

ReactDOM.render(
  <SignUp/>, document.getElementById('signUp'))
ReactDOM.render(
  <Login/>, document.getElementById('signIn'))
