import React, { Component } from 'react';
import Header from './Header';
import BrowseSightings from './BrowseSightings';
import Home from './Home';
import AddSighting from './AddSighting';
import Footer from './Footer';

class Page extends Component{
    constructor(props){
        super(props);
        this.state = {
        /*default view is home*/
          currentPage : 'home'      
        };   
    }
    
    handleChange = (page) =>{
        /*page navigation is done using states and props*/
        this.setState({
            currentPage:page
        });
    }

    render(){
        const pageContent = this.state.currentPage;
        let page = '';
        if(pageContent === 'home'){
            page = <Home />;
        }
        else if(pageContent === 'add sighting'){
            page = <AddSighting />;
        }
        else if(pageContent === 'browse sightings'){
            page = <BrowseSightings />;
        }  
        return (
            <div className='wrapper'>
                <Header currentPage = {this.state.currentPage} changePage = {this.handleChange}/>     
                {page}
                <Footer />
            </div>
        );
        
    }
}
export default Page;