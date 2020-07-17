import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class TestMoviewList extends Component {
  state = {
    movieListData: [],
    movieName: "",
    loader: false,
    TestMoviewDetails: null
  }

  getSearchMovieList = (event) => {
    event.preventDefault();
    //Marvel
    if (this.state.movieName !== "") {
      axios.get(`http://www.omdbapi.com/?apikey=b9bd48a6&s=${this.state.movieName}&type=movie`).then(res => {
        console.log(res.data.Search)
        this.setState({
          movieListData: res.data.Search,
          loader: false,
          movieName: "",
          specificMovieData: ""
        });
      })
    }
  };

  selectedList = (imdbID) => {
    this.setState({
      TestMoviewDetails: "TestMoviewDetails",
      specificMovieData: imdbID
    })
  }


  onchangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { movieListData, loader, movieName, TestMoviewDetails, specificMovieData } = this.state;

    if (TestMoviewDetails) {
      return <Redirect to={{
        pathname: '/test-movie-details',
        state: { id: specificMovieData }
      }} />
    }
    return (
      <div className='container-fluid'>
        <form onSubmit={this.getSearchMovieList}>
          <label>Movie name : </label>
          <input type="text" className="form-control" name="movieName" value={movieName}
            onChange={this.onchangeHandler} style={{ width: "220px", display: 'inline-block' }} placeholder="Type movie name" />
          <button type="submit">Search</button>
        </form>
        <ul className='list-group'>
          {movieListData.map(list => {
            return (
              <li className="list-group-item" key={list.imdbID}
                onClick={() => this.selectedList(list.imdbID)}><b>Title : </b>{list.Title}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default TestMoviewList;