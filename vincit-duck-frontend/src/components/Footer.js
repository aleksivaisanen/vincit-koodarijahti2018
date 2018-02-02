import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import '../App.css';

class Footer extends Component{
    render(){
        
        return( 
            <footer>
                <Grid>
                    <img alt='dog' src={require('../images/koodarijahti_dog.png')} className="img-dog img-responsive" />
                    <br />
                    <p className='text-center'>Vincit koodarijahti 2018
                    <br/>
                    www.koodarijahti.fi</p>
                </Grid>
            </footer>
        );
    }
}

export default Footer;