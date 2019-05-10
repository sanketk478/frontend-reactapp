import React, { Fragment } from "react"; 

class Movie extends React.Component {
  render() {
    return (
      <Fragment key={this.props.movie.id}>
        <div className='col-md-3 col-sm-6 movie_box'>
          <img src={this.props.movie.image} className="post-img" alt="test"/>
          <p className="movie_details">Name: {this.props.movie.title}</p>
          <p className="movie_details">Year : {this.props.movie.year} </p>
          <p className="movie_details">imdbID: {this.props.movie.imdbID} </p>
          <p className="movie_details">Type : {this.props.movie.type}</p>
        </div>
      </Fragment>
    );
  }
}

export default Movie;
  