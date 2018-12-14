import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import { Label } from 'hometown-components/lib/Label';

const styles = require('./CategoryBar.scss');

const CategoryBar = ({ categoryBar, maxItem }) => (
  <Section mb="0" p="0">
    <Container>
      <Row justifyContent="center">
        {categoryBar.map((item, index) => {
          if (index < maxItem) {
            return (
              <Div className={`${styles.categoryBlock} ${styles.active}`} col="14" display="flex" pb="1rem">
                <Link to={`/${item.url_key}`} key={item.name}>
                  <Img width="80px" m="auto" src={item.icon_url ? item.icon_url : '/'} alt={item.name} />
                  <Label mt="0" mb="0" display="block" ta="center">
                    {item.name}
                  </Label>
                </Link>
              </Div>
            );
          }
          return null;
        })}
      </Row>
    </Container>
  </Section>
);

CategoryBar.defaultProps = {
  categoryBar: [],
  maxItem: 8 // default
};
CategoryBar.propTypes = {
  categoryBar: PropTypes.array,
  maxItem: PropTypes.number
};
export default CategoryBar;
