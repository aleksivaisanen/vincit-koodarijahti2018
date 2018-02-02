import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import '../App.css';

class Home extends Component{
    render(){
        
        return(
            /*home view*/
            <Grid className='white-bg'>
                <h1>Vincit Duck Hunt 2018</h1>
                <br/>
                <Row>
                    <Col xs={12} className='main-text'>
                    <p>
                    Vincit Duck Hunt 2018 has begun! Here you can add your sightings to our database and compare them with previous sightings.
                    </p>
                    <p>
                    In the '<b>Add a sighting</b>' section you can add your newest sightings by simply filling the form with the required information.
                    In the '<b>Browse sightings</b>' section you can view previous sightings that have been submitted to our database.
                    Sightings can also be sorted by date, so comparison between previous sightings is now even easier!
                    </p>
                    <h3>Happy hunting!</h3>
                    
                    </Col>
                </Row>
                
            </Grid>
        );
    }
}

export default Home;