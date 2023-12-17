import React from 'react'
import { useState } from "react";
import { Reorder } from "framer-motion"
import { useSelector } from 'react-redux';

/*
const listItems = [
  { name: "Michael Jordan", id: 1 },
  { name: "Kobe Bryant", id: 2 },
  { name: "LeBron James", id: 3 },
  { name: "Magic Johnson", id: 4 }
];
*/

function WordsScrambler() {
  const question = useSelector((state) => state.question.value)
    var marray = question.content.split('/')
    var listItems = []
    marray.forEach( (element, index) => {
        listItems.push({name: element, id: index})
    });
    console.log("XXXXXXXXXXXX",listItems)

    const [items, setItems] = useState(listItems);
    return (
      <Reorder.Group axis = 'x' values={items} onReorder={setItems} style={{ overflowX: "scroll" }}>
        {items.map((item) => (
          // Change the li to Reorder.Item and add value prop
          <Reorder.Item key={item.id} className = "word_scrambler_items"value={item}>
            {item.name}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    );
}

export default WordsScrambler