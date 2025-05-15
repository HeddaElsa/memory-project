import React from 'react';
import "./card.css";

function Card({card}) {
  
    return (
    <div>
       <div className="card">
            <div className="card">
                <img src={card.src} alt="card.front" className="dog-image"/>
                <img src="/images/questiondog5.jpg" alt="card.back" className="back-image"/>
            </div>
        </div>  
    </div>
    )
  }
  
  export default Card