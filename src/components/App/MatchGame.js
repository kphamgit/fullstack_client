import React, { useState, useEffect } from 'react'
import styles from './MatchGame.module.css';
import ImageCard from './ImageCard';
import TextCard from './TextCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useImageSize } from 'react-image-size';

function MatchGame({gameId}) {
  //shuffledImages
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [cardGroup1, setCardGroup1] = useState([])
    const [cardGroup2, setCardGroup2] = useState([])
    const [dimensions, { loading, error }] = useImageSize('https://kevinphambucket.s3.amazonaws.com/images/s/star_background.jpeg');
    const [gameName, setGameName] = useState('')
    
    const rootpath = useSelector((state) => state.rootpath.value)
    
    useEffect( () => {
      // Unexpected string concatenation of literals 
      //console.log("XXXXXXXXXXX MatchGame gameId"+gameId)
      var url = rootpath + '/api/matching_games/' + gameId + '/play_fullstack'
      axios.get(url).then((response) => {
          //console.log(' Get GAME... response data=',response.data)
          if (response.data) {
                  setGameName(response.data.name)
                  //let myArray1 = response.data.base.split('/').map((str, index) => ({ src: str, matched: false, match_index: index, has_image: false }));
                  let myArray1 = response.data.base.split('/').map((str, index) => {
                      let mystr1
                      if (response.data.source_has_images) {
                        let initial = str[0]
                        mystr1 = "https://kevinphambucket.s3.amazonaws.com/images/" + initial + '/' + str + '.jpeg'
                      }
                      else {
                        mystr1 = str
                      }
                      return (
                        {src: mystr1, matched: false, match_index: index, has_image: response.data.source_has_images}
                      )
                  });
                  setCardGroup1(myArray1)
                  let myArray2 = response.data.target.split('/').map((str, index) => {
                      let mystr2
                      if (response.data.target_has_images) {
                        let initial = str[0]
                        mystr2 = "https://kevinphambucket.s3.amazonaws.com/images/" + initial + '/' + str + '.jpeg'
                      }
                      else {
                        mystr2 = str
                      }
                      return (
                        {src: mystr2, matched: false, match_index: index, has_image: response.data.target_has_images}
                      )
                  });
                  setCardGroup2(myArray2)
         }
      });
    },[rootpath, gameId])

    const shuffleCards = () => {
      //console.log("in shuffleCards cardGroup1=",cardGroup1)
      //console.log("in shuffleCards cardGroup2=",cardGroup2)
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
      <h3 style={{color:"brown", fontWeight:"bold"}}>{gameName}</h3>
        <button onClick={shuffleCards}>New Game</button>
        <div className={styles.cardgrid} >
          {cards.map(card => {
              if (card.has_image)
              return (
                <ImageCard 
                key={card.id} 
                card={card} 
                width={dimensions?.width}
                height={dimensions?.height}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
              />
              )
              else 
              return (
                <TextCard 
                key={card.id}
                text={card} 
                width={dimensions?.width}
                height={dimensions?.height}
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