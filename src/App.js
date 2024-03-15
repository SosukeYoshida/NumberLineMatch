import { useState } from 'react';
import './App.css';
// import { useBoard } from "../../hooks/useBoard";
import { useBoard } from "./hooks/useBoard";
import { Board } from './components/Board/Board';
import { Turn } from './components/Turn/Turn';
import { Score } from './components/Score/Score';
function App() {

  const { board, handleClick, firstClickCell, canSecondClickContent, firstClickIndex, canClickCell, turn, endMessage,score } = useBoard()

  return (
    <>
    <div className='main'>
      <Score score={score}></Score>
      <div className='title'>NumberLineMatch</div>
      <Board board={board} handleClick={handleClick} firstClickCell={firstClickCell} canSecondClickContent={canSecondClickContent}
        firstClickIndex={firstClickIndex} canClickCell={canClickCell} ></Board>
      <Turn turn={turn}></Turn>
      {endMessage && <div className='end-message'>{endMessage}</div>}
    </div>
    </>
  );
}

export default App;
