import React from "react";

const BedIcon = require("../../../static/exchangeWarning/bed.svg");
const DiningTable = require("../../../static/exchangeWarning/diningTable.svg");
const MattressIcon = require("../../../static/exchangeWarning/mattress.svg");
const OtheresFurnitureIcons = require("../../../static/exchangeWarning/otherFurnitures.svg");
const SofaIcon = require("../../../static/exchangeWarning/sofa.svg");
const WardrobeIcon = require("../../../static/exchangeWarning/wardrobe.svg");

const ModalData = [
  {
    img: SofaIcon,
    title: "Sofas",
    text: ["3 Seater ₹40,000", "2 Seater ₹25,000", "1 Seater ₹10000"]
  },
  {
    img: BedIcon,
    title: "Beds",
    text: ["Any bed ₹30000"]
  },
  {
    img: WardrobeIcon,
    title: "Wardrobes",
    text: ["2 Door ₹20,000", "3/4 Door ₹25,000"]
  },
  {
    img: DiningTable,
    title: "Dining Table Set",
    text: ["(Table + Chairs) ₹30,000"]
  },
  {
    img: OtheresFurnitureIcons,
    title: "Other Furniture",
    text: ["Flat ₹5000"]
  },
  {
    img: MattressIcon,
    title: "Mattress",
    text: ["₹8000"]
  }
];

const ExchangeWarning = props => {
  return (
    <div style={{ width: "800px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F5F5F5",
          width: "100%",
          padding: "20px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px"
        }}
      >
        <div
          style={{
            padding: "10px",
            border: "1px dotted #707070",
            background: "#FFF8F4",
            color: "#323131",
            borderRadius: "3px"
          }}
        >
          EXCHANGE25
        </div>
        <div style={{ color: "#F47020", marginLeft: "15px" }}>
          Exchange Coupon Code Policy
        </div>
      </div>
      <div
        style={{
          background: "white",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px"
        }}
      >
        <div
          style={{ color: "#F47020", padding: "20px 15%", textAlign: "center" }}
        >
          “Exchange25” coupon is ONLY applicable in exchange of old furniture{" "}
          <br />
          Do you wish to continue
        </div>
        <div
          style={{
            display: "flex",
            // alignItems: "center",
            color: "#686868",
            width: "100%",
            padding: "0px 25px",
            justifyContent: "space-between"
          }}
        >
          {ModalData.map(item => (
            <div style={{ padding: "15px" }}>
              <div
                style={{
                  height: "80px",
                  width: "80px",
                  display: "flex",
                  flexDirection: "column-reverse",
                  margin: "auto"
                }}
              >
                <img
                  src={item.img}
                  alt="Productitemicon"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div
                style={{
                  marginTop: "15px",
                  fontSize: "14px",
                  textAlign: "center",
                  wordBreak: "keep-all"
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  wordBreak: "keep-all",
                  whiteSpace: "nowrap"
                }}
              >
                {item.text.map(txt => (
                  <div>{txt}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "20px",
            color: "#707070",
            textAlign: "center",
            fontSize: "14px"
          }}
        >
          Eg: Exchange value of old bed is ₹30,000, so you can buy upto ₹1,20,000
          to avail this ₹30,000 discount (25% Discount)
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0px 30px"
          }}
        >
          <button
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #F47020",
              background: "white",
              marginRight: "10px",
              width: "100px",
              cursor: "pointer"
            }}
            onClick={() => props.handleNo()}
          >
            No
          </button>
          <button
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              background: "#F47020",
              marginLeft: "10px",
              width: "100px",
              color: "white",
              cursor: "pointer"
            }}
            onClick={() => props.handleYes()}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeWarning;
