import './MemoryGame.css';

import { useEffect, useState } from 'react';
import { sourceCards } from '../data/sourceCards';
import Card from './Card';

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);

  const suffleCards = () => {
    const suffledCards = [...sourceCards, ...sourceCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
        matched: false,
        clicked: true,
      }));

    setCards(suffledCards);

    setTimeout(() => {
      const res = suffledCards.map((s) => {
        return { ...s, clicked: false };
      });
      setCards(res);
    }, 3000);
  };

  const handleClickCard = (id, src) => {
    selectedOne ? setSelectedTwo(src) : setSelectedOne(src);

    const res = cards.map((card) => {
      if (card.id === id) {
        return { ...card, clicked: true };
      } else {
        return card;
      }
    });
    setCards(res);
  };

  useEffect(() => {
    if (selectedOne && selectedTwo) {
      if (selectedOne === selectedTwo) {
        setCards(
          cards.map((card) => {
            if (card.src === selectedTwo || card.src === selectedOne) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          })
        );
      } else {
        setTimeout(() => {
          alert('You wrong...');
          setCards(
            cards.map((card) => {
              if (card.src === selectedTwo || card.src === selectedOne) {
                return { ...card, clicked: false };
              } else {
                return card;
              }
            })
          );
        }, 10);
      }
      setSelectedOne(null);
      setSelectedTwo(null);
    }
  }, [selectedOne, selectedTwo, cards]);

  return (
    <>
      <div className="memory-game">
        <div className="container">
          <h1>Memory Game</h1>
          <button onClick={suffleCards} className="btn active" type="button">
            New Game
          </button>
        </div>
      </div>
      <div className="container">
        <div className="grid-cards">
          {cards.map((card) => (
            <Card
              key={card.id}
              src={card.src}
              clickEvent={() => handleClickCard(card.id, card.src)}
              clicked={card.clicked}
              matched={card.matched}
            />
          ))}
        </div>
      </div>
    </>
  );
}
