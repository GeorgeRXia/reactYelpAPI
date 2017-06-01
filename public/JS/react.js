class YelpMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      favorites: [],
      view: "search"

    }
    this.searchAndSetState = this.searchAndSetState.bind(this)
    this.addToFavorites = this.addToFavorites.bind(this)
    this.destroyFavorite = this.destroyFavorite.bind(this)
    this.destroyFavoriteBySearchResultIndex = this.destroyFavoriteBySearchResultIndex.bind(this)
    this.loadFavorites = this.loadFavorites.bind(this)
    this.seeFavorites = this.seeFavorites.bind(this)
    this.seeSearch = this.seeSearch.bind(this)

    this.loadFavorites();
    console.log(this.state.favorites);
  }
  render(){


    if (this.state.view === "search"){
      return(
        <div>
          <YelpSearch search={this.searchAndSetState} />
          <YelpResults results = {this.state.results} addToFavorites={this.addToFavorites} destroyFavorite={this.destroyFavoriteBySearchResultIndex} currentFavorites={this.state.favorites}/>
          <button onClick={this.seeFavorites}> See Favorites </button>

        </div>
      )
    }
    return(
      <div>
        <button onClick={this.seeSearch}> Back To Search </button>
        <YelpFavorites favoriteList= {this.state.favorites} destroyFavorite={this.destroyFavorite}/>


        <InitMap  favoritesMarker={this.state.favorites}/>

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
      console.log(response.data.businesses);
      this.setState({results: response.data.businesses})

    }.bind(this))

  }
  addToFavorites(index){
    console.log(index);
    let favorited =  this.state.results[parseInt(index)];
    let nameFavorited = favorited.name;
    let yelpIdFavorited = favorited.id;
    let longitude = favorited.location.coordinate.longitude;
    let latitude = favorited.location.coordinate.latitude;
    console.log(nameFavorited, yelpIdFavorited);
    axios({
      method: "post",
      url: '/createfavorites',
      params: {
        yelp_id: yelpIdFavorited,
        name: nameFavorited,
        longitude: longitude,
        latitude: latitude

      }

    }).then(function(response){
      console.log(response);
      this.loadFavorites();
    }.bind(this))

  }

  destroyFavoriteBySearchResultIndex(index) {
      let business = this.state.results[index];
      let yelp_id = business.id;
      this.destroyFavorite(yelp_id);
  }
//on favorite page
  destroyFavorite(yelp_id) {

    axios({
      method: 'post',
      url: '/destroy_favorite',
      params: {
        yelp_id: yelp_id
      }
    }).then(function(response) {
      console.log(response);
      this.loadFavorites();
    }.bind(this));
  }

  loadFavorites() {
    axios.get("/seeFavorites",{
      params: {

      }

    }).then(function(response){
      console.log(response.data);
      this.setState({favorites: response.data})

    }.bind(this));
  }

  seeFavorites(){
    this.loadFavorites();
      var appearMap = document.getElementById("map");
      appearMap.style.display = "block";
    this.setState({view: "favorites"});
  }
  seeSearch(){
    var removeMap = document.getElementById("map");
    removeMap.style.display = "none";
    this.setState({view: "search"})

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

function YelpFavorites(props){
    let favoriteList = props.favoriteList;

    favoriteList = favoriteList.map(function(favorite){

        return(
            <div>
              <div>{favorite.name}</div>
              <button onClick={handleDestroyFavorite} id={favorite.yelp_id}> Unfavorite</button>
            </div>
        )
    });

    function handleDestroyFavorite(event) {
      props.destroyFavorite(event.target.id)
    }

    return <div>{favoriteList} </div>

}
function YelpResults(props){
  let favYelpIds = props.currentFavorites.map(function(favorite) {
     return favorite.yelp_id;
   });

  let yelpInformation = props.results.map(function(result, index){
    if (favYelpIds.includes(result.id)) {
      return(
        <div key={index} >
         <div >{result.name} </div>
         <button onClick={handleDestroyFavorite} id={index}> Unfavorite</button>
       </div>
     )
    } else {

      return(
        <div key={index} >
         <div >{result.name} </div>
         <button onClick={handleCreateFavorite} id={index}> Favorite It </button>
       </div>
     )
    }
  })
function handleCreateFavorite(event){
  props.addToFavorites(event.target.id)

}

function handleDestroyFavorite(event) {
  props.destroyFavorite(event.target.id)
}


return <div>{yelpInformation}</div>

}


function InitMap(props) {
  var markers = props.favoritesMarker.map(function(marker){
    return {lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)};
  });
  var names = props.favoritesMarker.map(function(business) {
    return business.name
  });

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: markers[0]
    });
    for (let k = 0; k < markers.length; k++) {

      let infowindow = new google.maps.InfoWindow({
        content: names[k]
      });

      let marker = new google.maps.Marker({
        position: markers[k],
        map: map
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

    }

    return null;
}




ReactDOM.render(<YelpMaster/>, document.getElementById("search"))
