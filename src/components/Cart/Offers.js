import React from 'react';
import { Link } from 'react-router-dom';
class Offers extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    showMore: false
  };
  render() {
    const { cartEmiDetails } = this.props;
    const { showMore } = this.state;
    console.log(cartEmiDetails, 'cartEmiDetails');
    return (
      <div style={{ background: 'white', borderBottomLeftRadius: '3px', borderBottomRightRadius: '3px' }}>
        {Array.isArray(cartEmiDetails.cart_emi_detail) && (
          <React.Fragment>
            <div
              style={{
                fontSize: '12px',
                color: '#999999',
                padding: '10px 15px 15px',
                height: showMore ? 'auto' : '20px',
                overflow: 'hidden'
              }}
            >
              {cartEmiDetails.cart_emi_detail.map(item => (
                <Link to="/promotions">
                <p style={{ marginBottom: '3px', color: '#999999', }}>{item.mobile}</p>
                </Link>
              ))}
            </div>
            {cartEmiDetails.cart_emi_detail.length > 1 && (
              <div
                style={{ fontSize: '12px', color: '#F47020', padding: '15px' , cursor:'pointer'}}
                onClick={() => {
                  this.setState({ showMore: !this.state.showMore });
                }}
              >
                {showMore ? 'Show Less' : 'Show More'}
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Offers;
