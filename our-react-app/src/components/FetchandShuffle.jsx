import React from "react";
import { useEffect, useState } from "react"
import Card from "./card.jsx";
import "./FetchandShuffle.css";

const FetchAndShuffle = () => {

    const [dogImages, setDogImages] = useState([]);
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false)

    // Fetching data from the API and feeding it to dogImages
    const fetchData = async () => {
        try {
            const response = await fetch ("https://dog.ceo/api/breeds/image/random/4")
            const data = await response.json();
            setDogImages(data.message.map((fetchedImage) => ({src: fetchedImage}))); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect (() => {fetchData()} , []);

    // Shuffling the cards
    const shuffleCards = () => {
        const shuffled = [...dogImages, ...dogImages]
            .sort(() => Math.random() - 0.5)
            .map((dogImages) => ({
                    id: Math.random(),
                    src: dogImages.src,
                    matched: false,
            }));
        setCards(shuffled);
        setTurns(0);
    };

    // Handling the choice of cards
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };  
    
    // Checking if the two choices are the same
    useEffect(() => {
        
    if (choiceOne && choiceTwo) {
        setDisabled(true)
        if (choiceOne.src === choiceTwo.src) {
            console.log("Match!");
            setCards(prevCards => {
                return prevCards.map(card => {
                    if (card.src === choiceOne.src) {
                        return { ...card, matched: true };
                    } else {
                        return card;
                    }
                });
            });
            resetTurn();
        } else {
            console.log("Not a match!");
            setTimeout(() => resetTurn(), 1000); 
        }
    }
}, [choiceOne, choiceTwo]);

    // Resetting the turn
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false)
    }

        return (
        <div className="shuffle-container">
            <div>
                <h1>Dog Memory Game </h1>
            </div>
        <div>
            <button onClick={shuffleCards} className="shuffle-button">Shuffle</button>
        </div>

        <div className="card-grid">
            {cards.map((card) => (
                <Card  
                key={card.id} 
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled}
                />      
            ))}
        </div>
        </div>
        )

}

export default FetchAndShuffle;