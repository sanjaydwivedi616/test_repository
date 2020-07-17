import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class TestMoviewDetails extends Component {
  state = {
    movieDetailsData: [],
    loader: false,
    backLink: null
  }

  componentDidMount() {
    console.log("inside ")
    console.log(this.props.location.state.id)

    axios.get(`http://www.omdbapi.com/?apikey=b9bd48a6&i=${this.props.location.state.id}`).then(res => {
      console.log(res.data)
      this.setState({
        movieDetailsData: res.data,
        loader: false,
      });
    })
  };
  backToMovieList = () => {
    this.setState({
      backLink: "/test-movie-list"
    })
  }
  render() {
    const { backLink } = this.state;
    if (backLink) {
      return <Redirect to={backLink} />
    }
    const { movieDetailsData } = this.state;
    const specificMovieData = this.props.location.state.id;
    return (
      <div className='container-fluid'>
        <h3>Movie Details Page</h3>
        <button onClick={this.backToMovieList}>Back to list</button>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'><b>Title :</b> {movieDetailsData.Title}</h5>
            <hr />
            <p className='card-text'><b>Years :</b> {movieDetailsData.Year}</p>
            <p className='card-text'><b>Rated :</b> {movieDetailsData.Rated}</p>
            <p className='card-text'><b>Released :</b> {movieDetailsData.Released}</p>
            <p className='card-text'><b>Runtime :</b> {movieDetailsData.Runtime}</p>
            <p className='card-text'><b>Actors :</b> {movieDetailsData.Actors}</p>
            <p className='card-text'><b>Awards :</b> {movieDetailsData.Awards}</p>
            <p className='card-text'><b>Runtime :</b> {movieDetailsData.Runtime}</p>
            <p className='card-text'><b>BoxOffice :</b> {movieDetailsData.BoxOffice}</p>
            <p className='card-text'><b>DVD :</b> {movieDetailsData.DVD}</p>
            <p className='card-text'><b>Director :</b> {movieDetailsData.Director}</p>
            <p className='card-text'><b>Genre :</b> {movieDetailsData.Genre}</p>
            <p className='card-text'><b>Language :</b> {movieDetailsData.Language}</p>
            <p className='card-text'><b>Metascore :</b> {movieDetailsData.Metascore}</p>
            <p className='card-text'><b>Plot :</b> {movieDetailsData.Plot}</p>
            <img src={movieDetailsData.Poster} />
            <p className='card-text'><b>Response :</b> {movieDetailsData.Response}</p>
          </div>
        </div>
      </div >
    );
  }
}

export default TestMoviewDetails;