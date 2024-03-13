import { useEffect, useState } from "react";

export const useBoard = () => {
    const boardArray = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 5, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0],
        [0, 0, 2, 5, 0, 0, 0, 0],
        [0, 0, 5, 4, 0, 0, 0, 0],
    ];
    const [board, setBoard] = useState(boardArray);
    const [selectedList, setSelectedList] = useState([]);
    const [firstClickIndex, setFirstClickIndex] = useState([]);
    const [secondClickIndex, setSecondClickIndex] = useState([]);
    const [canClickCell, setCanClickCell] = useState([]);
    const [canChangeCell, setCanChangeCell] = useState([]);
    const [addCellArray, setAddCellArray] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isTurn, setIsTurn] = useState(false);
    const [turn, setTurn] = useState(5);
    const [checkDiff, setCheckDiff] = useState([]);
    const [checkSome, setCheckSome] = useState([]);

    //場外判定
    const outBoard = (y, x) => {
        return y >= 0 && y < 10 && x >= 0 && x < 8;
    }

    // useEffect(() => {
    //     const generateRandomValues = () => {
    //         let newBoard = [];
    //         for (let i = 0; i < 10; i++) {
    //             let row = [];
    //             for (let j = 0; j < 8; j++) {
    //                 row.push(0);
    //             }
    //             newBoard.push(row);
    //         }

    //         // 7, 8, 9行目にランダムな値を8つずつ入れる
    //         for (let i = 7; i < 10; i++) {
    //             let randomRow = [];
    //             for (let j = 0; j < 8; j++) {
    //                 const randomNum = Math.floor(Math.random() * 9 + 1);
    //                 randomRow.push(randomNum);
    //             }
    //             newBoard[i] = randomRow;
    //         }

    //         setBoard(newBoard);
    //     };

    //     generateRandomValues();
    // }, []);

    const searchArray = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
    ];

    let result = [];
    let canPutCell = [];
    const searchMerge = () => {
        const target = 10;
        let diffResult = [];
        let someResult = [];
        let diffCanPutCellResult = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] > 0) {
                    for (let k = 0; k < searchArray.length; k++) {
                        let sum = board[i][j];
                        const differentcurrentArray = [{ y: i, x: j, value: board[i][j] }];
                        const diffCanPutCellArray = [{ y: i, x: j, value: board[i][j] }];
                        const somecurrentArray = [{ y: i, x: j, value: board[i][j] }];
                        // console.log(differentcurrentArray);
                        differentNum(board, target, sum, k, i, j, differentcurrentArray, diffResult, diffCanPutCellArray, diffCanPutCellResult);
                        someNum(board, target, sum, k, i, j, somecurrentArray, someResult);
                        checkSomeNum(board, target, sum, k, i, j, somecurrentArray, someResult);

                    }
                }
            }
        }
        diffResult.forEach(diff => {
            result.push(diff);
        });
        diffCanPutCellResult.forEach(diffCan => {
            canPutCell.push(diffCan);
        })
        someResult.forEach(some => {
            result.push(some);
            canPutCell.push(some);
        });
        return result;
    }

    //８方向合計が１０になる値を探索
    const differentNum = (prevBoard, target, sum, k, i, j, currentArray, diffResult, diffCanPutCellArray, diffCanPutCellResult) => {
        for (let m = 1; m < 10; m++) {
            const newY = i + searchArray[k][0] * m;
            const newX = j + searchArray[k][1] * m;
            if (outBoard(newY, newX)) {
                sum += prevBoard[newY][newX];
                if (prevBoard[newY][newX] !== 0) {
                    currentArray.push({ y: newY, x: newX, value: prevBoard[newY][newX] });
                    diffCanPutCellArray.push({ y: newY, x: newX, value: prevBoard[newY][newX] });
                }
                if (sum === target) {
                    if (currentArray.length > 1) {
                        //クリックできる場所をpush
                        if (currentArray.length > 2) {
                            const firstPutCell = diffCanPutCellArray.shift();
                            const lastPutCell = diffCanPutCellArray.pop();
                            diffCanPutCellResult.push([firstPutCell, lastPutCell]);
                        } else {
                            diffCanPutCellResult.push(diffCanPutCellArray.slice());
                        }
                        //消せるセルをpush
                        diffResult.push(currentArray.slice());
                    }
                    break;
                } else if (sum > target) {
                    break;
                }
            } else {
                break;
            }
        }
        setCheckDiff(diffResult)
    }
    //８方向同じ値を探索
    const someNum = (prevBoard, target, sum, k, i, j, currentArray, someResult) => {

        for (let n = 1; n < 10; n++) {
            const newY = i + searchArray[k][0] * n;
            const newX = j + searchArray[k][1] * n;
            if (outBoard(newY, newX)) {
                const current = prevBoard[i][j];
                const destination = prevBoard[newY][newX];
                if (destination !== 0 && current !== destination) {
                    // 次の値が異なる場合、ループを終了
                    break;
                }
                currentArray.push({ y: newY, x: newX, value: destination });
            } else {
                break;
            }
        }
        someResult.push(currentArray.slice());
    }


    let checkArray = [];
    const checkSomeNum = (prevBoard, target, sum, k, i, j, currentArray, someResult) => {
        let checkSomeArray = [];
        checkSomeArray.push(currentArray[0]);
        for (let n = 1; n < 10; n++) {
            const newY = i + searchArray[k][0] * n;
            const newX = j + searchArray[k][1] * n;
            if (outBoard(newY, newX)) {
                const current = prevBoard[i][j];
                const destination = prevBoard[newY][newX];
                if (destination !== 0) {
                    if (destination === current && current !== 0) {
                        // 同じ値を持つセルを currentArray に追加
                        checkSomeArray.push({ y: newY, x: newX, value: destination });
                    } else {
                        // 同じ値が取得できないまま場外に出た場合、または currentArray の長さが 1 の場合、ループを終了
                        break;
                    }
                }
            } else {
                // 場外に出た場合、ループを終了
                break;
            }
        }

        if (checkSomeArray.length > 1) {
            checkArray.push(checkSomeArray);
        }
        setCheckSome(checkArray);
    }





    //クリックしたとき
    const handleClick = (row, col) => {
        if (board[row][col] !== 0) {
            setSelectedList(prevSelectedList => {
                let newSelectedList = [...prevSelectedList];
                const newSelectedCell = { row: row, col: col };

                // すでに同じ座標が選択されている場合、新しいセルを追加せずに処理を終了

                newSelectedList.push(newSelectedCell);
                // クリック回数が奇数の場合、firstClickIndex を設定し、偶数の場合、secondClickIndex を設定する
                if (newSelectedList.length % 2 === 1) {
                    setFirstClickIndex([newSelectedList[newSelectedList.length - 1].row, newSelectedList[newSelectedList.length - 1].col]);
                    if (board[row][col]) {
                        searchMerge();
                        canSecondClickContent(row, col, board);
                    }
                    setIsActive(true);
                    canChangeContent(row, col, board);
                } else if (newSelectedList.length % 2 === 0) {
                    setIsActive2(true);
                    setSecondClickIndex([newSelectedList[newSelectedList.length - 1].row, newSelectedList[newSelectedList.length - 1].col]);
                }


                return [...newSelectedList];
            });
        }
    }

    //クリックしたとに消せる座標を取得する関数
    const canChangeContent = (row, col, prevBoard) => {
        let canSel = [];
        const searches = searchMerge();
        let canPut = [];
        searches.forEach((search, searchIndex) => {
            if (row === search[0]["y"] && col === search[0]["x"]) {
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
        });

        // 更新された canPut を状態として保存
        canPut.forEach(canP => {
            canSel.push(canP);
        });
        setCanChangeCell(canSel);
        return canSel;
    }

    //一回目のクリックをしたとに次にクリックできる座標を取得する関数
    const canSecondClickContent = (row, col, prevBoard) => {
        // console.log(canPutCell);
        let canSel = [];
        let canPut = [];
        const searches = canPutCell;
        searches.forEach((search, searchIndex) => {
            if (row === search[0]["y"] && col === search[0]["x"]) {
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
        });
        canPut.forEach(canP => {
            canSel.push(canP);
        });
        // console.log(canSel);
        setCanClickCell(canSel);
        return canSel;
    }

    //配列をすべて探索して横全部が0の部分があったらそこより上にあるまる配列をまるごと一段落とす
    const ArrayExists = () => {
        setBoard(prevBoard => {
            const copiedBoardArray = [...prevBoard];
            const sortedBoardArray = copiedBoardArray.sort((a, b) => {
                // aとbのいずれかの行がすべて0かどうかをチェック
                const isAllZeroA = a.every(cell => cell === 0);
                const isAllZeroB = b.every(cell => cell === 0);
                // // aとbの両方がすべて0の場合、並び順は同じ
                if (isAllZeroA && isAllZeroB) {
                    return 0;
                }
                // // aがすべて0の場合、aを上に配置
                else if (isAllZeroA) {
                    return -1;
                }
                // // bがすべて0の場合、bを上に配置
                else if (isAllZeroB) {
                    return 1;
                }
                // // それ以外の場合、並び順は変更しない
                else {
                    return 0;
                }
            });
            return [...sortedBoardArray]
        })
    }

    useEffect(() => {
        // //secondClickIndexが押されたとき、canClickCell配列に含まれているなら削除
        // //secondClickIndexが押されたとき、8方向探索して、
        // // firstClickIndexがある座標までの１方向を配列に格納してから削除する
        if (isActive && firstClickIndex.length > 0 && isActive2) {
            for (let j = 0; j < searchArray.length; j++) {
                const directionCells = [];
                for (let k = 1; k < 10; k++) {
                    const newY = secondClickIndex[0] + searchArray[j][0] * k;
                    const newX = secondClickIndex[1] + searchArray[j][1] * k;
                    if (outBoard(newY, newX)) {
                        if (firstClickIndex[0] === newY && firstClickIndex[1] === newX) {
                            // console.log(newY, newX);
                            //         // foundDirections.push(searchArray[j]);
                            for (let l = 1; l < 10; l++) {
                                const removeInY = secondClickIndex[0] + searchArray[j][0] * l;
                                const removeInX = secondClickIndex[1] + searchArray[j][1] * l;
                                if (outBoard(removeInY, removeInX)) {
                                    directionCells.push(firstClickIndex);
                                    directionCells.push(secondClickIndex);
                                    if (removeInY == firstClickIndex[0] && removeInX == firstClickIndex[1]) {
                                        // console.log(directionCells);
                                        // console.log(removeInY, removeInX);
                                        break;
                                    } else {
                                        directionCells.push([removeInY, removeInX]);
                                    }
                                }
                            }

                        }
                    }
                }
                canClickCell.forEach(canCl => {
                    if (secondClickIndex[0] === canCl[0] && secondClickIndex[1] === canCl[1]) {
                        // console.log(directionCells);
                        directionCells.forEach(dire => {
                            setBoard(prevBoard => {
                                //削除されるセル
                                const newBoard = [...prevBoard];
                                const direY = dire[0];
                                const direX = dire[1];
                                newBoard[direY][direX] = 0;
                                if (newBoard[direY][direX] == 0) {
                                    setIsTurn(true);
                                }
                                return newBoard;
                            })
                        })


                    }
                })
            }

            setIsActive(false);
            setIsActive2(false);
            //選択できるセルを解除
            ArrayExists();
            setCanClickCell([]);
            //選択中のセルを解除
            setFirstClickIndex([]);
            // setSecondClickIndex([]);
        }
    }, [canClickCell, firstClickIndex, secondClickIndex, canChangeCell, isActive, isActive2, ArrayExists, turn]);

    useEffect(() => {
        if (isTurn) {
            setTurn(prevTurn => {
                if (prevTurn - 1 == 0) {
                    setBoard(prevBoard => {
                        let randomArray = [];
                        const newCellArray = [...prevBoard];
                        for (let i = 0; i < 8; i++) {
                            const randomNumCell = Math.floor(Math.random() * 9 + 1);
                            randomArray.push(randomNumCell);
                        }
                        newCellArray.shift();
                        newCellArray.push(randomArray);
                        randomArray = [];
                        return newCellArray;
                    })
                    prevTurn = 5;
                    return prevTurn;
                }
                const newTurn = prevTurn - 1;
                return newTurn;
            });
            setIsTurn(false);
        }

    }, [isTurn]);

    useEffect(() => {
        if (selectedList[0] && checkDiff.length == 0 && checkSome.length == 0) {
         
            setBoard(prevBoard => {
                let randomArray = [];
                const newCellArray = [...prevBoard];
                for (let i = 0; i < 8; i++) {
                    const randomNumCell = Math.floor(Math.random() * 9 + 1);
                    randomArray.push(randomNumCell);
                }
                newCellArray.shift();
                newCellArray.push(randomArray);
                randomArray = [];
                return newCellArray;
            })
            setTurn(5);
        }
    }, [checkSome, checkDiff]);



    return { board, handleClick, canSecondClickContent, firstClickIndex, canClickCell, turn };
}

