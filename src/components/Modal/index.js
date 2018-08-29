import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';

const ResponsiveModal = ({
  open, onCloseModal, children, classNames
}) => (
  <Modal classNames={classNames} open={open} onClose={onCloseModal} center>
    {children}
  </Modal>
);

ResponsiveModal.defaultProps = {
  open: false,
  classNames: {}
};

ResponsiveModal.propTypes = {
  open: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  classNames: PropTypes.object,
  children: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ResponsiveModal;
