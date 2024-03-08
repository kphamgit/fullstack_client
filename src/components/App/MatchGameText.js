import React, { useState, useEffect } from 'react'
import styles from './MatchGame.module.css';
import SingleCard from './SingleCard';
import TextCard from './TextCard';
import { useSelector } from 'react-redux';
import axios from 'axios';

/*
const textCards = [
  { "src": "bird", matched: false, match_index: 0 },
  { "src": "chicken",  matched: false, match_index: 1 },
  { "src": "dog", matched: false, match_index: 2 },
  { "src": "duck", matched: false, match_index: 3 },
  { "src": "elephan", matched: false, match_index: 4 },
  { "src": "owl ", matched: false, match_index: 5 },
  { "src": "tiger", matched: false, match_index: 6 },
  { "src": "snake", matched: false, match_index: 7 }
]
*/

function MatchGameText() {
  //shuffledImages
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [cardGroup1, setCardGroup1] = useState([])
    const [cardGroup2, setCardGroup2] = useState([])
    
    const rootpath = useSelector((state) => state.rootpath.value)
    
    useEffect( () => {
      // Unexpected string concatenation of literals 
      var url = rootpath + '/api/matching_games/' + '10' + '/play_fullstack'
      axios.get(url).then((response) => {
          //console.log(' Next button... response data=',response.data)
          if (response.data) {
                  //console.log(response.data.base)   //an array of strings
                  let myArray1 = response.data.base.split('/').map((str, index) => ({ src: str, matched: false, match_index: index, has_image: false }));
                  //        myArray = myArray.map((str, index) => ({ value: str, id: index + 1 }));
                  //console.log(myArray1)
                  setCardGroup1(myArray1)
                  //design constrain: only myarray2 may have images (see match_games/new in englishtuyhoa.com)
                  let myArray2 = response.data.target.split('/').map((str, index) => {
                    let mystr
                    if (response.data.has_images) {
                      let initial = str[0]
                      mystr = "https://kevinphambucket.s3.amazonaws.com/images/" + initial + '/' + str + '.jpeg'
                    }
                    else {
                      mystr = str
                    }
                    return (
                    {src: mystr, matched: false, match_index: index, has_image: response.data.has_images}
                     )});
                  setCardGroup2(myArray2)
                  console.log(myArray2)
         }
       
      });
    },[rootpath])

    const shuffleCards = () => {
           const shuffleCards = [...cardGroup1, ...cardGroup2]
            .sort( () => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: Math.random()}))
        setCards(shuffleCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurn => prevTurn + 1)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
          //if (choiceOne.src === choiceTwo.src) {
            if (choiceOne.match_index === choiceTwo.match_index) {
            setCards(prevCards => {
              return prevCards.map(card => {
                if (card.match_index === choiceOne.match_index) {
                  //console.log("match")
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
            //console.log("NO MATCH")
            setTimeout(() => resetTurn(), 1000)
          }
        }
    },[choiceOne, choiceTwo])

    //console.log(cards)

  return (
    <div className='MathGame'>
        <h1>Match Text Game</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className={styles.cardgrid} >
          {cards.map(card => {
              if (card.has_image)
              return (
                <SingleCard 
                key={card.id} 
                card={card} 
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
              />
              )
              else 
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