import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Row from "hometown-components-dev/lib/RowHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
// import Button from 'components/Buttons';
import Div from "hometown-components-dev/lib/BoxHtV1";
import { Link } from "react-router-dom";
import ImageShimmer from "hometown-components-dev/lib/ImageShimmerHtV1";

const LinkCustom = styled(Link)`
  display: inline-block;
`;

const ProductImg = styled(Img)`
  position: absolute;
  max-width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  border-radius: 30px;
`;

const ImgWrapper = styled.div`
  background: #fff;
  position: relative;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
  margin-bottom: 0.3125rem;
`;

// const CurrentImgWrapper = styled.div`
//   background: #fff;
//   position: relative;
//   display: inline-block;
//   box-sizing: border-box;
//   width: 40px;
//   height: 40px;
//   margin-right: 0.5rem;
//   margin-bottom: 0.3125rem;
// `;

const ColorOptions = styled(Div)`
  max-height: 150px;
  overflow: auto;
  ${props =>
    props.active && {
      maxHeight: "inherit"
    }}
`;
const urlName = name =>
  name
    .split(" ")
    .join("-")
    .toLowerCase();

const ColorOption = ({
  data,
  toggleShowMoreColorProducts,
  showmorecolorproducts
}) => (
    <Row mr="0" ml="0" mb="0" display="block">
      <ColorOptions active={!showmorecolorproducts}>
        {data.map((item, index) => (
          <LinkCustom
            to={`/${urlName(item.meta.name)}/sku/${item.groupedattributes.sku}`}
            key={String(index)}
          >
            <ImgWrapper>
              <ImageShimmer src={`${item.image}.jpg`} height="60px">
                {imageURL => (
                  <ProductImg src={imageURL} alt={item.meta.name} width="60px" />
                )}
              </ImageShimmer>
            </ImgWrapper>
          </LinkCustom>
        ))}
      </ColorOptions>
      {data.length > 5 && (
        <Div>
          <Button
            btnType="link"
            size="block"
            ta="right"
            color="#f98d29"
            pt="15px"
            pr="64px"
            onClick={toggleShowMoreColorProducts}
          >
            {showmorecolorproducts ? "Show More Products" : "Show Less"}
          </Button>
        </Div>
      )}
    </Row>
  );
ColorOption.defaultProps = {
  showmorecolorproducts: true,
  toggleShowMoreColorProducts: () => { }
};
ColorOption.propTypes = {
  data: PropTypes.array.isRequired,
  showmorecolorproducts: PropTypes.bool,
  toggleShowMoreColorProducts: PropTypes.func
};

export default ColorOption;
