import React from 'react'

export default function ChatBoxReciever({user, message}) {
  return (
    <div  style={{display:'flex', justifyContent:'flex-start' , flexDirection:'row'}} >
            <p style={{fontSize:"14px", padding:2 , backgroundColor:'#dcf8c6', borderRadius: 2 , maxWidth: "100%" }} >
                <strong style={{fontSize:12}} >
                       {user} 
                </strong> 
                &nbsp;{message}
            </p>

    </div>
  )
}

export function ChatBoxSender({user, message}) {
    return (
      <div  style={{display:'flex', paddingRight:3  ,justifyContent:'flex-start' , flexDirection:'row'}} >
              <p style={{fontSize:"14px", padding:2 , backgroundColor:'#dcf8c6', borderRadius:2 , maxWidth: "100%" }} >
                  <strong style={{fontSize:12}} >
                         {user} 
                  </strong> 
                  &nbsp;{message}
              </p>
  
      </div>
    )
  }