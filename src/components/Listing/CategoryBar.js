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

const CategoryBar = ({ categoryBar }) => (
  <Section mb="0" p="0">
    <Container>
      <Row>
        {categoryBar.map(item => (
          <Div className={styles.categoryBlock} display="flexEqual" pb="1rem">
            <Link to={`/${item.url_key}`} key={item.name}>
              <Img width="100px" m="auto" src={item.icon_url ? item.icon_url : '/'} alt={item.name} />
              <Label mt="-0.625rem" display="block" ta="center">
                {item.name}
              </Label>
            </Link>
          </Div>
        ))}
      </Row>
    </Container>
  </Section>
);

CategoryBar.defaultProps = {
  categoryBar: []
};
CategoryBar.propTypes = {
  categoryBar: PropTypes.array
};
export default CategoryBar;
