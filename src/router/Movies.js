import React, { Component, Fragment } from "react"; 
import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './../App.css';
class Movies extends Component {
  constructor(props) {
    super(props);
    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      page:1,
      no:1,
      movies: [],
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadMovies,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        this.setState({
            page: this.state.page + 1
           });
        loadMovies();
      }
    };
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadMovies();
  }
  loadMovies = () => {
    this.setState({ isLoading: true }, () => {
      axios
        .get('https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8&s=Batman&page='+this.state.page)
        .then((results) => {
          console.log(results);
          //console.log()
          // Creates a User  array of Response  data
          const nextMovies = results.data.Search.map(movies => ({
            id:movies.imdbID,
            image:movies.Poster,
            title:movies.Title,
            year:movies.Year,
            imdbID:movies.imdbID,
            type:movies.Type,
            
          }));
          this.setState({
            hasMore: (this.state.movies.length < 1000),
            isLoading: false,
            movies: [
              ...this.state.movies,
              ...nextMovies,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      movies,
    } = this.state;

    return (
      // User Tabel 
      <div>
        <Container className="App">  
        <div className="row header">
            <div className="header_left">
               <h3> Movie Catelog </h3>
            </div>
            <div className="header_center">
                <form>
                    <input className="search_box" type='text' placeholder="search Movies" />
                </form>
            </div>
            <div className="header_right">
            </div>
            <div className="fix"></div>
        </div>
        <h3 className="search_titel"> Your Searched For : Batman </h3>
        <div className="row movie_row">
        {movies.map(movies => (
          <Fragment key={movies.id}>
                  <div className='col-md-3 movie_box'>
                    <img src={movies.image} className="post-img" alt="test"/>
                    <p className="movie_details">Name: {movies.title}</p>
                    <p className="movie_details">Year : {movies.year} </p>
                    <p className="movie_details">imdbID: {movies.imdbID} </p>
                    <p className="movie_details">Type : {movies.type}</p>
                  </div>
          </Fragment>
        ))}
      </div>
      </Container>
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>
              <Container className="loader-image"> 
                <img alt="loading" src="img/200.gif" />
              </Container>
          </div>
        }
        {!hasMore &&
          <Container className="loader-image"> 
            <div> <h4> No More Date avaiable </h4></div>
          </Container>  
        }
      </div>
    );
  }
}
export default Movies;