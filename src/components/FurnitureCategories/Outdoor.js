import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Div from 'hometown-components-dev/lib/BoxHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';


class Outdoor extends React.Component {
    render() { 
        const { title , subtitle1 , url_key1, image1 , subtitle2 , url_key2, image2  } = this.props;
        return (
            <div>
            <Heading
              style={{
                textAlign: "center",
                color: "#323131",
                fontFamily: "medium",
                width: "90%",
                alignItems: "center",
                marginLeft: "5%",
                marginRight: "5%"
              }}
              fontSize="35px"
              mt="50px"
              pb="30px"
              pt="30px"
            >
              {title}
              <div
                style={{
                  width: "30px",
                  borderTop: "2px solid #222222",
                  margin: "auto",
                  marginBottom: "10px",
                  marginTop: "20px"
                }}
              />
            </Heading>

            <Div style={{display: "flex", justifyContent: "center", width: "90%", marginLeft:"5%"}}>
                <Div style={{margin:"0px 30px"}}>
                   <Link to={url_key1}>
                   <Image src={image1} style={{height:"400px", width:"400px"}}/>
                    <Text style={{textAlign:"center" , marginTop:"15px", fontWeight:"bold"}}>{subtitle1}</Text>
                   </Link>
                </Div>
                <Div style={{margin:"0px 30px"}}>
                   <Link to={url_key2}>
                   <Image src={image2} style={{height:"400px", width:"400px"}}/>
                    <Text style={{textAlign:"center", marginTop:"15px", fontWeight:"bold"}}>{subtitle2}</Text>
                   </Link>
                </Div>
            </Div>
          </div>
        );
    }
}
 
export default Outdoor;