import React, { Component } from 'react';
import './App.css';
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
      <div className="container">
      <h1>Vincitin ankkabongaus 2018</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Species</th>
            <th>Description</th>
            <th>Date and Time</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
        {this.state.sightings.map(function(sight){
          return (<tr key={sight.id + "tr"}>
            <td key={sight.id}>{sight.id}</td>
            <td key={sight.id + sight.id.species}>{sight.species}</td>
            <td key={sight.id + sight.description}>{sight.description}</td>
            <td key={sight.id + sight.dateTime}>{sight.dateTime}</td>
            <td key={sight.id + sight.count}>{sight.count}</td>
            </tr>)
        })}
        </tbody>
      </table>
    </div>
    );
  }
}

export default App;
