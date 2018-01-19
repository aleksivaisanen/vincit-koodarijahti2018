import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';
import "../../node_modules/react-datetime/css/react-datetime.css";
import * as Datetime from 'react-datetime';
import '../App.css'     
import axios from 'axios';

class AddSighting extends Component{
    constructor(args) {
        super(args)
        
		this.state = {
            description : '',
            selectedSpecies : 'mallard' ,
            count : '',
            time : '',
            species : []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }
    componentDidMount(){
        axios.get("http://localhost:8081/species")
        .then(res => {
          const specie = res.data;
          this.setState({ species : specie });
        });

    }
    
    handleChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value
        this.setState({
            [name]:value
            
        });
        console.log(this.state.description);
        console.log(this.state.selectedSpecies);
        console.log(this.state.count);
        console.log(this.state.time);
    }
    handleOptionChange(event){
        this.setState({
            selectedSpecies:event.target.value
        });
    }
    handleDate(date){
        require('moment');
        date = date.format();
        this.setState({time:date});
        console.log(this.state.time);
    }
    handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/sightings',
        {
            species: this.state.selectedSpecies,
            description: this.state.description,
            dateTime: this.state.time,
            count: this.state.count
        }
    );
    }

    render(){
        require('react-datetime');
        require('moment/locale/fi');
        return(
            <Grid>
                <Row>
                    <Col xs={12}>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                controlId="addSightingForm"
                            >
                                <h1>Add sighting</h1>

                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    name='description'
                                    type="text"
                                    placeholder="Enter description"
                                    onChange={this.handleChange}
                                /> 
                                <br />
                                <ControlLabel>Species</ControlLabel>
                                <br />
                                
                                {this.state.species.map(function(specie){
                                    return (
                                        <label key={specie.name}>
                                            <input 
                                                type='radio'
                                                 
                                                name='selectedSpecies'
                                                checked = {this.state.selectedSpecies === specie.name}
                                                onChange ={this.handleOptionChange}
                                                value = {specie.name}
                                                />
                                                {specie.name}
                                                        
                                        </label>
                                    )
                                }.bind(this))}

                                <br />
                                <ControlLabel>Count</ControlLabel>
                                <FormControl
                                    name='count' 
                                    type="text"
                                    placeholder="Enter the count"
                                    onChange={this.handleChange}
                                    />

                                <br />
                                <ControlLabel>Time</ControlLabel>

                                <Datetime onChange={this.handleDate} inputProps={{placeholder: 'Choose a time' , readOnly:true }}/> 
                                <br />
                                <Button type="submit">Send sighting</Button>         
                            </FormGroup>
                        </form>
                    </Col>
                </Row>         
            </Grid>
        );
    }
}

export default AddSighting;