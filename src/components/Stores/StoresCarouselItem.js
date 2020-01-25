import React from 'react';
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { setCity } from 'redux/modules/stores';

// const styles = require('./StoresCarousel.scss');

// const onClick = (dispatcher, city) => e => {
//   e.preventDefault();
//   dispatcher(city);
// };

// const mapStateToProps = ({ stores }) => ({
//   selectedCity: stores.selectedCity
// });

// const mapDispatchToProps = dispatch => bindActionCreators({ setSelectedCity: setCity }, dispatch);

// const StoresCarouselItem = ({ city, setSelectedCity, selectedCity }) => (
//   <div className={`${styles.storeSliderItem} ${selectedCity === city ? styles.active : ''}`}>
//     <button className={styles.link} onClick={onClick(setSelectedCity, city.toUpperCase())}>
//       {city}
//     </button>
//   </div>
// );

// StoresCarouselItem.propTypes = {
//   city: PropTypes.string.isRequired,
//   setSelectedCity: PropTypes.func.isRequired,
//   selectedCity: PropTypes.string.isRequired
// };

// export default connect(mapStateToProps, mapDispatchToProps)(StoresCarouselItem);

const StoreCarouselItem = () => <div type="block">Page Is Under Development</div>;

export default StoreCarouselItem;
