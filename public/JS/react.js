class YelpMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],

    }
    this.searchAndSetState = this.searchAndSetState.bind(this)
    this.addToFavorites = this.addToFavorites.bind(this)
  }
  render(){
    return(
      <div>
        <YelpSearch search={this.searchAndSetState} />
        <YelpResults results = {this.state.results} addToFavorites={this.addToFavorites}/>

      </div>

    )


  }
  searchAndSetState(location, term){
    axios.get("https://yelp-search.herokuapp.com/search", {
      params: {
        location: location,
        term: term

      }

    }).then(function(response){

      this.setState({results: response.data.businesses})

    }.bind(this))

  }
  addToFavorites(index){
    let favorited =  this.state.results[parseInt(index)];
    let nameFavorited = favorited.name;
    let yelpIdFavorited = favorited.yelp_id;

    axios.get("/createfavorites", {
      params: {
        yelp_id: yelpIdFavorited,
        name: nameFavorited

      }


    }).then(function(response){
      console.log(response);

    })



  }
}

class YelpSearch extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      term:"",
      location:""

    }
    this.searchYelp = this.searchYelp.bind(this)
    this.searchTerm = this.searchTerm.bind(this)
    this.locationTerm = this.locationTerm.bind(this)
  }
  render(){
    return(
      <div>
      Term:  <input onChange={this.searchTerm}/>
      Location:    <input onChange={this.locationTerm}/>
            <button onClick={this.searchYelp}> Search </button>
      </div>

    )

  }
  searchTerm(event){
    this.setState({term: event.target.value})

  }
  locationTerm(event){
    this.setState({location: event.target.value})

  }
  searchYelp(){
    var location = this.state.location;
    var term = this.state.term;
    this.props.search(location, term)

  }

}

function YelpResults(props){
let yelpInformation = props.results.map(function(result, index){

  return(
      <div key={index} >
     <div >{result.name} </div>
     <button onClick={handleCreateFavorite} id={index}> Favorite It </button>
   </div>
   )
})
function handleCreateFavorite(event){
  props.addToFavorites(event.target.id)

}



return <div>{yelpInformation}</div>

}



ReactDOM.render(<YelpMaster/>, document.getElementById("search"))
