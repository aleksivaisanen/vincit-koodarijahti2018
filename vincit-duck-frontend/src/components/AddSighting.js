import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, Button, FormControl, ControlLabel, HelpBlock, Radio } from 'react-bootstrap';
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
        return(
            <Grid>
                <Row>
                    <Col xs={12}>
                        <form>
                            <FormGroup
                                controlId="addSightingForm"
                                validationState='null'
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
                                        <Radio name="radioGroup">{specie.name}</Radio>        
                                    )
                                })} 
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