import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';

const ResponsiveModal = ({
  open, onCloseModal, children, classNames, ...rest
}) => (
  <Modal classNames={classNames} open={open} onClose={onCloseModal} center {...rest}>
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
  children: PropTypes.any.isRequired
};

export default ResponsiveModal;
