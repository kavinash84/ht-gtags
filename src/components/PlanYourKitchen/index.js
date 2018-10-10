import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainSlider from 'components/MainSlider';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Theme from 'hometown-components/lib/Theme';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import ModularKitchenForm from '../ModularKitchenMicro/ModularKitchenForm';

const sections = require('../../data/plankitchen');

export default class PlanYourKitchen extends Component {
  render() {
    const styles = require('./PlanYourKitchen.scss');
    const sliderData = require('../../data/MKSlider.js');
    const mkLogo = require('../../../static/mkLogo.png');

    return (
      <Div display="block">
        <Section p="20px 0" mb="0">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row ml="0" mr="0">
              <Div col="7">
                <Link to="/modular-kitchens-micro">
                  <Img height="40px" width="auto" mr="15px" float="left" src={mkLogo} alt="" />
                </Link>
                <Text color="#614839">The world of stylist and durable kitchens</Text>
              </Div>
              <Div col="5" ta="right">
                <ul className={styles.menuMk}>
                  <li>
                    <Link to="/modular-kitchens-micro">Home</Link>
                  </li>
                  <li>
                    <Link to="/plan-your-kitchen">Plan Your Kitchen</Link>
                  </li>
                </ul>
              </Div>
            </Row>
          </Container>
        </Section>
        <Section p="0" mb="0">
          <MainSlider data={sliderData} />
          <Container className={styles.mkWrapper}>
            <ModularKitchenForm />
          </Container>
        </Section>
        {sections.map(item => (
          <Section p="0" mb="0" className={`${styles.stepBlock} ${styles[item.class]}`}>
            <MainSlider data={sliderData} />
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
                  {item.items.map(list => (
                    <li>
                      <Button btnType="custom" bc="transparent" p="10px 0" border="none" size="block" ta="left">
                        {list.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </Div>
            </Container>
          </Section>
        ))}
      </Div>
    );
  }
}
