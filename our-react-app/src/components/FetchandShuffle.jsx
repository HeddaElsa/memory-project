import React from "react";
import { useEffect, useState } from "react";
import Card from "./card.jsx";
import "./FetchandShuffle.css";

const FetchAndShuffle = () => {
    const [dogImages, setDogImages] = useState([]);
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState("easy"); // easy, medium, hard
    const [gameStarted, setGameStarted] = useState(false);
    const [matches, setMatches] = useState(0);
    const [totalPairs, setTotalPairs] = useState(4); // Default for easy

    // Difficulty settings
    const difficultySettings = {
        easy: { pairs: 4, timeLimit: null, pointsPerMatch: 10 },
        medium: { pairs: 6, timeLimit: 60, pointsPerMatch: 20 },
        hard: { pairs: 8, timeLimit: 45, pointsPerMatch: 30 }
    };

    // Fetching data from the API based on difficulty
    const fetchData = async () => {
        try {
            const pairs = difficultySettings[difficulty].pairs;
            const response = await fetch(`https://dog.ceo/api/breeds/image/random/${pairs}`);
            const data = await response.json();
            setDogImages(data.message.map((fetchedImage) => ({ src: fetchedImage })));
            setTotalPairs(pairs);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (gameStarted) {
            fetchData();
        }
    }, [difficulty, gameStarted]);

    // Shuffling the cards
    const shuffleCards = () => {
        const shuffled = [...dogImages, ...dogImages]
            .sort(() => Math.random() - 0.5)
            .map((dogImages, index) => ({
                id: Math.random() + index,
                src: dogImages.src,
                matched: false,
            }));
        setCards(shuffled);
        setTurns(0);
        setScore(0);
        setMatches(0);
        setGameStarted(true);
    };

    // Handling the choice of cards
    const handleChoice = (card) => {
        if (disabled || card.matched || card === choiceOne) return;
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    // Checking if the two choices are the same
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                console.log("Match!");
                const pointsEarned = difficultySettings[difficulty].pointsPerMatch;
                setScore(prev => prev + pointsEarned);
                setMatches(prev => prev + 1);
                
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
        setDisabled(false);
    };

    // Check if game is won
    useEffect(() => {
        if (matches > 0 && matches === totalPairs) {
            alert(`Congratulations! You won with ${score} points in ${turns} turns!`);
        }
    }, [matches, totalPairs]);

    // Handle difficulty change
    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    };

    return (
        <div className="shuffle-container">
            <div>
                <h1>Dog Memory Game</h1>
                <div className="game-info">
                    <p>Turns: {turns}</p>
                    <p>Score: {score}</p>
                    <p>Matches: {matches}/{totalPairs}</p>
                </div>
            </div>

            {!gameStarted && (
                <div className="difficulty-selector">
                    <h3>Select Difficulty:</h3>
                    <select value={difficulty} onChange={handleDifficultyChange}>
                        <option value="easy">Easy (4 pairs)</option>
                        <option value="medium">Medium (6 pairs, 1 min limit)</option>
                        <option value="hard">Hard (8 pairs, 45 sec limit)</option>
                    </select>
                </div>
            )}

            <div>
                <button onClick={shuffleCards} className="shuffle-button">
                    {gameStarted ? "Restart Game" : "Start Game"}
                </button>
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
    );
};

export default FetchAndShuffle;