import React, { useState, useEffect } from 'react'
import styles from './MatchGame.module.css';
//import SingleCard from './SingleCard';
import TextCard from './TextCard';

/*
const cardImages = [
    { "src": "one two three", matched: false },
    { "src": "fifteen", matched: false }
]
*/

const cardImages = [
  { "src": "one two three", matched: false },
  { "src": "four five six", matched: false },
  { "src": "seven eight nine ten", matched: false },
  { "src": "eleven", matched: false },
  { "src": "twelve", matched: false },
  { "src": "thirteen ", matched: false },
  { "src": "fourteen", matched: false },
  { "src": "fifteen", matched: false }
]


function MatchGameText() {
  //shuffledImages
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    
    
    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages]
            .sort( () => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: Math.random(), index: index}))
    
            //console.log(shuffleCards)
        setCards(shuffleCards)
        //setTurns(0)
        //onsole.log("SHUFFLE")
    }

    const handleChoice = (card) => {
      //console.log("in handleCHoice",card)
      console.log("in handle choice: choiceOne=",choiceOne)
      console.log("in handle choice: choiceTwo=",choiceTwo)
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
                  console.log("match")
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

    //console.log(cards)

  return (
    <div className='MathGame'>
        <h1>Match Text Game</h1>
        <button onClick={shuffleCards}>New Game</button>
        {console.log(cards)}
        {console.log("choiceOne",choiceOne)}
        {console.log("choiceTwo", choiceTwo)}
        <div className={styles.cardgrid} >
          {cards.map(card => {
            return (
            <TextCard 
            key={card.id} 
            text={card} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
            )
          })}
        </div>
    </div>
  )
}

export default MatchGameText