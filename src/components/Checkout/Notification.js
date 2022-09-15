import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => (
    <div style={{
        backgroundColor: 'black',
        width: '90%', borderRadius: '10px', margin: '30px 0px'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
            <ul style={{ listStyle: 'none' }}>
                <li style={{
                    display: 'inline-block',
                    backgroundColor: 'black', margin: '15px', borderRadius: '50%',
                    color: 'white',
                    display: 'table-cell',
                    verticalAlign: 'middle',
                    textAlign: 'center',
                    textDecoration: 'none',
                    height: '50px',
                    width: '50px',
                    fontSize: '25px',
                    backgroundColor: '#FFD700'
                }}>!</li>
            </ul>
            <div style={{
                marginLeft: '15px',
                color: 'white'
            }}>
                {message}
            </div>
        </div>
    </div>
);

Notification.defaultProps = {
    message: ''
};

Notification.propTypes = {
    message: PropTypes.string
};

export default Notification;
