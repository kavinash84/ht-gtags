import React, { Component } from "react";
import Footer from "components/Footer";
import { Link } from "react-router-dom";
import { BASE_IMAGE_URL } from "helpers/Constants";

import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
class NewHomepage extends Component {
  constructor() {
    super();
    this.state = {
      videos: [
        {
          id: 0,
          url: "https://www.youtube.com/embed/xq4AxgAJ5OA?autoplay=1&mute=1",
          title: "Make Space for New with Home Town"
        },
        {
          id: 1,
          title: "Make Space for New with HomeTown Recliners",
          url: "https://www.youtube.com/embed/_2_45l2qR4A"
        },
        {
          id: 2,
          url: "https://www.youtube.com/embed/50ACf_U-VWA",
          title: "Make Space for New with HomeTown Beds"
        },
        {
          id: 3,
          url: "https://www.youtube.com/embed/s3eSu8pu0lE",
          title: "Make Space for New with HomeTown Dining Tables"
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1%"
            }}
          >
            <img style={{ width: "15%", height: "auto" }} src={`${BASE_IMAGE_URL}/media/cms/extras-desktop/MakespaceforNewlogo.png`} />
            <Link
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
              to="/"
            >
              <img
                style={{ width: "100%", height: "100px" }}
                src={`${BASE_IMAGE_URL}/media/cms/extras-desktop/HT-LOGO-cs2-single.png`}
              />
            </Link>
          </div>
          {/* main vedio */}
          {this.state.videos.map((video, index) => (
            <div
              style={{ width: "100%", height: "100%", marginTop: "1%" }}
              onClick={this.handleClick}
            >
              <iframe
                key={index}
                style={{ width: "60%", marginLeft: "20%", height: "500px" }}
                src={video.url}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <p
                style={{
                  width: "60%",
                  textAlign: "left",
                  fontSize: "30px",
                  margin: "20px 20%"
                }}
              >
                {video.title}
              </p>
            </div>
          ))}
        </div>
        {/* vedios section */}
        {/* {this.state.videos.map((video, index) => (
            <div
              style={{
                display: "flex",
                width: "90%",
                justifyContent: "center",
                margin: "30px 5%",
                flexDirection: "row"
              }}
              key={index}
            >
              <div
                style={{ width: "20%", margin: "0 10px" }}
                onClick={video => this.handleClick(video)}
              >
                <iframe
                  src={video.url}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <p style={{ fontSize: "18px" }}>make space for new</p>
              </div>
            </div>
          ))} */}

        {/* who are we section */}

        <div style={{ width: "90%", marginLeft: "5%", marginTop: "20px" }}>
          <HeadingHtV1
            mb="20px"
            mt="10px"
            fontSize="30px"
            style={{
              color: "#000",
              fontFamily: "medium"
            }}
          >
            Make Space for New
          </HeadingHtV1>
          <p style={{ fontSize: "20px", color: "#888888" }}>
            From building your first home together to experiencing the joy of
            welcoming your first child, to seeing your children grow up, to
            fulfilling all your dreams and aspirations …your home grows as your
            life plays out.
          </p>
          <p style={{ marginTop: "10px", fontSize: "20px", color: "#888888" }}>
            HomeTown helps you renew your home to match your requirements and
            aspirations at every significant event in your life by providing you
            with furniture, decor, furnishings, modular solutions and home
            interior services matching every rhythm of your changing life.
          </p>
          <Link
            onClick={() => {
              sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
            }}
            to="/?utm_source=Landing-Page&utm_medium=CPV&utm_campaign=MSFN-Brand-Relaunch"
          >
            <p
              style={{
                margin: "20px 0 20px",
                fontSize: "18px",
                color: " rgba(51,51,51,0.85)",
                fontWeight: "bold"
              }}
            >
              Visit Our Website
            </p>
          </Link>
        </div>
        {/* footer */}
        <Footer />
      </div>
    );
  }
}

export default NewHomepage;
