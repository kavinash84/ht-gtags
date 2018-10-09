import React, { Component } from 'react';
import MainSlider from 'components/MainSlider';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Text from 'hometown-components/lib/Text';
import Theme from 'hometown-components/lib/Theme';
import Header from '../ModularKitchenMicro/Header';

export default class PlanYourKitchen extends Component {
  render() {
    const styles = require('./PlanYourKitchen.scss');

    const sliderData = require('../../data/MKSlider.js');

    return (
      <Div display="block">
        <Header />
        <Section p="0" mb="0">
          <MainSlider data={sliderData} />
        </Section>
        <Section p="2.5rem 0" mb="0" className={`${styles.stepBlock} ${styles.step1Block}`}>
          <Container type="container" pr="0.5rem" pl="0.5rem" className={`${styles.stepContainer}`}>
            <Row ml="0" mr="0">
              <Div col="12">
                <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                  6 Easy steps to your dream Kitchen
                </Heading>
              </Div>
            </Row>
            <Div col="12" className={styles.content}>
              <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                Step 1 - Determine what you need
              </Heading>
              <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                The size of your family is the single most important criteria for determining the shape, sizeand storage
                requirements of your kitchen.
              </Text>
            </Div>
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0" className={`${styles.stepBlock} ${styles.step2Block}`}>
          <Container type="container" pr="0.5rem" pl="0.5rem" className={`${styles.stepContainer}`}>
            <Div col="12" className={styles.content}>
              <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                Step - 2 Decide your kitchen layout
              </Heading>
              <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                At Duracucine, we use the 3-C principal to plan your kitchen. Simply put the 3 Cs stand for cooking
                (hob), cleaning (sink) and cooling(refrigerator). These are considered to be the 3 vertices of a
                triangle, where the sum of distances between all 3 vertices should ideally be 20 feet. (use the kitchen
                layouts illustrations from the brochure)
              </Text>
              <ul>
                <li>Intelligent Kitchen</li>
                <li>Parallel Kitchen</li>
                <li>L-Shaped Kitchen</li>
                <li>L-Shaped Kitchen with Island</li>
                <li>U-Shaped Kitchen</li>
                <li>Straight Kitchen</li>
              </ul>
            </Div>
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0" className={`${styles.stepBlock} ${styles.step3Block}`}>
          <Container type="container" pr="0.5rem" pl="0.5rem" className={`${styles.stepContainer}`}>
            <Div col="12" className={styles.content}>
              <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                Step 3 - Choose your Cabinet
              </Heading>
              <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                Kitchen storage is a combination of base, wall and column units. At Duracucine, you can customise your
                storage cabinets from a wide range of shelving units to organised drawer systems. Strike a balance
                between shelving and drawer systems and avoid duplicating choice of cabinets unless it is necessary.
              </Text>
              <ul>
                <li>Wall Units</li>
                <li>Tall Units</li>
                <li>Loft</li>
              </ul>
            </Div>
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0" className={`${styles.stepBlock} ${styles.step4Block}`}>
          <Container type="container" pr="0.5rem" pl="0.5rem" className={`${styles.stepContainer}`}>
            <Div col="12" className={styles.content}>
              <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                Step 4 -Choose Your Accessories
              </Heading>
              <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                An extremely durable and waterproof plywood, its endurance to water exposure makes it ideal for kitchen
                use. The high-grade ply is known for its structural strength
              </Text>
              <ul>
                <li>Base Unit Accessories</li>
                <li>Tall Unit Accessories</li>
                <li>Wall Unit Accessories</li>
                <li>Dado Accessories</li>
                <li>Handles</li>
              </ul>
            </Div>
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0" className={`${styles.stepBlock} ${styles.step5Block}`}>
          <Container type="container" pr="0.5rem" pl="0.5rem" className={`${styles.stepContainer}`}>
            <Div col="12" className={styles.content}>
              <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                Step - 5 Choose Cabinet Material and Finish
              </Heading>
              <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                Family size, number of users, type of cookware and volume should determine the choice of material and
                finish for your kitchen cabinetry. Choose from over 100 finishes - solid colors, trendy patterns, wood
                textures to understated matt and glamorous high-gloss options to build your dream kitchen. At
                Duracucine, all the materials and finishes are durable, easy to maintain and resistant to scratch, heat
                and water.
              </Text>
              <ul>
                <li>Foil (Membrane)</li>
                <li>Laminate</li>
                <li>Acrylic</li>
                <li>PU</li>
                <li>Veneer</li>
                <li>R Gloss</li>
                <li>Glax (Looks of Glass and strength of Acrylic)</li>
                <li>Super Matt</li>
                <li>Polymer</li>
              </ul>
            </Div>
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0" className={`${styles.stepBlock} ${styles.step6Block}`}>
          <Container type="container" pr="0.5rem" pl="0.5rem" className={`${styles.stepContainer}`}>
            <Div col="12" className={styles.content}>
              <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                Step 6 - Choose Kitchen Appliances
              </Heading>
              <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                Choose your appliances that make your cooking chores easier. Do not over stuff. The most basic kit
                comprises of oven, hob and chimney, microwave and refrigerator. It is important to choose appliances
                that are energy efficient and make life simpler.
              </Text>
              <ul>
                <li>Hobs</li>
                <li>Chimney</li>
                <li>Built in Oven</li>
                <li>Microwave</li>
                <li>Dishwashers</li>
                <li>Sink</li>
              </ul>
            </Div>
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0" className={`${styles.stepBlock} ${styles.step7Block}`}>
          <Container type="container" pr="0.5rem" pl="0.5rem" className={`${styles.stepContainer}`}>
            <Div col="12" className={styles.content}>
              <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                Civil Work
              </Heading>
              <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                An extremely durable and waterproof plywood, its endurance to water exposure makes it ideal for kitchen
                use. The high-grade ply is known for its structural strength
              </Text>
              <ul>
                <li>Marine Ply</li>
                <li>HDF HMR</li>
                <li>MDF</li>
                <li>Glass</li>
              </ul>
            </Div>
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0" className={`${styles.stepBlock} ${styles.step8Block}`}>
          <Container type="container" pr="0.5rem" pl="0.5rem" className={`${styles.stepContainer}`}>
            <Div col="12" className={styles.content}>
              <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                Wall Solutions
              </Heading>
              <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                An extremely durable and waterproof plywood, its endurance to water exposure makes it ideal for kitchen
                use. The high-grade ply is known for its structural strength
              </Text>
              <ul>
                <li>Paint</li>
                <li>Wall Paper</li>
                <li>Tiles</li>
                <li>Acrolyc</li>
                <li>Solid Surface</li>
              </ul>
            </Div>
          </Container>
        </Section>
        <Section p="2.5rem 0" mb="0" className={`${styles.stepBlock} ${styles.step9Block}`}>
          <Container type="container" pr="0.5rem" pl="0.5rem" className={`${styles.stepContainer}`}>
            <Div col="12" className={styles.content}>
              <Heading mt="0" mb="0.625rem" color="text" fontSize="1.75rem" ta="center" fontFamily="light">
                Accessorization
              </Heading>
              <Text fontSize="0.875rem" mt="0.3125rem" ta="center" color={Theme.colors.textExtraLight}>
                An extremely durable and waterproof plywood, its endurance to water exposure makes it ideal for kitchen
                use. The high-grade ply is known for its structural strength
              </Text>
              <ul>
                <li>Lights</li>
                <li>Countertops</li>
                <li>Granite</li>
                <li>Marbel</li>
                <li>Acrolyc solid surface</li>
                <li>Quartz</li>
                <li>Onyx (Artificial Stone)</li>
              </ul>
            </Div>
          </Container>
        </Section>
      </Div>
    );
  }
}
