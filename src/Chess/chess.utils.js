import { TYPES, COLORS } from "./chess.constants";

export const resetActiveState = (currChessBoard) => {
  /*
    Turn off dispaying possible moves
  */
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      currChessBoard[i][j].isActive = false;
      currChessBoard[i][j].isMovedBox = false;
    }
  }
};

export const showMovedBoxes = (
  currChessBoard,
  prevRow,
  prevCol,
  currRow,
  currCol
) => {
  if (
    currChessBoard !== undefined &&
    prevRow !== undefined &&
    prevCol !== undefined &&
    currRow !== undefined &&
    currCol !== undefined
  )
    currChessBoard[prevRow][prevCol].isMovedBox = true;
  currChessBoard[currRow][currCol].isMovedBox = true;
};

/*
    `color` has clicked on a box to complete its move.
    We check if the king of the `color` will be at check if this move is finalised
*/
export const willKingBeCheckedAfterMoveByColor = (color, currChessBoard) => {
  let isKingChecked = false;
  currChessBoard.forEach((chessBoxRow, row) => {
    chessBoxRow.forEach(({ piece }, col) => {
      // Check for moves of opponent colors
      if (piece && piece?.color !== color) {
        const moves = getMovesByType(piece.type, row, col, currChessBoard);
        if (moves.length) {
          moves.forEach((moveArray) => {
            moveArray.forEach(({ row, col }) => {
              const pieceAtTheBox = currChessBoard[row][col]?.piece;
              if (
                pieceAtTheBox?.type === TYPES.KING &&
                pieceAtTheBox?.color !== piece.color
              )
                isKingChecked = true;
            });
          });
        }
      }
    });
  });
  return isKingChecked;
};

/*
    `color`s move is finished
    We're then re-calculating moves of the piece of `color` to check if the KING has gotten in check
*/
export const isKingCheckedAfterMoveComplete = (color, currChessBoard) => {
  const checkedKingData = { isKingChecked: false };
  currChessBoard.forEach((chessBoxRow, row) => {
    chessBoxRow.forEach(({ piece }, col) => {
      if (piece && piece?.color === color) {
        const moves = getMovesByType(piece.type, row, col, currChessBoard);
        if (moves.length) {
          moves.forEach((moveArray) => {
            moveArray.forEach(({ row, col }) => {
              const pieceAtTheBox = currChessBoard[row][col]?.piece;
              if (
                pieceAtTheBox?.type === TYPES.KING &&
                pieceAtTheBox?.color !== piece.color
              ) {
                checkedKingData.isKingChecked = true;
                checkedKingData.checkedRow = row;
                checkedKingData.checkedCol = col;
              }
            });
          });
        }
      }
    });
  });

  return checkedKingData;
};

/*
    Check if the [row, col] can be included in the path of possible moved by a piece of color -> `color`
*/

function isValidBox(row, col, board, color) {
  return (
    row <= 7 &&
    col <= 7 &&
    row >= 0 &&
    col >= 0 &&
    (!board[row][col].piece || board[row][col].piece.color !== color)
  );
}

function createPoint(row, col) {
  return {
    col,
    row,
  };
}

export function isOpponentColorPiece(currPiece, piece) {
  return (
    currPiece?.color &&
    piece?.color &&
    ((currPiece.color === COLORS.BLACK && piece.color === COLORS.WHITE) ||
      (currPiece.color === COLORS.WHITE && piece.color === COLORS.BLACK))
  );
}

/*
    Calculate possible moves of a piece

    @params:
        type      :  type of the piece
        row, col  :  position of the piece,
        board     :  current chess-board configuration
*/

export function getMovesByType(type, row, col, board) {
  let movesArray = [];
  const color = board[row][col]?.piece?.color;
  switch (type) {
    /*
      KING's MOVES
    */
    case TYPES.KING:
      if (isValidBox(row + 1, col + 1, board, color))
        movesArray.push([createPoint(row + 1, col + 1)]);
      if (isValidBox(row + 1, col, board, color))
        movesArray.push([createPoint(row + 1, col)]);
      if (isValidBox(row + 1, col - 1, board, color))
        movesArray.push([createPoint(row + 1, col - 1)]);
      if (isValidBox(row, col - 1, board, color))
        movesArray.push([createPoint(row, col - 1)]);
      if (isValidBox(row - 1, col - 1, board, color))
        movesArray.push([createPoint(row - 1, col - 1)]);
      if (isValidBox(row - 1, col, board, color))
        movesArray.push([createPoint(row - 1, col)]);
      if (isValidBox(row - 1, col + 1, board, color))
        movesArray.push([createPoint(row - 1, col + 1)]);
      if (isValidBox(row, col + 1, board, color))
        movesArray.push([createPoint(row, col + 1)]);
      return movesArray;

    /*
      QUEEEN's MOVES
    */
    case TYPES.QUEEN: {
      let stopFlag = 0,
        tempMoves = [];

      // Vertical and Horizontal Moves
      for (let i = row + 1; i <= 7; i++) {
        if (stopFlag === 0 && isValidBox(i, col, board, color)) {
          tempMoves.push(createPoint(i, col));
          if (
            isOpponentColorPiece(board[row][col]?.piece, board[i][col]?.piece)
          )
            stopFlag = 1;
        } else if (!isValidBox(i, col, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];
      for (let i = row - 1; i >= 0; i--) {
        if (stopFlag === 0 && isValidBox(i, col, board, color)) {
          tempMoves.push(createPoint(i, col));
          if (
            isOpponentColorPiece(board[row][col]?.piece, board[i][col]?.piece)
          )
            stopFlag = 1;
        } else if (!isValidBox(i, col, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];
      for (let j = col + 1; j <= 7; j++) {
        if (stopFlag === 0 && isValidBox(row, j, board, color)) {
          tempMoves.push(createPoint(row, j));
          if (
            isOpponentColorPiece(board[row][col]?.piece, board[row][j]?.piece)
          )
            stopFlag = 1;
        } else if (!isValidBox(row, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];
      for (let j = col - 1; j >= 0; j--) {
        if (stopFlag === 0 && isValidBox(row, j, board, color)) {
          tempMoves.push(createPoint(row, j));
          if (
            isOpponentColorPiece(board[row][col]?.piece, board[row][j]?.piece)
          )
            stopFlag = 1;
        } else if (!isValidBox(row, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);

      //Diagonal Moves
      stopFlag = 0;
      tempMoves = [];

      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; j--, i--) {
        if (stopFlag === 0 && isValidBox(i, j, board, color)) {
          tempMoves.push(createPoint(i, j));
          if (isOpponentColorPiece(board[row][col]?.piece, board[i][j]?.piece))
            stopFlag = 1;
        } else if (!isValidBox(i, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);

      stopFlag = 0;
      tempMoves = [];

      for (let i = row - 1, j = col + 1; i >= 0 && j <= 7; i--, j++) {
        if (stopFlag === 0 && isValidBox(i, j, board, color)) {
          tempMoves.push(createPoint(i, j));
          if (isOpponentColorPiece(board[row][col]?.piece, board[i][j]?.piece))
            stopFlag = 1;
        } else if (!isValidBox(i, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);

      stopFlag = 0;
      tempMoves = [];

      for (let i = row + 1, j = col + 1; i <= 7 && j <= 7; i++, j++) {
        if (stopFlag === 0 && isValidBox(i, j, board, color)) {
          tempMoves.push(createPoint(i, j));
          if (isOpponentColorPiece(board[row][col]?.piece, board[i][j]?.piece))
            stopFlag = 1;
        } else if (!isValidBox(i, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);

      stopFlag = 0;
      tempMoves = [];

      for (let i = row + 1, j = col - 1; i <= 7 && j >= 0; i++, j--) {
        if (stopFlag === 0 && isValidBox(i, j, board, color)) {
          tempMoves.push(createPoint(i, j));
          if (isOpponentColorPiece(board[row][col]?.piece, board[i][j]?.piece))
            stopFlag = 1;
        } else if (!isValidBox(i, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];

      return movesArray;
    }

    /*
      PAWN's MOVES
    */
    case TYPES.PAWN: {
      const color = board[row][col]?.piece?.color;
      if (color === COLORS.WHITE) {
        if (row === 6) {
          if (
            isValidBox(row - 1, col, board, color) &&
            isValidBox(row - 2, col, board, color) &&
            !isOpponentColorPiece(
              board[row][col].piece,
              board[row - 1][col].piece
            ) &&
            !isOpponentColorPiece(
              board[row][col].piece,
              board[row - 2][col].piece
            )
          )
            movesArray.push([
              createPoint(row - 1, col),
              createPoint(row - 2, col),
            ]);
          else if (
            isValidBox(row - 1, col, board, color) &&
            !isOpponentColorPiece(
              board[row][col].piece,
              board[row - 1][col].piece
            )
          ) {
            movesArray.push([createPoint(row - 1, col)]);
            if (
              isValidBox(row - 2, col, board, color) &&
              !isOpponentColorPiece(
                board[row][col].piece,
                board[row - 2][col].piece
              )
            )
              movesArray = [...movesArray, createPoint(row - 2, col)];
          }
        } else if (
          row >= 1 &&
          isValidBox(row - 1, col, board, color) &&
          !isOpponentColorPiece(
            board[row][col].piece,
            board[row - 1][col].piece
          )
        ) {
          movesArray.push([createPoint(row - 1, col)]);
        }

        if (
          isValidBox(row - 1, col - 1, board, color) &&
          isOpponentColorPiece(
            board[row][col].piece,
            board[row - 1][col - 1].piece
          )
        ) {
          movesArray.push([createPoint(row - 1, col - 1)]);
        }
        if (
          isValidBox(row - 1, col + 1, board, color) &&
          isOpponentColorPiece(
            board[row][col].piece,
            board[row - 1][col + 1].piece
          )
        ) {
          movesArray.push([createPoint(row - 1, col + 1)]);
        }
      } else if (color === COLORS.BLACK) {
        if (row === 1) {
          if (
            isValidBox(row + 1, col, board, color) &&
            isValidBox(row + 2, col, board, color) &&
            !isOpponentColorPiece(
              board[row][col].piece,
              board[row + 1][col].piece
            ) &&
            !isOpponentColorPiece(
              board[row][col].piece,
              board[row + 2][col].piece
            )
          )
            movesArray.push([
              createPoint(row + 1, col),
              createPoint(row + 2, col),
            ]);
          else if (
            isValidBox(row + 1, col, board, color) &&
            !isOpponentColorPiece(
              board[row][col].piece,
              board[row + 1][col].piece
            )
          ) {
            movesArray.push([createPoint(row + 1, col)]);
            if (
              isValidBox(row + 2, col, board, color) &&
              !isOpponentColorPiece(
                board[row][col].piece,
                board[row + 2][col].piece
              )
            )
              movesArray = [...movesArray, createPoint(row + 2, col)];
          }
        } else if (
          row <= 6 &&
          isValidBox(row + 1, col, board, color) &&
          !isOpponentColorPiece(
            board[row][col].piece,
            board[row + 1][col].piece
          )
        ) {
          movesArray.push([createPoint(row + 1, col)]);
        }
        if (
          isValidBox(row + 1, col + 1, board, color) &&
          isOpponentColorPiece(
            board[row][col].piece,
            board[row + 1][col + 1].piece
          )
        ) {
          movesArray.push([createPoint(row + 1, col + 1)]);
        }
        if (
          isValidBox(row + 1, col - 1, board, color) &&
          isOpponentColorPiece(
            board[row][col].piece,
            board[row + 1][col - 1].piece
          )
        ) {
          movesArray.push([createPoint(row + 1, col - 1)]);
        }
      }
      return movesArray;
    }

    /*
      BISHOP's MOVES
    */
    case TYPES.BISHOP: {
      let stopFlag = 0;
      let tempMoves = [];

      //Diagonal Moves
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; j--, i--) {
        if (stopFlag === 0 && isValidBox(i, j, board, color)) {
          tempMoves.push(createPoint(i, j));
          if (isOpponentColorPiece(board[row][col]?.piece, board[i][j]?.piece))
            stopFlag = 1;
        } else if (!isValidBox(i, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);

      stopFlag = 0;
      tempMoves = [];

      for (let i = row - 1, j = col + 1; i >= 0 && j <= 7; i--, j++) {
        if (stopFlag === 0 && isValidBox(i, j, board, color)) {
          tempMoves.push(createPoint(i, j));
          if (isOpponentColorPiece(board[row][col]?.piece, board[i][j]?.piece))
            stopFlag = 1;
        } else if (!isValidBox(i, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);

      stopFlag = 0;
      tempMoves = [];

      for (let i = row + 1, j = col + 1; i <= 7 && j <= 7; i++, j++) {
        if (stopFlag === 0 && isValidBox(i, j, board, color)) {
          tempMoves.push(createPoint(i, j));
          if (isOpponentColorPiece(board[row][col]?.piece, board[i][j]?.piece))
            stopFlag = 1;
        } else if (!isValidBox(i, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);

      stopFlag = 0;
      tempMoves = [];

      for (let i = row + 1, j = col - 1; i <= 7 && j >= 0; i++, j--) {
        if (stopFlag === 0 && isValidBox(i, j, board, color)) {
          tempMoves.push(createPoint(i, j));
          if (isOpponentColorPiece(board[row][col]?.piece, board[i][j]?.piece))
            stopFlag = 1;
        } else if (!isValidBox(i, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];

      return movesArray;
    }

    /* 
      KNIGHT's MOVES
    */
    case TYPES.KNIGHT:
      if (isValidBox(row - 2, col + 1, board, color))
        movesArray.push([createPoint(row - 2, col + 1)]);
      if (isValidBox(row - 2, col - 1, board, color))
        movesArray.push([createPoint(row - 2, col - 1)]);
      if (isValidBox(row + 2, col + 1, board, color))
        movesArray.push([createPoint(row + 2, col + 1)]);
      if (isValidBox(row + 2, col - 1, board, color))
        movesArray.push([createPoint(row + 2, col - 1)]);
      if (isValidBox(row - 1, col - 2, board, color))
        movesArray.push([createPoint(row - 1, col - 2)]);
      if (isValidBox(row + 1, col - 2, board, color))
        movesArray.push([createPoint(row + 1, col - 2)]);
      if (isValidBox(row - 1, col + 2, board, color))
        movesArray.push([createPoint(row - 1, col + 2)]);
      if (isValidBox(row + 1, col + 2, board, color))
        movesArray.push([createPoint(row + 1, col + 2)]);
      return movesArray;

    /*
      ROOK's MOVES
    */
    case TYPES.ROOK:
      let stopFlag = 0,
        tempMoves = [];

      // Horizontal and Vertical Moves
      for (let i = row + 1; i <= 7; i++) {
        if (stopFlag === 0 && isValidBox(i, col, board, color)) {
          tempMoves.push(createPoint(i, col));
          if (
            isOpponentColorPiece(board[row][col]?.piece, board[i][col]?.piece)
          )
            stopFlag = 1;
        } else if (!isValidBox(i, col, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];
      for (let i = row - 1; i >= 0; i--) {
        if (stopFlag === 0 && isValidBox(i, col, board, color)) {
          tempMoves.push(createPoint(i, col));
          if (
            isOpponentColorPiece(board[row][col]?.piece, board[i][col]?.piece)
          )
            stopFlag = 1;
        } else if (!isValidBox(i, col, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];
      for (let j = col + 1; j <= 7; j++) {
        if (stopFlag === 0 && isValidBox(row, j, board, color)) {
          tempMoves.push(createPoint(row, j));
          if (
            isOpponentColorPiece(board[row][col]?.piece, board[row][j]?.piece)
          )
            stopFlag = 1;
        } else if (!isValidBox(row, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];
      for (let j = col - 1; j >= 0; j--) {
        if (stopFlag === 0 && isValidBox(row, j, board, color)) {
          tempMoves.push(createPoint(row, j));
          if (
            isOpponentColorPiece(board[row][col]?.piece, board[row][j]?.piece)
          )
            stopFlag = 1;
        } else if (!isValidBox(row, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];
      return movesArray;

    default:
      return movesArray;
  }
}

export function playAudio() {
  const context = new AudioContext();
  const o = context.createOscillator();
  const g = context.createGain();
  o.connect(g);
  g.connect(context.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.04);
}
