import { Cell } from "../Cell/Cell";
import "./Board.css";

export const Board = ({ board, handleClick, firstClickCell, canSecondClickContent, firstClickIndex, canClickCell }) => {

    return (
        <div className="outerframe-board">
            <div className="board">
                {board.map((line, row) => {
                    return <div className="board-line" key={row}>
                        {line.map((cell, col) => {
                            return <Cell num={cell} onClick={() => handleClick(row, col)} key={`${row}${col}`} firstClickCell={firstClickCell}
                                canSecondClickContent={() => canSecondClickContent(row, col, board)} board={board} row={row} col={col}
                                firstClickIndex={firstClickIndex} canClickCell={canClickCell}
                            ></Cell>
                        })}
                    </div>
                })}
            </div>
        </div>
    )
}