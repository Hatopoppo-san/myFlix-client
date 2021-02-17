import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {
   constructor(){
    // Call the superclass constructor
    // so React can initialize it
    super();
    // Initialize the state to an empty object so we can destructure it later
    this.state ={}; 
  }

  // This overrides the render() method of the super class
  // No need to call super()t though, as it does nothing by default
  
  // One of the "hooks" available in a React Component
  componentDidMount(){
    axios.get('https://my-flix-api-practice.herokuapp.com/movies')
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: resoponse.data
      });
    })
    .catch(function (error){
      console.log(error);
    });
  }  

  render(){
          // If the state isn't initialized, this will throw on runtime
      // before the data is initially loaded
      const { movies } = this.state;

      // Before the movies have been loaded
      if(!movies) return <div classname="main-view" />;

    return(
      <div className="main-view">
        { movies.map(movie => (
          <div className="movie-card" key={movie._id}>{mopvie.Title}</div>
        ))};
      </div>
    );
  }
}
