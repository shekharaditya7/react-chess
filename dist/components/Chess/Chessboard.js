"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Chessboard;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _chess = require("./chess.constants");
var _indexModule = _interopRequireDefault(require("./index.module.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Chessboard(_ref) {
  let {
    chessBoard = [],
    handleBoxClick,
    checkedKingPos
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.board
  }, chessBoard.map((rowItems, row) => {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _indexModule.default.row,
      key: row
    }, rowItems.map((_ref2, col) => {
      var _checkedKingPos$curre, _checkedKingPos$curre2;
      let {
        piece,
        color,
        isActive,
        isMovedBox
      } = _ref2;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(_indexModule.default.box, {
          [_indexModule.default.active]: isActive,
          [_indexModule.default.checkedKing]: (checkedKingPos === null || checkedKingPos === void 0 || (_checkedKingPos$curre = checkedKingPos.current) === null || _checkedKingPos$curre === void 0 ? void 0 : _checkedKingPos$curre.row) === row && (checkedKingPos === null || checkedKingPos === void 0 || (_checkedKingPos$curre2 = checkedKingPos.current) === null || _checkedKingPos$curre2 === void 0 ? void 0 : _checkedKingPos$curre2.col) === col,
          [_indexModule.default.pointer]: !!piece,
          [_indexModule.default.dark]: color === _chess.COLORS.BLACK,
          [_indexModule.default.movedBox]: isMovedBox === true
        }),
        key: "".concat(row, "-").concat(col),
        onClick: () => handleBoxClick(row, col)
      }, piece !== null && piece !== void 0 && piece.logoSrc ? /*#__PURE__*/_react.default.createElement("img", {
        src: piece === null || piece === void 0 ? void 0 : piece.logoSrc,
        alt: "chess-piece",
        className: (0, _classnames.default)(_indexModule.default.pieceImg, {
          [_indexModule.default.whitePieceImg]: (piece === null || piece === void 0 ? void 0 : piece.color) === _chess.COLORS.WHITE
        })
      }) : null);
    }));
  }));
}