import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, Button, FormControl, ControlLabel, Alert } from 'react-bootstrap';
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
            selectedSpecies : '' ,
            count : '',
            time : '',
            species : [],
            alert : '',
            descriptionValidation : null,
            dateTimeValidation : null,
            countValidation : null
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
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
            [name]:value,
            alert:'',
            descriptionValidation : null,
            dateTimeValidation : null,
            countValidation : null
        });
    
    }
    handleOptionChange(event){
        this.setState({
            selectedSpecies:event.target.value,
            alert: ''
        });
        for(const item of document.getElementsByClassName('speciesLabel')){
            item.className='speciesLabel'
        }
        
    }
    handleDate(date){
        this.setState({time : date});
    }
    handleReset(e){
        this.setState({
            selectedSpecies : '',
            description: '',
            time: '',
            count: '',
            descriptionValidation : null,
            dateTimeValidation : null,
            countValidation : null
        });
        e.target.reset();
    }
    handleAlertDismiss(){
        this.setState({ alert : '' });
    }

    /*handling all the input errors and giving the user feedback of their possible mistakes*/
    handleSubmit(event){
        const form = event.target;
        this.setState({
            alert:''
        });
        event.preventDefault();
        /*description can't be empty, duck count has to be over 0 and date can't be in the future  */
        if(this.state.selectedSpecies === ''){
            const list = document.getElementsByClassName('speciesLabel');
            for(const item of list){
                item.className='speciesLabel errorLabel'
                console.log(item.className)
            }
            this.setState({
                alert:  <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                            <p>Please choose a species!</p>
                        </Alert>
            });
        }
        else if(/[^0-9]/.test(this.state.count)){
            this.setState({ 
                countValidation : 'error',
                alert:  <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                            <p>Count can only contain numbers!</p>
                        </Alert>
            });
        } 
        else if(this.state.count <= 0 && this.state.count > 999){
            this.setState({
                countValidation:'error',
                alert: <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                                    <p>Count has to be over 0 and less than 1000!</p>
                                    </Alert>
            })
        }
        else if(this.state.time > new Date()){
            this.setState({
                dateTimeValidation:'error',
                alert:  <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                        <p>Please check your date, date can't be in the future!</p>
                        </Alert>
            })
        }
        else if(!(moment(this.state.time, 'MMMM Do YYYY, HH:mm', true).isValid())){
            this.setState({
                dateTimeValidation:'error',
                alert:  <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                <p>Please check your date, date has to be in 'dd.mm.yyyy HH.mm' format!</p>
                </Alert>
            })
        }  
        else if(this.state.description === '' || this.state.description.length > 100){
            this.setState({ 
                descriptionValidation : 'error',
                alert:  <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                        <p>Description can't be empty or over 100 characters long!</p>
                        </Alert>
            });
        }
        else if(/[^a-zA-Z0-9-!?,.]/.test(this.state.description)){
            this.setState({ 
                descriptionValidation : 'error',
                alert:  <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                        <p>Description can only contain alphanumeric characters or special characters <b>- ! ? , .</b></p>
                        </Alert>
            });
        }
        else{
            axios.post('http://localhost:8081/sightings',
            {
                species: this.state.selectedSpecies,
                description: this.state.description,
                dateTime: moment(this.state.time).format(),
                count: this.state.count
            })
            .then(function (response) {
                if(response.statusText === 'OK'){
                    this.setState({
                        alert: <Alert bsStyle='success' onDismiss={this.handleAlertDismiss}>
                                <p>Your sighting was received successfully!</p>
                            </Alert>
                    });
                }
                this.setState({
                    selectedSpecies : '',
                    description: '',
                    time: '',
                    count: '',
                    descriptionValidation : null,
                    dateTimeValidation : null,
                    countValidation : null
                });
                form.reset();
                console.log(response);
            }.bind(this))
            .catch(function (error) {
                this.setState({
                    alert: <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                            <p>Something went wrong, please try again.</p>
                        </Alert>
                });
                console.log(error)
            }.bind(this));
        }
    }

    

    render(){
        require('moment/locale/fi');
        
        /*this disables all the future dates from date picker*/
        var today = Datetime.moment();
        var valid = function( current ){
            return current.isBefore( today );
        };

        return(
            <Grid>
                <Row>
                    <Col xs={12}>
                        <form 
                        onSubmit={this.handleSubmit}
                        onReset={this.handleReset}>
                            <h1>Add a sighting</h1>
                            <FormGroup>
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
                                                {specie.name.charAt(0).toUpperCase() + specie.name.substring(1, specie.name.length)}         
                                        </label>
                                    )
                                }.bind(this))}
                            </FormGroup>
                            <FormGroup validationState={this.state.countValidation}>
                            <ControlLabel>Count</ControlLabel>
                            <FormControl
                                name='count' 
                                type="number"
                                min='1'
                                max='999'
                                placeholder="Enter the count"
                                onChange={this.handleChange}
                                />
                            </FormGroup>    
                            <FormGroup validationState={this.state.dateTimeValidation}>
                                <ControlLabel>Time</ControlLabel>
                                <Datetime onChange={this.handleDate} value= {this.state.time} isValidDate={valid} inputProps={{placeholder: 'Time of sight' , readOnly:true }}/> 
                            </FormGroup>
                            <FormGroup validationState={this.state.descriptionValidation}>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    name='description'
                                    maxLength='100'
                                    type="text"
                                    placeholder="Enter description"
                                    onChange={this.handleChange}
                                />
                            </FormGroup> 
                            <Button type="submit">Send sighting</Button>
                            <span> </span>
                            <Button type="reset">Reset</Button>         
                        </form>
                        <br />
                        {this.state.alert}
                    </Col>
                </Row>         
            </Grid>
        );
    }
}

export default AddSighting;