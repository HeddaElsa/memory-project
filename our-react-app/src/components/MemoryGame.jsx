import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame = () => {
  const difficultyLevels = [
    { name: 'Easy', cardCount: 8, maxMoves: 20, columns: 4 },    // 4x2 grid
    { name: 'Medium', cardCount: 12, maxMoves: 30, columns: 4 },   // 4x3 grid
    { name: 'Difficult', cardCount: 16, maxMoves: 40, columns: 4 }     // 4x4 grid
  ];

  const emojiPool = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦'];

  const [selectedDifficulty, setSelectedDifficulty] = useState(difficultyLevels[0]);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [remainingMoves, setRemainingMoves] = useState(difficultyLevels[0].maxMoves);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const createCards = () => {
    const selectedEmojis = emojiPool.slice(0, selectedDifficulty.cardCount / 2);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    
    return cardPairs
      .map((emoji, index) => ({ 
        id: index, 
        emoji, 
        flipped: false, 
        matched: false 
      }))
      .sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    const newCards = createCards();
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setRemainingMoves(selectedDifficulty.maxMoves);
    setGameCompleted(false);
    setGameOver(false);
    setGameStarted(true);
  };

  const changeDifficulty = (level) => {
    setSelectedDifficulty(level);
    if (gameStarted) {
      startGame();
    }
  };

  const flipCard = (id) => {
    if (!gameStarted || gameCompleted || gameOver) return;
    
    const card = cards.find(card => card.id === id);
    if (card.flipped || card.matched || flippedCards.length === 2) return;

    const newCards = cards.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);
    
    if (flippedCards.length === 1) {
      const newMoves = moves + 1;
      setMoves(newMoves);
      setRemainingMoves(selectedDifficulty.maxMoves - newMoves);
    }
    
    setFlippedCards(prev => [...prev, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard.emoji === secondCard.emoji) {
        const newCards = cards.map(card => 
          card.id === firstId || card.id === secondId ? { ...card, matched: true } : card
        );
        setCards(newCards);
        setFlippedCards([]);

        if (newCards.every(card => card.matched)) {
          setGameCompleted(true);
        }
      } else {
        setTimeout(() => {
          const newCards = cards.map(card => 
            card.id === firstId || card.id === secondId ? { ...card, flipped: false } : card
          );
          setCards(newCards);
          setFlippedCards([]);
          
          if (moves >= selectedDifficulty.maxMoves) {
            setGameOver(true);
          }
        }, 1000);
      }
    }
  }, [flippedCards]);

  const getGridStyle = () => {
    const columns = selectedDifficulty.columns;
    const rows = Math.ceil(selectedDifficulty.cardCount * 2 / columns);
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: '10px'
    };
  };

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      
      {!gameStarted ? (
        <div className="game-setup">
          <h2>Select Difficulty Level</h2>
          <div className="difficulty-buttons">
            {difficultyLevels.map((level, index) => (
              <button
                key={index}
                className={selectedDifficulty.name === level.name ? 'active' : ''}
                onClick={() => changeDifficulty(level)}
              >
                {level.name} ({level.cardCount/2} Double, {level.maxMoves} Move)
              </button>
            ))}
          </div>
          <button className="start-button" onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <>
          <div className="game-info">
            <div className="stats">
              <p>Difficulty: {selectedDifficulty.name}</p>
              <p>Move: {moves} / {selectedDifficulty.maxMoves}</p>
              <p>Remaining moves: {remainingMoves}</p>
            </div>
            <button onClick={startGame}>Restart</button>
          </div>
          
          {gameCompleted && (
            <div className="game-message success">
              <h2>Congratulations! You won the game in {moves} move!</h2>
              <button onClick={startGame}>Play again</button>
            </div>
          )}
          
          {gameOver && (
            <div className="game-message error">
              <h2>You're out of moves! Try again.</h2>
              <button onClick={startGame}>Try again</button>
            </div>
          )}
          
          <div className="cards-container" style={getGridStyle()}>
            {cards.map(card => (
              <div 
                key={card.id}
                className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
                onClick={() => flipCard(card.id)}
              >
                <div className="card-front">
                  {card.emoji}
                </div>
                <div className="card-back">
                  ?
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MemoryGame;