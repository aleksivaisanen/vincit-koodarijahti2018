import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, Table } from 'react-bootstrap'
import '../App.css';
import moment from 'moment';

class BrowseSightings extends Component{
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
           
    }

    render(){
        require('moment/locale/fi');
        return(
            <Grid>
                <h1>Browse sightings</h1>
                <Row className="show-grid">
                
                <Col xs={12}>    
                    <Table striped>
                        <thead>
                            <tr>
                            <th>Sight number</th>
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
                            <td key={sight.id + sight.dateTime}>{moment(sight.dateTime).format('MMMM Do YYYY, HH:mm')}</td>
                            <td key={sight.id + sight.count}>{sight.count}</td>
                            </tr>)
                        })}
                        </tbody>
                    </Table>
                </Col>
                </Row>
            </Grid>
        );
    }
}

export default BrowseSightings;