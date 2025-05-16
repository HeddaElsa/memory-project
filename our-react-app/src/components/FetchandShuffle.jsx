import React from "react";
import { useEffect, useState } from "react"
import Card from "./card.jsx";

const FetchAndShuffle = () => {

    const [dogImages, setDogImages] = useState([]);
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch ("https://dog.ceo/api/breeds/image/random/4")
            const data = await response.json();
            setDogImages(data.message.map((fetchedImage) => ({src: fetchedImage}))); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect (() => {fetchData()} , []);

    const shuffleCards = () => {

        const shuffled = [...dogImages, ...dogImages]
            .sort(() => Math.random() - 0.5)
            .map((dogImages) => ({
                    id: Math.random(),
                    src: dogImages.src,
            }));
        setCards(shuffled);
        setTurns(0);
    };
    console.log("Cards array:", cards, turns);

        return (
        <div className="flex items-center justify-center h-screen bg-black">
        <div>
            <button onClick={shuffleCards} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Shuffle</button>
        </div>

        <div className="card-grid">
            {cards.map((card) => (
                <Card  key={card.id} card={card}/>      
            ))}
        </div>
        </div>
        )

}

export default FetchAndShuffle;