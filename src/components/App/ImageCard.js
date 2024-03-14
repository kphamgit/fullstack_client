import React from 'react'
import styles from './MatchCard.module.css';
//import { useImageSize } from 'react-image-size';

function ImageCard({card, width, height, handleChoice, flipped}) {
  //const [dimensions, { loading, error }] = useImageSize('https://kevinphambucket.s3.amazonaws.com/images/s/star_background.jpeg');
  const handleClick = () => {
    handleChoice(card)
  }
  return (
    <> 
    <div className={styles.card}>
    <div className= {flipped ? styles.flipped : ""} >
    <img className={styles.front} src={card.src} alt="card front" />
    <img 
        className = {styles.back}
        src="https://kevinphambucket.s3.amazonaws.com/images/s/star_background.jpeg"
   
        onClick={handleClick}
        alt="card back" 
    />
    </div>
    </div>
    </>
  )
}

export default ImageCard