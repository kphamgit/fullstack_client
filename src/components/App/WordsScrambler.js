import React, { useEffect } from 'react'
import { useState } from "react";
import { Reorder } from "framer-motion"
//import { useSelector } from 'react-redux';

const LI = {
  text: 'black',
  background: 'white',
  primary: 'rebeccapurple',
};

function WordsScrambler({question}) {
  
  //const question = useSelector((state) => state.question.value)
    var marray = question.content.split('/')
    shuffle(marray)
    var listItems = []
    marray.forEach( (element, index) => {
        listItems.push({name: element, id: index})
    });
    //console.log("XXXXXXXXXXXX",listItems)

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];
      }
    }   

   // useEffect( () => {
      
   // },[])
    

    const [items, setItems] = useState(listItems);
    const itemStyle =  {
      borderRadius: "5px",
      marginBottom: "5px",
      marginLeft: "10px",
      
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      padding: "10px 10px 10px 10px",
      background: "cyan"
    
  }
    return (
      <Reorder.Group axis = 'x' 
        values={items} 
        onReorder={setItems} 
        style={{display:"flex", flexDirection:"row"}}
        >
        {items.map((item) => (
          // Change the li to Reorder.Item and add value prop
        
          <Reorder.Item className="word_scrambler_items" style={ itemStyle}  key={item.id} value={item}>
            {item.name}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    );
}

export default WordsScrambler