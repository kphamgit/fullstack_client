import React from 'react'
import styles from './SingleCard.module.css';

function SingleCard({card, handleChoice, flipped}) {

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
        src="/img/cover.jpeg" 
        onClick={handleClick}
        alt="card back" 
    />
    </div>
    </div>
    </>
  )
}

export default SingleCard