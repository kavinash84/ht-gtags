import React, { Component } from 'react';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import { connect } from 'react-redux';

@connect(({ modularwardrobe }) => ({
    modularwardrobe,
    newWardrobe: modularwardrobe.data.items.text.newWardrobe
  }))

class Steps extends React.Component {
    render() { 
        const { newWardrobe } = this.props;
        return (
         <Box style={{width: '100%', marginTop: '70px', position: 'relative'}}>
             <Image data-src={newWardrobe.image} src={`${newWardrobe.image}?blur=30`} style={{width: '85%',height:'80%', minHeight: '80%'}}/>
             <Box style={{ display: 'flex' }}>
          <Box
            m="auto"
            style={{
              width: '35%',
              height: '80%',
              border: '1px solid #FCE1D1',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 5px 10px #0000001A',
              position: 'absolute',
              top: '10%',
              right: '0'
            }}
            p="10px 50px"
            pb="30px"
          >
            <Heading
              ta="left"
              color="#1D1D1D"
              fontSize="26px"
              fontFamily="regular"
              p="0 10px"
              style={{ whiteSpace: 'normal', lineHeight: '31px' , fontWeight:'bold', marginTop:'8%', marginBottom:'15px',lineHeight:'34px'}}
            >
              {newWardrobe.title}
            </Heading>
            <Box p="0px 10px" pr="0px">
              {newWardrobe.texts.map((val, index) => (
                <Box key={index} style={{ display: 'flex' }}>
                  <Box
                    mt="5px"
                    mb="5px"
                    style={{
                      width: '25px',
                      height: '25px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#E0DFDF',
                      borderRadius: '50%',
                      fontSize: '12px',
                     fontWeight:'bold'
                    }}
                    mr="15px"
                    fontSize="12px"
                  >
                    {val.number}
                  </Box>
                  <Box mt="8px" mb="5px" style={{fontSize:'14px', color:'#323131'}}>
                    {val.value}
                  </Box>
                </Box>
              ))}
              <div
                style={{
                  height: '120px',
                  width: '1px',
                  border: '1px dashed #E0DFDF',
                  marginTop: '-125px',
                  marginLeft: '10px'
                }}
              ></div>
            </Box>
            <Box ta="center" mt="30px">
              <Button
                type="button"
                btnType="custom"
                p="8px 12px"
                bg="white"
                m="0 10px"
                color="#F47020"
                style={{ fontSize: '14px' , textTransform:'none', border: '1px solid #F47020', borderRadius:'5px'}}
                onClick={this.props.handleModal}
              >
                Speak to our Experts
              </Button>
            </Box>
          </Box>
        </Box>
         </Box>
        );
    }
}
 
export default Steps;