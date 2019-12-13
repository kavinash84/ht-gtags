import React, { Component } from 'react';
import ResponsiveModal from 'components/Modal';
import Button from 'hometown-components-dev/lib/Buttons';
import Div from 'hometown-components-dev/lib/Div';
import Text from 'hometown-components-dev/lib/Text';
import Img from 'hometown-components-dev/lib/Img';

class UpdateNotification extends Component {
  state = {
    active: false
  };
  componentDidMount() {
    window.addEventListener('updatesFound', this.handleToggle);
  }
  componentWillUnmount() {
    window.removeEventListener('updatesFound', this.handleToggle);
  }
  handleToggle = () => {
    this.setState({ active: true });
  };
  render() {
    const styles = require('./UpdateNotice.scss');
    const reloadIcon = require('../../../static/reload-browser.svg');

    return (
      <ResponsiveModal
        open={this.state.active}
        onCloseModal={() => window && window.location.reload()}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <Div className={styles.UpdateNoticeWrapper} ta="center">
          <Img m="0 auto 5px" width="125px" src={reloadIcon} alt="Reload Page" />
          <Text ta="center" fontSize="1rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
            A new version of this page available.
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
