import React, { useState } from 'react'

function SpeechSynthesis() {

    const [ourText, setOurText] = useState("")
    const msg = new SpeechSynthesisUtterance()
    msg.volume = 1; // From 0 to 1
    msg.rate = .8; // From 0.1 to 10
    //msg.pitch = 2; // From 0 to 2
    msg.lang = 'en';
    
    const speechHandler = (msg) => {
      //console.log(window.speechSynthesis.getVoices() )
      msg.text = ourText
      msg.voice = window.speechSynthesis.getVoices()[1];
      window.speechSynthesis.speak(msg)
    }
  
    return (
      <div className='App'>
        <h1>React Text to Speech App</h1>
        <input
          type='text'
          value={ourText}
          placeholder='Enter Text'
          onChange={(e) => setOurText(e.target.value)}
        />
        <button onClick={() => speechHandler(msg)}>SPEAK</button>
      </div>
    )
}

export default SpeechSynthesis