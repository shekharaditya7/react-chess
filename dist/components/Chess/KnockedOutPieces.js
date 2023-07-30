"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = KnockedOutPieces;
var _react = _interopRequireDefault(require("react"));
var _indexModule = _interopRequireDefault(require("./index.module.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function KnockedOutPieces(_ref) {
  let {
    pieces = [],
    wrapperClassName
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: wrapperClassName
  }, pieces === null || pieces === void 0 ? void 0 : pieces.map((blackPiecesArr, row) => {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _indexModule.default.whiteCol,
      key: row
    }, blackPiecesArr.map((item, col) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: _indexModule.default.deadBox,
        key: "".concat(row, "-").concat(col)
      }, item !== null && item !== void 0 && item.logoSrc ? /*#__PURE__*/_react.default.createElement("img", {
        src: item.logoSrc,
        className: _indexModule.default.blackPieceImg,
        alt: "piece"
      }) : null);
    }));
  }));
}