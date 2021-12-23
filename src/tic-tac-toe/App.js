import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const startTurn = "o";
function App() {
  const [turn, setTurn] = useState(startTurn);
  const [reset, setReset] = useState(false);
  const [winner, setWinner] = useState('')
  const chunkHorizontal = (array, chunk) => {
    let result = [];
    const divide = Math.ceil(array.length / chunk);
    let start = 0;
    for (let i = 0; i < divide; i++) {
      result = result.concat([array.slice(start, chunk)]);
      start = chunk;
      chunk = chunk * 2;
    }
    return result;
  };
  //   [[1,2,3],[4,5,6],[7,8,9]]
  const chunkVertical = (array, chunk) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      result = result.concat([[]]);
    }
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      for (let i = 0; i < item.length; i++) {
        result[i] = result[i].concat([item[i]]);
      }
    }
    return result;
  };
  const allEqual = (arr) => arr.every((v) => v === arr[0]);

  const solve = (array) => {
    const horizontalChunk = chunkHorizontal(array, 3);
    const verticalChunk = chunkVertical(horizontalChunk);
    const firstDiagonal = [
      verticalChunk[0][0],
      verticalChunk[1][1],
      verticalChunk[2][2],
    ];
    const secondDiagonal = [
      verticalChunk[2][0],
      verticalChunk[1][1],
      verticalChunk[0][2],
    ];
    for (let i = 0; i < verticalChunk.length; i++) {
  
      if (allEqual(verticalChunk[i])) {
        if(verticalChunk[i][0]){
          return verticalChunk[i][0] 
        }
      } else if (allEqual(horizontalChunk[i])) {
        if (horizontalChunk[i][0]) {
          
          return horizontalChunk[i][0]
        }
        
      } else if (allEqual(firstDiagonal)) {
        if (firstDiagonal[0]) {
          return firstDiagonal[0]
          
        }
      } else if (allEqual(secondDiagonal)) {
        if(secondDiagonal[0]){
          
          return secondDiagonal[0]
        }
          
      }
    }
  };

  const gridRef = useRef(null);
  var item_list = [];
  useEffect(() => {
    var gridItemsList = [];
    const gridItems = gridRef.current.children;
    for (let i = 0; i < gridItems.length; i++) {
      const element = gridItems[i];
      gridItemsList.push(element.innerText);
    }
    if (solve(gridItemsList)) {
      setWinner(solve(gridItemsList))
    }
  }, [turn]);
  return (
    <div className="centered">
      <Modal winner={winner} setWinner={setWinner} setReset={setReset}/>
      <div className="turns">It's Player {turn} turns</div>
      <div className="grid" ref={gridRef}>
        <Box turn={turn} setTurn={setTurn} reset={reset} setReset={setReset} />
        <Box turn={turn} setTurn={setTurn} reset={reset} setReset={setReset} />
        <Box turn={turn} setTurn={setTurn} reset={reset} setReset={setReset} />
        <Box turn={turn} setTurn={setTurn} reset={reset} setReset={setReset} />
        <Box turn={turn} setTurn={setTurn} reset={reset} setReset={setReset} />
        <Box turn={turn} setTurn={setTurn} reset={reset} setReset={setReset} />
        <Box turn={turn} setTurn={setTurn} reset={reset} setReset={setReset} />
        <Box turn={turn} setTurn={setTurn} reset={reset} setReset={setReset} />
        <Box turn={turn} setTurn={setTurn} reset={reset} setReset={setReset} />
      </div>
      <button onClick={() => setReset(!reset)}>reset</button>
    </div>
  );
}
function Box(props) {
  const [content, setContent] = useState("");
  function handleReset() {
    if (content === "") {
      return;
    } else {
      setContent("");
      props.setTurn(startTurn);
      props.setReset(false);
    }
  }
  props.reset && handleReset();

  const handleClicked = () => {
    if (content === "") {
      setContent(props.turn);
      if (props.turn === "x") {
        props.setTurn("o");
      } else {
        props.setTurn("x");
      }
    }
  };

  return (
    <div className="box" onClick={() => handleClicked()}>
      {content}
    </div>
  );

}

function Modal({winner,setWinner,setReset}) {
  function handleCancel(props) {
    setWinner('')
    setReset(true)
  }
  if(winner){

    return(
      <div className="overlay" onClick={()=>handleCancel()}>
          <div className="card" onClick={(e)=>e.stopPropagation()}>
            <h1>{winner}</h1>
            <p>Has won the game.</p>
          </div>
      </div>
    )
  }
  return null
}
// function Win(props) {
//   props.winner?
// }

export default App;



