import React, { useState } from "react";
import Contact from "../Contact/Contact";
import "./Header.css";

const Header = () => {
  const [card, setCard] = useState(false);
  return (
    <div className="allHeader">
      {card && (
        <div className="side">
          <Contact />
        </div>
      )}
      {card && <div className="blank" onClick={() => setCard(false)}></div>}
      <div className="header">
        <div className="icons">
          <button href="" className="parameter">
            Support
          </button>
          <button onClick={() => setCard(true)} className="parameter">
            contact
          </button>
          <button className="parameter">night theme</button>
        </div>

        <p className="logo">Minimalist</p>
      </div>
    </div>
  );
};

export default Header;
