import { useState, useRef, useEffect } from "react";
import BOARD, {
  COLORS,
  LOCAL_CONFIG_KEY,
  REDO_KEY,
  KNOCKED_OUT_BOARD,
} from "./chess.constants";
import {
  resetActiveState,
  willKingBeCheckedAfterMoveByColor,
  isKingCheckedAfterMoveComplete,
  getMovesByType,
  showMovedBoxes,
  playAudio,
} from "./chess.utils";
import styles from "./index.module.scss";
import KnockedOutPieces from "./KnockedOutPieces";
import Chessboard from "./Chessboard";
import MetaSection from "./MetaSection";

export default function Chess() {
  const [showInstructions, setShowInstructions] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [chessBoard, setChessboard] = useState(window.structuredClone(BOARD));
  const pressedPiece = useRef(null);
  const knockedOutPieces = useRef(window.structuredClone(KNOCKED_OUT_BOARD));
  const turn = useRef(COLORS.WHITE);
  const checkedKingPos = useRef({});

  const isUndoAvailable = !!(
    JSON.parse(localStorage.getItem(LOCAL_CONFIG_KEY))?.length >= 1
  );
  const isRedoAvailable = !!(
    JSON.parse(localStorage.getItem(REDO_KEY))?.length >= 1
  );

  useEffect(() => {
    /*
      Load the previous Saved data from localStorage
    */
    const configData = JSON.parse(localStorage.getItem(LOCAL_CONFIG_KEY)) || [];
    if (
      configData.length &&
      configData[configData.length - 1]?.currChessBoard
    ) {
      turn.current = configData[configData.length - 1].currentTurn;
      knockedOutPieces.current =
        configData[configData.length - 1].currKnockedOut;
      checkedKingPos.current =
        configData[configData.length - 1].currCheckedKingPos;
      setChessboard(configData[configData.length - 1].currChessBoard);
    }
  }, []);

  function addKnockedOutPiece(piece) {
    const pieceColor = piece.color;
    let rowIndex, colIndex;
    const knockedOutArray = knockedOutPieces.current[pieceColor];
    for (let row = 0; row <= 1; row++) {
      for (let col = 0; col <= 7; col++) {
        if (!Object.keys(knockedOutArray[row][col]).length) {
          rowIndex = row;
          colIndex = col;
          break;
        }
      }
      if (rowIndex !== undefined) {
        break;
      }
    }

    knockedOutArray[rowIndex][colIndex] = piece;
    knockedOutPieces.current[pieceColor] = [...knockedOutArray];
  }

  const saveToLocal = (
    currChessBoard,
    currentTurn,
    currKnockedOut,
    currCheckedKingPos
  ) => {
    const prevData = JSON.parse(localStorage.getItem(LOCAL_CONFIG_KEY)) || [];
    const data = {
      currentTurn,
      currChessBoard,
      currKnockedOut,
      currCheckedKingPos,
    };
    localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify([...prevData, data]));
  };

  const handleBoxClick = (row, col) => {
    const { piece } = chessBoard[row][col];
    const currChessBoard = JSON.parse(JSON.stringify(chessBoard));

    if (chessBoard[row][col].isActive) {
      //If clicked on a box that belongs to moves

      if (
        row === pressedPiece.current.pressedRow &&
        col === pressedPiece.current.pressedCol
      ) {
        // clicked on the same piece
        resetActiveState(currChessBoard);
        pressedPiece.current = null;
        setChessboard([...currChessBoard]);
        return;
      }
      // MOVE COMPLETE
      currChessBoard[pressedPiece.current.pressedRow][
        pressedPiece.current.pressedCol
      ].piece = null;
      if (currChessBoard[row][col].piece) {
        addKnockedOutPiece(piece);
      }
      currChessBoard[row][col].piece = { ...pressedPiece.current.piece };

      resetActiveState(currChessBoard);

      showMovedBoxes(
        currChessBoard,
        pressedPiece?.current?.pressedRow,
        pressedPiece?.current?.pressedCol,
        row,
        col
      );
      pressedPiece.current = null;

      //CHANGE TURN
      turn.current =
        turn.current === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
      setChessboard([...currChessBoard]);

      // Check if King got checked
      const { isKingChecked, checkedRow, checkedCol } =
        isKingCheckedAfterMoveComplete(
          turn.current === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE,
          currChessBoard
        );
      if (isKingChecked) {
        checkedKingPos.current = { row: checkedRow, col: checkedCol };
      } else checkedKingPos.current = {};
      saveToLocal(
        currChessBoard,
        turn.current,
        knockedOutPieces.current,
        checkedKingPos.current
      );

      // Check if KING (of the color which just made the move) would get in check if the move gets completed - if YES, revert
      if (
        willKingBeCheckedAfterMoveByColor(
          turn.current === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE,
          currChessBoard
        )
      ) {
        setShowInstructions({
          instructions: [`Oops! Can't move there.`],
        });
        setTimeout(() => {
          setShowInstructions(null);
        }, 2000);
        handleUndo();
        return;
      }
      playAudio();
      return;
    }

    if (turn.current !== piece?.color) {
      //Turn wise moves only
      if (piece && !pressedPiece?.current?.piece) {
        setShowInstructions({
          instructions: [`It's ${turn.current} color's turn!`],
        });
        setTimeout(() => {
          setShowInstructions(null);
        }, 1500);
      }
      return;
    }

    resetActiveState(currChessBoard);

    pressedPiece.current = { piece, pressedRow: row, pressedCol: col };

    //Display possible Moves
    if (!currChessBoard[row][col].isActive) {
      currChessBoard[row][col].isActive = true;
      const moves = getMovesByType(piece.type, row, col, chessBoard);
      if (moves.length) {
        moves.forEach((moveArray) => {
          moveArray.forEach(({ row, col }) => {
            currChessBoard[row][col].isActive = true;
          });
        });
      }
    }
    setChessboard([...currChessBoard]);
  };

  const handleReset = () => {
    localStorage.removeItem(LOCAL_CONFIG_KEY);
    localStorage.removeItem(REDO_KEY);
    const baseBoard = JSON.parse(JSON.stringify(BOARD));
    turn.current = COLORS.WHITE;
    knockedOutPieces.current = JSON.parse(JSON.stringify(KNOCKED_OUT_BOARD));
    checkedKingPos.current = {};
    setChessboard(baseBoard);
    setShowConfirmationModal(false);
  };

  const handleUndo = () => {
    const configData = JSON.parse(localStorage.getItem(LOCAL_CONFIG_KEY)) || [];
    const redoList = JSON.parse(localStorage.getItem(REDO_KEY)) || [];
    let lastData;
    if (configData.length) {
      lastData = configData.pop();
    }

    if (
      configData.length &&
      configData[configData.length - 1]?.currChessBoard
    ) {
      turn.current = configData[configData.length - 1].currentTurn;
      knockedOutPieces.current =
        configData[configData.length - 1].currKnockedOut;
      checkedKingPos.current =
        configData[configData.length - 1].currCheckedKingPos;
      setChessboard(configData[configData.length - 1].currChessBoard);
    } else {
      const baseBoard = JSON.parse(JSON.stringify(BOARD));
      turn.current = COLORS.WHITE;
      knockedOutPieces.current = JSON.parse(
        JSON.stringify({ ...KNOCKED_OUT_BOARD })
      );
      checkedKingPos.current = {};
      setChessboard(baseBoard);
    }
    localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(configData));
    if (lastData)
      localStorage.setItem(REDO_KEY, JSON.stringify([...redoList, lastData]));
  };

  const handleRedo = () => {
    let configData = JSON.parse(localStorage.getItem(LOCAL_CONFIG_KEY)) || [];
    let redoList = JSON.parse(localStorage.getItem(REDO_KEY)) || [];
    let lastData;

    if (redoList.length) {
      lastData = redoList.pop();
    }
    if (lastData) configData = [...configData, lastData];

    if (
      configData.length &&
      configData[configData.length - 1]?.currChessBoard
    ) {
      turn.current = configData[configData.length - 1].currentTurn;
      knockedOutPieces.current =
        configData[configData.length - 1].currKnockedOut;
      checkedKingPos.current =
        configData[configData.length - 1].currCheckedKingPos;
      setChessboard(configData[configData.length - 1].currChessBoard);
    }
    localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(configData));
    localStorage.setItem(REDO_KEY, JSON.stringify([...redoList]));
  };

  return (
    <div className={styles.wrapper}>
      <KnockedOutPieces
        pieces={knockedOutPieces.current?.[COLORS.BLACK]}
        wrapperClassName={styles.whiteDeadWrapper}
      />
      <Chessboard
        chessBoard={chessBoard}
        handleBoxClick={handleBoxClick}
        checkedKingPos={checkedKingPos}
      />
      <div className={styles.boardRight}>
        <MetaSection
          handleRedo={handleRedo}
          handleUndo={handleUndo}
          handleReset={() => setShowConfirmationModal(true)}
          isUndoAvailable={isUndoAvailable}
          isRedoAvailable={isRedoAvailable}
        />

        <KnockedOutPieces
          pieces={knockedOutPieces.current?.[COLORS.WHITE]}
          wrapperClassName={styles.blackDeadWrapper}
        />
      </div>
    </div>
  );
}
