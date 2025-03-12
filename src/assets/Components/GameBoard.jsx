// import { useState, useEffect, use } from "react";
// import { FetchData } from "../../api";
// import { Header } from "../Components/Header";
// import { ScoreBoard } from "../Components/ScoreBoard";
// import { Cards } from "../Components/Cards";
// import '../Styles/App.css'

// export const GameBoard = () => {
//     const [cards, setCards] = useState([]);
//     const [score, setScore] = useState(0);
//     const [bestScore, setBestScore] = useState(0);
//     const [clickedCards, setClickedCards] = useState([]);

//     // fetch data on mount
//     useEffect (() =>{
//         FetchData().then(setCards);
//     }, []);

//     // shuffle card function
//     const shuffleCards = () =>{
//         setCards(prevCards, [...prevCards].sort(() => Math.random() - 0.5));
//     }

//     // handle click of cards
//     const handleCardClick = (cardId) =>{
//         if(clickedCards.include(cardId)){ //if card is already clicked then reset the score and array of clicked cards
//             setScore(0);
//             setClickedCards([]);
//         }else{
//             const newScore = score + 1;
//             setScore(newScore);
//             setClickedCards([...clickedCards, cardId]);
//             if (newScore > bestScore) setBestScore(newScore); //if new score bits bestscore then set new best score
//         }

//         shuffleCards(); //shuffle the cards after each click
//     }

//     return (
//         <div className="game-container">
//             <Header />
//             <ScoreBoard score={score} bestScore={bestScore} />
//             <div className="game-board">
//                 {cards.map((card) => {
//                     <Cards key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
//                 })}
//             </div>
//         </div>
//     );

// }


import React, { useState, useEffect } from 'react';
import { Header } from "../Components/Header";
import { ScoreBoard } from "../Components/ScoreBoard";
import { Cards } from "../Components/Cards";
import '../../assets/Styles/App.css'

export const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  // Fetch Pokémon data from the API
  const fetchCards = async () => {
    try {
      // Fetch 12 Pokémon from the API
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15');
      const data = await res.json();
      // Map the results into card objects with id, name, and image
      const newCards = data.results.map((pokemon) => {
        // Extract the Pokémon's id from the URL (e.g., "https://pokeapi.co/api/v2/pokemon/1/")
        const id = pokemon.url.split('/')[6];
        return {
          id: pokemon.name, // Use name as a unique id for simplicity
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        };
      });
      setCards(newCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  // Shuffle the cards randomly
  const shuffleCards = () => {
    setCards(prevCards => {
      const shuffled = [...prevCards].sort(() => Math.random() - 0.5);
      return shuffled;
    });
  };

  // Handle card click events
  const handleCardClick = (cardId) => {
    // If the card was already clicked, reset the score and clickedCards array
    if (clickedCards.includes(cardId)) {
      setScore(0);
      setClickedCards([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, cardId]);
      // Update the best score if needed
      if (newScore > bestScore) {
        setBestScore(newScore);
      }
    }
    // Always shuffle cards after each click
    shuffleCards();
  };

  // When the component mounts, fetch the cards
  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      {/* Header displays the game title and scores */}
      <Header />
      <ScoreBoard score={score} bestScore={bestScore} />
      <div className="game-board">
        {cards.map((card) => (
          <Cards 
            key={card.id} 
            card={card} 
            onClick={() => handleCardClick(card.id)} 
          />
        ))}
      </div>
    </>
  );
};

