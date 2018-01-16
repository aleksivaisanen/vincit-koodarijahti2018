import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import SightingsInfo from './components/SightingsInfo';
import Home from './components/Home';
import axios from 'axios';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sightings: [],
      species: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8081/sightings")
    .then(res => {
      const sights = res.data;
      this.setState({ sightings : sights });
    });
    axios.get("http://localhost:8081/species")
    .then(res => {
      const specy = res.data;
      this.setState({ species : specy });
    });   
  }

  render() {
    return (
      <div>
        <Header />
        <Home />
        <SightingsInfo />
      </div>
    );
  }
}

export default App;
