import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, Button, FormControl, ControlLabel, Radio } from 'react-bootstrap';
import "../../node_modules/react-datetime/css/react-datetime.css";
import * as Datetime from 'react-datetime';     
import axios from 'axios';

class AddSighting extends Component{
    constructor(...args) {
        super(...args)
        
		this.state = {
			species:[]
		};
    }
    componentDidMount(){
        axios.get("http://localhost:8081/species")
        .then(res => {
          const specie = res.data;
          this.setState({ species : specie });
        });

    }
    

    render(){
        require('react-datetime');
        require('moment/locale/fi');
        return(
            <Grid>
                <Row>
                    <Col xs={12}>
                        <form>
                            <FormGroup
                                controlId="addSightingForm"
                            >
                                <h1>Add sighting</h1>

                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter description"
                                /> 
                                <br />
                                <ControlLabel>Species</ControlLabel>
                                
                                {this.state.species.map(function(specie){
                                    return (
                                        <Radio key={specie.name} name="radioGroup">{specie.name}</Radio>        
                                    )
                                })}

                                <ControlLabel>Time</ControlLabel>

                                <Datetime /> 
                                <br />
                                <Button type='submit'>Send sighting</Button>          
                            </FormGroup>
                        </form>
                    </Col>
                </Row>         
            </Grid>
        );
    }
}

export default AddSighting;