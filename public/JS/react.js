class YelpMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []


    }
  }
  render(){
    return(
      <div>
        <YelpSearch/>
        <YelpResults results = {this.state.results}/>
      </div>

    )


  }
}

class YelpSearch extends React.Component{
  constructor(props){
    super(props)

  }


}

function YelpResults(props){
let yelpInformation = props.results.map(function(result, index){

  return <div key={index}>{result.name} </div>
})
return <div>yelpInformation</div>

}



ReactDOM.render(<YelpMaster/>, document.getElementById("signIn"))
