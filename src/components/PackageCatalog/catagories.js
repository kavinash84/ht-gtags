import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Div from "hometown-components-dev/lib/BoxHtV1";
import CaroselContainer from "./carosel";
import SelectedItems from "./selectedProds";

const styles = require("./index.scss");

@connect(({ userLogin, lackpackages }) => ({
  openProdModal: lackpackages.openProdModal,
  updated: lackpackages.updated
}))
export default class Catagories extends Component {
  state = {
    catagory: ""
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  checkSelected = () => {
    const { catagory } = this.state;
    let selectedCount = 0;
    catagory.products.map(item => {
      if (item.isSelected) {
        selectedCount = selectedCount + 1;
      }
    });
    if (selectedCount === catagory.total_qty) {
      return true;
    } else {
      return false;
    }
  };

  componentDidMount() {
    const { cat } = this.props;
    this.setState({ catagory: cat });
  }

  componentDidUpdate(prevProps) {
    if (this.props.updated !== prevProps.updated) {
      const { cat } = this.props;
      this.setState({ catagory: cat });
    }
  }

  render() {
    const { index, handlePlpModal } = this.props;
    const { catagory } = this.state;
    return (
      <div>
        {catagory ? (
          <React.Fragment>
            {this.checkSelected() ? (
              <SelectedItems
                handlePlpModal={handlePlpModal}
                cat={catagory}
                index={index}
              />
            ) : (
              <CaroselContainer data={catagory} index={index} />
            )}
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
