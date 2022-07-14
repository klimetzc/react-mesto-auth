import React from "react";
import Popup from "./Popup";
import OK from "../images/OK.svg";
import NOTOK from "../images/NOTOK.svg";

const InfoTooltip = (props) => {
  return (
    <Popup opened={props.opened} type={props.type}>
      {props.isPositive ? (
        <img className="tooltip__image" src={OK} alt="ок" />
      ) : (
        <img className="tooltip__image" src={NOTOK} alt="не ок" />
      )}
      <p className="tooltip__message">{props.message}</p>
    </Popup>
  );
};

export default InfoTooltip;
