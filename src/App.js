import './App.css';
import React from 'react';
import {ReactComponent as MySvg} from './1_1.svg';

function getPoints(str)
{
  let coordinates = str,
  x, y;

  if (/m/i.test(str))
  {
    coordinates = coordinates.split('').slice(1).join('').split(',');
  }
  else 
  {
    coordinates = coordinates.split(',');
  }
  x = +coordinates[0];
  y = +coordinates[1];
  return {x, y};
}

function checkPoints(x, y, points)
{
  let result = 0;

  if (x >= points.x - 15 && x <= points.x + 15)
  {
    result++;
  }
  if (y >= points.y - 15 && y <= points.y + 15)
  {
    result++;
  }
  return (result === 2 ? true : false)  
}

function App() {
  React.useEffect(() => {
    const canva = document.getElementById('cc'),
          ctx = canva.getContext('2d'),
          path = document.querySelector('[d]').attributes[0].textContent;
    
    let curvePath = new Path2D(path),
        hitCounter = 0,
        drawing = false,
        splitPath = path.split(' '),
        startPoints = getPoints(splitPath[0]), 
        endPoints = getPoints(splitPath[splitPath.length - 1]),
        startCheck = false, 
        endCheck = false;
    
    ctx.strokeStyle = 'white';
    ctx.stroke(curvePath);
    console.log(startPoints, endPoints);
    const handleMouseDown = (e) => 
    {
      drawing = true;
      ctx.beginPath();
      const {clientX, clientY} = e;
      ctx.moveTo(
        clientX - canva.offsetLeft,
        clientY - canva.offsetTop);
    }
    
    const handleMouseMove = (e) =>
    {
      if(drawing)
      {
        const {clientX, clientY} = e;
        ctx.lineTo(
          clientX - canva.offsetLeft,
          clientY - canva.offsetTop);
        if (ctx.isPointInPath(curvePath, clientX, clientY))
        {
          hitCounter++;
          if (checkPoints(clientX, clientY, startPoints)) startCheck = true;
          if (checkPoints(clientX, clientY, endPoints)) endCheck = true;
        }
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }
    }
    
    const handleMouseUp = (e) =>
    {
      drawing = false;
      if (startCheck && endCheck && hitCounter >= 100)
      {
        console.log("YOU GOT IT");
      }
      console.log(startCheck, endCheck, hitCounter);
      hitCounter = 0;
      startCheck = false;
      endCheck = false;
    }

    canva.addEventListener('pointerdown', handleMouseDown);
    canva.addEventListener('pointermove', handleMouseMove);
    canva.addEventListener('pointerup', handleMouseUp);
  })


  return (
    <div className="App">
      <MySvg display='none' />
      <canvas id = 'cc'
      height={window.innerHeight}
      width={window.innerWidth}>
      </canvas>
    </div>
  );
}

export default App;
