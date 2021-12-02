import React, { Component } from 'react';
import ModularWardrobeContainer from '../../components/ModularWardrobe';
import Footer from '../../components/Footer';

class ModularWardrobe extends React.Component {
    render() { 
        return (
            <div>
                <ModularWardrobeContainer />
                <Footer />
            </div>
        );
    }
}
 
export default ModularWardrobe;