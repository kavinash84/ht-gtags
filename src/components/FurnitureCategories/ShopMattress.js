import React, { Component } from 'react'
import Image from "hometown-components-dev/lib/ImageHtV1";
import { Link } from "react-router-dom";
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

class ShopMattress extends React.Component {
    render() { 
      const { title , image , url_key } = this.props;
        return (
            <div style={{ marginTop: "80px" }}>
            <div className="gradient-sleep" style={{backgroundColor:"#FFF8F4", paddingBottom:"50px"}}>
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
                backgroundColor="#FFF8F4"
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

              <Link to={url_key}>
            <Image
              src={image}
              alt="ForABetterSleep"
              style={{
                width: "80%",
                alignItems: "center",
                marginLeft: "10%"
              }}
            />
            </Link>
            </div>
            </div>
        );
    }
}
 
export default ShopMattress;

