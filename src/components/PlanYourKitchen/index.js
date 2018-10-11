import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainSlider from 'components/MainSlider';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Theme from 'hometown-components/lib/Theme';
import Button from 'hometown-components/lib/Buttons';
import { smoothScroll } from 'utils/helper';
import Header from '../ModularKitchenMicro/Header';

import ModularKitchenForm from '../ModularKitchenMicro/ModularKitchenForm';

const newSettings = {
  autoplay: false,
  arrows: false
};

@connect(({ services }) => ({
  ...services.plankitchen
}))
export default class PlanYourKitchen extends Component {
  constructor(props) {
    super(props);
    const { results } = props;
    if (results && results.items) {
      const {
        items: {
          text: { sections }
        }
      } = results;
      sections.map(item => {
        this[item.name] = React.createRef();
        return null;
      });
    }
  }
  render() {
    const styles = require('./PlanYourKitchen.scss');
    const { results } = this.props;
    return (
      <Div display="block">
        <Header />
        <Section p="0" mb="0">
          {results && <MainSlider data={results.items.text.banner} />}
          <Container className={styles.mkWrapper}>
            <ModularKitchenForm />
          </Container>
        </Section>
        {results &&
          results.items.text.sections.map(item => (
            <Section p="0" mb="0" className={`${styles.stepBlock} ${styles[item.class]}`} key={item.name}>
              <MainSlider data={item.items} newSettings={newSettings} reference={this[item.name]} />
              <Container type="container" pr="0.5rem" pl="0.5rem" className={`${styles.stepContainer}`}>
                <Row ml="0" mr="0">
                  <Div col="12">
                    <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                      {item.title}
                    </Heading>
                  </Div>
                </Row>
                <Div col="12" className={styles.content}>
                  <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                    {item.name}
                  </Heading>
                  <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                    {item.data}
                  </Text>
                  <ul>
                    {item.items.map((list, index) => (
                      <li key={String(index)}>
                        <Button
                          btnType="custom"
                          bc="transparent"
                          p="10px 0"
                          border="none"
                          size="block"
                          ta="left"
                          onClick={() => {
                            this[item.name].current.slider.current.slickGoTo(index);
                          }}
                        >
                          {list.title}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Div>
              </Container>
            </Section>
          ))}
        <Section p="4rem 0" mb="0" bg="microBg">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div col="1" />
              <Div col="10" ta="center">
                <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  Why to wait, get started now!
                </Heading>
                <Text fontSize="0.875rem" mt="0.3125rem" mb="1rem" ta="center" color={Theme.colors.textExtraLight}>
                  At Duracucine, we believe in turning your everyday activities like cooking and eating into a feast.
                  And that’s why we build bespoke kitchens for you. Whatever your requirements are for your favourite
                  space, we make it happen. Because we believe you just don’t cook in your kitchen, you create, you
                  indulge, you live.
                </Text>
                <Button
                  type="button"
                  btnType="custom"
                  p=".5rem 2rem"
                  bg={Theme.colors.mkPrimary}
                  color="white"
                  onClick={() => smoothScroll(12)}
                >
                  Book Now
                </Button>
              </Div>
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}
PlanYourKitchen.defaultProps = {
  results: null
};
PlanYourKitchen.propTypes = {
  results: PropTypes.object
};
