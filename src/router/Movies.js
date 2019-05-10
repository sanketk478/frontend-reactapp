import React, { Component, Fragment } from "react"; 
import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Pagination from 'material-ui-pagination';
import './../App.css';
import Header from '../components/Header';
import Movie from '../components/Movie';

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
      allmovies: [],
      movies: [],
      searchKeyword: 'batman',
      total: 0,
      display: 5,
      number: 1,
      itemPerPage: 8,
    };

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    console.log('current search componentWillMount');
    // Loads some users on initial load
    this.loadMovies(this.state.searchKeyword);
  }

  loadMovies = (searchKeyword) => {
    console.log('current search searchKeyword: ' + searchKeyword);
    let apiUrl;
    if (searchKeyword === undefined) {
      apiUrl = 'https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8';
    } else {
      apiUrl = 'https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8&s='+searchKeyword+'&page='+this.state.page;
    }

    console.log('current search URL: ' + apiUrl);

    this.setState({ isLoading: true, searchKeyword }, () => {
      axios
        .get(apiUrl)
        .then((results) => {
          console.log('current search result: ' + results);
          // Creates a User  array of Response  data

          if (results.data.Search) {
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
                ...nextMovies.slice(0, this.state.itemPerPage)
              ],
              allmovies: [
                ...nextMovies,
              ],
              total: (nextMovies.length % this.state.itemPerPage === 0)
                ? nextMovies.length / this.state.itemPerPage
                : nextMovies.length / this.state.itemPerPage + 1,
              number: 1,
              error: false,
            });
          } else if (results.data && results.data.Response === 'True') {
            const nextMovies = {
              id:results.data.imdbID,
              image:results.data.Poster,
              title:results.data.Title,
              year:results.data.Year,
              imdbID:results.data.imdbID,
              type:results.data.Type,
            };
            this.setState({
              hasMore: false,
              isLoading: false,
              movies: [
                nextMovies,
              ],
              allmovies: [
                nextMovies,
              ],
              total: 1,
              number: 1,
              error: false,
            });
          } else if (results.data && results.data.Response === 'False') {
            this.setState({
              error: results.data.Error,
              isLoading: false,
              movies: [],
              allmovies: [],
              total: 0,
              number: 1,
             });
          } else {
            this.setState({
              isLoading: false,
              movies: [],
              allmovies: [],
              total: 0,
              number: 1,
             });
          }
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
            total: 0,
            number: 1,
           });
        })
    });
  }

  handleSearchTextChange(e) {
    this.loadMovies(e.target.value);
  }

  handlePageChange(pageNumber) {
    this.setState({
      number: pageNumber,
      movies: [
        ...this.state.allmovies.slice(
          parseInt(pageNumber-1)*parseInt(this.state.itemPerPage), 
          parseInt(pageNumber-1)*parseInt(this.state.itemPerPage) + parseInt(this.state.itemPerPage)
        )
      ],
    })
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      movies,
      allmovies,
      searchKeyword,
    } = this.state;

    return (
      // User Tabel 
      <div>
        <Container className="App"> 
          <Header onChange={this.handleSearchTextChange}/>

          <h3 className="search_titel">
            {'Your Searched for: ' + (searchKeyword === undefined ? '' : searchKeyword)}
            {', ' + allmovies.length + ' results found'}
          </h3>

          <div className="row movie_row">
            {movies.map(movie => (
              <Movie movie={movie} />
            ))}
          </div>

          <div>
            <Pagination
              total = { this.state.total }
              current = { this.state.number }
              display = { this.state.display }
              onChange={this.handlePageChange}
            />
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