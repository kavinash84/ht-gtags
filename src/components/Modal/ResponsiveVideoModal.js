import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';

const ResponsiveVideoModal = ({
 open, onCloseModal, children, classNames, ...rest
}) => (
  <Modal
    classNames={classNames}
    open={open}
    onClose={onCloseModal}
    center
    {...rest}
    styles={{ overlay: { padding: '0px' } }}
  >
    {children}
  </Modal>
);

ResponsiveVideoModal.defaultProps = {
  open: false,
  classNames: {}
};

ResponsiveVideoModal.propTypes = {
  open: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  classNames: PropTypes.object,
  children: PropTypes.any.isRequired
};

export default ResponsiveVideoModal;
