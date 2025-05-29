import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import "./Memory.css";

const Memory = () => {
    const [dogImages, setDogImages] = useState([]);
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");
    const [gameStarted, setGameStarted] = useState(false);
    const [matches, setMatches] = useState(0);
    const [totalPairs, setTotalPairs] = useState(4);
    const [timer, setTimer] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    // Difficulty settings
    const difficultySettings = {
        easy: { pairs: 4, timeLimit: null },
        medium: { pairs: 6, timeLimit: 60 },
        hard: { pairs: 8, timeLimit: 45 }
    };

    // Fetching data from the API based on difficulty
    const fetchData = async () => {
        try {
            const pairs = difficultySettings[difficulty].pairs;
            const response = await fetch(`https://dog.ceo/api/breeds/image/random/${pairs}`);
            const data = await response.json();
            const images = data.message.map((fetchedImage) => ({ src: fetchedImage }));
            setDogImages(images);
            setTotalPairs(pairs);
            return images;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    useEffect(() => {
        if (gameStarted) {
            fetchData();
        }
    }, [difficulty, gameStarted]);

    // Shuffling the cards
    const shuffleCards = async () => {
        const images = await fetchData();
        const allImages = [...images, ...images];
        const shuffled = allImages
            .sort(() => Math.random() - 0.5)
            .map((dogImage, index) => ({
                id: Math.random() + index,
                src: dogImage.src,
                matched: false,
            }));
        setCards(shuffled);
        setTurns(0);
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

    // Start or reset timer when game starts or difficulty changes
    useEffect(() => {
        if (gameStarted) {
            const timeLimit = difficultySettings[difficulty].timeLimit;
            if (timeLimit) {
                setTimer(timeLimit);
            } else {
                setTimer(null);
            }
            setGameOver(false);
        }
    }, [gameStarted, difficulty]);

    // Timer countdown
    useEffect(() => {
        if (!gameStarted || gameOver) return;
        if (timer === null) return;
        if (timer === 0) {
            setGameOver(true);
            setDisabled(true);
            alert("Game Over! Time's up.");
            return;
        }
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [timer, gameStarted, gameOver]);

    // End game if all matches found (win)
    useEffect(() => {
        if (matches > 0 && matches === totalPairs) {
            setGameOver(true);
            setDisabled(true);
            alert(`Congratulations, you won in ${turns} turns!`);
        }
    }, [matches, totalPairs]);

    // Handle difficulty change
    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    };

    // Restarts the game completely
    const resetGame = () => {
        setGameStarted(false);
        setCards([]);
        setDogImages([]);
        setTurns(0);
        setMatches(0);
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
        setTimer(null);
        setGameOver(false);
        setTotalPairs(difficultySettings[difficulty].pairs);
    };

    return (
        <div className="shuffle-container">
            <div>
                <h1>Dog Memory Game</h1>
                <div className="game-info">
                    <p>Turns: {turns}</p>
                    <p>Matches: {matches}/{totalPairs}</p>
                    {difficultySettings[difficulty].timeLimit && (
                        <p>Time Left: {timer !== null ? timer : difficultySettings[difficulty].timeLimit} s</p>
                    )}
                </div>
            </div>

            {!gameStarted && (
                <>
                    <div className="difficulty-selector">
                        <h3>Select Difficulty:</h3>
                        <select value={difficulty} onChange={handleDifficultyChange}>
                            <option value="easy">Easy (4 pairs)</option>
                            <option value="medium">Medium (6 pairs, 1 min limit)</option>
                            <option value="hard">Hard (8 pairs, 45 sec limit)</option>
                        </select>
                    </div>
                    <div>
                        <button onClick={shuffleCards} className="shuffle-button">
                            Start Game
                        </button>
                    </div>
                </>
            )}

            {gameStarted && (
                <div>
                    <button onClick={resetGame} className="shuffle-button">
                        Restart Game
                    </button>
                </div>
            )}

            {gameStarted && (
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
            )}
        </div>
    );
};

export default Memory;