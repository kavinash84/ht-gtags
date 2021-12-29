import React, { Component } from 'react'
import SpacesContainer from '../../components/Spaces';
import Header from 'components/Header';
import Footer from 'components/Footer';

class Spaces extends React.Component {
    render() { 
        return (
            <div>
            <Header />
                <SpacesContainer/>
                <Footer />
            </div>
        );
    }
}
 
export default Spaces;