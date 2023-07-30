"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovesByType = getMovesByType;
exports.isKingCheckedAfterMoveComplete = void 0;
exports.isOpponentColorPiece = isOpponentColorPiece;
exports.playAudio = playAudio;
exports.willKingBeCheckedAfterMoveByColor = exports.showMovedBoxes = exports.resetActiveState = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _chess = require("./chess.constants");
function playAudio() {
  const context = new AudioContext();
  const o = context.createOscillator();
  const g = context.createGain();
  o.connect(g);
  g.connect(context.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.04);
}
const resetActiveState = currChessBoard => {
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
exports.resetActiveState = resetActiveState;
const showMovedBoxes = (currChessBoard, prevRow, prevCol, currRow, currCol) => {
  if (currChessBoard !== undefined && prevRow !== undefined && prevCol !== undefined && currRow !== undefined && currCol !== undefined) currChessBoard[prevRow][prevCol].isMovedBox = true;
  currChessBoard[currRow][currCol].isMovedBox = true;
};

/*
    `color` has clicked on a box to complete its move.
    We check if the king of the `color` will be at check if this move is finalised
*/
exports.showMovedBoxes = showMovedBoxes;
const willKingBeCheckedAfterMoveByColor = (color, currChessBoard) => {
  let isKingChecked = false;
  currChessBoard.forEach((chessBoxRow, row) => {
    chessBoxRow.forEach((_ref, col) => {
      let {
        piece
      } = _ref;
      // Check for moves of opponent colors
      if (piece && (piece === null || piece === void 0 ? void 0 : piece.color) !== color) {
        const moves = getMovesByType(piece.type, row, col, currChessBoard);
        if (moves.length) {
          moves.forEach(moveArray => {
            moveArray.forEach(_ref2 => {
              var _currChessBoard$row$c;
              let {
                row,
                col
              } = _ref2;
              const pieceAtTheBox = (_currChessBoard$row$c = currChessBoard[row][col]) === null || _currChessBoard$row$c === void 0 ? void 0 : _currChessBoard$row$c.piece;
              if ((pieceAtTheBox === null || pieceAtTheBox === void 0 ? void 0 : pieceAtTheBox.type) === _chess.TYPES.KING && (pieceAtTheBox === null || pieceAtTheBox === void 0 ? void 0 : pieceAtTheBox.color) !== piece.color) isKingChecked = true;
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
exports.willKingBeCheckedAfterMoveByColor = willKingBeCheckedAfterMoveByColor;
const isKingCheckedAfterMoveComplete = (color, currChessBoard) => {
  const checkedKingData = {
    isKingChecked: false
  };
  currChessBoard.forEach((chessBoxRow, row) => {
    chessBoxRow.forEach((_ref3, col) => {
      let {
        piece
      } = _ref3;
      if (piece && (piece === null || piece === void 0 ? void 0 : piece.color) === color) {
        const moves = getMovesByType(piece.type, row, col, currChessBoard);
        if (moves.length) {
          moves.forEach(moveArray => {
            moveArray.forEach(_ref4 => {
              var _currChessBoard$row$c2;
              let {
                row,
                col
              } = _ref4;
              const pieceAtTheBox = (_currChessBoard$row$c2 = currChessBoard[row][col]) === null || _currChessBoard$row$c2 === void 0 ? void 0 : _currChessBoard$row$c2.piece;
              if ((pieceAtTheBox === null || pieceAtTheBox === void 0 ? void 0 : pieceAtTheBox.type) === _chess.TYPES.KING && (pieceAtTheBox === null || pieceAtTheBox === void 0 ? void 0 : pieceAtTheBox.color) !== piece.color) {
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
exports.isKingCheckedAfterMoveComplete = isKingCheckedAfterMoveComplete;
function isValidBox(row, col, board, color) {
  return row <= 7 && col <= 7 && row >= 0 && col >= 0 && (!board[row][col].piece || board[row][col].piece.color !== color);
}
function createPoint(row, col) {
  return {
    col,
    row
  };
}
function isOpponentColorPiece(currPiece, piece) {
  return (currPiece === null || currPiece === void 0 ? void 0 : currPiece.color) && (piece === null || piece === void 0 ? void 0 : piece.color) && (currPiece.color === _chess.COLORS.BLACK && piece.color === _chess.COLORS.WHITE || currPiece.color === _chess.COLORS.WHITE && piece.color === _chess.COLORS.BLACK);
}

/*
    Calculate possible moves of a piece

    @params:
        type      :  type of the piece
        row, col  :  position of the piece,
        board     :  current chess-board configuration
*/

function getMovesByType(type, row, col, board) {
  var _board$row$col;
  let movesArray = [];
  const color = (_board$row$col = board[row][col]) === null || _board$row$col === void 0 || (_board$row$col = _board$row$col.piece) === null || _board$row$col === void 0 ? void 0 : _board$row$col.color;
  switch (type) {
    /*
      KING's MOVES
    */
    case _chess.TYPES.KING:
      if (isValidBox(row + 1, col + 1, board, color)) movesArray.push([createPoint(row + 1, col + 1)]);
      if (isValidBox(row + 1, col, board, color)) movesArray.push([createPoint(row + 1, col)]);
      if (isValidBox(row + 1, col - 1, board, color)) movesArray.push([createPoint(row + 1, col - 1)]);
      if (isValidBox(row, col - 1, board, color)) movesArray.push([createPoint(row, col - 1)]);
      if (isValidBox(row - 1, col - 1, board, color)) movesArray.push([createPoint(row - 1, col - 1)]);
      if (isValidBox(row - 1, col, board, color)) movesArray.push([createPoint(row - 1, col)]);
      if (isValidBox(row - 1, col + 1, board, color)) movesArray.push([createPoint(row - 1, col + 1)]);
      if (isValidBox(row, col + 1, board, color)) movesArray.push([createPoint(row, col + 1)]);
      return movesArray;

    /*
      QUEEEN's MOVES
    */
    case _chess.TYPES.QUEEN:
      {
        let stopFlag = 0,
          tempMoves = [];

        // Vertical and Horizontal Moves
        for (let i = row + 1; i <= 7; i++) {
          if (stopFlag === 0 && isValidBox(i, col, board, color)) {
            var _board$row$col2, _board$i$col;
            tempMoves.push(createPoint(i, col));
            if (isOpponentColorPiece((_board$row$col2 = board[row][col]) === null || _board$row$col2 === void 0 ? void 0 : _board$row$col2.piece, (_board$i$col = board[i][col]) === null || _board$i$col === void 0 ? void 0 : _board$i$col.piece)) stopFlag = 1;
          } else if (!isValidBox(i, col, board, color)) {
            stopFlag = 1;
          }
        }
        if (tempMoves.length) movesArray.push(tempMoves);
        stopFlag = 0;
        tempMoves = [];
        for (let i = row - 1; i >= 0; i--) {
          if (stopFlag === 0 && isValidBox(i, col, board, color)) {
            var _board$row$col3, _board$i$col2;
            tempMoves.push(createPoint(i, col));
            if (isOpponentColorPiece((_board$row$col3 = board[row][col]) === null || _board$row$col3 === void 0 ? void 0 : _board$row$col3.piece, (_board$i$col2 = board[i][col]) === null || _board$i$col2 === void 0 ? void 0 : _board$i$col2.piece)) stopFlag = 1;
          } else if (!isValidBox(i, col, board, color)) {
            stopFlag = 1;
          }
        }
        if (tempMoves.length) movesArray.push(tempMoves);
        stopFlag = 0;
        tempMoves = [];
        for (let j = col + 1; j <= 7; j++) {
          if (stopFlag === 0 && isValidBox(row, j, board, color)) {
            var _board$row$col4, _board$row$j;
            tempMoves.push(createPoint(row, j));
            if (isOpponentColorPiece((_board$row$col4 = board[row][col]) === null || _board$row$col4 === void 0 ? void 0 : _board$row$col4.piece, (_board$row$j = board[row][j]) === null || _board$row$j === void 0 ? void 0 : _board$row$j.piece)) stopFlag = 1;
          } else if (!isValidBox(row, j, board, color)) {
            stopFlag = 1;
          }
        }
        if (tempMoves.length) movesArray.push(tempMoves);
        stopFlag = 0;
        tempMoves = [];
        for (let j = col - 1; j >= 0; j--) {
          if (stopFlag === 0 && isValidBox(row, j, board, color)) {
            var _board$row$col5, _board$row$j2;
            tempMoves.push(createPoint(row, j));
            if (isOpponentColorPiece((_board$row$col5 = board[row][col]) === null || _board$row$col5 === void 0 ? void 0 : _board$row$col5.piece, (_board$row$j2 = board[row][j]) === null || _board$row$j2 === void 0 ? void 0 : _board$row$j2.piece)) stopFlag = 1;
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
            var _board$row$col6, _board$i$j;
            tempMoves.push(createPoint(i, j));
            if (isOpponentColorPiece((_board$row$col6 = board[row][col]) === null || _board$row$col6 === void 0 ? void 0 : _board$row$col6.piece, (_board$i$j = board[i][j]) === null || _board$i$j === void 0 ? void 0 : _board$i$j.piece)) stopFlag = 1;
          } else if (!isValidBox(i, j, board, color)) {
            stopFlag = 1;
          }
        }
        if (tempMoves.length) movesArray.push(tempMoves);
        stopFlag = 0;
        tempMoves = [];
        for (let i = row - 1, j = col + 1; i >= 0 && j <= 7; i--, j++) {
          if (stopFlag === 0 && isValidBox(i, j, board, color)) {
            var _board$row$col7, _board$i$j2;
            tempMoves.push(createPoint(i, j));
            if (isOpponentColorPiece((_board$row$col7 = board[row][col]) === null || _board$row$col7 === void 0 ? void 0 : _board$row$col7.piece, (_board$i$j2 = board[i][j]) === null || _board$i$j2 === void 0 ? void 0 : _board$i$j2.piece)) stopFlag = 1;
          } else if (!isValidBox(i, j, board, color)) {
            stopFlag = 1;
          }
        }
        if (tempMoves.length) movesArray.push(tempMoves);
        stopFlag = 0;
        tempMoves = [];
        for (let i = row + 1, j = col + 1; i <= 7 && j <= 7; i++, j++) {
          if (stopFlag === 0 && isValidBox(i, j, board, color)) {
            var _board$row$col8, _board$i$j3;
            tempMoves.push(createPoint(i, j));
            if (isOpponentColorPiece((_board$row$col8 = board[row][col]) === null || _board$row$col8 === void 0 ? void 0 : _board$row$col8.piece, (_board$i$j3 = board[i][j]) === null || _board$i$j3 === void 0 ? void 0 : _board$i$j3.piece)) stopFlag = 1;
          } else if (!isValidBox(i, j, board, color)) {
            stopFlag = 1;
          }
        }
        if (tempMoves.length) movesArray.push(tempMoves);
        stopFlag = 0;
        tempMoves = [];
        for (let i = row + 1, j = col - 1; i <= 7 && j >= 0; i++, j--) {
          if (stopFlag === 0 && isValidBox(i, j, board, color)) {
            var _board$row$col9, _board$i$j4;
            tempMoves.push(createPoint(i, j));
            if (isOpponentColorPiece((_board$row$col9 = board[row][col]) === null || _board$row$col9 === void 0 ? void 0 : _board$row$col9.piece, (_board$i$j4 = board[i][j]) === null || _board$i$j4 === void 0 ? void 0 : _board$i$j4.piece)) stopFlag = 1;
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
    case _chess.TYPES.PAWN:
      {
        var _board$row$col10;
        const color = (_board$row$col10 = board[row][col]) === null || _board$row$col10 === void 0 || (_board$row$col10 = _board$row$col10.piece) === null || _board$row$col10 === void 0 ? void 0 : _board$row$col10.color;
        if (color === _chess.COLORS.WHITE) {
          if (row === 6) {
            if (isValidBox(row - 1, col, board, color) && isValidBox(row - 2, col, board, color) && !isOpponentColorPiece(board[row][col].piece, board[row - 1][col].piece) && !isOpponentColorPiece(board[row][col].piece, board[row - 2][col].piece)) movesArray.push([createPoint(row - 1, col), createPoint(row - 2, col)]);else if (isValidBox(row - 1, col, board, color) && !isOpponentColorPiece(board[row][col].piece, board[row - 1][col].piece)) {
              movesArray.push([createPoint(row - 1, col)]);
              if (isValidBox(row - 2, col, board, color) && !isOpponentColorPiece(board[row][col].piece, board[row - 2][col].piece)) movesArray = [...movesArray, createPoint(row - 2, col)];
            }
          } else if (row >= 1 && isValidBox(row - 1, col, board, color) && !isOpponentColorPiece(board[row][col].piece, board[row - 1][col].piece)) {
            movesArray.push([createPoint(row - 1, col)]);
          }
          if (isValidBox(row - 1, col - 1, board, color) && isOpponentColorPiece(board[row][col].piece, board[row - 1][col - 1].piece)) {
            movesArray.push([createPoint(row - 1, col - 1)]);
          }
          if (isValidBox(row - 1, col + 1, board, color) && isOpponentColorPiece(board[row][col].piece, board[row - 1][col + 1].piece)) {
            movesArray.push([createPoint(row - 1, col + 1)]);
          }
        } else if (color === _chess.COLORS.BLACK) {
          if (row === 1) {
            if (isValidBox(row + 1, col, board, color) && isValidBox(row + 2, col, board, color) && !isOpponentColorPiece(board[row][col].piece, board[row + 1][col].piece) && !isOpponentColorPiece(board[row][col].piece, board[row + 2][col].piece)) movesArray.push([createPoint(row + 1, col), createPoint(row + 2, col)]);else if (isValidBox(row + 1, col, board, color) && !isOpponentColorPiece(board[row][col].piece, board[row + 1][col].piece)) {
              movesArray.push([createPoint(row + 1, col)]);
              if (isValidBox(row + 2, col, board, color) && !isOpponentColorPiece(board[row][col].piece, board[row + 2][col].piece)) movesArray = [...movesArray, createPoint(row + 2, col)];
            }
          } else if (row <= 6 && isValidBox(row + 1, col, board, color) && !isOpponentColorPiece(board[row][col].piece, board[row + 1][col].piece)) {
            movesArray.push([createPoint(row + 1, col)]);
          }
          if (isValidBox(row + 1, col + 1, board, color) && isOpponentColorPiece(board[row][col].piece, board[row + 1][col + 1].piece)) {
            movesArray.push([createPoint(row + 1, col + 1)]);
          }
          if (isValidBox(row + 1, col - 1, board, color) && isOpponentColorPiece(board[row][col].piece, board[row + 1][col - 1].piece)) {
            movesArray.push([createPoint(row + 1, col - 1)]);
          }
        }
        return movesArray;
      }

    /*
      BISHOP's MOVES
    */
    case _chess.TYPES.BISHOP:
      {
        let stopFlag = 0;
        let tempMoves = [];

        //Diagonal Moves
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; j--, i--) {
          if (stopFlag === 0 && isValidBox(i, j, board, color)) {
            var _board$row$col11, _board$i$j5;
            tempMoves.push(createPoint(i, j));
            if (isOpponentColorPiece((_board$row$col11 = board[row][col]) === null || _board$row$col11 === void 0 ? void 0 : _board$row$col11.piece, (_board$i$j5 = board[i][j]) === null || _board$i$j5 === void 0 ? void 0 : _board$i$j5.piece)) stopFlag = 1;
          } else if (!isValidBox(i, j, board, color)) {
            stopFlag = 1;
          }
        }
        if (tempMoves.length) movesArray.push(tempMoves);
        stopFlag = 0;
        tempMoves = [];
        for (let i = row - 1, j = col + 1; i >= 0 && j <= 7; i--, j++) {
          if (stopFlag === 0 && isValidBox(i, j, board, color)) {
            var _board$row$col12, _board$i$j6;
            tempMoves.push(createPoint(i, j));
            if (isOpponentColorPiece((_board$row$col12 = board[row][col]) === null || _board$row$col12 === void 0 ? void 0 : _board$row$col12.piece, (_board$i$j6 = board[i][j]) === null || _board$i$j6 === void 0 ? void 0 : _board$i$j6.piece)) stopFlag = 1;
          } else if (!isValidBox(i, j, board, color)) {
            stopFlag = 1;
          }
        }
        if (tempMoves.length) movesArray.push(tempMoves);
        stopFlag = 0;
        tempMoves = [];
        for (let i = row + 1, j = col + 1; i <= 7 && j <= 7; i++, j++) {
          if (stopFlag === 0 && isValidBox(i, j, board, color)) {
            var _board$row$col13, _board$i$j7;
            tempMoves.push(createPoint(i, j));
            if (isOpponentColorPiece((_board$row$col13 = board[row][col]) === null || _board$row$col13 === void 0 ? void 0 : _board$row$col13.piece, (_board$i$j7 = board[i][j]) === null || _board$i$j7 === void 0 ? void 0 : _board$i$j7.piece)) stopFlag = 1;
          } else if (!isValidBox(i, j, board, color)) {
            stopFlag = 1;
          }
        }
        if (tempMoves.length) movesArray.push(tempMoves);
        stopFlag = 0;
        tempMoves = [];
        for (let i = row + 1, j = col - 1; i <= 7 && j >= 0; i++, j--) {
          if (stopFlag === 0 && isValidBox(i, j, board, color)) {
            var _board$row$col14, _board$i$j8;
            tempMoves.push(createPoint(i, j));
            if (isOpponentColorPiece((_board$row$col14 = board[row][col]) === null || _board$row$col14 === void 0 ? void 0 : _board$row$col14.piece, (_board$i$j8 = board[i][j]) === null || _board$i$j8 === void 0 ? void 0 : _board$i$j8.piece)) stopFlag = 1;
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
    case _chess.TYPES.KNIGHT:
      if (isValidBox(row - 2, col + 1, board, color)) movesArray.push([createPoint(row - 2, col + 1)]);
      if (isValidBox(row - 2, col - 1, board, color)) movesArray.push([createPoint(row - 2, col - 1)]);
      if (isValidBox(row + 2, col + 1, board, color)) movesArray.push([createPoint(row + 2, col + 1)]);
      if (isValidBox(row + 2, col - 1, board, color)) movesArray.push([createPoint(row + 2, col - 1)]);
      if (isValidBox(row - 1, col - 2, board, color)) movesArray.push([createPoint(row - 1, col - 2)]);
      if (isValidBox(row + 1, col - 2, board, color)) movesArray.push([createPoint(row + 1, col - 2)]);
      if (isValidBox(row - 1, col + 2, board, color)) movesArray.push([createPoint(row - 1, col + 2)]);
      if (isValidBox(row + 1, col + 2, board, color)) movesArray.push([createPoint(row + 1, col + 2)]);
      return movesArray;

    /*
      ROOK's MOVES
    */
    case _chess.TYPES.ROOK:
      let stopFlag = 0,
        tempMoves = [];

      // Horizontal and Vertical Moves
      for (let i = row + 1; i <= 7; i++) {
        if (stopFlag === 0 && isValidBox(i, col, board, color)) {
          var _board$row$col15, _board$i$col3;
          tempMoves.push(createPoint(i, col));
          if (isOpponentColorPiece((_board$row$col15 = board[row][col]) === null || _board$row$col15 === void 0 ? void 0 : _board$row$col15.piece, (_board$i$col3 = board[i][col]) === null || _board$i$col3 === void 0 ? void 0 : _board$i$col3.piece)) stopFlag = 1;
        } else if (!isValidBox(i, col, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];
      for (let i = row - 1; i >= 0; i--) {
        if (stopFlag === 0 && isValidBox(i, col, board, color)) {
          var _board$row$col16, _board$i$col4;
          tempMoves.push(createPoint(i, col));
          if (isOpponentColorPiece((_board$row$col16 = board[row][col]) === null || _board$row$col16 === void 0 ? void 0 : _board$row$col16.piece, (_board$i$col4 = board[i][col]) === null || _board$i$col4 === void 0 ? void 0 : _board$i$col4.piece)) stopFlag = 1;
        } else if (!isValidBox(i, col, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];
      for (let j = col + 1; j <= 7; j++) {
        if (stopFlag === 0 && isValidBox(row, j, board, color)) {
          var _board$row$col17, _board$row$j3;
          tempMoves.push(createPoint(row, j));
          if (isOpponentColorPiece((_board$row$col17 = board[row][col]) === null || _board$row$col17 === void 0 ? void 0 : _board$row$col17.piece, (_board$row$j3 = board[row][j]) === null || _board$row$j3 === void 0 ? void 0 : _board$row$j3.piece)) stopFlag = 1;
        } else if (!isValidBox(row, j, board, color)) {
          stopFlag = 1;
        }
      }
      if (tempMoves.length) movesArray.push(tempMoves);
      stopFlag = 0;
      tempMoves = [];
      for (let j = col - 1; j >= 0; j--) {
        if (stopFlag === 0 && isValidBox(row, j, board, color)) {
          var _board$row$col18, _board$row$j4;
          tempMoves.push(createPoint(row, j));
          if (isOpponentColorPiece((_board$row$col18 = board[row][col]) === null || _board$row$col18 === void 0 ? void 0 : _board$row$col18.piece, (_board$row$j4 = board[row][j]) === null || _board$row$j4 === void 0 ? void 0 : _board$row$j4.piece)) stopFlag = 1;
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