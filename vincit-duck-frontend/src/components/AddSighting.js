import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';
import "../../node_modules/react-datetime/css/react-datetime.css";
import moment from 'moment';
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
        const value = target.value;

        this.setState({
            [name]:value
        });
    
    }
    handleOptionChange(event){
        this.setState({
            selectedSpecies:event.target.value
        });
    }
    handleDate(date){
        this.setState({time : date});
    }
    handleReset = (e) =>{
        this.setState({
            selectedSpecies : 'mallard',
            description: '',
            time: '',
            count: ''
        });
        e.target.reset();
    }
    handleSubmit(event){
        event.preventDefault();
        if(this.state.description !== '' && this.state.count > 0 && moment(this.state.time).isValid()){
        
            axios.post('http://localhost:8081/sightings',
            {
                species: this.state.selectedSpecies,
                description: this.state.description,
                dateTime: moment(this.state.time).format(),
                count: this.state.count
            });

            this.setState({
                selectedSpecies : 'mallard',
                description: '',
                time: '',
                count: ''
            });

            event.target.reset();
            
        
        }else{
            alert('Invalid values, please try again!')
        }
    }

    render(){
        require('moment/locale/fi');
        return(
            <Grid>
                <Row>
                    <Col xs={12}>
                        <form 
                        onSubmit={this.handleSubmit}
                        onReset={this.handleReset}>
                            <FormGroup
                                controlId="addSightingForm"
                            >
                                <h1>Add a sighting</h1>

                                
                                <br />
                                <ControlLabel>Species</ControlLabel>
                                <br />
                                {/*Valid species are fetched from the server and presented as radio buttons.*/}
                                {this.state.species.map(function(specie){
                                    return (
                                        <label className='speciesLabel' key={specie.name}>
                                            <input 
                                                className='speciesInput'
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
                                <br />
                                <ControlLabel>Count</ControlLabel>
                                <FormControl
                                    name='count' 
                                    type="number"
                                    maxLength='6'
                                    placeholder="Enter the count"
                                    onChange={this.handleChange}
                                    />

                                <br />
                                <ControlLabel>Time</ControlLabel>
                                
                                <Datetime onChange={this.handleDate} value= {this.state.time} inputProps={{placeholder: 'Time of sight' , readOnly:true }}/> 
                                <br />
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    name='description'
                                    type="text"
                                    placeholder="Enter description"
                                    onChange={this.handleChange}

                                /> 
                                <br />

                                <Button type="submit">Send sighting</Button>
                                <span> </span>
                                <Button type="reset">Reset</Button>         
                            </FormGroup>
                        </form>
                    </Col>
                </Row>         
            </Grid>
        );
    }
}

export default AddSighting;