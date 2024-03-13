import { useEffect, useState } from "react";

export const useGame = () => {
    const [board, setBoard] = useState([]);
    const [isSelect, setIsSelect] = useState(false);
    const [isMove, setIsMove] = useState(false);
    const [canPut, setCanPut] = useState([]);
    const [selectArray, setSelectArray] = useState([]);
    const [putArray, setPutArray] = useState([]);
    const boardArray = [
        [0, 0, 0, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [6, 7, 3, 5, 6, 8, 5, 3],
        [4, 2, 4, 8, 2, 1, 8, 4],
        [2, 2, 2, 2, 6, 6, 6, 3],
    ];

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        setBoard(boardArray);
    }

    const outBoard = (y, x) => {
        return y >= 0 && y < 10 && x >= 0 && x < 8;
    }

    // const searchArray = [
    //     [-1, -1],
    //     [-1, 0],
    //     [-1, 1],
    //     [0, 1],
    //     [1, 1],
    //     [1, 0],
    //     [1, -1],
    //     [0, -1],
    // ];
    // let result = [];
    // const searchMerge = () => {
    //     const target = 10;
    //     let diffResult = [];
    //     let someResult = [];
    //     for (let i = 0; i < board.length; i++) {
    //         for (let j = 0; j < board[i].length; j++) {
    //             if (board[i][j] > 0) {
    //                 for (let k = 0; k < searchArray.length; k++) {
    //                     let sum = board[i][j];
    //                     const differentcurrentArray = [{ y: i, x: j, value: board[i][j] }];
    //                     const somecurrentArray = [{ y: i, x: j, value: board[i][j] }];
    //                     differentNum(board, target, sum, k, i, j, differentcurrentArray, diffResult);
    //                     someNum(board, target, sum, k, i, j, somecurrentArray, someResult);
    //                 }
    //             }
    //         }
    //     }
    //     diffResult.forEach(diff => {
    //         result.push(diff);
    //     })
    //     someResult.forEach(some => {
    //         result.push(some);
    //     })
    //     return result;
    // }

    // const differentNum = (prevBoard, target, sum, k, i, j, currentArray, diffResult) => {
    //     for (let m = 1; m < 10; m++) {
    //         const newY = i + searchArray[k][0] * m;
    //         const newX = j + searchArray[k][1] * m;
    //         if (outBoard(newY, newX)) {
    //             sum += prevBoard[newY][newX];
    //             currentArray.push({ y: newY, x: newX, value: prevBoard[newY][newX] });
    //             if (sum === target) {
    //                 if (currentArray.length > 1) {
    //                     diffResult.push(currentArray.slice());
    //                 }
    //                 break;
    //             } else if (sum > target) {
    //                 break;
    //             }
    //         } else {
    //             break;
    //         }
    //     }
    // }
    // const someNum = (prevBoard, target, sum, k, i, j, currentArray, someResult) => {
    //     for (let m = 1; m < 10; m++) {
    //         const newY = i + searchArray[k][0] * m;
    //         const newX = j + searchArray[k][1] * m;
    //         if (outBoard(newY, newX)) {
    //             const current = prevBoard[i][j];
    //             const destination = prevBoard[newY][newX];
    //             if (current === destination) {
    //                 if (currentArray.length > 0) {
    //                     currentArray.push({ y: newY, x: newX, value: destination });
    //                 }
    //             } else {
    //                 break;
    //             }
    //         } else {
    //             break;
    //         }
    //         someResult.push(currentArray.slice());
    //     }
    // }

    const handleContentClick = (rowIndex, columnIndex,) => {
        setBoard((prevBoard) => {
            if (prevBoard[rowIndex][columnIndex]) {
                console.log(rowIndex, columnIndex);
                setIsSelect(true);
            }
            if (isSelect && prevBoard[rowIndex][columnIndex]) {
                setIsSelect(false);
                setSelectArray([rowIndex, columnIndex]);
            }
            canPutContent(rowIndex, columnIndex, prevBoard, currentIn);
            return [...prevBoard];
        })
    }

    const canPutContent = (rowIndex, columnIndex, prevBoard, currentIn) => {
        // let putIn = [];
        let canSel = [];
        let canPut = [];
        const searches = searchMerge();
        console.log(isSelect);
        if (isSelect) {
            setSelectArray(currentIn);
            setIsSelect(false);
        }
        if (isSelect) {
            setPutArray(currentIn);
            setIsMove(true);
        }
        searches.forEach((search, searchIndex) => {
            if (rowIndex === search[0]["y"] && columnIndex === search[0]["x"]) {
                const canSelect = search.slice(1);
                canSelect.forEach((cansel, canselIndex) => {
                    const canY = cansel["y"];
                    const canX = cansel["x"];
                    // 必要な条件に基づいて canPut を更新
                    if (prevBoard[canY][canX]) {
                        canPut.push([canY, canX]);
                    }
                })
            }
            // console.log(search);
        });
        // 更新された canPut を状態として保存
        canPut.forEach(canP => {
            canSel.push(canP);
        });
        return canSel;
    }

    useEffect(() => {
        if (isMove) {
            setIsSelect(false);
            setIsMove(false);
        }

    }, [isMove]);

    return { board, handleContentClick, isSelect, canPutContent };
}
