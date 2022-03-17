import React from "react";

const dollericon = require("../../../static/cart/dollericon.svg");
const message = require("../../../static/cart/message.svg");
const phone = require("../../../static/cart/phone.svg");

const styles = require("./Cart.scss");

const HappyToHelp = ({ data }) => {
  return (
    <div className={styles.helpuContainer}>
      <div className={styles.helpuHeader}>Happy To Help</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around"
        }}
      >
        <div className={styles.helpuitem}>
          <img src={phone} alt="phone" className={styles.helpuimg} />
          <div className={styles.helputext}>
            Call us at <br></br>{" "}
            <span style={{ color: "black" }}>{data.items.text.phone}</span>
          </div>
        </div>
        <div className={styles.helpuitem}>
          <img src={message} alt="phone" className={styles.helpuimg} />
          <div className={styles.helputext}>
            Write to us at <br />
            <span style={{ color: "black" }}>{data.items.text.email}</span>
          </div>
        </div>
        <div className={styles.helpuitem}>
          <img src={dollericon} alt="phone2" className={styles.helpuimg} />
          <div className={styles.helputext} style={{ color: "black" }}>
            Easy returns Policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappyToHelp;
