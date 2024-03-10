import { useState } from 'react';
import './App.css';
// import { useBoard } from "../../hooks/useBoard";
import { useBoard } from "./hooks/useBoard";
import { Board } from './components/Board/Board';
import { Turn } from './components/Turn/Turn';
function App() {

  const { board, handleClick, firstClickCell, canSecondClickContent, firstClickIndex, canClickCell,turn } = useBoard()

  return (
    <div className='main'>
      <div className='title'>NumberLineMatch</div>
      <Board board={board} handleClick={handleClick} firstClickCell={firstClickCell} canSecondClickContent={canSecondClickContent}
        firstClickIndex={firstClickIndex} canClickCell={canClickCell} ></Board>
      <Turn turn={turn}></Turn>
    </div>
  );
}

export default App;
