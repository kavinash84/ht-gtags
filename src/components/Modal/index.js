import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';

const ResponsiveModal = ({ open, onCloseModal, children }) => (
  <Modal open={open} onClose={onCloseModal} center className="customModal">
    {children}
  </Modal>
);

ResponsiveModal.defaultProps = {
  open: false
};

ResponsiveModal.propTypes = {
  open: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ResponsiveModal;
