import React from 'react';
import "./card.css";

function Card({ card, handleChoice, flipped , disabled}) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        } 
    }
  
    return (
       <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} alt="card front" className="front" />
                <img src="/images/questiondog5.jpg" onClick={handleClick} alt="card back" className="back" />

            </div>
        </div>  

    )
  }
  
  export default Card