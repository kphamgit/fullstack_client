import React, { useState } from 'react'

const styles={
    button: {
      width:'60%' ,
      height:30 ,
      fontWeight:'bold', 
      borderRadius:10 ,
      fontSize:14 ,
      backgroundColor:'#34b7f1',
      borderWidth:0,
      color:'#fff'
    },
    textarea:{ 
       width:'100%' ,
       height:50 ,
       borderRadius:10, 
       borderWidth:0 , 
       padding:10 , 
       fontSize:18
      },
    textContainer:{
      display:"flex", 
      justifyContent:'space-evenly', 
      alignItems:'center'}
  }

export default function InputText({addMessage}) {

    const [message , setMessage] = useState('')

    function addAMessage(){
      console.log("HHHHHH in addAMessage InputText message=",{message})
        //console.log("HHHHHH in addAMessage InputText message=",{message})
        //addMessage which takes an object as parameter, is defined in calling component (ChatHome1)
        //putting a pair of brackets around variable "message" will yield the object "message: value"
        //a new feature in ES6
        addMessage(
            {message})
        setMessage('')
    }

  function handlerFuntion() {
    console.log("in here")
    addAMessage()
  }
  return (
    <div>
        <input 
        style={styles.textarea}
        rows={6}
        placeholder="Write something..."
        value={message}
        onKeyDown={(e) => {
          if (e.key === "Enter")
              handlerFuntion();
          }}
        onChange={e => setMessage(e.target.value)}
        >
        </input>
        <br />
        <div>
        <button
        onClick={()=> addAMessage()}
        style = {styles.button}
        >
                ENTER
        </button>
        </div>
    </div>
  )
}