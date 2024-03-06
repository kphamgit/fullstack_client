import React, { useState, useEffect } from 'react'
import styles from './MatchGame.module.css';
import SingleCard from './SingleCard';

const cardImages = [
    { "src": "/img/1.jpeg", matched: false },
    { "src": "/img/2.jpeg", matched: false },
    { "src": "/img/3.jpeg", matched: false },
    { "src": "/img/4.jpeg", matched: false },
    { "src": "/img/5.jpeg", matched: false },
    { "src": "/img/4.jpeg", matched: false },
    { "src": "/img/5.jpeg", matched: false },
    { "src": "/img/6.jpeg", matched: false }
]

function MatchGame() {
  //shuffledImages
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    
    
    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages]
            .sort( () => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
    
        setCards(shuffleCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
      //console.log(card)
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurn => prevTurn + 1)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
          if (choiceOne.src === choiceTwo.src) {
            setCards(prevCards => {
              return prevCards.map(card => {
                if (card.src === choiceOne.src) {
                  return {...card, matched: true}
                }
                else {
                  return card
                }
              })
            })
            resetTurn()
          }
          else {
            console.log("NO MATCH")
            setTimeout(() => resetTurn(), 1000)
          }
        }
    },[choiceOne, choiceTwo])

    console.log(cards)

  return (
    <div className='MathGame'>
        <h1>Match  GGG GGame</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className={styles.cardgrid} >
          {cards.map(card => {
            return (
            <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
            )
          })}
        </div>
    </div>
  )
}

export default MatchGame