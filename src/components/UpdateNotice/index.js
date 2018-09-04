import React, { Component } from 'react';
import ResponsiveModal from 'components/Modal';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';

class UpdateNotification extends Component {
  state = {
    active: true
  };
  componentDidMount() {
    window.addEventListener('updateFound', this.handleToggle);
  }
  componentWillUnmount() {
    window.removeEventListener('updateFound', this.handleToggle);
  }
  handleToggle = () => {
    this.setState({ active: true });
  };
  render() {
    const styles = require('./UpdateNotice.scss');
    const reloadIcon = require('../../../static/reload-browser.svg');

    return (
      <ResponsiveModal open={this.state.active} onCloseModal={() => {}}>
        <Div className={styles.UpdateNoticeWrapper} ta="center">
          <Img m="0 auto 5px" width="125px" src={reloadIcon} alt="Reload Page" />
          <Text ta="center" fontSize="1rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
            A New Version of This Page Available.
          </Text>
          <Button btnType="primary" pl="1.5rem" pr="1.5rem" onClick={() => window && window.location.reload()}>
            Reload
          </Button>
        </Div>
      </ResponsiveModal>
    );
  }
}

export default UpdateNotification;
