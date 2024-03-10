import { useEffect, useState } from "react";
import "./Cell.css";
export const Cell = ({ num, onClick, canSecondClickContent, board, row, col, firstClickIndex, canClickCell }) => {
    useEffect(() => {
        if (firstClickIndex[0]) {
            // console.log(firstClickIndex);
        }
    }, [firstClickIndex]);
    useEffect(() => {
        if (canClickCell[0]) {
            // console.log(canClickCell);
        }
    }, [canClickCell]);
    return (
        <div
            className={`cell cell${num} 
            ${row == firstClickIndex[0] && col == firstClickIndex[1] && num > 0 ? "select" : ""}
            ${canClickCell.some(canClick => row === canClick[0] && col === canClick[1]) ? "canput" : ""}
            `}
            onClick={onClick}

        >
            {num > 0 ? num : ""}
        </div>
    )
}