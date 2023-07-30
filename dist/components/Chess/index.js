"use strict";

require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Chess;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireWildcard(require("react"));
var _chess = _interopRequireWildcard(require("./chess.constants"));
var _chess2 = require("./chess.utils");
var _indexModule = _interopRequireDefault(require("./index.module.scss"));
var _KnockedOutPieces = _interopRequireDefault(require("./KnockedOutPieces"));
var _Chessboard = _interopRequireDefault(require("./Chessboard"));
var _MetaSection = _interopRequireDefault(require("./MetaSection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function Chess() {
  var _JSON$parse, _JSON$parse2, _knockedOutPieces$cur, _knockedOutPieces$cur2;
  const [chessBoard, setChessboard] = (0, _react.useState)(window.structuredClone(_chess.default));
  const pressedPiece = (0, _react.useRef)(null);
  const knockedOutPieces = (0, _react.useRef)(window.structuredClone(_chess.KNOCKED_OUT_BOARD));
  const turn = (0, _react.useRef)(_chess.COLORS.WHITE);
  const checkedKingPos = (0, _react.useRef)({});
  const isUndoAvailable = !!(((_JSON$parse = JSON.parse(localStorage.getItem(_chess.LOCAL_CONFIG_KEY))) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.length) >= 1);
  const isRedoAvailable = !!(((_JSON$parse2 = JSON.parse(localStorage.getItem(_chess.REDO_KEY))) === null || _JSON$parse2 === void 0 ? void 0 : _JSON$parse2.length) >= 1);
  (0, _react.useEffect)(() => {
    var _configData;
    /*
      Load the previous Saved data from localStorage
    */
    const configData = JSON.parse(localStorage.getItem(_chess.LOCAL_CONFIG_KEY)) || [];
    if (configData.length && (_configData = configData[configData.length - 1]) !== null && _configData !== void 0 && _configData.currChessBoard) {
      turn.current = configData[configData.length - 1].currentTurn;
      knockedOutPieces.current = configData[configData.length - 1].currKnockedOut;
      checkedKingPos.current = configData[configData.length - 1].currCheckedKingPos;
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
  const saveToLocal = (currChessBoard, currentTurn, currKnockedOut, currCheckedKingPos) => {
    const prevData = JSON.parse(localStorage.getItem(_chess.LOCAL_CONFIG_KEY)) || [];
    const data = {
      currentTurn,
      currChessBoard,
      currKnockedOut,
      currCheckedKingPos
    };
    localStorage.setItem(_chess.LOCAL_CONFIG_KEY, JSON.stringify([...prevData, data]));
  };
  const handleBoxClick = (row, col) => {
    const {
      piece
    } = chessBoard[row][col];
    const currChessBoard = JSON.parse(JSON.stringify(chessBoard));
    if (chessBoard[row][col].isActive) {
      var _pressedPiece$current, _pressedPiece$current2;
      //If clicked on a box that belongs to moves

      if (row === pressedPiece.current.pressedRow && col === pressedPiece.current.pressedCol) {
        // clicked on the same piece
        (0, _chess2.resetActiveState)(currChessBoard);
        pressedPiece.current = null;
        setChessboard([...currChessBoard]);
        return;
      }
      // MOVE COMPLETE
      currChessBoard[pressedPiece.current.pressedRow][pressedPiece.current.pressedCol].piece = null;
      if (currChessBoard[row][col].piece) {
        addKnockedOutPiece(piece);
      }
      currChessBoard[row][col].piece = _objectSpread({}, pressedPiece.current.piece);
      (0, _chess2.resetActiveState)(currChessBoard);
      (0, _chess2.showMovedBoxes)(currChessBoard, pressedPiece === null || pressedPiece === void 0 || (_pressedPiece$current = pressedPiece.current) === null || _pressedPiece$current === void 0 ? void 0 : _pressedPiece$current.pressedRow, pressedPiece === null || pressedPiece === void 0 || (_pressedPiece$current2 = pressedPiece.current) === null || _pressedPiece$current2 === void 0 ? void 0 : _pressedPiece$current2.pressedCol, row, col);
      pressedPiece.current = null;

      //CHANGE TURN
      turn.current = turn.current === _chess.COLORS.WHITE ? _chess.COLORS.BLACK : _chess.COLORS.WHITE;
      setChessboard([...currChessBoard]);

      // Check if King got checked
      const {
        isKingChecked,
        checkedRow,
        checkedCol
      } = (0, _chess2.isKingCheckedAfterMoveComplete)(turn.current === _chess.COLORS.WHITE ? _chess.COLORS.BLACK : _chess.COLORS.WHITE, currChessBoard);
      if (isKingChecked) {
        checkedKingPos.current = {
          row: checkedRow,
          col: checkedCol
        };
      } else checkedKingPos.current = {};
      saveToLocal(currChessBoard, turn.current, knockedOutPieces.current, checkedKingPos.current);

      // Check if KING (of the color which just made the move) would get in check if the move gets completed - if YES, revert
      if ((0, _chess2.willKingBeCheckedAfterMoveByColor)(turn.current === _chess.COLORS.WHITE ? _chess.COLORS.BLACK : _chess.COLORS.WHITE, currChessBoard)) {
        handleUndo();
        return;
      }
      (0, _chess2.playAudio)();
      return;
    }
    if (turn.current !== (piece === null || piece === void 0 ? void 0 : piece.color)) {
      var _pressedPiece$current3;
      //Turn wise moves only
      if (piece && !(pressedPiece !== null && pressedPiece !== void 0 && (_pressedPiece$current3 = pressedPiece.current) !== null && _pressedPiece$current3 !== void 0 && _pressedPiece$current3.piece)) {}
      return;
    }
    (0, _chess2.resetActiveState)(currChessBoard);
    pressedPiece.current = {
      piece,
      pressedRow: row,
      pressedCol: col
    };

    //Display possible Moves
    if (!currChessBoard[row][col].isActive) {
      currChessBoard[row][col].isActive = true;
      const moves = (0, _chess2.getMovesByType)(piece.type, row, col, chessBoard);
      if (moves.length) {
        moves.forEach(moveArray => {
          moveArray.forEach(_ref => {
            let {
              row,
              col
            } = _ref;
            currChessBoard[row][col].isActive = true;
          });
        });
      }
    }
    setChessboard([...currChessBoard]);
  };
  const handleReset = () => {
    localStorage.removeItem(_chess.LOCAL_CONFIG_KEY);
    localStorage.removeItem(_chess.REDO_KEY);
    const baseBoard = JSON.parse(JSON.stringify(_chess.default));
    turn.current = _chess.COLORS.WHITE;
    knockedOutPieces.current = JSON.parse(JSON.stringify(_chess.KNOCKED_OUT_BOARD));
    checkedKingPos.current = {};
    setChessboard(baseBoard);
  };
  const handleUndo = () => {
    var _configData2;
    const configData = JSON.parse(localStorage.getItem(_chess.LOCAL_CONFIG_KEY)) || [];
    const redoList = JSON.parse(localStorage.getItem(_chess.REDO_KEY)) || [];
    let lastData;
    if (configData.length) {
      lastData = configData.pop();
    }
    if (configData.length && (_configData2 = configData[configData.length - 1]) !== null && _configData2 !== void 0 && _configData2.currChessBoard) {
      turn.current = configData[configData.length - 1].currentTurn;
      knockedOutPieces.current = configData[configData.length - 1].currKnockedOut;
      checkedKingPos.current = configData[configData.length - 1].currCheckedKingPos;
      setChessboard(configData[configData.length - 1].currChessBoard);
    } else {
      const baseBoard = JSON.parse(JSON.stringify(_chess.default));
      turn.current = _chess.COLORS.WHITE;
      knockedOutPieces.current = JSON.parse(JSON.stringify(_objectSpread({}, _chess.KNOCKED_OUT_BOARD)));
      checkedKingPos.current = {};
      setChessboard(baseBoard);
    }
    localStorage.setItem(_chess.LOCAL_CONFIG_KEY, JSON.stringify(configData));
    if (lastData) localStorage.setItem(_chess.REDO_KEY, JSON.stringify([...redoList, lastData]));
  };
  const handleRedo = () => {
    var _configData3;
    let configData = JSON.parse(localStorage.getItem(_chess.LOCAL_CONFIG_KEY)) || [];
    let redoList = JSON.parse(localStorage.getItem(_chess.REDO_KEY)) || [];
    let lastData;
    if (redoList.length) {
      lastData = redoList.pop();
    }
    if (lastData) configData = [...configData, lastData];
    if (configData.length && (_configData3 = configData[configData.length - 1]) !== null && _configData3 !== void 0 && _configData3.currChessBoard) {
      turn.current = configData[configData.length - 1].currentTurn;
      knockedOutPieces.current = configData[configData.length - 1].currKnockedOut;
      checkedKingPos.current = configData[configData.length - 1].currCheckedKingPos;
      setChessboard(configData[configData.length - 1].currChessBoard);
    }
    localStorage.setItem(_chess.LOCAL_CONFIG_KEY, JSON.stringify(configData));
    localStorage.setItem(_chess.REDO_KEY, JSON.stringify([...redoList]));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.wrapper
  }, /*#__PURE__*/_react.default.createElement(_KnockedOutPieces.default, {
    pieces: (_knockedOutPieces$cur = knockedOutPieces.current) === null || _knockedOutPieces$cur === void 0 ? void 0 : _knockedOutPieces$cur[_chess.COLORS.BLACK],
    wrapperClassName: _indexModule.default.whiteDeadWrapper
  }), /*#__PURE__*/_react.default.createElement(_Chessboard.default, {
    chessBoard: chessBoard,
    handleBoxClick: handleBoxClick,
    checkedKingPos: checkedKingPos
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.boardRight
  }, /*#__PURE__*/_react.default.createElement(_MetaSection.default, {
    handleRedo: handleRedo,
    handleUndo: handleUndo,
    handleReset: handleReset,
    isUndoAvailable: isUndoAvailable,
    isRedoAvailable: isRedoAvailable
  }), /*#__PURE__*/_react.default.createElement(_KnockedOutPieces.default, {
    pieces: (_knockedOutPieces$cur2 = knockedOutPieces.current) === null || _knockedOutPieces$cur2 === void 0 ? void 0 : _knockedOutPieces$cur2[_chess.COLORS.WHITE],
    wrapperClassName: _indexModule.default.blackDeadWrapper
  })));
}