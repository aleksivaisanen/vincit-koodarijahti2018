import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, Table, Glyphicon } from 'react-bootstrap'
import '../App.css';
import moment from 'moment';

class BrowseSightings extends Component{
    constructor(props){
        super(props);
        this.state = {
          sightings: [],
          species: [],
          glyph: <Glyphicon name='glyph1' glyph='menu-down' />
        };
      }
    
    componentDidMount() {
        axios.get("http://localhost:8081/sightings")
        .then(res => {
          const sights = res.data;
          this.setState({ sightings : 
            sights.sort(function(a,b){
                return new Date(b.dateTime) - new Date(a.dateTime);
            })
        });
        });
           
    }
    /*function for sorting the sightings by date*/
    sortByDate = () => {
        if(this.state.sightings[0].dateTime > this.state.sightings[this.state.sightings.length-1].dateTime){
            this.setState({
                sightings: this.state.sightings.sort(function(a,b){
                    return new Date(a.dateTime) - new Date(b.dateTime);
                }),
                glyph: <Glyphicon name='glyph1' glyph='menu-up' />
            });
        }
        else {
            this.setState({
                sightings: this.state.sightings.sort(function(a,b){
                    return new Date(b.dateTime) - new Date(a.dateTime);
                }),
                glyph: <Glyphicon name='glyph1' glyph='menu-down' />
            });
        }  
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
                            <th>
                            <a onClick={this.sortByDate}>Date and Time {this.state.glyph} </a>
                            </th>
                            <th>Species</th>
                            <th>Count</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.sightings.map(function(sight){
                            return (<tr key={sight.id + "tr"}>
                            <td key={sight.id + sight.dateTime}>{moment(sight.dateTime).format('MMMM Do YYYY, HH:mm')}</td>
                            <td key={sight.id + sight.id.species}>{sight.species}</td>
                            <td key={sight.id + sight.count}>{sight.count}</td>
                            <td key={sight.id + sight.description}>{sight.description}</td>
                            
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