import React from 'react';
import "./card.css";

function Card({ card, handleChoice }) {
    const handleClick = () => {
        handleChoice(card);
    }
  
    return (
       <div className="card">
            <div>
                <img src={card.src} alt="card.front" className="dog-image"/>
                <img src="/images/questiondog5.jpg" onClick={handleClick} alt="card.back" className="back-image"/>
            </div>
        </div>  

    )
  }
  
  export default Card