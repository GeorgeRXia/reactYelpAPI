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
    render (){
      return (<div>
            <div>Sign Up</div>
            Username: <input onChange= {this.updateUserName}/>
            Password: <input onChange={this.updatePassword}/>
            <button onClick={this.signUp}> Sign Up</button>
          </div>
      )

    }
    updateUserName(event){
      this.setState({username: event.target.value})

    }
    updatePassword(event){
      this.setState({password: event.target.value})


    }
    signUp(){
      let username = this.state.username;
      let password = this.state.password;
      axios.get("/signup",{
        params:{
          username: username,
          password: password

        }

      }).then(function(response){
        console.log(response);

      })


    }
  }

  class Login extends React.Component {
    constructor() {
      super()
      this.state = {
        username:"",
        password:""

      }


    }
    render(){
      return(
      <div>
        <div> Login </div>
        <form action="/login" method= "post">
        Username: <input name="username"/>
        Password: <input name="password"/>
        <input type= "submit"/>
      </form>
      </div>
      )

    }



  }


ReactDOM.render(<SignUp />, document.getElementById('signUp'))
ReactDOM.render(<Login />, document.getElementById('signIn'))
