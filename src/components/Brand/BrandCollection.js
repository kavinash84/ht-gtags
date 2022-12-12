import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

import styles from "./lauraAshley.scss";

const BrandCard = ({ imgUrl, title, content, odd, url }) => (
  <Link to={url} target="_blank" rel="noopener">
    <Row className={styles.CollectionRow} my={10}>
      <Col
        variant="col-7"
        className={odd ? styles.orderTwo : styles.orderOne}
        pl={0}
        pr={0}
      >
        <Box className={styles.CollectionCard}>
          <Image width="100%" src={imgUrl} alt="Card image cap" />
        </Box>
      </Col>
      <Col variant="col-5" className={odd ? styles.orderOne : styles.orderTwo}>
        <Box className={styles.CollectionCard}>
          <Text fontSize={50} mb={10} color={"#a4b9c8"}>
            {content}
          </Text>

          <Text
            fontSize={24}
            pl={10}
            pr={10}
            lineHeight={1.4}
            letterSpacing={"0.1em"}
            textAlign={"center"}
          >
            {title}
          </Text>
          <Text fontSize={24} mt={20} sx={{ textDecoration: "underline" }}>
            SHOP {content.toUpperCase()}
          </Text>
        </Box>
      </Col>
    </Row>
  </Link>
);

const BrandCollection = ({ CollectionData }) => (
  <Box>
    <Box className={styles.CollectionSteps}>
      <Box className="container">
        <Box className="body">
          {CollectionData.map((item, index) => (
            <BrandCard
              key={String(index)}
              content={item.content}
              title={item.title}
              imgUrl={item.imgUrl}
              odd={index % 2 !== 0}
              url={item.url}
            />
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
);

BrandCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  odd: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};
BrandCollection.propTypes = {
  CollectionData: PropTypes.array.isRequired
};

export default BrandCollection;
