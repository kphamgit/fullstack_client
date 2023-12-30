import React from 'react'
import {Avatar , Image} from 'antd'

export default function ChatBoxReciever({user, message}) {
  return (
    <div  style={{display:'flex', justifyContent:'flex-start' , flexDirection:'row'}} >
      Receiver
            <p style={{padding:5 , backgroundColor:'#dcf8c6', borderRadius: 10 , maxWidth: "60%" }} >
                <strong style={{fontSize:13}} >
                       {user} 
                </strong> 
                {message}
            </p>

    </div>
  )
}

export function ChatBoxSender({user, message}) {
    return (
      <div  style={{display:'flex', paddingRight:5  ,justifyContent:'flex-end' , flexDirection:'row'}} >
        Sender
              <p style={{padding:5 , backgroundColor:'#dcf8c6', borderRadius: 10 , maxWidth: "60%" }} >
                  <strong style={{fontSize:13}} >
                         {user} 
                  </strong> 
                  {message}
              </p>
  
      </div>
    )
  }