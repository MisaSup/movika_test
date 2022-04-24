import './App.css';
import React, { useState } from 'react';
import rough from 'roughjs/bundled/rough.esm';

const  generator = rough.generator();

function createElement(x1, y1, x2, y2)
{
  const rcElement = generator.line(x1, y1, x2, y2);
  return {x1, y1, x2, y2, rcElement};
}

function App() {
  const [drawing, setDrawing] = useState(false);
  const [elements, setElem] = useState([]);

  React.useEffect(() => {
    const canva = document.getElementById('cc'),
    ctx = canva.getContext('2d');
    console.log(canva);
    ctx.clearRect(10, 10, canva.width, canva.height);


    let roughCanvas = rough.canvas(canva);

    elements.forEach( ({ rcElement }) => {
      roughCanvas.draw(rcElement)
    }, elements);
  });


  const handleMouseDown = (e) => 
  {
    setDrawing(true);
    const {clientX, clientY} = e;
    const elem = createElement(clientX, clientY, clientX, clientY);
    setElem(prevState => [...prevState, elem]);
  }
  
  const handleMouseMove = (e) =>
  {
      if(!drawing) return;

      const {clientX, clientY} = e;
      let index = elements.length - 1;
      const {x1, y1} = elements[index];
      const updatedElem = createElement(x1, y1, clientX, clientY);

      const elemCopy = [...elements];
      elemCopy[index] = updatedElem;
      setElem(elemCopy);

  }

  const handleMouseUp = (e) =>
  {
    setDrawing(false);
  }

  return (
    <div className="App">
      <canvas id = 'cc'
      height={window.innerHeight}
      width={window.innerWidth}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>

      </canvas>
    </div>
  );
}

export default App;
