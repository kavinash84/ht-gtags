import React from 'react';
import PropTypes from 'prop-types';

const styles = require('./ScrollToTop.scss');

class ScrollToTop extends React.Component {
  state = {
    show: true
  };

  componentDidMount() {
    if (window) {
      window.addEventListener('scroll', this.handleScroll, false);
    }
  }
  componentWillUnmount() {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll, false);
    }
  }
  handleScroll = () => {
    const { threshold } = this.props;
    if (window.pageYOffset < threshold) {
      this.setState({
        show: true
      });
    }

    if (window.pageYOffset > threshold) {
      this.setState({
        show: false
      });
    }
  };

  handleClick = () => {
    let pageoffset = window.pageYOffset;
    const scroller = pset =>
      new Promise(resolve => {
        window.setTimeout(() => {
          window.scroll(0, pset);
          resolve();
        }, 2);
      });
    const { speed } = this.props;
    (async () => {
      while (pageoffset > 0) {
        pageoffset -= speed ** 2;
        /* eslint-disable no-await-in-loop */
        await scroller(pageoffset);
      }
    })();
  };

  render() {
    const { show } = this.state;
    const { hidden } = this.props;
    return (
      <div>
        {(!show || !hidden) && (
          <div className={styles.scrollToTop}>
            <button onClick={this.handleClick}>▾</button>
          </div>
        )}
      </div>
    );
  }
}

ScrollToTop.defaultProps = {
  threshold: 600,
  hidden: true,
  speed: 10
};
ScrollToTop.propTypes = {
  threshold: PropTypes.number,
  hidden: PropTypes.bool,
  speed: PropTypes.number
};
export default ScrollToTop;
